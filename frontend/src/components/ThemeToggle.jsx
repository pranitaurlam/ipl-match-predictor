import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../utils/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors
        bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
