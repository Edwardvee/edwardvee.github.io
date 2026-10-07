import { X, Shield } from 'lucide-react'
import { FileIcon } from './Icons'

// bufferline.nvim
export default function Tabline({ buffers, openIds, current, onSelect, onClose, sidebarOpen, flavor }) {
  return (
    <div className="flex h-8 shrink-0 items-stretch bg-ctp-crust text-[13px] select-none">
      {sidebarOpen && (
        <div className="hidden w-64 shrink-0 items-center justify-center border-r border-ctp-crust bg-ctp-mantle font-bold text-ctp-blue lg:flex">
          File Explorer
        </div>
      )}
      <div className="flex min-w-0 flex-1 items-stretch overflow-x-auto [scrollbar-width:none]">
        {openIds.length === 0 && (
          <div className="flex items-center gap-2 bg-ctp-base px-4 text-ctp-text">
            <FileIcon ft="dashboard" />
            <span className="font-bold">dashboard</span>
          </div>
        )}
        {openIds.map((id) => {
          const b = buffers[id]
          const active = id === current
          return (
            <div
              key={id}
              onClick={() => onSelect(id)}
              onAuxClick={(e) => e.button === 1 && onClose(id)}
              className={`group relative flex shrink-0 cursor-pointer items-center gap-2 pr-2 pl-3 transition-colors ${
                active ? 'bg-ctp-base text-ctp-text' : 'bg-ctp-mantle text-ctp-overlay1 hover:text-ctp-subtext1'
              }`}
              title={b.path}
            >
              {active && <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-ctp-blue" />}
              <FileIcon ft={b.ft} className={active ? '' : 'opacity-70'} />
              <span className={active ? 'font-bold' : ''}>{b.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose(id)
                }}
                aria-label={`Cerrar ${b.name}`}
                className={`rounded p-0.5 hover:bg-ctp-surface0 hover:text-ctp-red ${
                  active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <X size={12} />
              </button>
              <span className="ml-1 h-4 w-px bg-ctp-surface0" />
            </div>
          )
        })}
      </div>
      <div className="hidden shrink-0 items-center gap-2 bg-ctp-mauve px-3 text-[12px] font-bold text-ctp-crust sm:flex">
        <Shield size={12} strokeWidth={2.5} />
        catppuccin-{flavor}
      </div>
    </div>
  )
}
