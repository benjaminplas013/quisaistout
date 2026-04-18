import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuestions } from '../../hooks/useQuestions'

const TIME_LIMIT = 20

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

function pickQ(pool, used) {
  const avail = pool.filter(q => !used.has(q.id))
  const bank = avail.length > 0 ? avail : pool
  const q = bank[Math.floor(Math.random() * bank.length)]
  if (q) used.add(q.id)
  return q
}

export default function BombeMode() {
  const { questions, loading } = useQuestions('general')
  const navigate = useNavigate()

  const [phase, setPhase] = useState('setup') // setup | playing | overlay | gameover
  const [players, setPlayers] = useState([])
  const [lives, setLives] = useState({})
  const [maxLives, setMaxLives] = useState(3)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [overlay, setOverlay] = useState(null) // { type: 'explode'|'safe', player }
  const usedRef = useRef(new Set())
  const timerRef = useRef(null)

  function startGame(playerNames, lives) {
    const l = Object.fromEntries(playerNames.map(p => [p, lives]))
    setPlayers(playerNames)
    setLives(l)
    setMaxLives(lives)
    setCurrentIdx(0)
    usedRef.current = new Set()
    setPhase('playing')
    loadQuestion(playerNames)
  }

  function loadQuestion(playerNames) {
    const pool = questions
    const q = pickQ(pool, usedRef.current)
    setQuestion(q)
    setOptions(q ? shuffle([q.a, ...q.w]).slice(0, 4) : [])
    setTimeLeft(TIME_LIMIT)
  }

  useEffect(() => {
    if (phase !== 'playing' || !question) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleTimeout(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [question, phase])

  function getCurrentPlayer(idx, lvs) {
    const ps = players.length ? players : []
    let i = idx % ps.length
    let tries = 0
    while ((lvs ?? lives)[ps[i]] <= 0 && tries < ps.length) {
      i = (i + 1) % ps.length
      tries++
    }
    return ps[i]
  }

  function handleTimeout() {
    const player = getCurrentPlayer(currentIdx, lives)
    triggerExplosion(player)
  }

  function handleAnswer(opt) {
    clearInterval(timerRef.current)
    const player = getCurrentPlayer(currentIdx, lives)
    if (opt === question.a) {
      showOverlay('safe', player)
    } else {
      triggerExplosion(player)
    }
  }

  function triggerExplosion(player) {
    const newLives = { ...lives, [player]: (lives[player] ?? maxLives) - 1 }
    setLives(newLives)
    setOverlay({ type: 'explode', player, livesLeft: newLives[player] })
    setPhase('overlay')
    const alive = players.filter(p => newLives[p] > 0)
    setTimeout(() => {
      setOverlay(null)
      if (alive.length <= 1) { setPhase('gameover'); return }
      const next = (currentIdx + 1) % players.length
      setCurrentIdx(next)
      setPhase('playing')
      loadQuestion(players)
    }, 2200)
  }

  function showOverlay(type, player) {
    setOverlay({ type, player })
    setPhase('overlay')
    setTimeout(() => {
      setOverlay(null)
      const next = (currentIdx + 1) % players.length
      setCurrentIdx(next)
      setPhase('playing')
      loadQuestion(players)
    }, 1600)
  }

  // Timer color
  const timerColor = timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f97316' : '#22c55e'
  const circumference = 2 * Math.PI * 45
  const strokeDash = circumference * (1 - timeLeft / TIME_LIMIT)
  // Bomb pulse speed
  const bombAnim = timeLeft <= 5 ? '0.25s' : timeLeft <= 10 ? '0.55s' : '1s'

  if (loading) return <div className="loading-screen">Chargement…</div>

  // ── Setup ────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return <BombeSetup onStart={startGame} />
  }

  // ── Overlay ──────────────────────────────────────────────────────
  if (phase === 'overlay' && overlay) {
    return (
      <div className={`bomb-overlay ${overlay.type}`}>
        <div className="bomb-overlay-icon">{overlay.type === 'explode' ? '💥' : '✂️'}</div>
        <div className="bomb-overlay-title" style={{ color: overlay.type === 'explode' ? 'var(--red)' : 'var(--green)' }}>
          {overlay.type === 'explode' ? 'BOOM !' : 'DÉSAMORCÉ !'}
        </div>
        <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>
          {overlay.type === 'explode'
            ? `${overlay.player} perd une vie ! ${'❤️'.repeat(Math.max(0, overlay.livesLeft))}${'🖤'.repeat(Math.max(0, maxLives - overlay.livesLeft))}`
            : `${overlay.player} a désamorcé la bombe !`}
        </p>
      </div>
    )
  }

  // ── Game over ─────────────────────────────────────────────────────
  if (phase === 'gameover') {
    const survivor = players.find(p => (lives[p] ?? 0) > 0) ?? players[0]
    return (
      <div className="gameover-screen">
        <div className="trophy">🏆</div>
        <div className="gameover-winner">{survivor}</div>
        <p style={{ color: 'var(--gray)' }}>survit à la bombe !</p>
        <div className="bomb-lives-bar">
          {players.map(p => (
            <div key={p} className={`bomb-player-lives ${(lives[p] ?? 0) <= 0 ? 'eliminated' : ''}`}>
              {p} {(lives[p] ?? 0) > 0
                ? '❤️'.repeat(lives[p])
                : '💀'}
            </div>
          ))}
        </div>
        <div className="gameover-actions">
          <button className="btn btn-primary" onClick={() => setPhase('setup')}>Rejouer</button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>Accueil</button>
        </div>
      </div>
    )
  }

  // ── Playing ──────────────────────────────────────────────────────
  const currentPlayer = getCurrentPlayer(currentIdx, lives)

  return (
    <div className="game-page">
      <div className="bomb-lives-bar">
        {players.map(p => (
          <div key={p} className={`bomb-player-lives ${p === currentPlayer ? 'active' : ''} ${(lives[p] ?? 0) <= 0 ? 'eliminated' : ''}`}>
            <span>{p}</span>
            <span>
              {(lives[p] ?? 0) > 0
                ? '❤️'.repeat(lives[p])
                : '💀'}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div className="bomb-timer">
          <svg className="bomb-timer-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke={timerColor}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 0.12s linear, stroke 0.3s' }}
            />
          </svg>
          <span className="bomb-timer-text" style={{ color: timerColor }}>{timeLeft}</span>
        </div>
        <div className="bomb-emoji-anim" style={{ animationDuration: bombAnim }}>💣</div>
      </div>

      <p style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '0.9rem' }}>
        Tour de <strong style={{ color: 'var(--white)', fontSize: '1.1rem' }}>{currentPlayer}</strong>
      </p>

      <div className="setup-card" style={{ gap: '1rem' }}>
        <div className="q-text">{question?.q}</div>
        <div className="options-grid">
          {options.map((opt, i) => (
            <button key={opt} className="option-btn" onClick={() => handleAnswer(opt)}>
              <span className="option-letter">{['A','B','C','D'][i]}</span>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function BombeSetup({ onStart }) {
  const [count, setCount] = useState(2)
  const [names, setNames] = useState(['', ''])
  const [livesOpt, setLivesOpt] = useState(3)
  const EMOJIS = ['🦊','🐺','🦁','🐯','🐻','🦄','🐸','🐙','🦋','🐬','🦅','🐉']

  function changeCount(n) {
    setCount(n)
    setNames(prev => { const a = [...prev]; while (a.length < n) a.push(''); return a.slice(0, n) })
  }

  return (
    <div className="game-page">
      <div className="setup-card">
        <h2>💣 Mode Bombe</h2>
        <div className="count-grid">
          {Array.from({ length: 11 }, (_, i) => i + 2).map(n => (
            <button key={n} className={`count-btn ${count === n ? 'active' : ''}`} onClick={() => changeCount(n)}>{n}</button>
          ))}
        </div>
        <div className="player-list">
          {names.map((name, i) => (
            <div key={i} className="player-input-row">
              <span className="player-avatar">{EMOJIS[i]}</span>
              <input className="player-input" placeholder={`Joueur ${i + 1}`} value={name}
                onChange={e => setNames(prev => prev.map((n, j) => j === i ? e.target.value : n))} maxLength={20} />
            </div>
          ))}
        </div>
        <div>
          <div className="setup-label" style={{ marginBottom: 8 }}>Vies par joueur</div>
          <div className="count-grid">
            {[1, 3, 5].map(n => (
              <button key={n} className={`count-btn ${livesOpt === n ? 'active' : ''}`} onClick={() => setLivesOpt(n)}>
                {'❤️'.repeat(n)}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => {
          const final = names.map((n, i) => n.trim() || `Joueur ${i + 1}`)
          onStart(final, livesOpt)
        }}>Lancer 💣</button>
      </div>
    </div>
  )
}
