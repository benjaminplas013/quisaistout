import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../contexts/GameContext'
import { useQuestions } from '../../hooks/useQuestions'

const PLAYER_EMOJIS = ['🦊','🐺','🦁','🐯','🐻','🦄','🐸','🐙','🦋','🐬','🦅','🐉']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function KidsMode() {
  const { state, dispatch } = useGame()
  const { questions, loading } = useQuestions('kids')
  const navigate = useNavigate()
  const [answered, setAnswered] = useState(null)

  useEffect(() => { dispatch({ type: 'SET_MODE', mode: 'kids' }) }, [])
  useEffect(() => { if (questions.length > 0) dispatch({ type: 'LOAD_QUESTIONS', questions }) }, [questions])

  if (loading) return <div className="loading-screen">Chargement…</div>

  const player = state.players[state.currentPlayerIndex]

  if (state.phase === 'setup') {
    return <SetupPlayers onNext={players => dispatch({ type: 'SET_PLAYERS', players, nextPhase: 'config' })} />
  }

  if (state.phase === 'config') {
    return (
      <div className="game-page">
        <div className="setup-card">
          <h2>🌈 Mode Enfants</h2>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Questions simples et amusantes pour toute la famille. Premier à 10 points gagne !</p>
          <button className="btn btn-primary btn-lg" onClick={() => dispatch({ type: 'SET_TARGET', target: 10 })}>
            Lancer 🚀
          </button>
        </div>
      </div>
    )
  }

  if (state.phase === 'turn') {
    return (
      <div className="turn-screen">
        <div className="turn-label">C'est le tour de</div>
        <div className="turn-name">{player}</div>
        <div className="turn-badge">🌈</div>
        <button className="btn btn-primary" style={{ minWidth: 200 }} onClick={() => dispatch({ type: 'GO_PRESENTER' })}>
          Prêt !
        </button>
      </div>
    )
  }

  if (state.phase === 'presenter') {
    const q = state.currentQuestion
    return (
      <div className="game-page">
        <div className="presenter-card">
          <div className="q-text">{q?.q}</div>
          <div className="correct-answer">✅ {q?.a}</div>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => dispatch({ type: 'GO_CANDIDATE' })}>
          Passer au candidat →
        </button>
      </div>
    )
  }

  if (state.phase === 'answering' || state.phase === 'candidate') {
    const q = state.currentQuestion
    const [options] = [useState(() => shuffle([q.a, ...q.w]).slice(0, 4))[0]]
    const letters = ['A', 'B', 'C', 'D']
    return (
      <div className="game-page">
        <div className="setup-card">
          <div className="q-text">{q?.q}</div>
          <div className="options-grid">
            {options.map((opt, i) => (
              <button
                key={opt}
                className={`option-btn ${answered === opt ? (opt === q.a ? 'correct' : 'wrong') : answered !== null && opt === q.a ? 'correct' : ''}`}
                onClick={() => {
                  if (answered) return
                  setAnswered(opt)
                  const correct = opt === q.a
                  setTimeout(() => {
                    dispatch({ type: 'ANSWER', correct })
                    setAnswered(null)
                  }, 1200)
                }}
                disabled={!!answered}
              >
                <span className="option-letter">{letters[i]}</span>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (state.phase === 'result') {
    const r = state.lastResult
    return (
      <div className="result-screen">
        <div className="result-icon">{r.correct ? '🌟' : '😅'}</div>
        <div className="result-title" style={{ color: r.correct ? 'var(--green)' : 'var(--red)' }}>
          {r.correct ? 'Bravo !' : 'Presque !'}
        </div>
        {r.points > 0 && <div className="result-points">+{r.points} pt</div>}
        <div className="result-answer">✅ {r.answer}</div>
        <button className="btn btn-primary" onClick={() => dispatch({ type: 'SHOW_SCORES' })}>
          Scores →
        </button>
      </div>
    )
  }

  if (state.phase === 'scores') {
    const sorted = [...state.players].sort((a, b) => (state.scores[b] ?? 0) - (state.scores[a] ?? 0))
    return (
      <div className="game-page">
        <h2 style={{ fontWeight: 800 }}>🌈 Classement</h2>
        <div className="scoreboard" style={{ width: '100%' }}>
          {sorted.map((p, i) => (
            <div key={p} className={`score-row ${p === player ? 'current' : ''}`}>
              <span className="score-rank">{['🥇','🥈','🥉'][i] ?? `${i+1}.`}</span>
              <span className="score-name">{p}</span>
              <div className="score-progress">
                <div className="score-progress-fill" style={{ width: `${Math.min(100, ((state.scores[p] ?? 0) / 10) * 100)}%` }} />
              </div>
              <span className="score-pts">{state.scores[p] ?? 0}/10</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => dispatch({ type: 'NEXT_TURN' })}>Tour suivant →</button>
      </div>
    )
  }

  if (state.phase === 'gameover') {
    const sorted = [...state.players].sort((a, b) => (state.scores[b] ?? 0) - (state.scores[a] ?? 0))
    return (
      <div className="gameover-screen">
        <div className="trophy">🏆</div>
        <div className="gameover-winner">{sorted[0]}</div>
        <p style={{ color: 'var(--gray)' }}>remporte la victoire !</p>
        <div className="final-scores">
          {sorted.map((p, i) => (
            <div key={p} className={`final-row ${i === 0 ? 'rank-1' : ''}`}>
              <span>{['🥇','🥈','🥉'][i] ?? `${i+1}.`}</span>
              <span className="final-name">{p}</span>
              <span className="final-pts">{state.scores[p] ?? 0} pts</span>
            </div>
          ))}
        </div>
        <div className="gameover-actions">
          <button className="btn btn-primary" onClick={() => dispatch({ type: 'SET_MODE', mode: 'kids' })}>Rejouer</button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>Accueil</button>
        </div>
      </div>
    )
  }

  return null
}

function SetupPlayers({ onNext }) {
  const [count, setCount] = useState(2)
  const [names, setNames] = useState(['', ''])
  const PLAYER_EMOJIS = ['🦊','🐺','🦁','🐯','🐻','🦄','🐸','🐙','🦋','🐬','🦅','🐉']

  function changeCount(n) {
    setCount(n)
    setNames(prev => { const a = [...prev]; while (a.length < n) a.push(''); return a.slice(0, n) })
  }

  return (
    <div className="game-page">
      <div className="setup-card">
        <h2>🌈 Mode Enfants</h2>
        <div className="count-grid">
          {Array.from({ length: 11 }, (_, i) => i + 2).map(n => (
            <button key={n} className={`count-btn ${count === n ? 'active' : ''}`} onClick={() => changeCount(n)}>{n}</button>
          ))}
        </div>
        <div className="player-list">
          {names.map((name, i) => (
            <div key={i} className="player-input-row">
              <span className="player-avatar">{PLAYER_EMOJIS[i]}</span>
              <input className="player-input" placeholder={`Joueur ${i + 1}`} value={name}
                onChange={e => setNames(prev => prev.map((n, j) => j === i ? e.target.value : n))} maxLength={20} />
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => {
          const final = names.map((n, i) => n.trim() || `Joueur ${i + 1}`)
          onNext(final)
        }}>Continuer →</button>
      </div>
    </div>
  )
}
