import Topbar from '../components/Topbar'
import Card from '../components/Card'

const techStack = ['Python', 'Pandas', 'FastAPI', 'React', 'Tailwind CSS']

export default function About() {
  return (
    <div>
      <Topbar title="ABOUT THE PROJECT" subtitle="Learn more about IPL Match Winner Prediction" />
      <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="About This Project">
          <p className="text-xs text-gray-400 leading-relaxed">
            This project uses Machine Learning algorithms to predict the winner of IPL matches based on historical
            data and match conditions. The model considers factors like team performance, venue, toss decision,
            recent form, and more.
          </p>
        </Card>

        <Card title="Dataset">
          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            The dataset includes IPL matches from 2008 to 2024 including ball-by-ball data.
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>Matches: 1157</li>
            <li>Deliveries: 250K+</li>
            <li>Seasons: 16</li>
          </ul>
        </Card>

        <Card title="Technologies Used">
          <div className="flex flex-wrap gap-2 mt-1">
            {techStack.map((t) => (
              <span key={t} className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-300">
                {t}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
