import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../contexts/GameContext'
import { useQuestions } from '../../hooks/useQuestions'

const PLAYER_EMOJIS = ['🦊','🐺','🦁','🐯','🐻','🦄','🐸','🐙','🦋','🐬','🦅','🐉']

const CATEGORIES = [
  { id: 'geo',         label: 'Géographie',   emoji: '🌍' },
  { id: 'histoire',    label: 'Histoire',      emoji: '📜' },
  { id: 'science',     label: 'Science',       emoji: '🔬' },
  { id: 'tech',        label: 'Technologie',   emoji: '💻' },
  { id: 'sports',      label: 'Sports',        emoji: '⚽' },
  { id: 'cinema',      label: 'Cinéma',        emoji: '🎬' },
  { id: 'musique',     label: 'Musique',       emoji: '🎵' },
  { id: 'litterature', label: 'Littérature',   emoji: '📚' },
  { id: 'art',         label: 'Art',           emoji: '🎨' },
  { id: 'geopolitique',label: 'Géopolitique',  emoji: '🗺️' },
]

// ── Shuffle Fisher-Yates ─────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Survey percentages ───────────────────────────────────────────
function surveyPercentages(correct, wrongs) {
  const options = [correct, ...wrongs]
  const raw = options.map((_, i) => i === 0
    ? 40 + Math.floor(Math.random() * 25)
    : 5 + Math.floor(Math.random() * 20))
  const total = raw.reduce((a, b) => a + b, 0)
  const pcts = raw.map(v => Math.round(v / total * 100))
  const diff = 100 - pcts.reduce((a, b) => a + b, 0)
  pcts[0] += diff
  return Object.fromEntries(options.map((opt, i) => [opt, pcts[i]]))
}

// ════════════════════════════════════════════════════════════════
// SCREENS
// ════════════════════════════════════════════════════════════════

function SetupPlayers({ onNext }) {
  const [count, setCount] = useState(2)
  const [names, setNames] = useState(['', ''])

  function changeCount(n) {
    setCount(n)
    setNames(prev => {
      const arr = [...prev]
      while (arr.length < n) arr.push('')
      return arr.slice(0, n)
    })
  }

  function submit() {
    const final = names.map((n, i) => n.trim() || `Joueur ${i + 1}`)
    onNext(final)
  }

  return (
    <div className="game-page">
      <div className="setup-card">
        <h2>👥 Joueurs</h2>
        <div>
          <div className="setup-label" style={{ marginBottom: 8 }}>Nombre de joueurs</div>
          <div className="count-grid">
            {Array.from({ length: 11 }, (_, i) => i + 2).map(n => (
              <button key={n} className={`count-btn ${count === n ? 'active' : ''}`} onClick={() => changeCount(n)}>{n}</button>
            ))}
          </div>
        </div>
        <div className="player-list">
          {names.map((name, i) => (
            <div key={i} className="player-input-row">
              <span className="player-avatar">{PLAYER_EMOJIS[i]}</span>
              <input
                className="player-input"
                placeholder={`Joueur ${i + 1}`}
                value={name}
                onChange={e => setNames(prev => prev.map((n, j) => j === i ? e.target.value : n))}
                maxLength={20}
              />
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-lg" onClick={submit}>Continuer →</button>
      </div>
    </div>
  )
}

function SelectCategories({ questions, onNext }) {
  const available = [...new Set(questions.map(q => q.category))]
  const [selected, setSelected] = useState(available)

  function toggle(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id])
  }

  function toggleAll() {
    setSelected(selected.length === available.length ? [] : available)
  }

  const catInfo = id => CATEGORIES.find(c => c.id === id) ?? { label: id, emoji: '❓' }

  return (
    <div className="game-page">
      <div className="setup-card">
        <h2>🗂️ Catégories</h2>
        <div className="category-grid">
          {available.map(id => {
            const info = catInfo(id)
            const count = questions.filter(q => q.category === id).length
            return (
              <button key={id} className={`cat-btn ${selected.includes(id) ? 'active' : ''}`} onClick={() => toggle(id)}>
                <span className="cat-emoji">{info.emoji}</span>
                <span className="cat-name">{info.label}</span>
                <span className="cat-count">{count} q.</span>
              </button>
            )
          })}
        </div>
        <button className="btn btn-secondary" style={{ fontSize: '0.85rem' }} onClick={toggleAll}>
          {selected.length === available.length ? 'Tout désélectionner' : 'Tout sélectionner'}
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => onNext(selected)}
          disabled={selected.length === 0}
        >
          Continuer →
        </button>
      </div>
    </div>
  )
}

