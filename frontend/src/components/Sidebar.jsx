import { NavLink } from 'react-router-dom'
import { Home, LayoutDashboard, Trophy, LineChart, Users2, GitCompare, Info } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/predict', label: 'Predict Winner', icon: Trophy },
  { to: '/analytics', label: 'Analytics', icon: LineChart },
  { to: '/compare', label: 'Team Comparison', icon: GitCompare },
  { to: '/players', label: 'Players', icon: Users2 },
  { to: '/about', label: 'About', icon: Info },
]

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 bg-[var(--surface-sidebar)] border-r border-[var(--border-hairline)] flex flex-col">
      <div className="flex items-center gap-2 px-5 py-5 text-[var(--text-primary)] font-semibold tracking-wide">
        <Trophy size={20} style={{ color: 'var(--accent)' }} />
        <span className="text-sm">IPL PREDICTOR</span>
      </div>
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors relative ${
                isActive
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-secondary)]'
              }`
            }
            style={({ isActive }) => (isActive ? { background: 'color-mix(in oklab, var(--accent) 15%, transparent)' } : undefined)}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full" style={{ background: 'var(--accent)' }} />
                )}
                <Icon size={16} style={isActive ? { color: 'var(--accent)' } : undefined} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
