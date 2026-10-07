import { GitBranch, Lock, ShieldCheck } from 'lucide-react'
import { FileIcon } from './Icons'
import { useT } from '../i18n'

export const MODE_STYLE = {
  NORMAL: { bg: 'bg-ctp-blue', text: 'text-ctp-blue' },
  COMMAND: { bg: 'bg-ctp-peach', text: 'text-ctp-peach' },
  INSERT: { bg: 'bg-ctp-green', text: 'text-ctp-green' },
  SEARCH: { bg: 'bg-ctp-peach', text: 'text-ctp-peach' },
}

// separador powerline hecho con clip-path (sin depender de una Nerd Font)
function Sep({ from, to, dir = 'right' }) {
  const clip = dir === 'right' ? 'polygon(0 0, 100% 50%, 0 100%)' : 'polygon(100% 0, 0 50%, 100% 100%)'
  return (
    <span className={`relative h-full w-2.5 shrink-0 ${to}`} aria-hidden>
      <span className={`absolute inset-0 ${from}`} style={{ clipPath: clip }} />
    </span>
  )
}

// lualine.nvim
export default function Statusline({ mode, buffer, cursor }) {
  const t = useT()
  const label = mode === 'SEARCH' ? 'COMMAND' : mode
  const m = MODE_STYLE[mode] ?? MODE_STYLE.NORMAL
  const total = buffer?.lines.length ?? 0
  const pct = !buffer || total <= 1 ? 'Top' : cursor === 0 ? 'Top' : cursor >= total - 1 ? 'Bot' : `${Math.round((cursor / (total - 1)) * 100)}%`
  const ft = buffer?.ft ?? 'dashboard'

  return (
    <div className="flex h-6 shrink-0 items-stretch bg-ctp-mantle text-[12px] leading-6 select-none">
      {/* a */}
      <div className={`flex items-center px-3 font-extrabold tracking-wide text-ctp-crust ${m.bg}`}>{label}</div>
      <Sep from={m.bg} to="bg-ctp-surface0" />
      {/* b */}
      <div className="flex items-center gap-1.5 bg-ctp-surface0 px-2 text-ctp-text">
        <GitBranch size={12} className="text-ctp-mauve" />
        main
      </div>
      <Sep from="bg-ctp-surface0" to="bg-ctp-mantle" />
      {/* c */}
      <div className="flex min-w-0 items-center gap-1.5 px-2 text-ctp-subtext1">
        <FileIcon ft={ft} size={12} />
        <span className="truncate">{buffer ? buffer.path : 'dashboard'}</span>
        {buffer && <Lock size={11} className="shrink-0 text-ctp-red" aria-label={t.readonlyAria} />}
        <span className="ml-2 hidden items-center gap-1 text-ctp-green md:flex" title="diagnostics">
          <ShieldCheck size={12} /> 0 vulns
        </span>
      </div>

      <div className="flex-1" />

      {/* x */}
      <div className="hidden items-center gap-3 px-3 text-ctp-overlay2 md:flex">
        <span>utf-8</span>
        <span className="flex items-center gap-1.5">
          <FileIcon ft={ft} size={12} />
          {ft}
        </span>
      </div>
      {/* y */}
      <Sep from="bg-ctp-surface0" to="bg-ctp-mantle" dir="left" />
      <div className="flex items-center bg-ctp-surface0 px-2 text-ctp-text tabular-nums">{pct}</div>
      {/* z */}
      <Sep from={m.bg} to="bg-ctp-surface0" dir="left" />
      <div className={`flex items-center px-3 font-bold text-ctp-crust tabular-nums ${m.bg}`}>
        {buffer ? `${cursor + 1}:1` : '0:0'}
      </div>
    </div>
  )
}
