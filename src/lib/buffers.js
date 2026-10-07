import * as esData from '../data/portfolio'
import * as enData from '../data/portfolio.en'
import { hl, s, L, blank, md, h, p, li, quote, hr } from './syntax'

const STATUS_CLS = {
  activo: 'text-ctp-green',
  active: 'text-ctp-green',
  terminado: 'text-ctp-blue',
  done: 'text-ctp-blue',
  completado: 'text-ctp-green',
  completed: 'text-ctp-green',
  'en curso': 'text-ctp-yellow',
  'in progress': 'text-ctp-yellow',
  planeado: 'text-ctp-overlay1',
  planned: 'text-ctp-overlay1',
}
const STATUS_ICON = {
  completado: '✓', completed: '✓', 'en curso': '◐', 'in progress': '◐', planeado: '○', planned: '○',
  activo: '●', active: '●', terminado: '✓', done: '✓',
}

// textos fijos de los "archivos" en cada idioma
const TEXT = {
  es: {
    open: 'abrir', openProject: 'abrir proyecto', openLink: 'abrir enlace', run: 'ejecutar', downloadCv: 'descargar CV',
    aboutMe: 'Sobre mí', lookingFor: 'Qué busco', now: 'Ahora mismo', interests: 'Intereses',
    navAbout: [['→ experiencia', 'experience'], ['proyectos', 'projects'], ['skills', 'skills'], ['certificaciones', 'certs'], ['contacto', 'contact']],
    present: 'presente', tagOngoing: 'tag: en curso', toProjects: 'proyectos →', toExperience: '← experiencia',
    projects: 'Proyectos', projectsHint: (n) => `${n} proyectos · pulsa \`<Enter>\` o haz click para abrir uno`,
    status: 'Estado: ', year: '    Año: ', description: 'Descripción', results: 'Resultados', links: 'Enlaces', index: 'índice',
    skillsComment: '-- stack técnico, agrupado por área', learning: '"siempre aprendiendo: "',
    certsComment: '# formación, certificaciones e idiomas',
    contactTitle: '¿hablamos?', contactHint: '# <Enter> o click sobre una línea para abrir el enlace',
    cvOnRequest: '"CV disponible bajo petición"', thanks: '"Gracias por pasarte 👋"',
  },
  en: {
    open: 'open', openProject: 'open project', openLink: 'open link', run: 'run', downloadCv: 'download CV',
    aboutMe: 'About me', lookingFor: "What I'm looking for", now: 'Right now', interests: 'Interests',
    navAbout: [['→ experience', 'experience'], ['projects', 'projects'], ['skills', 'skills'], ['certifications', 'certs'], ['contact', 'contact']],
    present: 'present', tagOngoing: 'tag: ongoing', toProjects: 'projects →', toExperience: '← experience',
    projects: 'Projects', projectsHint: (n) => `${n} projects · press \`<Enter>\` or click to open one`,
    status: 'Status: ', year: '    Year: ', description: 'Description', results: 'Results', links: 'Links', index: 'index',
    skillsComment: '-- tech stack, grouped by area', learning: '"always learning: "',
    certsComment: '# education, certifications and languages',
    contactTitle: "let's talk", contactHint: '# <Enter> or click on a line to open the link',
    cvOnRequest: '"CV available on request"', thanks: '"Thanks for stopping by 👋"',
  },
}

// datos e idioma activos mientras se construyen los buffers (ver buildBuffers)
let profile, experience, projects, skills, education, certifications, languages, contact, T, LANG

const pad = (str, n) => str + ' '.repeat(Math.max(0, n - str.length))
const num2 = (n) => String(n).padStart(2, '0')

const tags = (list) =>
  list.flatMap((t, i) => [...(i ? [s(' ', hl.text)] : []), s(t, hl.code)])

const nav = (links) =>
  L(
    links.flatMap(([label, id], i) => [
      ...(i ? [s('  ·  ', hl.dim)] : []),
      s(label, hl.linkLabel, { open: id }),
    ]),
    { hint: T.open },
  )

