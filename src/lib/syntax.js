// Grupos de resaltado inspirados en catppuccin/nvim
export const hl = {
  text: 'text-ctp-text',
  sub: 'text-ctp-subtext0',
  muted: 'text-ctp-overlay1',
  dim: 'text-ctp-surface2',
  comment: 'text-ctp-overlay2 italic',
  bold: 'text-ctp-text font-bold',
  h1: 'text-ctp-red font-bold',
  h2: 'text-ctp-peach font-bold',
  h3: 'text-ctp-yellow font-bold',
  h4: 'text-ctp-green font-bold',
  list: 'text-ctp-teal',
  quote: 'text-ctp-subtext0 italic',
  quoteBar: 'text-ctp-overlay0',
  code: 'text-ctp-green bg-ctp-surface0/70 rounded-sm px-0.5',
  linkLabel: 'text-ctp-lavender underline decoration-ctp-lavender/40 underline-offset-2',
  url: 'text-ctp-rosewater underline decoration-ctp-rosewater/40 underline-offset-2',
  kw: 'text-ctp-mauve',
  str: 'text-ctp-green',
  num: 'text-ctp-peach',
  bool: 'text-ctp-peach',
  fn: 'text-ctp-blue',
  field: 'text-ctp-lavender',
  prop: 'text-ctp-blue',
  punct: 'text-ctp-overlay2',
  op: 'text-ctp-sky',
  variable: 'text-ctp-flamingo',
  builtin: 'text-ctp-red',
  tag: 'text-ctp-teal',
  key: 'text-ctp-peach',
  cmd: 'text-ctp-yellow',
  guide: 'text-ctp-surface1',
}

// segmento: { t: texto, c: clases, href?: url externa, open?: id de buffer, cmd?: comando }
export const s = (t, c = hl.text, extra = {}) => ({ t, c, ...extra })

// línea: { segs, action?, cls?, hang?, nowrap?, right? }
export const L = (segs = [], opts = {}) => {
  const line = { segs, ...opts }
  if (!line.action) {
    const target = segs.find((x) => x.href || x.open || x.cmd)
    if (target) line.action = segAction(target)
  }
  return line
}

export const blank = () => ({ segs: [] })

export function segAction(seg) {
  if (seg.href) return { type: 'link', href: seg.href }
  if (seg.open) return { type: 'open', id: seg.open }
  if (seg.cmd) return { type: 'cmd', cmd: seg.cmd }
  return null
}

const isExternal = (url) => /^(https?:|mailto:)/.test(url)

// Mini-parser markdown inline: **negrita**, `código`, [enlace](url), *cursiva*
export function md(text, base = hl.text) {
  const re = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*(.+?)\*/g
  const out = []
  let last = 0
  let m
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(s(text.slice(last, m.index), base))
    if (m[1]) out.push(s(m[1], hl.bold))
    else if (m[2]) out.push(s(m[2], hl.code))
    else if (m[3]) out.push(s(m[3], hl.linkLabel, isExternal(m[4]) ? { href: m[4] } : { open: m[4] }))
    else if (m[5]) out.push(s(m[5], `${base} italic`))
    last = re.lastIndex
  }
  if (last < text.length) out.push(s(text.slice(last), base))
  return out
}

// ── Bloques markdown ────────────────────────────────────────────────
const H_CLS = { 1: hl.h1, 2: hl.h2, 3: hl.h3, 4: hl.h4 }
const H_BG = { 1: 'bg-ctp-red/10', 2: 'bg-ctp-peach/8', 3: '', 4: '' }

export const h = (level, text, opts = {}) =>
  L([s(`${'#'.repeat(level)} `, H_CLS[level]), ...md(text, H_CLS[level])], { cls: H_BG[level], ...opts })

export const p = (text) => L(md(text))

export const li = (text, marker = '-', indent = 0) => {
  const pad = ' '.repeat(indent)
  return L([s(`${pad}${marker} `, hl.list), ...md(text)], { hang: indent + marker.length + 1 })
}

export const quote = (text) => L([s('▌ ', hl.quoteBar), ...md(text, hl.quote)], { hang: 2 })

export const hr = (char = '─', c = hl.dim) => L([s(char.repeat(240), c)], { nowrap: true })
