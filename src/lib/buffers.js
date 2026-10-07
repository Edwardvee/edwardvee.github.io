import { profile, experience, projects, skills, education, certifications, languages, contact } from '../data/portfolio'
import { hl, s, L, blank, md, h, p, li, quote, hr } from './syntax'

const STATUS_CLS = {
  activo: 'text-ctp-green',
  terminado: 'text-ctp-blue',
  completado: 'text-ctp-green',
  'en curso': 'text-ctp-yellow',
  planeado: 'text-ctp-overlay1',
}
const STATUS_ICON = { completado: '✓', 'en curso': '◐', planeado: '○', activo: '●', terminado: '✓' }

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
    { hint: 'abrir' },
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
    h(2, 'Sobre mí'),
    blank(),
    ...profile.about.flatMap((para, i) => [...(i ? [blank()] : []), p(para)]),
    blank(),
    h(2, 'Qué busco'),
    blank(),
    ...profile.lookingFor.map((x) => li(x)),
    blank(),
    h(2, 'Ahora mismo'),
    blank(),
    ...profile.now.map((x) => li(x, '- [ ]')),
    blank(),
    h(2, 'Intereses'),
    blank(),
    L(tags(profile.interests)),
    blank(),
    hr(),
    nav([
      ['→ experiencia', 'experience'],
      ['proyectos', 'projects'],
      ['skills', 'skills'],
      ['certificaciones', 'certs'],
      ['contacto', 'contact'],
    ]),
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
          ...(job.dates.includes('presente') ? [s(' (', hl.cmd), s('tag: en curso', 'text-ctp-peach font-bold'), s(')', hl.cmd)] : []),
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
  lines.push(nav([['← about', 'about'], ['proyectos →', 'projects']]))
  return lines
}

// ── projects.md ─────────────────────────────────────────────────────
function projectsIndex() {
  const lines = [
    h(1, 'Proyectos'),
    blank(),
    quote(`${projects.length} proyectos · pulsa \`<Enter>\` o haz click para abrir uno`),
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
        { hint: 'abrir proyecto' },
      ),
    )
    lines.push(L([s('   '), ...md(pr.summary, hl.sub)], { hang: 3 }))
    lines.push(L([s('   '), ...tags(pr.stack)], { hang: 3 }))
    lines.push(blank())
  })
  lines.push(hr())
  lines.push(nav([['← experiencia', 'experience'], ['skills →', 'skills']]))
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
      s('Estado: ', hl.bold),
      s(`${STATUS_ICON[pr.status] ?? '●'} ${pr.status}`, STATUS_CLS[pr.status] ?? hl.muted),
      s('    Año: ', hl.bold),
      s(String(pr.year), hl.num),
    ]),
    L([s('Stack:  ', hl.bold), ...tags(pr.stack)], { hang: 8 }),
    blank(),
    h(2, 'Descripción'),
    blank(),
    ...pr.description.flatMap((para, j) => [...(j ? [blank()] : []), p(para)]),
    blank(),
    h(2, 'Resultados'),
    blank(),
    ...pr.highlights.map((x) => li(x)),
    blank(),
    h(2, 'Enlaces'),
    blank(),
    ...pr.links.map((l) =>
      L([s('- ', hl.list), s(`${l.label}: `, hl.text), s(l.href, hl.url, { href: l.href })], {
        hang: 2,
        hint: 'abrir enlace',
      }),
    ),
    blank(),
    hr(),
    nav([
      ...(prev ? [[`← ${prev.title}`, `projects/${prev.slug}`]] : []),
      ['índice', 'projects'],
      ...(next ? [[`${next.title} →`, `projects/${next.slug}`]] : []),
    ]),
  ]
}

// ── skills.lua ──────────────────────────────────────────────────────
const GROUP_COLORS = ['text-ctp-blue', 'text-ctp-red', 'text-ctp-mauve', 'text-ctp-yellow', 'text-ctp-teal', 'text-ctp-pink']

