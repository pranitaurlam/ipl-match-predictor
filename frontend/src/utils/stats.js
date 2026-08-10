import matches from '../data/matches.json'
import teams from '../data/teams.json'
import topScorers from '../data/top_scorers.json'

export { matches, teams, topScorers }

export const teamByName = Object.fromEntries(teams.map((t) => [t.name, t]))
export const teamByCode = Object.fromEntries(teams.map((t) => [t.code, t]))

const OTHER_COLOR = { dark: '#5b5a56', light: '#8a8880' }
const colorKey = (theme) => (theme === 'light' ? 'colorLight' : 'colorDark')

const decisive = matches.filter((m) => m.winner)

export function overviewStats() {
  const total = matches.length
  const battingFirstWins = decisive.filter((m) => {
    const battedFirstTeam = m.tossDecision === 'bat' ? m.tossWinner : otherTeam(m)
    return m.winner === battedFirstTeam
  }).length
  const bowlingFirstWins = decisive.length - battingFirstWins
  const tossImpact = decisive.filter((m) => m.tossWinner === m.winner).length / decisive.length

  return [
    { label: 'Total Matches', value: total.toLocaleString(), icon: 'trophy', color: 'blue' },
    { label: 'Matches Won Batting First', value: battingFirstWins.toLocaleString(), icon: 'target', color: 'green' },
    { label: 'Matches Won Bowling First', value: bowlingFirstWins.toLocaleString(), icon: 'shield', color: 'orange' },
    { label: 'Toss → Match Win Rate', value: `${Math.round(tossImpact * 100)}%`, icon: 'coins', color: 'purple' },
  ]
}

function otherTeam(m) {
  return m.tossWinner === m.team1 ? m.team2 : m.team1
}

export function matchesWonByTeam(topN = teams.length, theme = 'dark') {
  const key = colorKey(theme)
  const counts = {}
  decisive.forEach((m) => {
    counts[m.winner] = (counts[m.winner] || 0) + 1
  })
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const top = sorted.slice(0, topN)
  const others = sorted.slice(topN).reduce((sum, [, c]) => sum + c, 0)
  const total = decisive.length

  const rows = top.map(([name, count]) => ({
    name: teamByName[name]?.code ?? name,
    value: Math.round((count / total) * 1000) / 10,
    color: teamByName[name]?.[key] ?? OTHER_COLOR[theme],
  }))
  if (others > 0) {
    rows.push({ name: 'Others', value: Math.round((others / total) * 1000) / 10, color: OTHER_COLOR[theme] })
  }
  return rows
}

export function tossDecisionImpact(theme = 'dark') {
  const key = colorKey(theme)
  const counts = { bat: 0, field: 0 }
  matches.forEach((m) => {
    if (m.tossDecision in counts) counts[m.tossDecision] += 1
  })
  const total = counts.bat + counts.field
  return [
    { name: 'Bat First', value: Math.round((counts.bat / total) * 1000) / 10, color: teams[0][key] },
    { name: 'Field First', value: Math.round((counts.field / total) * 1000) / 10, color: teams[2][key] },
  ]
}

