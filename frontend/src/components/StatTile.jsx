import { Trophy, Target, Shield, Coins, Calendar, BarChart3, Search, Users, Zap } from 'lucide-react'

const ICONS = { trophy: Trophy, target: Target, shield: Shield, coins: Coins, calendar: Calendar, 'bar-chart': BarChart3, search: Search, users: Users, zap: Zap }

const COLORS = {
  blue: 'bg-blue-500/15 text-blue-400',
  green: 'bg-green-500/15 text-green-400',
  orange: 'bg-orange-500/15 text-orange-400',
  purple: 'bg-purple-500/15 text-purple-400',
}

export default function StatTile({ label, value, icon, color = 'blue' }) {
  const Icon = ICONS[icon] ?? Trophy
  return (
    <div className="bg-[#151622] border border-white/5 rounded-xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${COLORS[color]}`}>
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xl font-semibold text-white leading-tight">{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  )
}