function skillsLua() {
  const lines = [
    L([s(`-- ~/${profile.handle}/skills.lua`, hl.comment)]),
    L([s('-- stack técnico, agrupado por área', hl.comment)]),
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
  lines.push(L([s('│ ', hl.guide), s('return ', hl.kw), s('"siempre aprendiendo: "', hl.str), s(' .. ', hl.op), s('topic', hl.variable)]))
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
    L([s('# formación, certificaciones e idiomas', hl.comment)]),
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
    L([s(`# ~/${profile.handle}/contact.sh — ¿hablamos?`, hl.comment)]),
    L([s('# <Enter> o click sobre una línea para abrir el enlace', hl.comment)]),
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
        { hint: c.href ? 'abrir' : undefined, nowrap: true },
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
    lines.push(L([s('│ ', hl.guide), s('curl ', hl.builtin), s('-O ', hl.text), s(profile.cv, hl.url, { href: profile.cv })], { hint: 'descargar CV' }))
  } else {
    lines.push(L([s('│ ', hl.guide), s('echo ', hl.builtin), s('"CV disponible bajo petición"', hl.str)]))
  }
  lines.push(L([s('}', hl.punct)]))
  lines.push(blank())
  lines.push(L([s('status', hl.fn), s(' && ', hl.op), s('echo ', hl.builtin), s('"Gracias por pasarte 👋"', hl.str)]))
  return lines
}

// ── help.txt ────────────────────────────────────────────────────────
const helpRule = () => hr('=', hl.muted)
const helpSection = (title, tag) =>
  L([s(title, 'text-ctp-blue font-bold')], { right: [s(`*${tag}*`, hl.tag)] })
const helpCmd = (cmd, desc, run = cmd) =>
  L([s(pad(`:${cmd}`, 22), hl.cmd, { cmd: run }), s(desc, hl.text)], { hang: 22, hint: 'ejecutar' })
const helpKey = (keys, desc) => L([s(pad(keys, 22), hl.key), s(desc, hl.text)], { hang: 22 })

function helpTxt() {
  return [
    L([s('*portfolio.txt*', hl.tag)], { right: [s('Para Neovim · catppuccin', hl.muted)] }),
    blank(),
    L([s(`PORTAFOLIO DE ${profile.name.toUpperCase()} — MANUAL DE USO`, 'text-ctp-mauve font-bold')]),
    blank(),
    helpRule(),
    helpSection('1. INTRODUCCIÓN', 'intro'),
    blank(),
    p('Este portafolio funciona como **Neovim**. Escribe `:` seguido de un comando y pulsa `<Enter>`. ¿No usas Vim? No pasa nada: todo es clicable.'),
    blank(),
    helpRule(),
    helpSection('2. COMANDOS', 'commands'),
    blank(),
    helpCmd('about', 'Quién soy'),
    helpCmd('experience', 'Experiencia laboral (git log)'),
    helpCmd('projects', 'Lista de proyectos'),
    helpCmd('skills', 'Habilidades técnicas'),
    helpCmd('certs', 'Formación y certificaciones'),
    helpCmd('contact', 'Cómo contactarme'),
    helpCmd('e {archivo}', 'Abrir un archivo (con <Tab> autocompleta)', 'Telescope'),
    helpCmd('Telescope', 'Buscador difuso de archivos'),
    helpCmd('Neotree', 'Mostrar / ocultar el explorador'),
    helpCmd('colorscheme {sabor}', 'mocha · macchiato · frappe · latte', 'colorscheme catppuccin-latte'),
    helpCmd('set nu / rnu / wrap', 'Opciones del editor', 'set relativenumber!'),
    helpCmd('bn / bp / bd', 'Buffer siguiente / anterior / cerrar', 'bn'),
    helpCmd('cv', 'Descargar el CV'),
    helpCmd('Dashboard', 'Volver a la pantalla de inicio'),
    helpCmd('q', 'Cerrar el buffer actual'),
    blank(),
    helpRule(),
    helpSection('3. ATAJOS (modo NORMAL)', 'mappings'),
    blank(),
    helpKey('j / k', 'Bajar / subir una línea (admite cuenta: 5j)'),
    helpKey('gg / G', 'Ir al principio / al final'),
    helpKey('<C-d> / <C-u>', 'Media página abajo / arriba'),
    helpKey('<CR>', 'Abrir el enlace o archivo de la línea'),
    helpKey('H / L', 'Buffer anterior / siguiente'),
    helpKey('/  n  N', 'Buscar en el buffer y saltar entre resultados'),
    helpKey('<Space>', 'Menú de atajos (which-key)'),
    helpKey('<C-p>  <Space>ff', 'Telescope'),
    helpKey('<C-n>  <Space>e', 'Explorador de archivos'),
    helpKey('?', 'Esta ayuda'),
    helpKey('<Esc>', 'Cancelar / cerrar ventanas flotantes'),
    blank(),
    helpRule(),
    L([s(' vim:tw=78:ts=8:ft=help:norl:', hl.muted)]),
  ]
}

// ── Registro de buffers ─────────────────────────────────────────────
export function buildBuffers() {
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

export const BUFFERS = buildBuffers()
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
