import { Trophy, Target, Shield, Coins, Calendar, BarChart3, Search, Users, Zap } from 'lucide-react'

const ICONS = { trophy: Trophy, target: Target, shield: Shield, coins: Coins, calendar: Calendar, 'bar-chart': BarChart3, search: Search, users: Users, zap: Zap }

const COLORS = {
  blue: 'var(--series-1)',
  green: 'var(--status-good)',
  orange: 'var(--series-2)',
  purple: 'var(--series-7)',
}

export default function StatTile({ label, value, icon, color = 'blue' }) {
  const Icon = ICONS[icon] ?? Trophy
  const fg = COLORS[color] ?? COLORS.blue
  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-hairline)] rounded-2xl p-4 flex items-center gap-3.5 transition-colors hover:border-[var(--border-hover)]">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `color-mix(in oklab, ${fg} 16%, transparent)`, color: fg }}
      >
        <Icon size={19} />
      </div>
      <div className="min-w-0">
        <div className="text-xl font-semibold text-[var(--text-primary)] leading-tight tabular-nums truncate">{value}</div>
        <div className="text-xs text-[var(--text-muted)] truncate">{label}</div>
      </div>
    </div>
  )
}
