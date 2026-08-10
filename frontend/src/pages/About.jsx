import Topbar from '../components/Topbar'
import Card from '../components/Card'
import { matches, teams } from '../utils/stats'

const techStack = ['Python', 'Pandas', 'scikit-learn', 'React', 'Tailwind CSS']
const seasons = [...new Set(matches.map((m) => m.season))].sort((a, b) => a - b)

export default function About() {
  return (
    <div>
      <Topbar title="ABOUT THE PROJECT" subtitle="Learn more about IPL Match Winner Prediction" />
      <div className="px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="About This Project">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This project analyzes IPL match history to estimate winning probability based on team performance,
            venue, toss decision, recent form, and head-to-head record. The current estimate is a data-driven
            heuristic; a trained ML model is planned for a later phase.
          </p>
        </Card>

        <Card title="Dataset">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
            <a
              href="https://www.kaggle.com/datasets/vedantbhavsar43/ipl-2007-to-2026-complete-ball-by-ball-dataset"
              target="_blank" rel="noreferrer"
              className="underline hover:text-[var(--text-primary)]"
            >
              IPL 2007–2026 Complete Ball-by-Ball Dataset
            </a>{' '}
            (Kaggle), including ball-by-ball data.
          </p>
          <ul className="text-sm text-[var(--text-muted)] space-y-1.5">
            <li>Matches: {matches.length.toLocaleString()}</li>
            <li>Teams: {teams.length}</li>
            <li>Seasons: {seasons.length} ({seasons[0]}–{seasons[seasons.length - 1]})</li>
          </ul>
        </Card>

        <Card title="Technologies Used">
          <div className="flex flex-wrap gap-2 mt-1">
            {techStack.map((t) => (
              <span key={t} className="text-xs bg-[var(--surface-hover)] border border-[var(--border-hairline)] rounded-full px-3 py-1.5 text-[var(--text-secondary)]">
                {t}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
