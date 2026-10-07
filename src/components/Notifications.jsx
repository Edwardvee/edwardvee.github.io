import { Info, TriangleAlert, CircleX, CircleCheck, X } from 'lucide-react'

const LEVEL = {
  info: { Icon: Info, cls: 'text-ctp-blue', border: 'border-ctp-blue/50' },
  warn: { Icon: TriangleAlert, cls: 'text-ctp-yellow', border: 'border-ctp-yellow/50' },
  error: { Icon: CircleX, cls: 'text-ctp-red', border: 'border-ctp-red/50' },
  success: { Icon: CircleCheck, cls: 'text-ctp-green', border: 'border-ctp-green/50' },
}

// nvim-notify
export default function Notifications({ items, onDismiss }) {
  return (
    <div className="pointer-events-none absolute top-3 right-3 z-50 flex w-[min(24rem,calc(100vw-1.5rem))] flex-col gap-2">
      {items.map((n) => {
        const { Icon, cls, border } = LEVEL[n.level] ?? LEVEL.info
        return (
          <div
            key={n.id}
            role="status"
            className={`pointer-events-auto animate-slide-in rounded-lg border bg-ctp-mantle/95 text-[13px] shadow-xl shadow-ctp-crust/50 ${border}`}
          >
            <div className={`flex items-center gap-2 border-b px-3 py-1.5 ${border}`}>
              <Icon size={14} className={cls} />
              <span className={`font-bold ${cls}`}>{n.title}</span>
              <button onClick={() => onDismiss(n.id)} className="ml-auto text-ctp-overlay1 hover:text-ctp-text" aria-label="Cerrar">
                <X size={13} />
              </button>
            </div>
            <div className="px-3 py-2 leading-5 text-ctp-text">{n.msg}</div>
          </div>
        )
      })}
    </div>
  )
}
