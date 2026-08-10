import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import PredictWinner from './pages/PredictWinner'
import TeamComparison from './pages/TeamComparison'
import Analytics from './pages/Analytics'
import Players from './pages/Players'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<PredictWinner />} />
          <Route path="/compare" element={<TeamComparison />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/players" element={<Players />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