function ConfigScore({ onNext }) {
  const [target, setTarget] = useState(15)
  const opts = [5, 10, 15, 20]
  return (
    <div className="game-page">
      <div className="setup-card">
        <h2>🎯 Score à atteindre</h2>
        <div className="score-grid">
          {opts.map(n => (
            <button key={n} className={`score-opt-btn ${target === n ? 'active' : ''}`} onClick={() => setTarget(n)}>
              {n}<span>points</span>
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.5 }}>
          🎲 <strong>Jokers disponibles :</strong> Double ou Rien · Passer · Sondage
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => onNext(target)}>Lancer la partie 🚀</button>
      </div>
    </div>
  )
}

function TurnAnnouncement({ player, onReady }) {
  return (
    <div className="turn-screen">
      <div className="turn-label">C'est le tour de</div>
      <div className="turn-name">{player}</div>
      <div className="turn-badge">🎯</div>
      <p className="turn-instruction">Présentateur : prépare-toi à lire la question</p>
      <button className="btn btn-primary" style={{ minWidth: 200 }} onClick={onReady}>Je suis prêt</button>
    </div>
  )
}

function PresenterView({ question, player, presenter, onPass }) {
  if (!question) return null
  return (
    <div className="game-page">
      <div className="presenter-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--gray)' }}>
          <span>🎤 Présentateur : <strong style={{ color: 'var(--white)' }}>{presenter}</strong></span>
          <span>🎯 Candidat : <strong style={{ color: 'var(--white)' }}>{player}</strong></span>
        </div>
        <div className="q-category">{question.category}</div>
        <div className="q-text">{question.q}</div>
        <div className="correct-answer">✅ {question.a}</div>
        {question.fun_fact && <div className="fun-fact">💡 {question.fun_fact}</div>}
      </div>
      <button className="btn btn-primary btn-lg" onClick={onPass}>
        Passer au candidat →
      </button>
    </div>
  )
}

