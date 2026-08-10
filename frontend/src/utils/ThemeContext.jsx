import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { teams as rawTeams } from './stats'

const ThemeContext = createContext(null)

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

// Chart-only colors that can't be expressed as Tailwind classes (recharts inline props).
const CHART_THEME = {
  dark: {
    surface: '#16171f',
    tooltipBg: '#1c1d27',
    tooltipBorder: 'rgba(255,255,255,0.1)',
    tooltipText: '#ffffff',
    gridline: '#2c2c2a',
    baseline: '#383835',
    axisTick: '#898781',
    cursorFill: 'rgba(255,255,255,0.04)',
  },
  light: {
    surface: '#fcfcfb',
    tooltipBg: '#ffffff',
    tooltipBorder: 'rgba(11,11,11,0.1)',
    tooltipText: '#0b0b0b',
    gridline: '#e1e0d9',
    baseline: '#c3c2b7',
    axisTick: '#6b6b66',
    cursorFill: 'rgba(11,11,11,0.04)',
  },
}

export function useChartTheme() {
  const { theme } = useTheme()
  return CHART_THEME[theme]
}

// Teams with `.color` resolved to the current theme's validated categorical hue,
// so pages that read `team.color` don't need their own theme branching.
export function useThemedTeams() {
  const { theme } = useTheme()
  return useMemo(
    () => rawTeams.map((t) => ({ ...t, color: theme === 'dark' ? t.colorDark : t.colorLight })),
    [theme]
  )
}
