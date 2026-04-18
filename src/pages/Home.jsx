import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ParticleBackground from '../components/ui/ParticleBackground'
import ModeCard from '../components/ui/ModeCard'

const MODES = [
  {
    id: 'culture',
    title: 'Culture Générale',
    description: 'Quiz multijoueur, 10 catégories, 200+ questions',
    emoji: '🧠',
    badge: null,
    path: '/game/culture',
  },
  {
    id: 'duo',
    title: 'Qui se connaît le mieux ?',
    description: 'Vrai / Faux, à 2 joueurs',
    emoji: '👥',
    badge: 'POPULAIRE',
    path: '/game/duo',
  },
  {
    id: 'kids',
    title: 'Mode Enfants',
    description: '89 questions adaptées aux enfants',
    emoji: '🌈',
    badge: null,
    path: '/game/kids',
  },
  {
    id: 'bombe',
    title: 'Mode Bombe',
    description: '20 secondes par question ou tu perds une vie !',
    emoji: '💣',
    badge: null,
    path: '/game/bombe',
  },
  {
    id: 'couple',
    title: 'Défis Couple',
    description: '200+ défis romantiques, fun et hot',
    emoji: '💑',
    badge: 'NOUVEAU',
    path: '/game/couple',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="home-page">
      <ParticleBackground />
      <header className="home-header">
        <h1 className="home-title">
          <span className="title-qui">QUI</span> Sait Tout ?
        </h1>
        <p className="home-subtitle">Le jeu de soirée ultime</p>
        {user ? (
          <span className="home-user">👋 {user.email}</span>
        ) : (
          <button className="btn-secondary" onClick={() => navigate('/auth')}>
            Se connecter
          </button>
        )}
      </header>

      <main className="modes-grid">
        {MODES.map(mode => (
          <ModeCard
            key={mode.id}
            title={mode.title}
            description={mode.description}
            emoji={mode.emoji}
            badge={mode.badge}
            onClick={() => navigate(mode.path)}
          />
        ))}
      </main>
    </div>
  )
}
