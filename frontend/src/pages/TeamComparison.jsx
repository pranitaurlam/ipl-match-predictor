import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import { useChartTheme, useThemedTeams } from '../utils/ThemeContext'
import { teamStats, headToHead, recentForm } from '../utils/stats'

const resultColor = { W: 'bg-[var(--status-good)]', L: 'bg-[var(--status-critical)]' }

const selectClass =
  'bg-[var(--surface-card-hover)] border border-[var(--border-hairline)] rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]'

export default function TeamComparison() {
  const teams = useThemedTeams()
  const chart = useChartTheme()
  const tooltipStyle = {
    background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: 10,
    fontSize: 12, color: chart.tooltipText, padding: '8px 12px',
  }

  const [teamA, setTeamA] = useState(teams[0].code)
  const [teamB, setTeamB] = useState(teams[1].code)
  const a = teams.find((t) => t.code === teamA) ?? teams[0]
  const b = teams.find((t) => t.code === teamB) ?? teams[1]

  const statsA = teamStats(a.name)
  const statsB = teamStats(b.name)
  const h2h = headToHead(a.name, b.name)
  const formA = recentForm(a.name)
  const formB = recentForm(b.name)

  const rows = [
    { label: 'Total Matches', a: statsA.totalMatches, b: statsB.totalMatches },
    { label: 'Matches Won', a: statsA.matchesWon, b: statsB.matchesWon },
    { label: 'Win Percentage', a: `${statsA.winPct}%`, b: `${statsB.winPct}%` },
    { label: 'Best Venue', a: statsA.bestVenue, b: statsB.bestVenue },
  ]

  const donutData =
    h2h.total > 0
      ? [
          { name: a.code, value: h2h.winsA, color: a.color },
          { name: b.code, value: h2h.winsB, color: b.color },
          ...(h2h.total - h2h.winsA - h2h.winsB > 0
            ? [{ name: 'No Result', value: h2h.total - h2h.winsA - h2h.winsB, color: 'var(--text-muted)' }]
            : []),
        ]
      : []

  return (
    <div>
      <Topbar title="TEAM COMPARISON" subtitle="Compare any two franchises head-to-head" />
      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm" style={{ background: a.color }}>
                {a.code}
              </div>
              <select className={selectClass} value={teamA} onChange={(e) => setTeamA(e.target.value)}>
                {teams.map((t) => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </div>
            <span className="text-[var(--text-muted)] font-semibold">VS</span>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm" style={{ background: b.color }}>
                {b.code}
              </div>
              <select className={selectClass} value={teamB} onChange={(e) => setTeamB(e.target.value)}>
                {teams.map((t) => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <table className="w-full text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-[var(--border-hairline)]">
                  <td className="py-2.5 text-[var(--text-primary)] text-right w-1/3 tabular-nums font-medium">{row.a}</td>
                  <td className="py-2.5 text-[var(--text-muted)] text-center text-xs w-1/3">{row.label}</td>
                  <td className="py-2.5 text-[var(--text-primary)] w-1/3 tabular-nums font-medium">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 pt-4 border-t border-[var(--border-hairline)]">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Recent Form (Last 5 Decisive Matches)</h4>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {formA.length === 0 && <span className="text-xs text-[var(--text-muted)]">No data</span>}
                {formA.map((r, i) => (
                  <span key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium text-white ${resultColor[r]}`}>{r}</span>
                ))}
              </div>
              <div className="flex gap-1.5">
                {formB.length === 0 && <span className="text-xs text-[var(--text-muted)]">No data</span>}
                {formB.map((r, i) => (
                  <span key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium text-white ${resultColor[r]}`}>{r}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Head to Head" subtitle={`${h2h.total} matches played`}>
          {h2h.total === 0 ? (
            <p className="text-sm text-[var(--text-muted)] py-8 text-center">These teams haven't played each other yet.</p>
          ) : (
            <>
              <div className="relative">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={donutData} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={3} stroke={chart.surface} strokeWidth={2}>
                      {donutData.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums">{h2h.total}</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Matches</div>
                </div>
              </div>
              <div className="flex justify-center gap-6 text-sm mt-2">
                {donutData.map((d) => (
                  <span key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    <span style={{ color: d.color }}>{d.name}</span>
                    <span className="text-[var(--text-primary)] tabular-nums">{d.value}</span>
                  </span>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
