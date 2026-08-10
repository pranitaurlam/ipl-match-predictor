import Topbar from '../components/Topbar'
import Card from '../components/Card'
import { topRunScorers } from '../data/mockData'

export default function Players() {
  return (
    <div>
      <Topbar title="PLAYERS" subtitle="Top performers across IPL seasons" />
      <div className="px-8 pb-8">
        <Card title="Top Run Scorers">
          <table className="w-full text-sm">
            <tbody>
              {topRunScorers.map((p) => (
                <tr key={p.rank} className="border-t border-white/5 first:border-0">
                  <td className="py-2.5 text-gray-500 w-8">{p.rank}</td>
                  <td className="py-2.5 text-gray-200">{p.name}</td>
                  <td className="py-2.5 text-right text-gray-400">{p.value.toLocaleString()} runs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
