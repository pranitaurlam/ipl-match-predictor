import { Link } from 'react-router-dom'
import { Trophy, Calendar, BarChart3, Search, Users, Zap } from 'lucide-react'
import { heroStats } from '../data/mockData'

const ICONS = { calendar: Calendar, 'bar-chart': BarChart3, search: Search, users: Users, zap: Zap }

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/predict', label: 'Predict' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/compare', label: 'Teams' },
  { to: '/about', label: 'About' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0c14] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-transparent pointer-events-none" />

      <header className="relative flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2 font-semibold tracking-wide">
          <Trophy size={20} className="text-blue-500" />
          <span className="text-sm">IPL PREDICTOR</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/dashboard"
          className="text-sm bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg font-medium"
        >
          Login
        </Link>
      </header>

      <main className="relative px-8 pt-12 pb-16 max-w-3xl">
        <h1 className="text-5xl font-bold leading-tight">
          PREDICT IPL
          <br />
          MATCH <span className="text-blue-500">WINNER</span>
        </h1>
        <p className="mt-5 text-gray-400 max-w-xl">
          Advanced Machine Learning models to predict the winning probability of IPL matches.
          Make smarter predictions with data.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <Link
            to="/predict"
            className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2.5 rounded-lg text-sm font-medium"
          >
            Predict Now
          </Link>
          <Link
            to="/dashboard"
            className="border border-white/15 hover:bg-white/5 transition-colors px-5 py-2.5 rounded-lg text-sm font-medium"
          >
            View Dashboard
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-8">
          {heroStats.map((s) => {
            const Icon = ICONS[s.icon] ?? Zap
            return (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xl font-semibold">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
