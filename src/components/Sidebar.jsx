import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { FileIcon, FolderIcon } from './Icons'
import { projects } from '../data/portfolio'
import { useT } from '../i18n'

// neo-tree.nvim
export default function Sidebar({ buffers, current, onOpen, onClose, handle }) {
  const t = useT()
  const [projectsOpen, setProjectsOpen] = useState(true)
  const files = Object.values(buffers)
    .filter((b) => !b.id.startsWith('projects/'))
    .sort((a, b) => a.path.localeCompare(b.path))
  const projectFiles = Object.values(buffers).filter((b) => b.id.startsWith('projects/'))
  const activeSlugs = new Set(projects.filter((p) => p.status === 'activo').map((p) => `projects/${p.slug}`))

  const Row = ({ depth, last, children, onClick, active, git }) => (
    <div
      onClick={onClick}
      className={`flex h-6 cursor-pointer items-center gap-1.5 pr-3 whitespace-nowrap hover:bg-ctp-surface0/60 ${
        active ? 'bg-ctp-surface0 text-ctp-text' : ''
      }`}
    >
      <span className="text-ctp-surface1 select-none">
        {' '}
        {depth > 0 && <span>│ </span>}
        {last ? '└' : '├'}
      </span>
      {children}
      {git && <span className="ml-auto font-bold text-ctp-yellow">{git}</span>}
    </div>
  )

  return (
    <>
      {/* backdrop móvil */}
      <div className="fixed inset-0 z-30 bg-ctp-crust/60 lg:hidden" onClick={onClose} />
      <aside className="absolute inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-ctp-crust bg-ctp-mantle text-[13px] lg:static lg:z-auto lg:w-64">
        <div className="flex h-8 shrink-0 items-center gap-2 border-b border-ctp-crust px-3 font-bold text-ctp-blue lg:hidden">
          File Explorer
        </div>
        <div className="flex-1 overflow-y-auto py-1.5">
          <div className="flex h-6 items-center gap-1.5 px-2 text-ctp-blue">
            <FolderIcon open />
            <span className="font-bold">~/{handle}/portfolio</span>
          </div>

          <Row depth={0} last={false} onClick={() => setProjectsOpen((v) => !v)}>
            {projectsOpen ? <ChevronDown size={12} className="text-ctp-overlay1" /> : <ChevronRight size={12} className="text-ctp-overlay1" />}
            <FolderIcon open={projectsOpen} />
            <span className="text-ctp-blue">projects</span>
          </Row>
          {projectsOpen &&
            projectFiles.map((b, i) => (
              <Row
                key={b.id}
                depth={1}
                last={i === projectFiles.length - 1}
                onClick={() => onOpen(b.id)}
                active={current === b.id}
                git={activeSlugs.has(b.id) ? 'M' : null}
              >
                <FileIcon ft={b.ft} />
                <span className={current === b.id ? 'font-bold text-ctp-lavender' : 'text-ctp-subtext1'}>{b.name}</span>
              </Row>
            ))}

          {files.map((b, i) => (
            <Row key={b.id} depth={0} last={i === files.length - 1} onClick={() => onOpen(b.id)} active={current === b.id}>
              <span className="w-3" />
              <FileIcon ft={b.ft} />
              <span className={current === b.id ? 'font-bold text-ctp-lavender' : 'text-ctp-subtext1'}>{b.name}</span>
            </Row>
          ))}
        </div>
        <div className="shrink-0 border-t border-ctp-crust px-3 py-2 text-[11px] leading-5 text-ctp-overlay0">
          <div>
            <span className="text-ctp-peach">&lt;CR&gt;</span> {t.sidebarOpen} · <span className="text-ctp-peach">&lt;C-n&gt;</span> {t.sidebarClose}
          </div>
          <div>
            <span className="font-bold text-ctp-yellow">M</span> {t.sidebarModified}
          </div>
        </div>
      </aside>
    </>
  )
}
