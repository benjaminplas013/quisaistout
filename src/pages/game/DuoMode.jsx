import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuestions } from '../../hooks/useQuestions'

const Q_OPTIONS = [10, 20, 30, 51]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

export default function DuoMode() {
  const { questions, loading } = useQuestions('duo')
  const navigate = useNavigate()

  const [phase, setPhase] = useState('setup') // setup | config | self | pass | guess | result | gameover
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [numQ, setNumQ] = useState(20)
  const [deck, setDeck] = useState([])
  const [idx, setIdx] = useState(0)
  const [scores, setScores] = useState({ p1: 0, p2: 0 })
  const [p1Answer, setP1Answer] = useState(null)
  const [resultData, setResultData] = useState(null)

  if (loading) return <div className="loading-screen">Chargement…</div>

  // Current question — alternates: even = question about p1, odd = about p2
  const isAboutP1 = idx % 2 === 0
  const subjectName = isAboutP1 ? (p1 || 'Joueur 1') : (p2 || 'Joueur 2')
  const guesserName = isAboutP1 ? (p2 || 'Joueur 2') : (p1 || 'Joueur 1')
  const guesserKey = isAboutP1 ? 'p2' : 'p1'
  const q = deck[idx]
  const statement = q?.q.replace('{name}', subjectName)

  function startGame() {
    const d = shuffle(questions).slice(0, numQ)
    setDeck(d)
    setIdx(0)
    setScores({ p1: 0, p2: 0 })
    setPhase('self')
  }

  function handleSelfAnswer(answer) {
    setP1Answer(answer)
    setPhase('pass')
  }

  function handleGuess(prediction) {
    const correct = prediction === p1Answer
    if (correct) setScores(s => ({ ...s, [guesserKey]: s[guesserKey] + 1 }))
    setResultData({ correct, prediction, real: p1Answer, guesser: guesserName })
    setPhase('result')
  }

  function nextQuestion() {
    if (idx + 1 >= deck.length) { setPhase('gameover'); return }
    setIdx(i => i + 1)
    setP1Answer(null)
    setPhase('self')
  }

  // ── Setup ─────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="game-page">
        <div className="setup-card">
          <h2>👥 Qui se connaît le mieux ?</h2>
          <div className="player-list">
            <div className="player-input-row">
              <span className="player-avatar">🧑</span>
              <input className="player-input" placeholder="Prénom joueur 1" value={p1} onChange={e => setP1(e.target.value)} maxLength={20} />
            </div>
            <div className="player-input-row">
              <span className="player-avatar">🧑</span>
              <input className="player-input" placeholder="Prénom joueur 2" value={p2} onChange={e => setP2(e.target.value)} maxLength={20} />
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={() => setPhase('config')}>Continuer →</button>
        </div>
      </div>
    )
  }

  // ── Config ────────────────────────────────────────────────────────
  if (phase === 'config') {
    return (
      <div className="game-page">
        <div className="setup-card">
          <h2>🎮 Nombre de questions</h2>
          <div className="score-grid">
            {Q_OPTIONS.map(n => (
              <button key={n} className={`score-opt-btn ${numQ === n ? 'active' : ''}`} onClick={() => setNumQ(n)}>
                {n}<span>questions</span>
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" onClick={startGame}>Lancer 🚀</button>
        </div>
      </div>
    )
  }

  // ── Self answer ───────────────────────────────────────────────────
  if (phase === 'self') {
    return (
      <div className="game-page">
        <div className="duo-scores">
          <div className={`duo-player-score ${!isAboutP1 ? 'active' : ''}`}>
            <div className="duo-player-score-name">{p1 || 'Joueur 1'}</div>
            <div className="duo-player-score-pts">{scores.p1}</div>
          </div>
          <div className={`duo-player-score ${isAboutP1 ? 'active' : ''}`}>
            <div className="duo-player-score-name">{p2 || 'Joueur 2'}</div>
            <div className="duo-player-score-pts">{scores.p2}</div>
          </div>
        </div>

        <div className="duo-statement">"{statement}"</div>

        <p style={{ color: 'var(--gray)', textAlign: 'center', fontSize: '0.9rem' }}>
          <strong style={{ color: 'var(--white)' }}>{subjectName}</strong>, c'est vrai ou faux pour toi ?
        </p>
        <p style={{ color: 'var(--gray)', fontSize: '0.8rem', textAlign: 'center' }}>
          ({guesserName} ne regarde pas !)
        </p>

        <div className="duo-tf-buttons">
          <button className="btn-true" onClick={() => handleSelfAnswer('vrai')}>✅ Vrai</button>
          <button className="btn-false" onClick={() => handleSelfAnswer('faux')}>❌ Faux</button>
        </div>

        <p style={{ color: 'var(--gray)', fontSize: '0.75rem' }}>{idx + 1} / {deck.length}</p>
      </div>
    )
  }

  // ── Pass phone ───────────────────────────────────────────────────
  if (phase === 'pass') {
    return (
      <div className="pass-screen">
        <div className="pass-icon">📱</div>
        <div className="pass-title">Passe le téléphone</div>
        <p className="pass-desc">à <strong>{guesserName}</strong></p>
        <button className="btn btn-primary" style={{ marginTop: '1rem', minWidth: 200 }} onClick={() => setPhase('guess')}>
          Je suis prêt →
        </button>
      </div>
    )
  }

  // ── Guess ─────────────────────────────────────────────────────────
  if (phase === 'guess') {
    return (
      <div className="game-page">
        <div className="duo-statement">"{statement}"</div>
        <p style={{ color: 'var(--gray)', textAlign: 'center', fontSize: '0.9rem' }}>
          <strong style={{ color: 'var(--white)' }}>{guesserName}</strong>, qu'a répondu {subjectName} ?
        </p>
        <div className="duo-tf-buttons">
          <button className="btn-true" onClick={() => handleGuess('vrai')}>✅ Vrai</button>
          <button className="btn-false" onClick={() => handleGuess('faux')}>❌ Faux</button>
        </div>
      </div>
    )
  }

  // ── Result ────────────────────────────────────────────────────────
  if (phase === 'result' && resultData) {
    return (
      <div className="result-screen">
        <div className="result-icon">{resultData.correct ? '🎉' : '😅'}</div>
        <div className="result-title" style={{ color: resultData.correct ? 'var(--green)' : 'var(--red)' }}>
          {resultData.correct ? 'Bonne prédiction !' : 'Raté !'}
        </div>
        {resultData.correct && <div className="result-points">+1 pt pour {resultData.guesser}</div>}
        <div className="result-answer">
          {subjectName} a répondu : <strong>{resultData.real}</strong>
        </div>
        <button className="btn btn-primary" style={{ marginTop: '0.5rem' }} onClick={nextQuestion}>
          {idx + 1 >= deck.length ? 'Résultats finaux' : 'Question suivante →'}
        </button>
      </div>
    )
  }

  // ── Game over ─────────────────────────────────────────────────────
  if (phase === 'gameover') {
    const p1Name = p1 || 'Joueur 1'
    const p2Name = p2 || 'Joueur 2'
    const winner = scores.p1 >= scores.p2 ? p1Name : p2Name
    const tied = scores.p1 === scores.p2
    return (
      <div className="gameover-screen">
        <div className="trophy">🏆</div>
        <div className="gameover-winner">{tied ? 'Égalité !' : winner}</div>
        <p style={{ color: 'var(--gray)' }}>{tied ? 'Vous vous connaissez parfaitement !' : 'remporte la victoire !'}</p>
        <div className="final-scores">
          {[[p1Name, scores.p1], [p2Name, scores.p2]].sort((a, b) => b[1] - a[1]).map(([name, pts], i) => (
            <div key={name} className={`final-row ${i === 0 && !tied ? 'rank-1' : ''}`}>
              <span>{i === 0 ? '🥇' : '🥈'}</span>
              <span className="final-name">{name}</span>
              <span className="final-pts">{pts} pts</span>
            </div>
          ))}
        </div>
        <div className="gameover-actions">
          <button className="btn btn-primary" onClick={() => { setPhase('setup'); setScores({ p1: 0, p2: 0 }) }}>Rejouer</button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>Accueil</button>
        </div>
      </div>
    )
  }

  return null
}