function CandidateView({ question, player, jokers, doubleOn, surveyOn, onHelp, onDouble, onSurvey }) {
  return (
    <div className="game-page">
      <div className="setup-card">
        <div className="q-category">{question?.category}</div>
        <div className="q-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)' }}>{question?.q}</div>
        {doubleOn && <div className="double-banner">🎲 DOUBLE OU RIEN ACTIVÉ !</div>}
        <div>
          <div className="setup-label" style={{ marginBottom: 8 }}>Mode d'aide</div>
          <div className="help-modes">
            <button className="help-btn" onClick={() => onHelp('direct')}>
              <span className="help-btn-pts">3</span>
              <span className="help-btn-label">Réponse directe</span>
            </button>
            <button className="help-btn" onClick={() => onHelp('four')}>
              <span className="help-btn-pts">2</span>
              <span className="help-btn-label">4 choix</span>
            </button>
            <button className="help-btn" onClick={() => onHelp('two')}>
              <span className="help-btn-pts">1</span>
              <span className="help-btn-label">2 choix</span>
            </button>
          </div>
        </div>
        <div>
          <div className="setup-label" style={{ marginBottom: 8 }}>Jokers</div>
          <div className="jokers-row">
            <button className="joker-btn" disabled={!jokers?.double} onClick={onDouble}>
              🎲 Double ou Rien
            </button>
            <button className="joker-btn" disabled={!jokers?.pass} onClick={() => onHelp('pass')}>
              ⏭️ Passer
            </button>
            <button className="joker-btn" disabled={!jokers?.survey || !['four','two'].includes(null)} onClick={onSurvey}>
              📊 Sondage
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnswerView({ question, helpLevel, surveyActive, onAnswer }) {
  const [answered, setAnswered] = useState(null)
  const [options] = useState(() => {
    const all = [question.a, ...question.w]
    const s = shuffle(all)
    return helpLevel === 'two' ? s.slice(0, 2) : s.slice(0, 4)
  })
  const [survey] = useState(() => surveyActive ? surveyPercentages(question.a, question.w) : null)
  const letters = ['A', 'B', 'C', 'D']

  function pick(opt) {
    if (answered !== null) return
    setAnswered(opt)
    setTimeout(() => onAnswer(opt === question.a), 1200)
  }

  if (helpLevel === 'direct') {
    return (
      <div className="game-page">
        <div className="direct-view">
          <div className="q-category">{question.category}</div>
          <div className="q-text">{question.q}</div>
          <p className="direct-candidate">Le candidat répond à voix haute…</p>
          <div className="direct-buttons">
            <button className="btn btn-success" onClick={() => onAnswer(true)}>✅ Correct</button>
            <button className="btn btn-danger" onClick={() => onAnswer(false)}>❌ Faux</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="game-page">
      <div className="setup-card">
        <div className="q-category">{question.category}</div>
        <div className="q-text">{question.q}</div>
        <div className={`options-grid ${helpLevel === 'two' ? 'two-col' : ''}`}>
          {options.map((opt, i) => (
            <button
              key={opt}
              className={`option-btn ${answered === opt ? (opt === question.a ? 'correct' : 'wrong shake') : answered !== null && opt === question.a ? 'correct' : ''}`}
              onClick={() => pick(opt)}
              disabled={answered !== null}
            >
              <span className="option-letter">{letters[i]}</span>
              {opt}
            </button>
          ))}
        </div>
        {survey && (
          <div className="survey-bars">
            <div className="setup-label">📊 Sondage du public</div>
            {options.map((opt, i) => (
              <div key={opt} className="survey-bar-row">
                <span className="survey-bar-label">{opt}</span>
                <div className="survey-bar-track">
                  <div className="survey-bar-fill" style={{ width: `${survey[opt] ?? 0}%`, transitionDelay: `${i * 100}ms` }} />
                </div>
                <span className="survey-bar-pct">{survey[opt] ?? 0}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ResultView({ result, onNext }) {
  return (
    <div className="result-screen">
      <div className="result-icon">{result.correct ? '🎉' : '😔'}</div>
      <div className="result-title" style={{ color: result.correct ? 'var(--green)' : 'var(--red)' }}>
        {result.correct ? 'Bravo !' : 'Raté !'}
      </div>
      {result.points !== 0 && (
        <div className="result-points">{result.points > 0 ? `+${result.points} pts` : `${result.points} pts`}</div>
      )}
      <div className="result-answer">✅ {result.answer}</div>
      <button className="btn btn-primary" style={{ marginTop: '0.5rem', minWidth: 200 }} onClick={onNext}>
        Voir les scores →
      </button>
    </div>
  )
}

function ScoresView({ players, scores, target, currentPlayer, onNext }) {
  const sorted = [...players].sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))
  const ranks = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '1️⃣1️⃣', '1️⃣2️⃣']
  return (
    <div className="game-page">
      <h2 style={{ fontWeight: 800, fontSize: '1.3rem' }}>📊 Classement</h2>
      <div className="scoreboard" style={{ width: '100%' }}>
        {sorted.map((p, i) => (
          <div key={p} className={`score-row ${p === currentPlayer ? 'current' : ''}`}>
            <span className="score-rank">{ranks[i]}</span>
            <span className="score-name">{p}</span>
            <div className="score-progress">
              <div className="score-progress-fill" style={{ width: `${Math.min(100, ((scores[p] ?? 0) / target) * 100)}%` }} />
            </div>
            <span className="score-pts">{scores[p] ?? 0}/{target}</span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary btn-lg" onClick={onNext}>Tour suivant →</button>
    </div>
  )
}

function GameOver({ players, scores, onReplay, onHome }) {
  const sorted = [...players].sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))
  const medals = ['🥇', '🥈', '🥉']
  return (
    <div className="gameover-screen">
      <div className="trophy">🏆</div>
      <div className="gameover-winner">{sorted[0]}</div>
      <p style={{ color: 'var(--gray)' }}>remporte la victoire !</p>
      <div className="final-scores">
        {sorted.map((p, i) => (
          <div key={p} className={`final-row ${i === 0 ? 'rank-1' : ''}`}>
            <span>{medals[i] ?? `${i + 1}.`}</span>
            <span className="final-name">{p}</span>
            <span className="final-pts">{scores[p] ?? 0} pts</span>
          </div>
        ))}
      </div>
      <div className="gameover-actions">
        <button className="btn btn-primary" onClick={onReplay}>Rejouer</button>
        <button className="btn btn-secondary" onClick={onHome}>Accueil</button>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
export default function CultureGenerale() {
  const { state, dispatch } = useGame()
  const { questions, loading } = useQuestions('general')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'SET_MODE', mode: 'general' })
  }, [])

  useEffect(() => {
    if (questions.length > 0) dispatch({ type: 'LOAD_QUESTIONS', questions })
  }, [questions])

  if (loading) return <div className="loading-screen">Chargement des questions…</div>

  const player = state.players[state.currentPlayerIndex]
  const presenter = state.players[state.presenterIndex]
  const jokers = state.jokers[player]
  const doubleOn = state.doubleActive[player]

  switch (state.phase) {
    case 'setup':
      return <SetupPlayers onNext={players => dispatch({ type: 'SET_PLAYERS', players, nextPhase: 'category' })} />

    case 'category':
      return <SelectCategories questions={questions} onNext={cats => dispatch({ type: 'SET_CATEGORIES', categories: cats })} />

    case 'config':
      return <ConfigScore onNext={target => dispatch({ type: 'SET_TARGET', target })} />

    case 'turn':
      return <TurnAnnouncement player={player} onReady={() => dispatch({ type: 'GO_PRESENTER' })} />

    case 'presenter':
      return <PresenterView question={state.currentQuestion} player={player} presenter={presenter} onPass={() => dispatch({ type: 'GO_CANDIDATE' })} />

    case 'candidate':
      return (
        <CandidateView
          question={state.currentQuestion}
          player={player}
          jokers={jokers}
          doubleOn={doubleOn}
          onHelp={level => dispatch({ type: 'SET_HELP', level })}
          onDouble={() => dispatch({ type: 'USE_DOUBLE' })}
          onSurvey={() => dispatch({ type: 'USE_SURVEY' })}
        />
      )

    case 'answering':
      return (
        <AnswerView
          question={state.currentQuestion}
          helpLevel={state.helpLevel}
          surveyActive={state.surveyActive}
          onAnswer={correct => dispatch({ type: 'ANSWER', correct })}
        />
      )

    case 'result':
      return <ResultView result={state.lastResult} onNext={() => dispatch({ type: 'SHOW_SCORES' })} />

    case 'scores':
      return (
        <ScoresView
          players={state.players}
          scores={state.scores}
          target={state.targetScore}
          currentPlayer={player}
          onNext={() => dispatch({ type: 'NEXT_TURN' })}
        />
      )

    case 'gameover':
      return (
        <GameOver
          players={state.players}
          scores={state.scores}
          onReplay={() => dispatch({ type: 'SET_MODE', mode: 'general' })}
          onHome={() => navigate('/')}
        />
      )

    default:
      return null
  }
}
