import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip, CartesianGrid } from 'recharts'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import StatTile from '../components/StatTile'
import { useTheme, useChartTheme } from '../utils/ThemeContext'
import {
  overviewStats, matchesWonByTeam, tossDecisionImpact, matchesWonAtVenues,
  matchesOverYears, topPlayerOfMatch, topRunScorers,
} from '../utils/stats'

function Donut({ data, legendCols = 1, chart }) {
  const tooltipStyle = {
    background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: 10,
    fontSize: 12, color: chart.tooltipText, padding: '8px 12px',
  }
  return (
    <div className="flex items-center gap-5">
      <ResponsiveContainer width={130} height={130} className="shrink-0">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={38} outerRadius={58} paddingAngle={3} stroke={chart.surface} strokeWidth={2}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
      <ul
        className="text-xs gap-x-4 gap-y-2 w-full"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${legendCols}, minmax(0, 1fr))` }}
      >
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
            <span className="text-[var(--text-secondary)] truncate">{d.name}</span>
            <span className="text-[var(--text-primary)] font-medium tabular-nums ml-auto">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Dashboard() {
  const { theme } = useTheme()
  const chart = useChartTheme()
  const tooltipStyle = {
    background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: 10,
    fontSize: 12, color: chart.tooltipText, padding: '8px 12px',
  }

  const stats = overviewStats()
  const teamWins = matchesWonByTeam(undefined, theme)
  const toss = tossDecisionImpact(theme)
  const venues = matchesWonAtVenues()
  const years = matchesOverYears()
  const players = topPlayerOfMatch()
  const scorers = topRunScorers()

  return (
    <div>
      <Topbar title="DASHBOARD OVERVIEW" subtitle={`Live from ${years[0]?.year}–${years[years.length - 1]?.year}, ${years.reduce((s, y) => s + y.matches, 0)} matches`} />
      <div className="px-8 py-6 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatTile key={s.label} {...s} />
          ))}
        </div>

        <Card title="Matches Won by Team" subtitle="Share of all decisive matches, all 14 franchises">
          <Donut data={teamWins} legendCols={3} chart={chart} />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card title="Toss Decision" subtitle="Bat vs field first, all matches">
            <Donut data={toss} chart={chart} />
          </Card>
          <Card title="Most-Used Venues" subtitle="Top 5 by matches hosted">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={venues} layout="vertical" margin={{ left: 8, right: 24 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="venue" type="category" width={92} tick={{ fill: chart.axisTick, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: chart.cursorFill }} />
                <Bar dataKey="matches" fill="var(--series-1)" radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card title="Matches Over the Years" subtitle="Season by season">
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={years}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.gridline} vertical={false} />
                <XAxis dataKey="year" tick={{ fill: chart.axisTick, fontSize: 11 }} axisLine={{ stroke: chart.baseline }} tickLine={false} />
                <YAxis tick={{ fill: chart.axisTick, fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: chart.baseline }} />
                <Line type="monotone" dataKey="matches" stroke="var(--series-1)" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: 'var(--series-1)' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Top Performers" subtitle="Run scorers · Player of the Match">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-wide text-[var(--text-muted)] mb-2">Run Scorers</div>
                <table className="w-full text-sm">
                  <tbody>
                    {scorers.map((p) => (
                      <tr key={p.rank} className="border-t border-[var(--border-hairline)] first:border-0">
                        <td className="py-1.5 text-[var(--text-muted)] w-5 text-xs">{p.rank}</td>
                        <td className="py-1.5 text-[var(--text-secondary)] truncate max-w-[90px]">{p.name}</td>
                        <td className="py-1.5 text-right text-[var(--text-muted)] tabular-nums text-xs">{p.value.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wide text-[var(--text-muted)] mb-2">Player of the Match</div>
                <table className="w-full text-sm">
                  <tbody>
                    {players.map((p) => (
                      <tr key={p.rank} className="border-t border-[var(--border-hairline)] first:border-0">
                        <td className="py-1.5 text-[var(--text-muted)] w-5 text-xs">{p.rank}</td>
                        <td className="py-1.5 text-[var(--text-secondary)] truncate max-w-[90px]">{p.name}</td>
                        <td className="py-1.5 text-right text-[var(--text-muted)] tabular-nums text-xs">{p.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
