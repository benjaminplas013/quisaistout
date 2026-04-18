import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import ParticleBackground from '../components/ui/ParticleBackground'
import ModeCard from '../components/ui/ModeCard'
import HelpModal from '../components/ui/HelpModal'

const MODES = [
  {
    id: 'culture',
    title: 'Culture Générale',
    description: 'Quiz multijoueur toutes catégories',
    icon: '🧠',
    tags: ['2-12 joueurs', '200+ questions'],
    badge: null,
    glow: 'rgba(3,105,161,0.15)',
    path: '/game/culture',
  },
  {
    id: 'duo',
    title: 'Qui se connaît le mieux ?',
    description: 'Vrai / Faux, vous connaissez-vous vraiment ?',
    icon: '👥',
    tags: ['2 joueurs', 'Vrai/Faux'],
    badge: { label: '❤️ POPULAIRE', cls: 'badge-pop' },
    glow: 'rgba(6,182,212,0.12)',
    path: '/game/duo',
  },
  {
    id: 'kids',
    title: 'Mode Enfants',
    description: 'Questions simples et amusantes',
    icon: '🌈',
    tags: ['2-12 joueurs', 'Famille'],
    badge: null,
    glow: 'rgba(34,197,94,0.1)',
    path: '/game/kids',
  },
  {
    id: 'bombe',
    title: 'Mode Bombe',
    description: '20 secondes ou tu perds une vie !',
    icon: '💣',
    tags: ['2-12 joueurs', 'Survie'],
    badge: null,
    glow: 'rgba(249,115,22,0.12)',
    path: '/game/bombe',
  },
  {
    id: 'couple',
    title: 'Défis Couple',
    description: '200+ défis romantiques et fun',
    icon: '💑',
    tags: ['2 joueurs', '18+'],
    badge: { label: '❤️‍🔥 NOUVEAU', cls: 'badge-new' },
    glow: 'rgba(244,63,94,0.12)',
    path: '/game/couple',
  },
]

const TYPEWRITER_TEXTS = [
  'Le jeu de culture générale (un peu fou)',
  'Qui va remporter la victoire ce soir ?',
  'Défiez vos amis, famille et collègues !',
]

const NOTIFS = [
  '🎉 Quelqu\'un vient de terminer une partie !',
  '🔥 Nouveau record : 20 pts en Culture Générale !',
  '💑 Un couple vient d\'atteindre le niveau Flamme !',
  '🧠 200+ questions disponibles dans 10 catégories',
  '💣 Survival Mode : dernier survivant en 8 tours !',
  '👥 Mode Duo : testez votre complicité !',
]

const STATS = [
  { value: 12847, label: 'parties jouées' },
  { value: 5, label: 'modes de jeu' },
  { value: 428, label: 'questions' },
]

function useCounter(target, duration = 1600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = null
    const step = ts => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    const id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [target, duration])
  return count
}

function AnimCounter({ value, label }) {
  const count = useCounter(value)
  return (
    <div className="stat-item">
      <div className="stat-num">{count.toLocaleString('fr-FR')}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function Typewriter() {
  const [text, setText] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const msg = TYPEWRITER_TEXTS[msgIdx]
    let timeout
    if (!deleting && text.length < msg.length) {
      timeout = setTimeout(() => setText(msg.slice(0, text.length + 1)), 52)
    } else if (!deleting && text.length === msg.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 26)
    } else {
      setDeleting(false)
      setMsgIdx(i => (i + 1) % TYPEWRITER_TEXTS.length)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, msgIdx])
  return <span className="home-subtitle">{text}<span className="cursor" /></span>
}

function NotifTicker() {
  const [idx, setIdx] = useState(0)
  const [leaving, setLeaving] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaving(true)
      setTimeout(() => {
        setIdx(i => (i + 1) % NOTIFS.length)
        setLeaving(false)
      }, 350)
    }, 4800)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="notif-ticker">
      <div className={`notif-toast ${leaving ? 'leaving' : ''}`}>
        {NOTIFS[idx]}
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="home-page">
      <ParticleBackground />

      <div className="live-badge">
        <span className="live-dot" />
        LIVE
      </div>

      <header className="home-header">
        <h1 className="home-title">
          <span className="title-qui">QUI</span> SAIT TOUT ?
        </h1>
        <Typewriter />
      </header>

      <div className="home-stats">
        {STATS.map(s => <AnimCounter key={s.label} value={s.value} label={s.label} />)}
      </div>

      <main className="modes-grid">
        {MODES.map(mode => (
          <ModeCard key={mode.id} mode={mode} onClick={() => navigate(mode.path)} />
        ))}
      </main>

      <button className="help-fab" onClick={() => setShowHelp(true)}>
        ? Comment jouer
      </button>

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} modes={MODES} />}

      <NotifTicker />
    </div>
  )
}
