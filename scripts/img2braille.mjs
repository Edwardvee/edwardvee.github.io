// Convierte una imagen JPEG en arte Braille coloreado con la paleta Catppuccin.
//   node scripts/img2braille.mjs [imagen.jpg] [columnas] [salida.js]
//   npm run tomoko
//
// Cada píxel se clasifica por el color más cercano de ANCHORS; el fondo casi
// blanco conectado a los bordes se vuelve transparente. Cada carácter Braille
// (2×4 puntos) toma el color mayoritario de su celda y enciende los puntos de
// ese color, así los contornos quedan como huecos entre zonas.
import fs from 'node:fs'
import jpeg from 'jpeg-js'

const [input = 'assets/tomoko.jpg', colsArg = '52', output = 'src/data/tomoko.js'] = process.argv.slice(2)
const COLS = Number(colsArg)

// color de origen (rgb) → código de color en el componente
const ANCHORS = [
  [[18, 20, 26], 's'], [[45, 48, 56], 's'], [[88, 92, 100], '1'], [[120, 124, 132], '1'],
  [[246, 224, 206], 'r'], [[234, 218, 200], 'r'],
  [[230, 195, 180], 'f'], [[200, 160, 150], 'f'], [[176, 138, 124], 'f'], [[150, 115, 105], 'f'],
  [[231, 192, 201], 'M'], [[220, 160, 175], 'M'],
  [[40, 140, 100], 'g'], [[25, 95, 70], 'g'], [[100, 180, 150], 'g'],
  [[250, 250, 250], 't'], [[175, 185, 210], '2'], [[200, 205, 220], '2'],
  [[160, 140, 200], 'm'], [[130, 115, 175], 'm'],
  [[240, 230, 170], 'y'], [[205, 195, 130], 'y'],
  [[140, 30, 50], 'R'], [[100, 25, 40], 'R'], [[90, 60, 45], 'P'], [[60, 42, 35], 'P'],
]

const img = jpeg.decode(fs.readFileSync(input), { useTArray: true })

// puntos Braille: horizontal = 0.3em (medio carácter), vertical = line-height / 4
const LINE_HEIGHT = 1.1
const W = COLS * 2
const rows = Math.round(((W * img.height) / img.width) * (0.3 / (LINE_HEIGHT / 4)) / 4)
const H = rows * 4

// reducción por promedio de área
const px = new Float32Array(W * H * 3)
for (let y = 0; y < H; y++) {
  const y0 = Math.floor((y * img.height) / H)
  const y1 = Math.max(y0 + 1, Math.floor(((y + 1) * img.height) / H))
  for (let x = 0; x < W; x++) {
    const x0 = Math.floor((x * img.width) / W)
    const x1 = Math.max(x0 + 1, Math.floor(((x + 1) * img.width) / W))
    let r = 0, g = 0, b = 0, n = 0
    for (let yy = y0; yy < y1; yy++)
      for (let xx = x0; xx < x1; xx++) {
        const i = (yy * img.width + xx) * 4
        r += img.data[i]; g += img.data[i + 1]; b += img.data[i + 2]; n++
      }
    const o = (y * W + x) * 3
    px[o] = r / n; px[o + 1] = g / n; px[o + 2] = b / n
  }
}

const cls = new Array(W * H)
for (let i = 0; i < W * H; i++) {
  const [r, g, b] = [px[i * 3], px[i * 3 + 1], px[i * 3 + 2]]
  let best, bd = Infinity
  for (const [[ar, ag, ab], code] of ANCHORS) {
    const d = (ar - r) ** 2 + (ag - g) ** 2 + (ab - b) ** 2
    if (d < bd) { bd = d; best = code }
  }
  cls[i] = best
}

// fondo: flood fill desde los bordes sobre píxeles casi blancos
const bg = new Uint8Array(W * H)
const isWhite = (i) => px[i * 3] > 232 && px[i * 3 + 1] > 232 && px[i * 3 + 2] > 232
const stack = []
for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x)
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1)
while (stack.length) {
  const i = stack.pop()
  if (bg[i] || !isWhite(i)) continue
  bg[i] = 1
  const x = i % W, y = (i / W) | 0
  if (x > 0) stack.push(i - 1)
  if (x < W - 1) stack.push(i + 1)
  if (y > 0) stack.push(i - W)
  if (y < H - 1) stack.push(i + W)
}

const BITS = [[0x01, 0x08], [0x02, 0x10], [0x04, 0x20], [0x40, 0x80]]
const chars = []
const colors = []
for (let r = 0; r < rows; r++) {
  let line = ''
  let colorLine = ''
  for (let c = 0; c < COLS; c++) {
    const count = {}
    for (let dy = 0; dy < 4; dy++)
      for (let dx = 0; dx < 2; dx++) {
        const k = (r * 4 + dy) * W + c * 2 + dx
        if (!bg[k]) count[cls[k]] = (count[cls[k]] ?? 0) + 1
      }
    const major = Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0]
    let code = 0
    if (major)
      for (let dy = 0; dy < 4; dy++)
        for (let dx = 0; dx < 2; dx++) {
          const k = (r * 4 + dy) * W + c * 2 + dx
          if (!bg[k] && cls[k] === major) code |= BITS[dy][dx]
        }
    line += code ? String.fromCharCode(0x2800 + code) : ' '
    colorLine += code ? major : ' '
  }
  chars.push(line.trimEnd())
  colors.push(colorLine.trimEnd())
}

const out = `// Generado con: node scripts/img2braille.mjs ${input} ${COLS}
// No editar a mano: regenerar con \`npm run tomoko\`.
// chars: caracteres Braille · colors: un código de color por carácter

export const TOMOKO_COLORS = {
  s: 'text-ctp-surface2',
  1: 'text-ctp-overlay1',
  2: 'text-ctp-overlay2',
  r: 'text-ctp-rosewater',
  f: 'text-ctp-flamingo',
  p: 'text-ctp-pink',
  g: 'text-ctp-green',
  t: 'text-ctp-text',
  m: 'text-ctp-mauve',
  y: 'text-ctp-yellow',
  R: 'text-ctp-red',
  M: 'text-ctp-maroon',
  P: 'text-ctp-peach',
}

export const TOMOKO_CHARS = [
${chars.map((l) => `  ${JSON.stringify(l)},`).join('\n')}
]

export const TOMOKO_COLOR_MAP = [
${colors.map((l) => `  ${JSON.stringify(l)},`).join('\n')}
]
`
fs.writeFileSync(output, out)
console.log(`${output}: ${COLS}×${rows} caracteres`)
