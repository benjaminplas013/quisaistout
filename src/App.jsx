import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { GameProvider } from './contexts/GameContext'
import { CoupleProvider } from './contexts/CoupleContext'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Admin from './pages/Admin'
import CultureGenerale from './pages/game/CultureGenerale'
import KidsMode from './pages/game/KidsMode'
import BombeMode from './pages/game/BombeMode'
import DuoMode from './pages/game/DuoMode'
import CoupleMode from './pages/game/CoupleMode'

function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth()
  if (loading) return <div className="loading-screen">Chargement...</div>
  if (!user || !isAdmin) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/game/culture" element={<CultureGenerale />} />
      <Route path="/game/kids" element={<KidsMode />} />
      <Route path="/game/bombe" element={<BombeMode />} />
      <Route path="/game/duo" element={<DuoMode />} />
      <Route path="/game/couple" element={<CoupleMode />} />
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <CoupleProvider>
            <AppRoutes />
          </CoupleProvider>
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