export function matchesWonAtVenues(topN = 5) {
  const counts = {}
  matches.forEach((m) => {
    counts[m.venue] = (counts[m.venue] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([venue, count]) => ({ venue: venue.split(',')[0], matches: count }))
}

export function matchesOverYears() {
  const counts = {}
  matches.forEach((m) => {
    counts[m.season] = (counts[m.season] || 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([year, count]) => ({ year: Number(year), matches: count }))
}

export function topPlayerOfMatch(topN = 5, season = null) {
  const counts = {}
  matches.forEach((m) => {
    if (season != null && m.season !== season) return
    if (m.playerOfMatch && m.playerOfMatch !== 'No Result') {
      counts[m.playerOfMatch] = (counts[m.playerOfMatch] || 0) + 1
    }
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([name, awards], i) => ({ rank: i + 1, name, value: awards }))
}

export function topRunScorers(topN = 5) {
  return topScorers.allTime.slice(0, topN).map((p, i) => ({ rank: i + 1, name: p.name, value: p.runs }))
}

export function topRunScorersBySeason(season, topN = 5) {
  const rows = topScorers.bySeason[String(season)] ?? []
  return rows.slice(0, topN).map((p, i) => ({ rank: i + 1, name: p.name, value: p.runs }))
}

export const currentSeasonYear = topScorers.currentSeasonYear
export const scorerSeasons = Object.keys(topScorers.bySeason)
  .map(Number)
  .sort((a, b) => b - a)

export function seasonTrends(topN = 8) {
  const topTeams = teams.slice(0, topN)
  const seasons = [...new Set(matches.map((m) => m.season))].sort((a, b) => a - b)

  return seasons.map((season) => {
    const row = { year: season }
    topTeams.forEach((t) => {
      row[t.code] = decisive.filter((m) => m.season === season && m.winner === t.name).length
    })
    return row
  })
}

export function teamStats(teamName) {
  const played = matches.filter((m) => m.team1 === teamName || m.team2 === teamName)
  const won = played.filter((m) => m.winner === teamName)
  const venueWins = {}
  won.forEach((m) => {
    venueWins[m.venue] = (venueWins[m.venue] || 0) + 1
  })
  const bestVenue = Object.entries(venueWins).sort((a, b) => b[1] - a[1])[0]?.[0]

  return {
    totalMatches: played.length,
    matchesWon: won.length,
    winPct: played.length ? ((won.length / played.length) * 100).toFixed(2) : '0.00',
    bestVenue: bestVenue ? bestVenue.split(',')[0] : '—',
  }
}

export function headToHead(teamA, teamB) {
  const pairs = matches.filter(
    (m) =>
      (m.team1 === teamA && m.team2 === teamB) || (m.team1 === teamB && m.team2 === teamA)
  )
  const winsA = pairs.filter((m) => m.winner === teamA).length
  const winsB = pairs.filter((m) => m.winner === teamB).length
  return { total: pairs.length, winsA, winsB }
}

export function recentForm(teamName, n = 5) {
  const played = matches
    .filter((m) => (m.team1 === teamName || m.team2 === teamName) && m.winner)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, n)
    .reverse()
  return played.map((m) => (m.winner === teamName ? 'W' : 'L'))
}

export function keyInsights() {
  const byTeam = teams.slice(0, 8).map((t) => ({ ...t, stats: teamStats(t.name) }))
  const mostConsistent = [...byTeam].sort((a, b) => b.stats.winPct - a.stats.winPct)[0]
  const battingFirstWins = decisive.filter((m) => {
    const battedFirstTeam = m.tossDecision === 'bat' ? m.tossWinner : otherTeam(m)
    return m.winner === battedFirstTeam
  }).length
  const bowlFirstPct = Math.round(((decisive.length - battingFirstWins) / decisive.length) * 100)
  const venues = matchesWonAtVenues(1)[0]
  const tossWinPct = Math.round(
    (decisive.filter((m) => m.tossWinner === m.winner).length / decisive.length) * 100
  )

  return [
    `${mostConsistent.code} has the highest win percentage among the most active franchises, at ${mostConsistent.stats.winPct}%.`,
    `Teams winning the toss go on to win the match ${tossWinPct}% of the time.`,
    `Bowling first has produced the win in ${bowlFirstPct}% of decisive matches.`,
    `${venues.venue} has hosted more matches than any other venue (${venues.matches}).`,
  ]
}

export function predictWinProbability({ team1, team2, tossWinner, tossDecision, venue }) {
  const s1 = teamStats(team1)
  const s2 = teamStats(team2)
  const h2h = headToHead(team1, team2)
  const h2hRate = h2h.total > 0 ? h2h.winsA / h2h.total : 0.5

  const form1 = recentForm(team1, 5)
  const form2 = recentForm(team2, 5)
  const formRate1 = form1.length ? form1.filter((r) => r === 'W').length / form1.length : 0.5
  const formRate2 = form2.length ? form2.filter((r) => r === 'W').length / form2.length : 0.5

  const tossBonus = tossWinner === team1 ? 0.03 : tossWinner === team2 ? -0.03 : 0

  const score1 =
    Number(s1.winPct) / 100 * 0.35 +
    h2hRate * 0.3 +
    formRate1 * 0.25 +
    (0.5 + tossBonus) * 0.1
  const score2 =
    Number(s2.winPct) / 100 * 0.35 +
    (1 - h2hRate) * 0.3 +
    formRate2 * 0.25 +
    (0.5 - tossBonus) * 0.1

  const total = score1 + score2 || 1
  let prob = Math.round((score1 / total) * 100)
  prob = Math.min(88, Math.max(12, prob))
  return prob
}
