import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { fuzzy } from '../lib/commands'
import { FileIcon } from './Icons'
import LineContent from './LineContent'
import { useT } from '../i18n'

function Panel({ title, className = '', children }) {
  return (
    <div className={`relative rounded-lg border border-ctp-surface1 bg-ctp-mantle ${className}`}>
      <span className="absolute -top-2.5 left-3 rounded bg-ctp-mauve px-1.5 text-[11px] leading-5 font-bold text-ctp-crust">
        {title}
      </span>
      {children}
    </div>
  )
}

function Highlighted({ text, idx }) {
  const set = new Set(idx)
  return [...text].map((ch, i) => (
    <span key={i} className={set.has(i) ? 'font-bold text-ctp-blue' : ''}>
      {ch}
    </span>
  ))
}

// telescope.nvim — find_files
export default function Telescope({ buffers, onOpen, onClose }) {
  const t = useT()
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)
  const selRef = useRef(null)

  const results = useMemo(() => {
    const all = Object.values(buffers)
    if (!query.trim()) return all.map((b) => ({ b, idx: [] }))
    return all
      .map((b) => {
        const r = fuzzy(query, b.path) ?? fuzzy(query, b.title ?? '')
        return r && { b, idx: fuzzy(query, b.path)?.idx ?? [], score: r.score }
      })
      .filter(Boolean)
      .sort((a, z) => z.score - a.score)
  }, [buffers, query])

  const current = results[Math.min(sel, results.length - 1)]

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  useEffect(() => {
    selRef.current?.scrollIntoView({ block: 'nearest' })
  }, [sel])

  const move = (d) => setSel((s) => Math.max(0, Math.min(results.length - 1, s + d)))

  const onKeyDown = (e) => {
    const k = e.key
    if (k === 'Escape' || (e.ctrlKey && k === 'c')) {
      e.preventDefault()
      onClose()
    } else if (k === 'Enter') {
      e.preventDefault()
      if (current) onOpen(current.b.id)
    } else if (k === 'ArrowDown' || (e.ctrlKey && (k === 'n' || k === 'j'))) {
      e.preventDefault()
      move(1)
    } else if (k === 'ArrowUp' || (e.ctrlKey && (k === 'p' || k === 'k'))) {
      e.preventDefault()
      move(-1)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-ctp-crust/50 p-3 pt-[8vh] backdrop-blur-[2px]" onMouseDown={onClose}>
      <div
        className="flex h-[min(78vh,34rem)] w-full max-w-5xl animate-pop gap-3 text-[13px]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-4 pt-2.5">
          <Panel title="Find Files" className="shrink-0">
            <div className="flex h-10 items-center gap-2 px-3">
              <Search size={14} className="text-ctp-mauve" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSel(0)
                }}
                onKeyDown={onKeyDown}
                placeholder={t.tsPlaceholder}
                spellCheck={false}
                autoCapitalize="off"
                className="min-w-0 flex-1 bg-transparent text-ctp-text caret-ctp-rosewater outline-none placeholder:text-ctp-overlay0"
              />
              <span className="shrink-0 text-ctp-overlay1 tabular-nums">
                {results.length} / {Object.keys(buffers).length}
              </span>
            </div>
          </Panel>
          <Panel title="Results" className="min-h-0 flex-1">
            <div className="h-full overflow-y-auto py-2">
              {results.length === 0 && <div className="px-3 text-ctp-overlay1">{t.tsEmpty}</div>}
              {results.map((r, i) => (
                <div
                  key={r.b.id}
                  ref={i === sel ? selRef : null}
                  onMouseEnter={() => setSel(i)}
                  onClick={() => onOpen(r.b.id)}
                  className={`flex cursor-pointer items-center gap-2 px-3 leading-7 ${
                    i === sel ? 'bg-ctp-surface0 text-ctp-text' : 'text-ctp-subtext0'
                  }`}
                >
                  <span className={`w-3 font-bold ${i === sel ? 'text-ctp-red' : 'text-transparent'}`}>›</span>
                  <FileIcon ft={r.b.ft} />
                  <span className="truncate">
                    <Highlighted text={r.b.path} idx={r.idx} />
                  </span>
                  {r.b.title && <span className="ml-auto hidden truncate pl-3 text-ctp-overlay0 sm:inline">{r.b.title}</span>}
                </div>
              ))}
            </div>
          </Panel>
        </div>
        <Panel title={current ? current.b.path : 'Preview'} className="mt-2.5 hidden min-w-0 flex-1 md:block">
          <div className="h-full overflow-hidden px-3 py-3 leading-6">
            {current?.b.lines.slice(0, 40).map((line, i) => (
              <div key={i} className={line.cls}>
                <LineContent line={line} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
