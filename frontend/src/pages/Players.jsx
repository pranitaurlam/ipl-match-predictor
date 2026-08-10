import { useState } from 'react'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import {
  topRunScorers, topRunScorersBySeason, topPlayerOfMatch,
  currentSeasonYear, scorerSeasons,
} from '../utils/stats'

const selectClass =
  'bg-[var(--surface-card-hover)] border border-[var(--border-hairline)] rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent)]'

function RankedTable({ rows, unit }) {
  if (rows.length === 0) {
    return <p className="text-sm text-[var(--text-muted)] py-6 text-center">No data yet.</p>
  }
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map((p) => (
          <tr key={p.rank} className="border-t border-[var(--border-hairline)] first:border-0">
            <td className="py-2.5 text-[var(--text-muted)] w-8 tabular-nums">{p.rank}</td>
            <td className="py-2.5 text-[var(--text-secondary)]">{p.name}</td>
            <td className="py-2.5 text-right text-[var(--text-muted)] tabular-nums">{p.value.toLocaleString()} {unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Players() {
  const [season, setSeason] = useState(currentSeasonYear)

  return (
    <div>
      <Topbar
        title="PLAYERS"
        subtitle="Top performers across IPL seasons, computed from real match data"
        action={
          <select className={selectClass} value={season} onChange={(e) => setSeason(Number(e.target.value))}>
            {scorerSeasons.map((y) => (
              <option key={y} value={y}>{y} Season</option>
            ))}
          </select>
        }
      />
      <div className="px-8 py-6 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card title={`Top Run Scorers — ${season}`} subtitle="Includes new and breakout players from that season">
            <RankedTable rows={topRunScorersBySeason(season, 15)} unit="runs" />
          </Card>
          <Card title={`Player of the Match — ${season}`} subtitle="Awards from that season only">
            <RankedTable rows={topPlayerOfMatch(15, season)} unit="awards" />
          </Card>
        </div>

        <Card title="Top Run Scorers — All Time" subtitle="Career totals, naturally led by long-tenured veterans">
          <RankedTable rows={topRunScorers(15)} unit="runs" />
        </Card>
      </div>
    </div>
  )
}
