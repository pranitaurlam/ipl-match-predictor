import { useMemo, useState } from 'react'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import { useChartTheme, useThemedTeams } from '../utils/ThemeContext'
import { matches, headToHead, teamStats, predictWinProbability } from '../utils/stats'

const venues = [...new Set(matches.map((m) => m.venue))].sort()

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs text-[var(--text-muted)] mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}

const selectClass =
  'w-full bg-[var(--surface-card-hover)] border border-[var(--border-hairline)] rounded-lg px-3 py-2.5 text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]'

export default function PredictWinner() {
  const teams = useThemedTeams()
  const chart = useChartTheme()

  const [form, setForm] = useState({
    team1: teams[0].code,
    team2: teams[1].code,
    venue: venues[0],
    tossWinner: teams[0].code,
    tossDecision: 'bat',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const t1 = teams.find((t) => t.code === form.team1) ?? teams[0]
  const t2 = teams.find((t) => t.code === form.team2) ?? teams[1]

  const prob = useMemo(() => {
    if (t1.code === t2.code) return 50
    return predictWinProbability({
      team1: t1.name,
      team2: t2.name,
      tossWinner: teams.find((t) => t.code === form.tossWinner)?.name,
      tossDecision: form.tossDecision,
      venue: form.venue,
    })
  }, [t1, t2, form.tossWinner, form.tossDecision, form.venue])

  const h2h = headToHead(t1.name, t2.name)
  const s1 = teamStats(t1.name)
  const s2 = teamStats(t2.name)

  return (
    <div>
      <Topbar title="PREDICT MATCH WINNER" subtitle="Data-driven estimate from historical win rate, head-to-head, form, and toss" />
      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Team 1">
              <select className={selectClass} value={form.team1} onChange={set('team1')}>
                {teams.map((t) => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Team 2">
              <select className={selectClass} value={form.team2} onChange={set('team2')}>
                {teams.map((t) => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Venue">
              <select className={selectClass} value={form.venue} onChange={set('venue')}>
                {venues.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </Field>
            <Field label="Toss Winner">
              <select className={selectClass} value={form.tossWinner} onChange={set('tossWinner')}>
                <option value={t1.code}>{t1.name}</option>
                <option value={t2.code}>{t2.name}</option>
              </select>
            </Field>
            <Field label="Toss Decision">
              <select className={selectClass} value={form.tossDecision} onChange={set('tossDecision')}>
                <option value="bat">Bat First</option>
                <option value="field">Field First</option>
              </select>
            </Field>
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--border-hairline)] grid grid-cols-2 gap-4 text-xs text-[var(--text-muted)]">
            <div>
              <div className="text-[var(--text-primary)] font-medium mb-1">{t1.code} record</div>
              {s1.matchesWon}/{s1.totalMatches} wins ({s1.winPct}%)
            </div>
            <div>
              <div className="text-[var(--text-primary)] font-medium mb-1">{t2.code} record</div>
              {s2.matchesWon}/{s2.totalMatches} wins ({s2.winPct}%)
            </div>
            <div className="col-span-2">
              <div className="text-[var(--text-primary)] font-medium mb-1">Head-to-head</div>
              {h2h.total > 0
                ? `${h2h.total} matches — ${t1.code} won ${h2h.winsA}, ${t2.code} won ${h2h.winsB}`
                : 'These teams have not played each other in this dataset'}
            </div>
          </div>
        </Card>

        <Card title="PREDICTION RESULT">
          <div className="flex items-center justify-between mt-2">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold" style={{ background: t1.color }}>{t1.code}</div>
              <div className="text-sm text-[var(--text-secondary)]">{t1.name}</div>
            </div>
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke={chart.gridline} strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke={t1.color} strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - prob / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-xl font-bold text-[var(--text-primary)]">{t1.code}</div>
                <div className="text-[10px] text-[var(--text-muted)] tracking-wide">WIN PROBABILITY</div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold" style={{ background: t2.color }}>{t2.code}</div>
              <div className="text-sm text-[var(--text-secondary)]">{t2.name}</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 px-2">
            <span className="text-2xl font-bold tabular-nums" style={{ color: t1.color }}>{prob}%</span>
            <span className="text-2xl font-bold tabular-nums" style={{ color: t2.color }}>{100 - prob}%</span>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border-hairline)]">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Match Situation</h4>
            <p className="text-xs text-[var(--text-muted)] mb-3">
              {t1.code} is {prob >= 50 ? 'favored to win' : 'the underdog'} based on all-time win rate, head-to-head record, and last-5-match form.
            </p>
            <div className="h-2 rounded-full bg-[var(--surface-hover)] overflow-hidden flex">
              <div className="h-full" style={{ width: `${prob}%`, background: t1.color }} />
              <div className="h-full flex-1" style={{ background: t2.color }} />
            </div>
            <div className="flex justify-between text-[11px] text-[var(--text-muted)] mt-1.5">
              <span>{t1.code}</span>
              <span>{t2.code}</span>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-[var(--text-muted)] leading-relaxed">
            Heuristic estimate from historical stats (win %, head-to-head, recent form, toss) — not yet a trained ML model.
          </p>
        </Card>
      </div>
    </div>
  )
}
