import { Link } from 'react-router-dom'
import { Trophy, Calendar, BarChart3, Users, ShieldCheck } from 'lucide-react'
import { matches, teams } from '../utils/stats'
import ThemeToggle from '../components/ThemeToggle'
import teamLogos from '../assets/team-logos.webp'
import heroBatsman from '../assets/hero-batsman.webp'
import trophyImg from '../assets/trophy.webp'

const seasons = [...new Set(matches.map((m) => m.season))].sort((a, b) => a - b)
const decisive = matches.filter((m) => m.winner).length

const heroStats = [
  { label: 'Seasons', value: seasons.length, icon: Calendar },
  { label: 'Matches', value: matches.length.toLocaleString(), icon: BarChart3 },
  { label: 'Teams', value: teams.length, icon: Users },
  { label: 'Decisive Results', value: decisive.toLocaleString(), icon: ShieldCheck },
]

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
    <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 0%, color-mix(in oklab, var(--accent) 16%, transparent), transparent)' }}
      />

      <img
        src={trophyImg}
        alt="IPL trophy with a cricket bat, ball, and helmet"
        className="hidden min-[1400px]:block absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none select-none opacity-90"
        style={{
          width: 'min(480px, calc(100vw - 1180px))',
          filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.45))',
        }}
      />

      <header className="relative flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2 font-semibold tracking-wide">
          <Trophy size={20} style={{ color: 'var(--accent)' }} />
          <span className="text-sm">IPL PREDICTOR</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-[var(--text-primary)] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/dashboard"
            className="text-sm text-white transition-colors px-4 py-2 rounded-lg font-medium"
            style={{ background: 'var(--accent)' }}
          >
            Enter Dashboard
          </Link>
        </div>
      </header>

      <main className="relative px-8 pt-12 pb-16 max-w-6xl grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            PREDICT IPL
            <br />
            MATCH <span style={{ color: 'var(--accent)' }}>WINNER</span>
          </h1>
          <p className="mt-5 text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Explore {matches.length.toLocaleString()} real IPL matches from {seasons[0]}–{seasons[seasons.length - 1]}.
            Compare teams head-to-head and get a data-driven win estimate for any matchup.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              to="/predict"
              className="text-white transition-colors px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{ background: 'var(--accent)' }}
            >
              Predict Now
            </Link>
            <Link
              to="/dashboard"
              className="border border-[var(--border-hairline)] hover:bg-[var(--surface-hover)] transition-colors px-5 py-2.5 rounded-lg text-sm font-medium"
            >
              View Dashboard
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {heroStats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--surface-hover)] flex items-center justify-center shrink-0" style={{ color: 'var(--accent)' }}>
                  <s.icon size={18} />
                </div>
                <div>
                  <div className="text-xl font-semibold tabular-nums">{s.value}</div>
                  <div className="text-xs text-[var(--text-muted)]">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div
            className="relative w-full max-w-sm aspect-square rounded-full"
            style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--accent) 18%, transparent), transparent 70%)' }}
          >
            <img
              src={heroBatsman}
              alt="Cricket batsman illustration"
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(57,135,229,0.25)]"
            />
          </div>
        </div>
      </main>

      <section className="relative px-8 pb-16 max-w-5xl">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-4">
          All {teams.length} Franchises
        </h2>
        <img
          src={teamLogos}
          alt="All IPL team logos, current and historical franchises"
          className="w-full rounded-2xl border border-[var(--border-hairline)]"
        />
      </section>
    </div>
  )
}
