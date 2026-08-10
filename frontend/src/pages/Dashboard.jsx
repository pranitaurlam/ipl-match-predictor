import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line, Tooltip, CartesianGrid } from 'recharts'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import StatTile from '../components/StatTile'
import { overviewStats, matchesWonByTeam, tossDecisionImpact, matchesWonAtVenues, matchesOverYears, topRunScorers } from '../data/mockData'

const tooltipStyle = { background: '#1a1b26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#e5e7eb' }

function Donut({ data }) {
  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={38} outerRadius={60} paddingAngle={2}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="space-y-1.5 text-xs">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-2 text-gray-400">
            <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
            {d.name} <span className="text-gray-500">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div>
      <Topbar title="DASHBOARD OVERVIEW" />
      <div className="px-8 pb-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((s) => (
            <StatTile key={s.label} {...s} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card title="Matches Won by Team">
            <Donut data={matchesWonByTeam} />
          </Card>
          <Card title="Toss Decision Impact">
            <Donut data={tossDecisionImpact} />
          </Card>
          <Card title="Matches Won at Venues">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={matchesWonAtVenues} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="venue" type="category" width={90} tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="matches" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card title="Matches Over the Years">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={matchesOverYears}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="matches" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Top Players" subtitle="Run Scorers · Wicket Takers">
            <table className="w-full text-sm">
              <tbody>
                {topRunScorers.map((p) => (
                  <tr key={p.rank} className="border-t border-white/5 first:border-0">
                    <td className="py-2 text-gray-500 w-6">{p.rank}</td>
                    <td className="py-2 text-gray-200">{p.name}</td>
                    <td className="py-2 text-right text-gray-400">{p.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  )
}
