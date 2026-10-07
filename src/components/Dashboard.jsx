import { profile } from '../data/portfolio'
import { TOMOKO_CHARS, TOMOKO_COLOR_MAP, TOMOKO_COLORS } from '../data/tomoko'

const ROW_COLORS = ['text-ctp-mauve', 'text-ctp-mauve', 'text-ctp-lavender', 'text-ctp-blue', 'text-ctp-sapphire', 'text-ctp-teal']

// Tomoko Kuroki (WataMote), generada desde assets/tomoko.jpg con `npm run tomoko`
function tomokoLine(chars, colors) {
  const runs = []
  Array.from(chars).forEach((ch, i) => {
    const code = colors[i] ?? ' '
    const last = runs[runs.length - 1]
    if (last && (last.code === code || ch === ' ')) last.text += ch
    else runs.push({ code, text: ch })
  })
  // cada carácter en una celda de 0.6em: la fuente de reserva para Braille
  // suele ser más ancha que JetBrains Mono y deformaría la imagen
  return runs.map((r, i) => (
    <span key={i} className={TOMOKO_COLORS[r.code]}>
      {Array.from(r.text).map((ch, j) => (
        <span key={j} className="inline-block w-[0.6em] overflow-visible text-center">
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  ))
}

function Tomoko() {
  return (
    <div className="pointer-events-none absolute right-4 bottom-3 hidden flex-col items-start select-none xl:flex" aria-hidden>
      <div className="relative mb-2 ml-2 rounded-lg border border-ctp-surface1 bg-ctp-mantle px-2.5 py-1 text-[11px] leading-4 text-ctp-subtext0">
        <span className="text-ctp-overlay1">tomoko:</span> e-eh…
        <br />
        ¿v-vas a contratarlo?
        <span className="absolute -bottom-1.5 left-24 size-2.5 rotate-45 border-r border-b border-ctp-surface1 bg-ctp-mantle" />
      </div>
      <pre className="text-[7px] leading-[1.1] whitespace-nowrap 2xl:text-[9px]">
        {TOMOKO_CHARS.map((line, i) => (
          <div key={i}>{tomokoLine(line, TOMOKO_COLOR_MAP[i])}</div>
        ))}
      </pre>
    </div>
  )
}

// dashboard-nvim / alpha-nvim
export default function Dashboard({ items, sel, setSel, onRun, startupMs, showCursor }) {
  return (
    <div className="relative flex flex-1 overflow-y-auto">
      <Tomoko />
      <div className="m-auto flex w-full max-w-xl flex-col items-center px-4 py-8 select-none">
        <pre aria-label={profile.name} className="text-[clamp(9px,2.9vw,19px)] leading-[1.08]">
          {profile.ascii.map((row, i) => (
            <div key={i} className={ROW_COLORS[i % ROW_COLORS.length]}>
              {row.split(/(█+)/).map((run, j) =>
                run.startsWith('█') ? run : <span key={j} className="text-ctp-surface2">{run}</span>,
              )}
            </div>
          ))}
        </pre>

        <div className="mt-5 text-center">
          <div className="text-sm font-bold text-ctp-text sm:text-base">
            <span className="text-ctp-green">❯</span> {profile.role}
          </div>
          <div className="mt-1 text-[12px] text-ctp-overlay1 sm:text-[13px]">{profile.tagline}</div>
        </div>

        <div className="mt-8 w-full max-w-sm">
          {items.map((it, i) => {
            const active = i === sel
            const Icon = it.icon
            return (
              <button
                key={it.key}
                onMouseEnter={() => setSel(i)}
                onClick={() => onRun(it)}
                className={`flex w-full items-center gap-3 rounded-md px-3 text-left text-[13px] leading-8 sm:text-sm ${
                  active ? 'bg-ctp-surface0/70' : ''
                }`}
              >
                <Icon size={15} className={`shrink-0 ${it.color}`} />
                <span className={active ? 'font-bold text-ctp-text' : 'text-ctp-subtext1'}>
                  {active && showCursor && <span className="vim-cursor">{it.label[0]}</span>}
                  {active && showCursor ? it.label.slice(1) : it.label}
                </span>
                <span className="ml-auto font-bold text-ctp-peach">{it.key}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-8 text-center text-[12px] leading-5 text-ctp-overlay1">
          <div>
            <span className="text-ctp-yellow">⚡</span> Neovim cargó <span className="text-ctp-peach">{items.length + 4}</span> plugins en{' '}
            <span className="text-ctp-peach">{startupMs.toFixed(2)}ms</span>
          </div>
          <div className="mt-3 italic text-ctp-overlay0">“La seguridad es un proceso, no un producto.” — Bruce Schneier</div>
          <div className="mt-5 text-ctp-overlay0">
            <span className="text-ctp-subtext0">¿No usas Vim?</span> Haz click en cualquier opción, o escribe{' '}
            <span className="text-ctp-peach">:help</span>
          </div>
        </div>
      </div>
    </div>
  )
}
