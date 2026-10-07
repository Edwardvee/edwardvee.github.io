import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { User, Briefcase, FolderGit2, Wrench, Award, Mail, Search, CircleHelp, Palette, ChevronRight, Terminal, Menu } from 'lucide-react'
import { profile } from './data/portfolio'
import { BUFFERS, BUFFERS_BY_LANG, resolveBuffer } from './lib/buffers'
import { FLAVORS, resolveCommand } from './lib/commands'
import Tabline from './components/Tabline'
import Sidebar from './components/Sidebar'
import Editor from './components/Editor'
import Dashboard from './components/Dashboard'
import Statusline from './components/Statusline'
import Cmdline from './components/Cmdline'
import Telescope from './components/Telescope'
import WhichKey from './components/WhichKey'
import Notifications from './components/Notifications'
import SecretPlayer from './components/SecretPlayer'
import { FileIcon } from './components/Icons'
import { LANGS, LangContext, UI, detectLang } from './i18n'

const DASH = 'dashboard'
const HALF_PAGE = 15
const startupMs = performance.now()

const store = {
  get(key, fallback) {
    try {
      return localStorage.getItem(key) ?? fallback
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch {
      /* modo privado */
    }
  },
}

const idFromHash = () => {
  const id = decodeURIComponent(window.location.hash.replace(/^#\/?/, ''))
  return BUFFERS[id] ? id : DASH
}

const lineText = (line) => line.segs.map((x) => x.t).join('')
const readonlyErr = "E21: Cannot make changes, 'modifiable' is off"

export default function App() {
  const initial = useRef(idFromHash()).current
  const [flavor, setFlavor] = useState(() => {
    const f = store.get('ctp-flavor', 'mocha')
    return FLAVORS.includes(f) ? f : 'mocha'
  })
  const [openIds, setOpenIds] = useState(initial === DASH ? [] : [initial])
  const [current, setCurrent] = useState(initial)
  const [cursors, setCursors] = useState({})
  const [mode, setMode] = useState('NORMAL') // NORMAL | COMMAND | SEARCH | INSERT (telescope)
  const [sidebar, setSidebar] = useState(() => window.innerWidth >= 1024)
  const [settings, setSettings] = useState({ number: true, relativenumber: true, wrap: true })
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [notes, setNotes] = useState([])
  const [leader, setLeader] = useState(null) // null | string[] (ruta en el árbol de which-key)
  const [pending, setPending] = useState('')
  const [dashSel, setDashSel] = useState(0)
  const [secret, setSecret] = useState(false)
  const [lang, setLang] = useState(detectLang)
  const t = UI[lang]
  const B = BUFFERS_BY_LANG[lang]
  const langRef = useRef(lang)
  langRef.current = lang
  const historyRef = useRef([])
  const pendingRef = useRef('')
  const noteId = useRef(0)

  const buffer = current === DASH ? null : B[current]
  const cursor = cursors[current] ?? 0

  // ── tema ──────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.dataset.flavor = flavor
    store.set('ctp-flavor', flavor)
    const base = getComputedStyle(document.documentElement).getPropertyValue('--ctp-base').trim()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', base)
  }, [flavor])

  // ── idioma ────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const switchLang = (next) => {
    setLang(next)
    store.set('lang', next)
    setMessage({ text: UI[next].langSwitched, level: 'info' })
  }

  // ── URL + título ─────────────────────────────────────────────────
  useEffect(() => {
    const hash = current === DASH ? '' : `#/${current}`
    if (window.location.hash !== hash) history.replaceState(null, '', hash || window.location.pathname)
    document.title = `${buffer ? buffer.name : 'dashboard'} - ${profile.name} · nvim`
  }, [current, buffer])

  // ── bienvenida ───────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(
      () => notify('info', UI[langRef.current].welcomeTitle, UI[langRef.current].welcome),
      700,
    )
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── utilidades ───────────────────────────────────────────────────
  const notify = useCallback((level, title, msg) => {
    const id = ++noteId.current
    setNotes((n) => [...n.slice(-3), { id, level, title, msg }])
    setTimeout(() => setNotes((n) => n.filter((x) => x.id !== id)), 4500)
  }, [])

  const echo = (text, level = 'info') => setMessage({ text, level })
  const err = (text) => echo(text, 'error')

  const setCursor = useCallback(
    (n) => {
      if (!buffer) return
      const max = buffer.lines.length - 1
      setCursors((c) => ({ ...c, [current]: Math.max(0, Math.min(max, n)) }))
    },
    [buffer, current],
  )

  const moveCursor = (delta) => {
    if (!buffer) return
    const max = buffer.lines.length - 1
    setCursors((c) => ({ ...c, [current]: Math.max(0, Math.min(max, (c[current] ?? 0) + delta)) }))
  }

  const openBuffer = useCallback((id) => {
    const b = BUFFERS_BY_LANG[langRef.current][id]
    if (!b) return
    setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
    setCurrent(id)
    setMessage({ text: `"${b.path}" [readonly] ${b.lines.length}L, ${b.bytes}B`, level: 'info' })
    if (window.innerWidth < 1024) setSidebar(false)
  }, [])

  const closeBuffer = useCallback(
    (id = current) => {
      if (id === DASH) return
      setOpenIds((ids) => {
        const idx = ids.indexOf(id)
        const next = ids.filter((x) => x !== id)
        if (id === current) setCurrent(next[Math.min(idx, next.length - 1)] ?? DASH)
        return next
      })
    },
    [current],
  )

  useEffect(() => {
    const onHash = () => {
      const id = idFromHash()
      if (id === DASH) setCurrent(DASH)
      else openBuffer(id)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [openBuffer])

  const cycleBuffer = (dir) => {
    if (!openIds.length) return err('E85: There is no listed buffer')
    const idx = openIds.indexOf(current)
    const next = openIds[(idx + dir + openIds.length) % openIds.length] ?? openIds[0]
    openBuffer(next)
  }

  const cycleFlavor = () => {
    const next = FLAVORS[(FLAVORS.indexOf(flavor) + 1) % FLAVORS.length]
    setFlavor(next)
    echo(`colorscheme catppuccin-${next}`)
  }

  const runAction = (a) => {
    if (!a) return
    if (a.type === 'open') openBuffer(a.id)
    else if (a.type === 'link') window.open(a.href, '_blank', 'noopener,noreferrer')
    else if (a.type === 'cmd') runCommand(a.cmd)
  }

  const findNext = (query, from, dir = 1) => {
    if (!buffer || !query) return
    const q = query.toLowerCase()
    const n = buffer.lines.length
    for (let step = 1; step <= n; step++) {
      const i = (from + dir * step + n * 2) % n
      if (lineText(buffer.lines[i]).toLowerCase().includes(q)) {
        if ((dir > 0 && i <= from) || (dir < 0 && i >= from)) echo(dir > 0 ? 'search hit BOTTOM, continuing at TOP' : 'search hit TOP, continuing at BOTTOM', 'warn')
        else echo(`${dir > 0 ? '/' : '?'}${query}`)
        return setCursor(i)
      }
    }
    err(`E486: Pattern not found: ${query}`)
  }

  // ── comandos ─────────────────────────────────────────────────────
  function runCommand(raw) {
    const input = raw.trim().replace(/^:+/, '')
    setMode('NORMAL')
    if (!input) return
    historyRef.current = [...historyRef.current.filter((h) => h !== input), input].slice(-50)

    if (/^\d+$/.test(input)) return setCursor(Number(input) - 1)
    if (input === '$') return setCursor(Infinity)

    const [head, ...rest] = input.split(/\s+/)
    const arg = rest.join(' ')
    const bang = head.endsWith('!')
    const name = head.replace(/!$/, '')
    const lower = name.toLowerCase()

    // easter eggs
    if (['w', 'write', 'wq', 'x', 'wqa', 'wa', 'xa'].includes(lower)) {
      if (bang) return notify('warn', t.readonlyTitle, t.readonlyBang)
      return err("E45: 'readonly' option is set (add ! to override)")
    }
    if (['qa', 'qall', 'quitall', 'exit'].includes(lower) || (bang && ['q', 'quit'].includes(lower)) || ((lower === 'q' || lower === 'quit') && current === DASH)) {
      return notify('info', t.quitTitle, t.quit)
    }
    if (lower === 'sudo') return notify('error', 'sudo', `${profile.handle} is not in the sudoers file. This incident will be reported. 🚨`)
    if (['nmap', 'hack', 'hydra', 'msfconsole'].includes(lower))
      return notify('warn', lower, t.scan)
    if (lower === 'rm') return notify('error', 'rm', t.rm)
    if (lower === 'clear' || lower === 'cls') return setMessage(null)
    if (lower === 'secret') {
      echo('🤫')
      return setSecret(true)
    }

    const cmd = resolveCommand(name)
    if (!cmd) return err(`E492: Not an editor command: ${input}`)

    switch (cmd.name) {
      case 'about':
      case 'experience':
      case 'projects':
      case 'skills':
      case 'certs':
      case 'contact':
      case 'help':
        return openBuffer(cmd.name)
      case 'edit': {
        if (!arg) return err('E32: No file name')
        const id = resolveBuffer(arg)
        return id ? openBuffer(id) : err(`E484: Can't open file ${arg}`)
      }
      case 'Telescope':
        return setMode('INSERT')
      case 'Neotree':
        if (/close/i.test(arg)) return setSidebar(false)
        return setSidebar((v) => !v)
      case 'colorscheme': {
        if (!arg) return echo(`catppuccin-${flavor}`)
        const f = arg.replace(/^catppuccin-?/i, '').toLowerCase() || 'mocha'
        const flav = f === 'frappé' ? 'frappe' : f
        if (!FLAVORS.includes(flav)) return err(`E185: Cannot find color scheme '${arg}'`)
        setFlavor(flav)
        return echo(`colorscheme catppuccin-${flav}`)
      }
      case 'lang': {
        if (!arg) return switchLang(lang === 'es' ? 'en' : 'es')
        const next = arg.toLowerCase().slice(0, 2)
        if (!LANGS.includes(next)) return err(`E474: Invalid argument: ${arg} (es | en)`)
        return switchLang(next)
      }
      case 'set': {
        const m = arg.match(/^(no)?(\w+)(!)?$/)
        const alias = { nu: 'number', number: 'number', rnu: 'relativenumber', relativenumber: 'relativenumber', wrap: 'wrap' }
        const opt = m && alias[m[2]]
        if (!opt) return err(`E518: Unknown option: ${arg || '(empty)'}`)
        setSettings((s) => ({ ...s, [opt]: m[3] ? !s[opt] : !m[1] }))
        return
      }
      case 'bnext':
        return cycleBuffer(1)
      case 'bprevious':
        return cycleBuffer(-1)
      case 'bdelete':
      case 'quit':
        return closeBuffer()
      case 'cv':
        if (profile.cv) return window.open(profile.cv, '_blank', 'noopener')
        return notify('info', 'CV', t.cvOnRequest)
      case 'nohlsearch':
        return setSearch('')
      case 'Dashboard':
        return setCurrent(DASH)
      default:
        return err(`E492: Not an editor command: ${input}`)
    }
  }

  const submitCmdline = (value) => {
    if (mode === 'SEARCH') {
      setMode('NORMAL')
      if (!value) return
      setSearch(value)
      return findNext(value, cursor, 1)
    }
    runCommand(value)
  }

  // ── dashboard ────────────────────────────────────────────────────
  const dashItems = useMemo(
    () => [
      { key: 'a', label: t.dash.about, icon: User, color: 'text-ctp-blue', run: () => openBuffer('about') },
      { key: 'x', label: t.dash.experience, icon: Briefcase, color: 'text-ctp-red', run: () => openBuffer('experience') },
      { key: 'p', label: t.dash.projects, icon: FolderGit2, color: 'text-ctp-peach', run: () => openBuffer('projects') },
      { key: 's', label: t.dash.skills, icon: Wrench, color: 'text-ctp-mauve', run: () => openBuffer('skills') },
      { key: 'e', label: t.dash.certs, icon: Award, color: 'text-ctp-yellow', run: () => openBuffer('certs') },
      { key: 'c', label: t.dash.contact, icon: Mail, color: 'text-ctp-green', run: () => openBuffer('contact') },
      { key: 'f', label: t.dash.find, icon: Search, color: 'text-ctp-sky', run: () => setMode('INSERT') },
      { key: 't', label: t.dash.theme, icon: Palette, color: 'text-ctp-pink', run: () => cycleFlavor() },
      { key: '?', label: t.dash.help, icon: CircleHelp, color: 'text-ctp-teal', run: () => openBuffer('help') },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [openBuffer, flavor, lang],
  )

  // ── which-key ────────────────────────────────────────────────────
  const lk = t.leader
  const leaderTree = {
    children: {
      e: { label: lk.explorer, run: () => setSidebar((v) => !v) },
      f: {
        label: lk.find,
        children: {
          f: { label: lk.findFiles, run: () => setMode('INSERT') },
          s: { label: lk.findBuffer, run: () => setMode('SEARCH') },
        },
      },
      a: { label: lk.about, run: () => openBuffer('about') },
      x: { label: lk.experience, run: () => openBuffer('experience') },
      p: { label: lk.projects, run: () => openBuffer('projects') },
      s: { label: lk.skills, run: () => openBuffer('skills') },
      t: { label: lk.certs, run: () => openBuffer('certs') },
      c: { label: lk.contact, run: () => openBuffer('contact') },
      b: {
        label: lk.buffer,
        children: {
          n: { label: lk.next, run: () => cycleBuffer(1) },
          p: { label: lk.prev, run: () => cycleBuffer(-1) },
          d: { label: lk.close, run: () => closeBuffer() },
        },
      },
      u: {
        label: lk.ui,
        children: {
          c: { label: lk.colorscheme, run: cycleFlavor },
          l: { label: lk.lang, run: () => switchLang(lang === 'es' ? 'en' : 'es') },
          n: { label: lk.relnum, run: () => setSettings((s) => ({ ...s, relativenumber: !s.relativenumber })) },
          w: { label: lk.wrap, run: () => setSettings((s) => ({ ...s, wrap: !s.wrap })) },
        },
      },
      l: { label: lk.lang, run: () => switchLang(lang === 'es' ? 'en' : 'es') },
      ':': { label: lk.cmdline, run: () => setMode('COMMAND') },
      h: { label: lk.dashboard, run: () => setCurrent(DASH) },
      '?': { label: lk.help, run: () => openBuffer('help') },
    },
  }
  const leaderNode = leader?.reduce((node, k) => node.children[k], leaderTree)

  const pressLeader = (k) => {
    const item = leaderNode?.children[k]
    if (!item) return setLeader(null)
    if (item.children) return setLeader([...leader, k])
    setLeader(null)
    item.run()
  }

  // ── teclado (modo NORMAL) ────────────────────────────────────────
  const setPend = (v) => {
    pendingRef.current = v
    setPending(v)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (secret) {
        if (e.key === 'Escape' || e.key === 'q') {
          e.preventDefault()
          setSecret(false)
        }
        return
      }
      if (mode !== 'NORMAL' || e.metaKey || e.altKey) return
      if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return
      const k = e.key

      if (leader) {
        e.preventDefault()
        if (k === 'Escape') return setLeader(null)
        if (k === 'Backspace') return setLeader(leader.length ? leader.slice(0, -1) : null)
        if (k.length === 1) pressLeader(k)
        return
      }

      if (e.ctrlKey) {
        const map = {
          p: () => setMode('INSERT'),
          n: () => setSidebar((v) => !v),
          d: () => moveCursor(HALF_PAGE),
          u: () => moveCursor(-HALF_PAGE),
          f: () => moveCursor(HALF_PAGE * 2),
          b: () => moveCursor(-HALF_PAGE * 2),
          e: () => moveCursor(1),
          y: () => moveCursor(-1),
        }
        if (map[k]) {
          e.preventDefault()
          map[k]()
        }
        return
      }

      if (k === 'Shift' || k === 'Control') return
      setMessage((m) => (m && k !== 'Escape' ? m : null))

      if (k === ':') {
        e.preventDefault()
        setPend('')
        setMessage(null)
        return setMode('COMMAND')
      }
      if (k === '/') {
        e.preventDefault()
        setMessage(null)
        return setMode(buffer ? 'SEARCH' : 'COMMAND')
      }
      if (k === ' ') {
        e.preventDefault()
        setPend('')
        return setLeader([])
      }
      if (k === 'Escape') {
        setPend('')
        return
      }

      // ── dashboard ──
      if (!buffer) {
        const idx = dashItems.findIndex((it) => it.key === k)
        if (k === 'j' || k === 'ArrowDown') setDashSel((s) => (s + 1) % dashItems.length)
        else if (k === 'k' || k === 'ArrowUp') setDashSel((s) => (s - 1 + dashItems.length) % dashItems.length)
        else if (k === 'Enter') dashItems[dashSel].run()
        else if (k === 'q') runCommand('q')
        else if (k === 'G') setDashSel(dashItems.length - 1)
        else if (idx >= 0) dashItems[idx].run()
        else if (k === 'L' || k === 'H') cycleBuffer(k === 'L' ? 1 : -1)
        else return
        e.preventDefault()
        return
      }

      // ── editor ──
      const pend = pendingRef.current
      if (/^[1-9]$/.test(k) || (k === '0' && /^\d+$/.test(pend))) return setPend(pend + k)
      const count = Number(pend.replace(/\D/g, '')) || 1

      if (pend.endsWith('g')) {
        setPend('')
        if (k === 'g') return setCursor(/\d/.test(pend) ? count - 1 : 0)
        if (k === 'f' || k === 'x') return runAction(buffer.lines[cursor].action)
        return
      }
      setPend('')

      const line = buffer.lines[cursor]
      switch (k) {
        case 'j':
        case 'ArrowDown':
          moveCursor(count)
          break
        case 'k':
        case 'ArrowUp':
          moveCursor(-count)
          break
        case 'g':
          return setPend(pend + 'g')
        case 'G':
          setCursor(/\d/.test(pend) ? count - 1 : Infinity)
          break
        case 'Home':
          setCursor(0)
          break
        case 'End':
          setCursor(Infinity)
          break
        case 'PageDown':
          moveCursor(HALF_PAGE * 2)
          break
        case 'PageUp':
          moveCursor(-HALF_PAGE * 2)
          break
        case '}':
        case '{': {
          const dir = k === '}' ? 1 : -1
          let i = cursor + dir
          while (i > 0 && i < buffer.lines.length - 1 && lineText(buffer.lines[i]).trim() !== '') i += dir
          setCursor(i)
          break
        }
        case 'Enter':
          runAction(line.action)
          break
        case 'H':
          cycleBuffer(-1)
          break
        case 'L':
          cycleBuffer(1)
          break
        case 'n':
        case 'N':
          if (!search) err('E35: No previous regular expression')
          else findNext(search, cursor, k === 'n' ? 1 : -1)
          break
        case '?':
          openBuffer('help')
          break
        case 'u':
          echo('Already at oldest change')
          break
        case 'i':
        case 'a':
        case 'o':
        case 'O':
        case 'x':
        case 'd':
        case 'p':
        case 'c':
        case 's':
        case 'r':
        case 'A':
        case 'I':
          err(readonlyErr)
          break
        case 'q':
          echo(t.recording)
          break
        default:
          return
      }
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // ── render ───────────────────────────────────────────────────────
  const crumbs = buffer ? [`~/${profile.handle}`, 'portfolio', ...buffer.path.split('/')] : []

  return (
    <LangContext.Provider value={lang}>
    <div className="relative flex h-dvh flex-col overflow-hidden bg-ctp-base font-mono text-ctp-text">
      <Tabline
        buffers={B}
        openIds={openIds}
        current={current}
        onSelect={openBuffer}
        onClose={closeBuffer}
        sidebarOpen={sidebar}
        flavor={flavor}
      />

      <div className="relative flex min-h-0 flex-1">
        {sidebar && (
          <Sidebar buffers={B} current={current} onOpen={openBuffer} onClose={() => setSidebar(false)} handle={profile.handle} />
        )}

        <main className="flex min-w-0 flex-1 flex-col text-[13px] sm:text-sm">
          {buffer ? (
            <>
              {/* winbar / breadcrumbs */}
              <div className="flex h-6 shrink-0 items-center gap-1 overflow-hidden px-3 text-[12px] whitespace-nowrap text-ctp-overlay1 select-none">
                {crumbs.map((c, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight size={11} className="text-ctp-surface2" />}
                    {i === crumbs.length - 1 ? (
                      <span className="flex items-center gap-1 text-ctp-subtext1">
                        <FileIcon ft={buffer.ft} size={12} />
                        {c}
                      </span>
                    ) : (
                      c
                    )}
                  </span>
                ))}
              </div>
              <Editor
                key={current}
                buffer={buffer}
                cursor={cursor}
                setCursor={setCursor}
                onSegAction={(seg) => (seg.open ? openBuffer(seg.open) : seg.cmd ? runCommand(seg.cmd) : null)}
                showCursor={mode === 'NORMAL' && !leader}
                settings={settings}
                query={search}
              />
            </>
          ) : (
            <Dashboard
              items={dashItems}
              sel={dashSel}
              setSel={setDashSel}
              onRun={(it) => it.run()}
              startupMs={startupMs}
              showCursor={mode === 'NORMAL'}
            />
          )}
        </main>

        {leader && leaderNode && (
          <WhichKey
            node={leaderNode}
            path={leader}
            onKey={pressLeader}
            onClose={() => setLeader(null)}
          />
        )}

        {/* botones flotantes para móvil / no-vimmers */}
        {!leader && mode === 'NORMAL' && (
          <div className="absolute right-3 bottom-3 z-20 flex flex-col gap-2 lg:hidden">
            <button
              onClick={() => setLeader([])}
              aria-label={t.menuAria}
              className="grid size-11 place-items-center rounded-full border border-ctp-surface1 bg-ctp-mantle text-ctp-mauve shadow-lg shadow-ctp-crust/50"
            >
              <Menu size={18} />
            </button>
            <button
              onClick={() => setMode('COMMAND')}
              aria-label={t.cmdAria}
              className="grid size-11 place-items-center rounded-full bg-ctp-peach text-ctp-crust shadow-lg shadow-ctp-crust/50"
            >
              <Terminal size={18} strokeWidth={2.5} />
            </button>
          </div>
        )}

        <Notifications items={notes} onDismiss={(id) => setNotes((n) => n.filter((x) => x.id !== id))} />
      </div>

      <Statusline mode={mode} buffer={buffer} cursor={cursor} />
      <Cmdline
        mode={mode}
        message={message}
        pending={leader ? ['␣', ...leader].join('') : pending}
        history={historyRef.current}
        onSubmit={submitCmdline}
        onCancel={() => setMode((m) => (m === 'COMMAND' || m === 'SEARCH' ? 'NORMAL' : m))}
        onHelp={() => openBuffer('help')}
      />

      {secret && <SecretPlayer onClose={() => setSecret(false)} />}

      {mode === 'INSERT' && (
        <Telescope
          buffers={B}
          onOpen={(id) => {
            setMode('NORMAL')
            openBuffer(id)
          }}
          onClose={() => setMode('NORMAL')}
        />
      )}
    </div>
    </LangContext.Provider>
  )
}