// ── about.md ────────────────────────────────────────────────────────
function about() {
  return [
    h(1, 'whoami'),
    blank(),
    quote(`**${profile.fullName}** — ${profile.role}`),
    quote(profile.tagline),
    blank(),
    L([s('● ', 'text-ctp-green animate-pulse'), s(profile.status, 'text-ctp-green')], { hang: 2 }),
    L([s('⌖ ', hl.muted), s(profile.location, hl.sub)], { hang: 2 }),
    blank(),
    h(2, T.aboutMe),
    blank(),
    ...profile.about.flatMap((para, i) => [...(i ? [blank()] : []), p(para)]),
    blank(),
    h(2, T.lookingFor),
    blank(),
    ...profile.lookingFor.map((x) => li(x)),
    blank(),
    h(2, T.now),
    blank(),
    ...profile.now.map((x) => li(x, '- [ ]')),
    blank(),
    h(2, T.interests),
    blank(),
    L(tags(profile.interests)),
    blank(),
    hr(),
    nav(T.navAbout),
  ]
}

// ── experience.log (estilo git log --graph) ─────────────────────
const fakeHash = (str) => {
  let h = 2166136261
  for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

function experienceLog() {
  const graph = 'text-ctp-red'
  const lines = [L([s(`$ git log --graph --author="${profile.fullName}"`, hl.comment)]), blank()]
  experience.forEach((job, i) => {
    const last = i === experience.length - 1
    const bar = last ? '  ' : '│ '
    lines.push(
      L(
        [
          s('* ', `${graph} font-bold`),
          s(`commit ${fakeHash(job.role + job.company)}`, hl.cmd),
          ...(i === 0
            ? [s(' (', hl.cmd), s('HEAD -> ', 'text-ctp-sky font-bold'), s('main', 'text-ctp-green font-bold'), s(')', hl.cmd)]
            : []),
          ...(job.dates.includes(T.present) ? [s(' (', hl.cmd), s(T.tagOngoing, 'text-ctp-peach font-bold'), s(')', hl.cmd)] : []),
        ],
        { hang: 2 },
      ),
    )
    lines.push(L([s(bar, graph), s('Company: ', hl.muted), s(job.company, 'text-ctp-mauve')], { hang: 2 }))
    lines.push(L([s(bar, graph), s('Date:    ', hl.muted), s(job.dates, hl.num)], { hang: 2 }))
    lines.push(L([s(bar, graph)]))
    lines.push(L([s(bar, graph), s('    '), s(job.role, hl.bold)], { hang: 6 }))
    lines.push(L([s(bar, graph)]))
    job.bullets.forEach((b) => lines.push(L([s(bar, graph), s('    - ', hl.list), ...md(b)], { hang: 8 })))
    lines.push(L([s(last ? '' : '│', graph)]))
  })
  lines.push(hr())
  lines.push(nav([['← about', 'about'], [T.toProjects, 'projects']]))
  return lines
}

// ── projects.md ─────────────────────────────────────────────────────
function projectsIndex() {
  const lines = [
    h(1, T.projects),
    blank(),
    quote(T.projectsHint(projects.length)),
    blank(),
  ]
  projects.forEach((pr, i) => {
    lines.push(
      L(
        [
          s('## ', hl.h2),
          s(`${num2(i + 1)} `, hl.muted),
          s(pr.title, `${hl.h2} underline decoration-transparent hover:decoration-ctp-peach/60 underline-offset-4`, {
            open: `projects/${pr.slug}`,
          }),
          s('  '),
          s(`${STATUS_ICON[pr.status] ?? '●'} ${pr.status}`, STATUS_CLS[pr.status] ?? hl.muted),
          s(` · ${pr.year}`, hl.muted),
        ],
        { hint: T.openProject },
      ),
    )
    lines.push(L([s('   '), ...md(pr.summary, hl.sub)], { hang: 3 }))
    lines.push(L([s('   '), ...tags(pr.stack)], { hang: 3 }))
    lines.push(blank())
  })
  lines.push(hr())
  lines.push(nav([[T.toExperience, 'experience'], ['skills →', 'skills']]))
  return lines
}

// ── projects/<slug>.md ──────────────────────────────────────────────
function projectPage(pr, i) {
  const prev = projects[i - 1]
  const next = projects[i + 1]
  return [
    h(1, pr.title),
    blank(),
    quote(pr.summary),
    blank(),
    L([
      s(T.status, hl.bold),
      s(`${STATUS_ICON[pr.status] ?? '●'} ${pr.status}`, STATUS_CLS[pr.status] ?? hl.muted),
      s(T.year, hl.bold),
      s(String(pr.year), hl.num),
    ]),
    L([s('Stack:  ', hl.bold), ...tags(pr.stack)], { hang: 8 }),
    blank(),
    h(2, T.description),
    blank(),
    ...pr.description.flatMap((para, j) => [...(j ? [blank()] : []), p(para)]),
    blank(),
    h(2, T.results),
    blank(),
    ...pr.highlights.map((x) => li(x)),
    blank(),
    h(2, T.links),
    blank(),
    ...pr.links.map((l) =>
      L([s('- ', hl.list), s(`${l.label}: `, hl.text), s(l.href, hl.url, { href: l.href })], {
        hang: 2,
        hint: T.openLink,
      }),
    ),
    blank(),
    hr(),
    nav([
      ...(prev ? [[`← ${prev.title}`, `projects/${prev.slug}`]] : []),
      [T.index, 'projects'],
      ...(next ? [[`${next.title} →`, `projects/${next.slug}`]] : []),
    ]),
  ]
}

// ── skills.lua ──────────────────────────────────────────────────────
const GROUP_COLORS = ['text-ctp-blue', 'text-ctp-red', 'text-ctp-mauve', 'text-ctp-yellow', 'text-ctp-teal', 'text-ctp-pink']

function skillsLua() {
  const lines = [
    L([s(`-- ~/${profile.handle}/skills.lua`, hl.comment)]),
    L([s(T.skillsComment, hl.comment)]),
    blank(),
    L([s('local ', hl.kw), s('M', hl.text), s(' = ', hl.op), s('{}', hl.punct)]),
    blank(),
  ]
  skills.forEach((group, gi) => {
    const color = GROUP_COLORS[gi % GROUP_COLORS.length]
    lines.push(
      L([
        s('M', hl.text),
        s('.', hl.punct),
        s(group.key, hl.field),
        s(' = ', hl.op),
        s('{', hl.punct),
        s(`  -- ${group.items.length} `, hl.comment),
        s('●', color),
      ]),
    )
    group.items.forEach((item) => {
      lines.push(L([s('│ ', hl.guide), s(`"${item}"`, hl.str), s(',', hl.punct)], { hang: 2 }))
    })
    lines.push(L([s('}', hl.punct)]))
    lines.push(blank())
  })
  lines.push(
    L([s('function ', hl.kw), s('M', hl.text), s('.', hl.punct), s('learn', hl.fn), s('(', hl.punct), s('topic', hl.variable), s(')', hl.punct)]),
  )
  lines.push(L([s('│ ', hl.guide), s('return ', hl.kw), s(T.learning, hl.str), s(' .. ', hl.op), s('topic', hl.variable)]))
  lines.push(L([s('end', hl.kw)]))
  lines.push(blank())
  lines.push(L([s('return ', hl.kw), s('M', hl.text)]))
  return lines
}

// ── certs.yaml ──────────────────────────────────────────────────────
const yk = (indent, key, value, valueCls = hl.str, extra = []) =>
  L([s(' '.repeat(indent)), s(key, hl.prop), s(': ', hl.punct), ...(value !== undefined ? [s(value, valueCls)] : []), ...extra])

const yItem = (key, value, valueCls = hl.str) =>
  L([s('  '), s('- ', hl.punct), s(key, hl.prop), s(': ', hl.punct), s(value, valueCls)], { hang: 4 })

function certsYaml() {
  const lines = [
    L([s(`# ~/${profile.handle}/certs.yaml`, hl.comment)]),
    L([s(T.certsComment, hl.comment)]),
    blank(),
    L([s('---', hl.punct)]),
    yk(0, 'education'),
  ]
  education.forEach((e) => {
    lines.push(yItem('title', `"${e.title}"`))
    lines.push(yk(4, 'center', e.center))
    lines.push(yk(4, 'years', `"${e.years}"`))
    if (e.note) lines.push(L([s('    '), s('# ', hl.comment), s(e.note, hl.comment)], { hang: 6 }))
  })
  lines.push(blank())
  lines.push(yk(0, 'certifications'))
  certifications.forEach((c) => {
    lines.push(yItem('name', `"${c.name}"`))
    lines.push(yk(4, 'issuer', c.issuer))
    lines.push(yk(4, 'date', `"${c.year}"`, hl.str))
    lines.push(
      yk(4, 'status', c.status, STATUS_CLS[c.status] ?? hl.str, [s(`  # ${STATUS_ICON[c.status] ?? ''}`, hl.comment)]),
    )
    if (c.note) lines.push(L([s('    '), s('# ', hl.comment), s(c.note, hl.comment)], { hang: 6 }))
  })
  lines.push(blank())
  lines.push(yk(0, 'languages'))
  languages.forEach((l) => lines.push(yItem(l.name.toLowerCase(), l.level)))
  lines.push(blank())
  lines.push(yk(0, 'always_learning', 'true', hl.bool))
  return lines
}

// ── contact.sh ──────────────────────────────────────────────────────
function contactSh() {
  const width = Math.max(...contact.map((c) => c.key.length))
  const lines = [
    L([s('#!/usr/bin/env bash', hl.comment)]),
    L([s(`# ~/${profile.handle}/contact.sh — ${T.contactTitle}`, hl.comment)]),
    L([s(T.contactHint, hl.comment)]),
    blank(),
    L([s('set ', hl.builtin), s('-euo pipefail', hl.text)]),
    blank(),
  ]
  contact.forEach((c) => {
    lines.push(
      L(
        [
          s('readonly ', hl.kw),
          s(pad(c.key, width), hl.variable),
          s('=', hl.op),
          s(`"${c.value}"`, c.href ? `${hl.str} hover:underline underline-offset-2` : hl.str, c.href ? { href: c.href } : {}),
        ],
        { hint: c.href ? T.open : undefined, nowrap: true },
      ),
    )
  })
  lines.push(blank())
  lines.push(L([s('status', hl.fn), s('() {', hl.punct)]))
  lines.push(L([s('│ ', hl.guide), s('echo ', hl.builtin), s(`"${profile.status}"`, hl.str)], { hang: 7 }))
  lines.push(L([s('│ ', hl.guide), s('echo ', hl.builtin), s(`"${profile.location}"`, hl.str)], { hang: 7 }))
  lines.push(L([s('}', hl.punct)]))
  lines.push(blank())
  lines.push(L([s('cv', hl.fn), s('() {', hl.punct)]))
  if (profile.cv) {
    lines.push(L([s('│ ', hl.guide), s('curl ', hl.builtin), s('-O ', hl.text), s(profile.cv, hl.url, { href: profile.cv })], { hint: T.downloadCv }))
  } else {
    lines.push(L([s('│ ', hl.guide), s('echo ', hl.builtin), s(T.cvOnRequest, hl.str)]))
  }
  lines.push(L([s('}', hl.punct)]))
  lines.push(blank())
  lines.push(L([s('status', hl.fn), s(' && ', hl.op), s('echo ', hl.builtin), s(T.thanks, hl.str)]))
  return lines
}

// ── help.txt ────────────────────────────────────────────────────────
const helpRule = () => hr('=', hl.muted)
const helpSection = (title, tag) =>
  L([s(title, 'text-ctp-blue font-bold')], { right: [s(`*${tag}*`, hl.tag)] })
const helpCmd = (cmd, desc, run = cmd) =>
  L([s(pad(`:${cmd}`, 22), hl.cmd, { cmd: run }), s(desc, hl.text)], { hang: 22, hint: T.run })
const helpKey = (keys, desc) => L([s(pad(keys, 22), hl.key), s(desc, hl.text)], { hang: 22 })

const HELP = {
  es: {
    title: (n) => `PORTAFOLIO DE ${n} — MANUAL DE USO`,
    intro: '1. INTRODUCCIÓN',
    introText: 'Este portafolio funciona como **Neovim**. Escribe `:` seguido de un comando y pulsa `<Enter>`. ¿No usas Vim? No pasa nada: todo es clicable.',
    commands: '2. COMANDOS',
    cmds: [
      ['about', 'Quién soy'],
      ['experience', 'Experiencia laboral (git log)'],
      ['projects', 'Lista de proyectos'],
      ['skills', 'Habilidades técnicas'],
      ['certs', 'Formación y certificaciones'],
      ['contact', 'Cómo contactarme'],
      ['e {archivo}', 'Abrir un archivo (con <Tab> autocompleta)', 'Telescope'],
      ['Telescope', 'Buscador difuso de archivos'],
      ['Neotree', 'Mostrar / ocultar el explorador'],
      ['colorscheme {sabor}', 'mocha · macchiato · frappe · latte', 'colorscheme catppuccin-latte'],
      ['lang {es|en}', 'Cambiar idioma / switch to English', 'lang en'],
      ['set nu / rnu / wrap', 'Opciones del editor', 'set relativenumber!'],
      ['bn / bp / bd', 'Buffer siguiente / anterior / cerrar', 'bn'],
      ['cv', 'Descargar el CV'],
      ['Dashboard', 'Volver a la pantalla de inicio'],
      ['q', 'Cerrar el buffer actual'],
    ],
    mappings: '3. ATAJOS (modo NORMAL)',
    keys: [
      ['j / k', 'Bajar / subir una línea (admite cuenta: 5j)'],
      ['gg / G', 'Ir al principio / al final'],
      ['<C-d> / <C-u>', 'Media página abajo / arriba'],
      ['<CR>', 'Abrir el enlace o archivo de la línea'],
      ['H / L', 'Buffer anterior / siguiente'],
      ['/  n  N', 'Buscar en el buffer y saltar entre resultados'],
      ['<Space>', 'Menú de atajos (which-key)'],
      ['<C-p>  <Space>ff', 'Telescope'],
      ['<C-n>  <Space>e', 'Explorador de archivos'],
      ['?', 'Esta ayuda'],
      ['<Esc>', 'Cancelar / cerrar ventanas flotantes'],
    ],
  },
  en: {
    title: (n) => `${n}'S PORTFOLIO — USER MANUAL`,
    intro: '1. INTRODUCTION',
    introText: "This portfolio works like **Neovim**. Type `:` followed by a command and press `<Enter>`. Don't use Vim? No problem: everything is clickable.",
    commands: '2. COMMANDS',
    cmds: [
      ['about', 'Who I am'],
      ['experience', 'Work experience (git log)'],
      ['projects', 'Project list'],
      ['skills', 'Technical skills'],
      ['certs', 'Education and certifications'],
      ['contact', 'How to reach me'],
      ['e {file}', 'Open a file (<Tab> autocompletes)', 'Telescope'],
      ['Telescope', 'Fuzzy file finder'],
      ['Neotree', 'Show / hide the file explorer'],
      ['colorscheme {flavor}', 'mocha · macchiato · frappe · latte', 'colorscheme catppuccin-latte'],
      ['lang {en|es}', 'Switch language / cambiar a español', 'lang es'],
      ['set nu / rnu / wrap', 'Editor options', 'set relativenumber!'],
      ['bn / bp / bd', 'Next / previous / close buffer', 'bn'],
      ['cv', 'Download the CV'],
      ['Dashboard', 'Back to the start screen'],
      ['q', 'Close the current buffer'],
    ],
    mappings: '3. KEYMAPS (NORMAL mode)',
    keys: [
      ['j / k', 'Move down / up one line (counts work: 5j)'],
      ['gg / G', 'Go to top / bottom'],
      ['<C-d> / <C-u>', 'Half page down / up'],
      ['<CR>', 'Open the link or file on the line'],
      ['H / L', 'Previous / next buffer'],
      ['/  n  N', 'Search the buffer and jump between matches'],
      ['<Space>', 'Keymap menu (which-key)'],
      ['<C-p>  <Space>ff', 'Telescope'],
      ['<C-n>  <Space>e', 'File explorer'],
      ['?', 'This help'],
      ['<Esc>', 'Cancel / close floating windows'],
    ],
  },
}

function helpTxt() {
  const H = HELP[LANG]
  return [
    L([s('*portfolio.txt*', hl.tag)], { right: [s('Neovim · catppuccin', hl.muted)] }),
    blank(),
    L([s(H.title(profile.name.toUpperCase()), 'text-ctp-mauve font-bold')]),
    blank(),
    helpRule(),
    helpSection(H.intro, 'intro'),
    blank(),
    p(H.introText),
    blank(),
    helpRule(),
    helpSection(H.commands, 'commands'),
    blank(),
    ...H.cmds.map(([cmd, desc, run]) => helpCmd(cmd, desc, run)),
    blank(),
    helpRule(),
    helpSection(H.mappings, 'mappings'),
    blank(),
    ...H.keys.map(([k, desc]) => helpKey(k, desc)),
    blank(),
    helpRule(),
    L([s(' vim:tw=78:ts=8:ft=help:norl:', hl.muted)]),
  ]
}

// ── Registro de buffers ─────────────────────────────────────────────
export function buildBuffers(lang = 'es') {
  const d = lang === 'en' ? enData : esData
  ;({ profile, experience, projects, skills, education, certifications, languages, contact } = d)
  T = TEXT[lang]
  LANG = lang
  const list = [
    { id: 'about', path: 'about.md', ft: 'markdown', lines: about() },
    { id: 'experience', path: 'experience.log', ft: 'git', lines: experienceLog() },
    { id: 'projects', path: 'projects.md', ft: 'markdown', lines: projectsIndex() },
    ...projects.map((pr, i) => ({
      id: `projects/${pr.slug}`,
      path: `projects/${pr.slug}.md`,
      ft: 'markdown',
      title: pr.title,
      lines: projectPage(pr, i),
    })),
    { id: 'skills', path: 'skills.lua', ft: 'lua', lines: skillsLua() },
    { id: 'certs', path: 'certs.yaml', ft: 'yaml', lines: certsYaml() },
    { id: 'contact', path: 'contact.sh', ft: 'sh', lines: contactSh() },
    { id: 'help', path: 'help.txt', ft: 'help', lines: helpTxt() },
  ]
  const byId = {}
  for (const b of list) {
    b.name = b.path.split('/').pop()
    b.bytes = b.lines.reduce((acc, l) => acc + l.segs.reduce((a, x) => a + x.t.length, 0) + 1, 0)
    byId[b.id] = b
  }
  return byId
}

// los ids y rutas son iguales en ambos idiomas; solo cambia el contenido
export const BUFFERS_BY_LANG = { es: buildBuffers('es'), en: buildBuffers('en') }
export const BUFFERS = BUFFERS_BY_LANG.es
export const BUFFER_IDS = Object.keys(BUFFERS)

// Resuelve "about", "about.md", "projects/pyscan", "pyscan.md"…
export function resolveBuffer(input) {
  if (!input) return null
  const q = input.trim().replace(/^\.?\/?/, '').replace(/^~\/[^/]+\//, '').toLowerCase()
  for (const b of Object.values(BUFFERS)) {
    if (b.id.toLowerCase() === q || b.path.toLowerCase() === q || b.name.toLowerCase() === q) return b.id
    if (b.id.startsWith('projects/') && b.id.slice(9) === q) return b.id
  }
  return null
}
