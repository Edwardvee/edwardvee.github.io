import { X } from 'lucide-react'
import { useT } from '../i18n'

const VIDEO_ID = 'xKGs_Tw9ZMk'

// ventana flotante (nvim_open_win) con un video de YouTube — :secret
export default function SecretPlayer({ onClose }) {
  const [or, toClose] = useT().secretClose
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ctp-crust/70 p-3 backdrop-blur-[2px]" onMouseDown={onClose}>
      <div
        className="relative w-full max-w-4xl animate-pop rounded-lg border border-ctp-mauve bg-ctp-mantle p-2 pt-4 shadow-2xl shadow-ctp-crust/60"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className="absolute -top-2.5 left-3 rounded bg-ctp-mauve px-1.5 text-[11px] leading-5 font-bold text-ctp-crust">
          secret.mp4
        </span>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute -top-2.5 right-3 rounded bg-ctp-surface0 p-0.5 text-ctp-subtext0 hover:bg-ctp-red hover:text-ctp-crust"
        >
          <X size={14} />
        </button>
        <div className="aspect-video w-full overflow-hidden rounded">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
            title="secret"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          />
        </div>
        <div className="mt-1.5 text-right text-[11px] text-ctp-overlay1">
          <span className="text-ctp-peach">&lt;Esc&gt;</span> {or} <span className="text-ctp-peach">q</span> {toClose}
        </div>
      </div>
    </div>
  )
}
