import { useMemo, useState } from 'react'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import { teams } from '../data/mockData'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-500 mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}

const selectClass =
  'w-full bg-[#1a1b26] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500'

export default function PredictWinner() {
  const [form, setForm] = useState({
    team1: 'MI',
    team2: 'CSK',
    venue: 'Wankhede Stadium, Mumbai',
    tossWinner: 'MI',
    tossDecision: 'Bat First',
    target: 180,
    current: 152,
    overs: 18,
    wickets: 4,
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const prob = useMemo(() => {
    const target = Number(form.target) || 1
    const current = Number(form.current) || 0
    const overs = Number(form.overs) || 0
    const wickets = Number(form.wickets) || 0
    const runsNeeded = Math.max(target - current, 0)
    const oversLeft = Math.max(20 - overs, 0.1)
    const reqRate = runsNeeded / oversLeft
    const wicketsFactor = (10 - wickets) / 10
    let p = 100 - reqRate * 6 + wicketsFactor * 20
    p = Math.min(95, Math.max(5, Math.round(p)))
    return p
  }, [form])

  const t1 = teams.find((t) => t.code === form.team1) ?? teams[0]
  const t2 = teams.find((t) => t.code === form.team2) ?? teams[1]

  return (
    <div>
      <Topbar title="PREDICT MATCH WINNER" subtitle="Enter match details to get the winning probability" />
      <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Team 1">
              <select className={selectClass} value={form.team1} onChange={set('team1')}>
                {teams.map((t) => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Target Runs">
              <input className={selectClass} type="number" value={form.target} onChange={set('target')} />
            </Field>
            <Field label="Team 2">
              <select className={selectClass} value={form.team2} onChange={set('team2')}>
                {teams.map((t) => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Current Score">
              <input className={selectClass} type="number" value={form.current} onChange={set('current')} />
            </Field>
            <Field label="Venue">
              <select className={selectClass} value={form.venue} onChange={set('venue')}>
                <option>Wankhede Stadium, Mumbai</option>
                <option>Eden Gardens, Kolkata</option>
                <option>M. Chinnaswamy Stadium, Bengaluru</option>
                <option>MA Chidambaram Stadium, Chennai</option>
              </select>
            </Field>
            <Field label="Overs Completed">
              <input className={selectClass} type="number" value={form.overs} onChange={set('overs')} />
            </Field>
            <Field label="Toss Winner">
              <select className={selectClass} value={form.tossWinner} onChange={set('tossWinner')}>
                {teams.map((t) => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Wickets Fallen">
              <input className={selectClass} type="number" value={form.wickets} onChange={set('wickets')} />
            </Field>
            <Field label="Toss Decision">
              <select className={selectClass} value={form.tossDecision} onChange={set('tossDecision')}>
                <option>Bat First</option>
                <option>Bowl First</option>
              </select>
            </Field>
          </div>
          <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2.5 text-sm font-medium">
            Predict Winner
          </button>
        </Card>

        <Card title="PREDICTION RESULT">
          <div className="flex items-center justify-between mt-2">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: t1.color }} />
              <div className="text-sm text-gray-300">{t1.name}</div>
            </div>
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2028" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  strokeDashoffset={`${2 * Math.PI * 42 * (1 - prob / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-xl font-bold text-white">{t1.code}</div>
                <div className="text-xs text-gray-500">WIN PROBABILITY</div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ background: t2.color }} />
              <div className="text-sm text-gray-300">{t2.name}</div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 px-2">
            <span className="text-2xl font-bold" style={{ color: t1.color }}>{prob}%</span>
            <span className="text-2xl font-bold" style={{ color: t2.color }}>{100 - prob}%</span>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-white mb-1">Match Situation</h4>
            <p className="text-xs text-gray-500 mb-3">
              {t1.code} is {prob >= 50 ? 'in a strong position' : 'facing an uphill battle'} to win the match.
            </p>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
              <div className="h-full" style={{ width: `${prob}%`, background: t1.color }} />
              <div className="h-full flex-1" style={{ background: t2.color }} />
            </div>
            <div className="flex justify-between text-[11px] text-gray-500 mt-1.5">
              <span>{t1.code}</span>
              <span>{t2.code}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
