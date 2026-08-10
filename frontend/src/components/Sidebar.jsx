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
    <aside className="w-56 shrink-0 bg-[#11121a] border-r border-white/5 flex flex-col">
      <div className="flex items-center gap-2 px-5 py-5 text-white font-semibold tracking-wide">
        <Trophy size={20} className="text-blue-500" />
        <span className="text-sm">IPL PREDICTOR</span>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
