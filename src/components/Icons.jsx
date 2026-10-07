import { FileText, Moon, FileCog, Terminal, CircleHelp, Folder, FolderOpen, LayoutDashboard, FileCode, GitCommitHorizontal } from 'lucide-react'

// Equivalente a nvim-web-devicons
const FT = {
  markdown: { Icon: FileText, cls: 'text-ctp-blue' },
  lua: { Icon: Moon, cls: 'text-ctp-sapphire' },
  yaml: { Icon: FileCog, cls: 'text-ctp-mauve' },
  sh: { Icon: Terminal, cls: 'text-ctp-green' },
  help: { Icon: CircleHelp, cls: 'text-ctp-teal' },
  git: { Icon: GitCommitHorizontal, cls: 'text-ctp-peach' },
  dashboard: { Icon: LayoutDashboard, cls: 'text-ctp-pink' },
}

export function FileIcon({ ft, size = 14, className = '' }) {
  const { Icon, cls } = FT[ft] ?? { Icon: FileCode, cls: 'text-ctp-overlay2' }
  return <Icon size={size} strokeWidth={2} className={`${cls} shrink-0 ${className}`} aria-hidden />
}

export function FolderIcon({ open, size = 14 }) {
  const Icon = open ? FolderOpen : Folder
  return <Icon size={size} strokeWidth={2} className="text-ctp-blue shrink-0" aria-hidden />
}

export const ftLabel = { markdown: 'markdown', lua: 'lua', yaml: 'yaml', sh: 'sh', help: 'help', git: 'git', dashboard: 'dashboard' }
