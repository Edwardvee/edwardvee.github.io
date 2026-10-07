import { useEffect, useRef } from 'react'
import LineContent from './LineContent'

export default function Editor({ buffer, cursor, setCursor, onSegAction, showCursor, settings, query }) {
  const lineRefs = useRef([])
  const first = useRef(true)

  useEffect(() => {
    lineRefs.current[cursor]?.scrollIntoView({ block: first.current ? 'center' : 'nearest' })
    first.current = false
  }, [cursor])

  const total = buffer.lines.length
  const gutter = Math.max(3, String(total).length) + 1
  const showNumbers = settings.number || settings.relativenumber

  return (
    <div className="relative flex-1 overflow-y-auto overflow-x-hidden" data-editor>
      <div className="flex min-h-full flex-col py-0.5">
        {buffer.lines.map((line, i) => {
          const active = i === cursor
          const rel = settings.relativenumber && !active
          const n = rel ? Math.abs(i - cursor) : i + 1
          const shown = active && line.hint && line.action
            ? { ...line, segs: [...line.segs, { t: `  ↵ ${line.hint}`, c: 'text-ctp-overlay0 italic select-none' }] }
            : line
          return (
            <div
              key={i}
              ref={(el) => (lineRefs.current[i] = el)}
              onMouseDown={() => setCursor(i)}
              className="flex scroll-my-24 leading-6"
            >
              {showNumbers && (
                <div
                  className={`shrink-0 select-none pr-3 text-right tabular-nums ${
                    active ? 'font-bold text-ctp-lavender' : 'text-ctp-surface1'
                  } ${active && settings.relativenumber ? '!text-left pl-1' : ''}`}
                  style={{ width: `${gutter + 2}ch` }}
                >
                  {n}
                </div>
              )}
              <div
                className={`min-w-0 flex-1 pr-4 ${!showNumbers ? 'pl-2' : ''} ${line.cls ?? ''} ${
                  active ? 'bg-ctp-surface0/55' : ''
                }`}
              >
                <LineContent
                  line={shown}
                  cursor={active && showCursor}
                  query={query}
                  wrap={settings.wrap}
                  onSegAction={onSegAction}
                />
              </div>
            </div>
          )
        })}
        {/* ~ de fin de buffer */}
        <div className="relative min-h-6 flex-1 overflow-hidden" aria-hidden>
          <div className="absolute inset-x-0 top-0 select-none leading-6 text-ctp-surface1">
            {Array.from({ length: 80 }, (_, i) => (
              <div key={i} style={{ paddingLeft: showNumbers ? '0.25rem' : '0.5rem' }}>
                ~
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
