import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import { teams, seasonTrends, keyInsights } from '../data/mockData'

const tabs = ['Season Trends', 'Venue Analysis', 'Toss Analysis', 'Powerplay Analysis', 'Chase Analysis']

const tooltipStyle = { background: '#1a1b26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#e5e7eb' }

export default function Analytics() {
  const [tab, setTab] = useState(tabs[0])

  return (
    <div>
      <Topbar title="ANALYTICS" subtitle="Detailed insights and analytics" />
      <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex gap-1 mb-4 border-b border-white/5 -mx-5 px-5 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-2 text-xs whitespace-nowrap border-b-2 transition-colors ${
                  tab === t ? 'border-blue-500 text-white' : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <h4 className="text-sm text-gray-300 mb-2">{tab} - Matches Won by Team</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={seasonTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {teams.map((t) => (
                <Line key={t.code} type="monotone" dataKey={t.code} stroke={t.color} strokeWidth={1.5} dot={false} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Key Insights">
          <ul className="space-y-3 mt-1">
            {keyInsights.map((insight, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                {insight}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
