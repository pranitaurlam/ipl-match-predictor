export const overviewStats = [
  { label: 'Total Matches', value: '1157', icon: 'trophy', color: 'blue' },
  { label: 'Matches Won Batting First', value: '566', icon: 'target', color: 'green' },
  { label: 'Matches Won Bowling First', value: '591', icon: 'shield', color: 'orange' },
  { label: 'Toss Impact', value: '49%', icon: 'coins', color: 'purple' },
]

export const heroStats = [
  { label: 'Seasons', value: '16', icon: 'calendar' },
  { label: 'Matches', value: '1157', icon: 'bar-chart' },
  { label: 'Teams', value: '10', icon: 'search' },
  { label: 'Players', value: '250+', icon: 'users' },
  { label: 'Predictions', value: '10M+', icon: 'zap' },
]

export const teams = [
  { code: 'MI', name: 'Mumbai Indians', color: '#2563eb' },
  { code: 'CSK', name: 'Chennai Super Kings', color: '#eab308' },
  { code: 'KKR', name: 'Kolkata Knight Riders', color: '#7c3aed' },
  { code: 'RCB', name: 'Royal Challengers Bengaluru', color: '#dc2626' },
  { code: 'SRH', name: 'Sunrisers Hyderabad', color: '#f97316' },
  { code: 'RR', name: 'Rajasthan Royals', color: '#ec4899' },
  { code: 'DC', name: 'Delhi Capitals', color: '#3b82f6' },
  { code: 'PBKS', name: 'Punjab Kings', color: '#ef4444' },
  { code: 'GT', name: 'Gujarat Titans', color: '#06b6d4' },
  { code: 'LSG', name: 'Lucknow Super Giants', color: '#22d3ee' },
]

export const matchesWonByTeam = [
  { name: 'MI', value: 22.5, color: '#2563eb' },
  { name: 'CSK', value: 20.8, color: '#eab308' },
  { name: 'KKR', value: 14.6, color: '#7c3aed' },
  { name: 'RCB', value: 13.2, color: '#dc2626' },
  { name: 'SRH', value: 10.3, color: '#f97316' },
  { name: 'Others', value: 18.6, color: '#475569' },
]

export const tossDecisionImpact = [
  { name: 'Bat First', value: 53.8, color: '#3b82f6' },
  { name: 'Bowl First', value: 46.2, color: '#22c55e' },
]

export const matchesWonAtVenues = [
  { venue: 'Eden Gardens', matches: 104 },
  { venue: 'Wankhede', matches: 93 },
  { venue: 'M. Chinnaswamy', matches: 88 },
  { venue: 'Arun Jaitley', matches: 77 },
  { venue: 'Chepauk', matches: 75 },
]

export const matchesOverYears = [
  { year: 2008, matches: 58 }, { year: 2010, matches: 60 }, { year: 2012, matches: 74 },
  { year: 2014, matches: 60 }, { year: 2016, matches: 60 }, { year: 2018, matches: 60 },
  { year: 2020, matches: 60 }, { year: 2022, matches: 74 }, { year: 2024, matches: 74 },
]

export const topRunScorers = [
  { rank: 1, name: 'Virat Kohli', value: 7263 },
  { rank: 2, name: 'Rohit Sharma', value: 6211 },
  { rank: 3, name: 'Suresh Raina', value: 5528 },
  { rank: 4, name: 'David Warner', value: 5162 },
  { rank: 5, name: 'MS Dhoni', value: 4978 },
]

export const seasonTrends = [2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024].map((year) => {
  const row = { year }
  teams.forEach((t, i) => {
    row[t.code] = Math.round(20 + Math.sin(year / (3 + i)) * 15 + i * 3)
  })
  return row
})

export const keyInsights = [
  'MI has the most consistent performance across seasons.',
  'CSK is strongest in chase scenarios.',
  'Teams winning the toss and bowling first have higher win rate.',
  'Wankhede and Chinnaswamy are high scoring venues.',
]

export const headToHead = { teamA: { code: 'MI', wins: 20 }, teamB: { code: 'CSK', wins: 17 }, total: 38 }

export const teamComparisonStats = [
  { label: 'Total Matches', a: '237', b: '243' },
  { label: 'Matches Won', a: '126', b: '131' },
  { label: 'Win Percentage', a: '53.16%', b: '53.91%' },
  { label: 'Highest Score', a: '223/6', b: '246/5' },
  { label: 'Lowest Score', a: '67/10', b: '79/10' },
  { label: 'Average Score', a: '168.4', b: '169.7' },
  { label: 'Best At Venue', a: 'Wankhede Stadium', b: 'MA Chidambaram Stadium' },
]

export const recentForm = { a: ['W', 'W', 'L', 'W', 'L'], b: ['W', 'L', 'L', 'W', 'W'] }
