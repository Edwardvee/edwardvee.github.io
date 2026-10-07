import { BUFFERS } from './buffers'

export const FLAVORS = ['mocha', 'macchiato', 'frappe', 'latte']

// Comandos visibles en el autocompletado (los easter eggs no aparecen aquí 😉)
export const COMMANDS = [
  { name: 'about', desc: ['Quién soy', 'Who I am'], aliases: ['sobre', 'whoami'] },
  { name: 'experience', desc: ['Experiencia laboral', 'Work experience'], aliases: ['experiencia', 'exp', 'work', 'log'] },
  { name: 'projects', desc: ['Lista de proyectos', 'Project list'], aliases: ['proyectos'] },
  { name: 'skills', desc: ['Habilidades técnicas', 'Technical skills'], aliases: ['habilidades'] },
  { name: 'certs', desc: ['Formación y certificaciones', 'Education & certifications'], aliases: ['education', 'formacion'] },
  { name: 'contact', desc: ['Contacto', 'Contact'], aliases: ['contacto'] },
  { name: 'help', desc: ['Ayuda y atajos', 'Help & keymaps'], aliases: ['h', 'ayuda'] },
  { name: 'edit', desc: ['Abrir archivo · :e <ruta>', 'Open file · :e <path>'], aliases: ['e'], arg: 'file' },
  { name: 'Telescope', desc: ['Buscador difuso de archivos', 'Fuzzy file finder'], aliases: ['find', 'ff'] },
  { name: 'Neotree', desc: ['Mostrar / ocultar explorador', 'Toggle file explorer'], aliases: ['tree', 'Ex', 'NvimTreeToggle'] },
  { name: 'colorscheme', desc: ['Cambiar sabor de catppuccin', 'Change catppuccin flavor'], aliases: ['colo'], arg: 'flavor' },
  { name: 'lang', desc: ['Idioma · es / en', 'Language · en / es'], aliases: ['language', 'idioma'], arg: 'lang' },
  { name: 'set', desc: ['number · relativenumber · wrap', 'number · relativenumber · wrap'], arg: 'option' },
  { name: 'bnext', desc: ['Buffer siguiente', 'Next buffer'], aliases: ['bn'] },
  { name: 'bprevious', desc: ['Buffer anterior', 'Previous buffer'], aliases: ['bp'] },
  { name: 'bdelete', desc: ['Cerrar buffer', 'Close buffer'], aliases: ['bd'] },
  { name: 'cv', desc: ['Descargar el CV', 'Download the CV'], aliases: ['resume'] },
  { name: 'nohlsearch', desc: ['Quitar resaltado de búsqueda', 'Clear search highlight'], aliases: ['noh'] },
  { name: 'Dashboard', desc: ['Pantalla de inicio', 'Start screen'], aliases: ['home', 'inicio', 'Alpha'] },
  { name: 'quit', desc: ['Cerrar buffer actual', 'Close current buffer'], aliases: ['q'] },
]

export const SET_OPTIONS = [
  'number', 'nonumber', 'number!',
  'relativenumber', 'norelativenumber', 'relativenumber!',
  'wrap', 'nowrap', 'wrap!',
]

export function resolveCommand(name) {
  const n = name.toLowerCase()
  return COMMANDS.find((c) => c.name.toLowerCase() === n || c.aliases?.some((a) => a.toLowerCase() === n))
}

// Devuelve [{ value, label, desc }] para el input actual de la cmdline
export function complete(input, lang = 'es') {
  const li = lang === 'en' ? 1 : 0
  const m = input.match(/^(\S*)(\s+)(.*)$/)
  if (!m) {
    const q = input.toLowerCase()
    return COMMANDS.filter(
      (c) => c.name.toLowerCase().startsWith(q) || c.aliases?.some((a) => a.toLowerCase().startsWith(q) && q),
    ).map((c) => ({ value: c.name, label: c.name, desc: c.desc[li], kind: 'cmd' }))
  }
  const [, cmdName, , arg] = m
  const cmd = resolveCommand(cmdName)
  if (!cmd?.arg) return []
  const q = arg.toLowerCase()
  let opts = []
  if (cmd.arg === 'file') {
    opts = Object.values(BUFFERS).map((b) => ({ v: b.path, desc: b.ft, kind: 'file', ft: b.ft }))
  } else if (cmd.arg === 'flavor') {
    opts = FLAVORS.map((f) => ({ v: `catppuccin-${f}`, desc: 'colorscheme', kind: 'flavor' }))
  } else if (cmd.arg === 'lang') {
    opts = [
      { v: 'es', desc: 'español', kind: 'opt' },
      { v: 'en', desc: 'English', kind: 'opt' },
    ]
  } else if (cmd.arg === 'option') {
    opts = SET_OPTIONS.map((o) => ({ v: o, desc: 'option', kind: 'opt' }))
  }
  return opts
    .filter((o) => o.v.toLowerCase().includes(q))
    .map((o) => ({ value: `${cmdName} ${o.v}`, label: o.v, desc: o.desc, kind: o.kind, ft: o.ft }))
}

// Fuzzy match sencillo estilo fzf: subsecuencia + bonus por contigüidad
export function fuzzy(query, text) {
  if (!query) return { score: 0, idx: [] }
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  let ti = 0
  let score = 0
  let streak = 0
  const idx = []
  for (const ch of q) {
    if (ch === ' ') continue
    const found = t.indexOf(ch, ti)
    if (found === -1) return null
    streak = found === ti ? streak + 1 : 0
    score += 1 + streak * 2 + (found === 0 || '/._-'.includes(t[found - 1]) ? 3 : 0)
    idx.push(found)
    ti = found + 1
  }
  return { score: score - t.length * 0.05, idx }
}
