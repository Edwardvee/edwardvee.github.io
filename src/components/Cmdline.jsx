import { useEffect, useMemo, useRef, useState } from 'react'
import { Command, Palette, Settings2 } from 'lucide-react'
import { complete } from '../lib/commands'
import { FileIcon } from './Icons'
import { useLang, useT } from '../i18n'

const MSG_CLS = { error: 'text-ctp-red', warn: 'text-ctp-yellow', info: 'text-ctp-text' }

function KindIcon({ item }) {
  if (item.kind === 'file') return <FileIcon ft={item.ft} size={13} />
  if (item.kind === 'flavor') return <Palette size={13} className="shrink-0 text-ctp-pink" />
  if (item.kind === 'opt') return <Settings2 size={13} className="shrink-0 text-ctp-teal" />
  return <Command size={13} className="shrink-0 text-ctp-peach" />
}

function Prompt({ prefix, history, onSubmit, onCancel }) {
  const lang = useLang()
  const t = useT()
  const [base, setBase] = useState('')
  const [sel, setSel] = useState(-1)
  const [hist, setHist] = useState(-1)
  const inputRef = useRef(null)
  const items = useMemo(() => (prefix === ':' ? complete(base, lang).slice(0, 10) : []), [base, prefix, lang])
  const value = sel >= 0 && items[sel] ? items[sel].value : base

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const step = (dir) => {
    if (!items.length) return
    setSel((s) => {
      const n = s + dir
      if (n >= items.length) return 0
      if (n < 0) return items.length - 1
      return n
    })
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(value)
    } else if (e.key === 'Escape' || (e.key === 'c' && e.ctrlKey)) {
      e.preventDefault()
      onCancel()
    } else if (e.key === 'Backspace' && value === '') {
      e.preventDefault()
      onCancel()
    } else if (e.key === 'Tab' || (e.ctrlKey && e.key === 'n')) {
      e.preventDefault()
      step(e.shiftKey ? -1 : 1)
    } else if (e.ctrlKey && e.key === 'p') {
      e.preventDefault()
      step(-1)
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      const up = e.key === 'ArrowUp'
      if (sel >= 0 || (items.length && !history.length)) return step(up ? -1 : 1)
      // historial
      const n = up ? Math.min(hist + 1, history.length - 1) : Math.max(hist - 1, -1)
      setHist(n)
      setBase(n === -1 ? '' : history[history.length - 1 - n])
      setSel(-1)
    }
  }

  return (
    <div className="relative flex h-full flex-1 items-center">
      {items.length > 0 && base.length > 0 && (
        <div className="absolute bottom-full left-0 z-50 mb-1 w-[min(30rem,calc(100vw-1rem))] animate-pop overflow-hidden rounded-md border border-ctp-surface1 bg-ctp-mantle py-1 shadow-2xl shadow-ctp-crust/60">
          {items.map((it, i) => (
            <div
              key={it.value}
              onMouseDown={(e) => {
                e.preventDefault()
                onSubmit(it.value)
              }}
              className={`flex cursor-pointer items-center gap-2 px-2 leading-6 ${
                i === sel ? 'bg-ctp-surface1 font-bold text-ctp-text' : 'text-ctp-subtext1 hover:bg-ctp-surface0'
              }`}
            >
              <KindIcon item={it} />
              <span className="truncate">{it.label}</span>
              <span className="ml-auto shrink-0 pl-4 text-[12px] font-normal text-ctp-overlay1">{it.desc}</span>
            </div>
          ))}
        </div>
      )}
      <span className="text-ctp-text">{prefix}</span>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => {
          setBase(e.target.value)
          setSel(-1)
          setHist(-1)
        }}
        onKeyDown={onKeyDown}
        onBlur={onCancel}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        enterKeyHint="go"
        aria-label={prefix === ':' ? t.cmdAria : '/'}
        className="h-full min-w-0 flex-1 bg-transparent text-ctp-text caret-ctp-rosewater outline-none"
      />
    </div>
  )
}

export default function Cmdline({ mode, message, pending, history, onSubmit, onCancel, onHelp }) {
  const [h0, h1, h2, h3, h4] = useT().cmdHint
  const active = mode === 'COMMAND' || mode === 'SEARCH'
  return (
    <div className="flex h-6 shrink-0 items-center bg-ctp-base px-2 text-[13px] leading-6">
      {active ? (
        <Prompt
          key={mode}
          prefix={mode === 'COMMAND' ? ':' : '/'}
          history={history}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      ) : (
        <>
          <div className={`min-w-0 flex-1 truncate ${MSG_CLS[message?.level] ?? 'text-ctp-overlay1'}`}>
            {message ? (
              message.text
            ) : (
              <button onClick={onHelp} className="hidden text-ctp-overlay0 hover:text-ctp-subtext0 sm:inline">
                {h0}
                <span className="text-ctp-peach">{h1}</span>
                {h2}
                <span className="text-ctp-peach">{h3}</span>
                {h4}
              </button>
            )}
          </div>
          <div className="w-16 shrink-0 text-right text-ctp-overlay1">{pending}</div>
        </>
      )}
    </div>
  )
}
