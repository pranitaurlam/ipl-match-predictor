import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import { teams, teamComparisonStats, headToHead, recentForm } from '../data/mockData'

const resultColor = { W: 'bg-green-500', L: 'bg-red-500' }

const selectClass =
  'bg-[#1a1b26] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500'

export default function TeamComparison() {
  const [teamA, setTeamA] = useState('MI')
  const [teamB, setTeamB] = useState('CSK')
  const a = teams.find((t) => t.code === teamA) ?? teams[0]
  const b = teams.find((t) => t.code === teamB) ?? teams[1]

  const donutData = [
    { name: a.code, value: headToHead.teamA.wins, color: a.color },
    { name: b.code, value: headToHead.teamB.wins, color: b.color },
  ]

  return (
    <div>
      <Topbar title="TEAM COMPARISON" subtitle="Compare two IPL teams" />
      <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2" style={{ background: a.color }} />
              <select className={selectClass} value={teamA} onChange={(e) => setTeamA(e.target.value)}>
                {teams.map((t) => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </div>
            <span className="text-gray-500 font-semibold">VS</span>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full mx-auto mb-2" style={{ background: b.color }} />
              <select className={selectClass} value={teamB} onChange={(e) => setTeamB(e.target.value)}>
                {teams.map((t) => (
                  <option key={t.code} value={t.code}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <table className="w-full text-sm">
            <tbody>
              {teamComparisonStats.map((row) => (
                <tr key={row.label} className="border-t border-white/5">
                  <td className="py-2.5 text-gray-300 text-right w-1/3">{row.a}</td>
                  <td className="py-2.5 text-gray-500 text-center text-xs w-1/3">{row.label}</td>
                  <td className="py-2.5 text-gray-300 w-1/3">{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-white mb-2">Recent Form (Last 5 Matches)</h4>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {recentForm.a.map((r, i) => (
                  <span key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium text-white ${resultColor[r]}`}>{r}</span>
                ))}
              </div>
              <div className="flex gap-1.5">
                {recentForm.b.map((r, i) => (
                  <span key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium text-white ${resultColor[r]}`}>{r}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Head to Head">
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={donutData} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={2}>
                  {donutData.map((d) => (
                    <Cell key={d.name} fill={d.color} stroke="none" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-white">{headToHead.total}</div>
              <div className="text-[11px] text-gray-500">Matches</div>
            </div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span style={{ color: a.color }}>{a.code} {headToHead.teamA.wins}</span>
            <span style={{ color: b.color }}>{b.code} {headToHead.teamB.wins}</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
