import { Sun, User } from 'lucide-react'

export default function Topbar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div>
        <h1 className="text-lg font-semibold text-white tracking-wide">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white">
          <Sun size={16} />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
          <User size={16} />
        </div>
      </div>
    </header>
  )
}
