// which-key.nvim
export default function WhichKey({ node, path, onKey, onClose }) {
  const entries = Object.entries(node.children)
  const crumbs = ['<leader>', ...path].join(' ')
  return (
    <>
      <div className="fixed inset-0 z-30" onMouseDown={onClose} />
      <div className="absolute inset-x-0 bottom-0 z-40 animate-pop border-t border-ctp-surface1 bg-ctp-mantle px-4 pt-3 pb-2 text-[13px]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([key, item]) => (
            <button
              key={key}
              onClick={() => onKey(key)}
              className="group flex items-center gap-2 rounded px-1 text-left leading-6 hover:bg-ctp-surface0"
            >
              <span className="w-10 text-right font-bold text-ctp-peach">{key === ' ' ? 'SPC' : key}</span>
              <span className="text-ctp-overlay0">➜</span>
              <span className={item.children ? 'text-ctp-mauve' : 'text-ctp-text group-hover:text-ctp-lavender'}>
                {item.children ? `+${item.label}` : item.label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-ctp-surface0 pt-1.5 text-[12px] text-ctp-overlay1">
          <span className="text-ctp-blue">{crumbs}</span>
          <span>
            <span className="text-ctp-peach">&lt;esc&gt;</span> cerrar
            {path.length > 0 && (
              <>
                {' '}· <span className="text-ctp-peach">&lt;bs&gt;</span> atrás
              </>
            )}
          </span>
        </div>
      </div>
    </>
  )
}
