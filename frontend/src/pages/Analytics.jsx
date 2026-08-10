import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import { useChartTheme, useThemedTeams } from '../utils/ThemeContext'
import { teams as rawTeams, seasonTrends, keyInsights } from '../utils/stats'

// All 14 franchises are selectable; default to the 4 most active so the chart
// starts legible instead of a tangle of overlapping lines.
const DEFAULT_SELECTED = rawTeams.slice(0, 4).map((t) => t.code)

export default function Analytics() {
  const teams = useThemedTeams()
  const chart = useChartTheme()
  const tooltipStyle = {
    background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: 10,
    fontSize: 12, color: chart.tooltipText, padding: '8px 12px',
  }

  const [selected, setSelected] = useState(DEFAULT_SELECTED)
  const trends = seasonTrends(teams.length)
  const insights = keyInsights()

  const toggle = (code) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    )
  }

  const activeTeams = teams.filter((t) => selected.includes(t.code))

  return (
    <div>
      <Topbar title="ANALYTICS" subtitle="Season-wise wins — choose which franchises to compare" />
      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2" title="Season Trends — Matches Won by Team">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {teams.map((t) => {
              const active = selected.includes(t.code)
              return (
                <button
                  key={t.code}
                  onClick={() => toggle(t.code)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-colors"
                  style={{
                    borderColor: active ? t.color : 'var(--border-hairline)',
                    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                    background: active ? `${t.color}26` : 'transparent',
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                  {t.code}
                </button>
              )
            })}
          </div>
          {activeTeams.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)] py-16 text-center">Select at least one team to see its trend.</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={trends} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.gridline} vertical={false} />
                <XAxis dataKey="year" tick={{ fill: chart.axisTick, fontSize: 11 }} axisLine={{ stroke: chart.baseline }} tickLine={false} />
                <YAxis tick={{ fill: chart.axisTick, fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: chart.baseline }} />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                  formatter={(value) => <span style={{ color: 'var(--text-secondary)' }}>{value}</span>}
                />
                {activeTeams.map((t) => (
                  <Line
                    key={t.code}
                    type="monotone"
                    dataKey={t.code}
                    name={t.code}
                    stroke={t.color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card title="Key Insights" subtitle="Computed from the full match history">
          <ul className="space-y-4 mt-1">
            {insights.map((insight, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--accent)' }} />
                {insight}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
