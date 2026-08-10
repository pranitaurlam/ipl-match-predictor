import { User } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Topbar({ title, subtitle, action }) {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-[var(--border-hairline)]">
      <div>
        <h1 className="text-lg font-semibold text-[var(--text-primary)] tracking-wide">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--text-muted)] mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {action}
        <ThemeToggle />
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3987e5] to-[#9085e9] flex items-center justify-center text-white">
          <User size={16} />
        </div>
      </div>
    </header>
  )
}
