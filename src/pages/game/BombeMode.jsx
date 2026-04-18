import { useState, useEffect, useRef } from 'react'
import { useQuestions } from '../../hooks/useQuestions'
import { useGameLogic } from '../../hooks/useGameLogic'
import PlayerSetup from '../../components/game/PlayerSetup'
import Results from '../../components/game/Results'

const TIME_LIMIT = 20
const MAX_LIVES = 3

export default function BombeMode() {
  const { questions, loading } = useQuestions('general')
  const { state, currentPlayer, startGame, answerQuestion, endGame, resetGame } = useGameLogic()
  const [lives, setLives] = useState({})
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [options, setOptions] = useState([])
  const timerRef = useRef(null)

  useEffect(() => {
    if (state.phase !== 'playing' || !state.currentQuestion) return

    const q = state.currentQuestion
    const all = [q.a, ...q.w].sort(() => Math.random() - 0.5)
    setOptions(all)
    setTimeLeft(TIME_LIMIT)

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          loseLife()
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [state.questionIndex, state.phase])

  function loseLife() {
    setLives(prev => {
      const newLives = { ...prev, [currentPlayer]: (prev[currentPlayer] ?? MAX_LIVES) - 1 }
      const alive = state.players.filter(p => (newLives[p] ?? MAX_LIVES) > 0)
      if (alive.length <= 1) {
        endGame()
      } else {
        answerQuestion(currentPlayer, 0)
      }
      return newLives
    })
  }

  function handleAnswer(opt) {
    clearInterval(timerRef.current)
    if (opt === state.currentQuestion.a) {
      answerQuestion(currentPlayer, 1)
    } else {
      loseLife()
    }
  }

  if (loading) return <div className="loading-screen">Chargement...</div>

  if (state.phase === 'setup') {
    return (
      <PlayerSetup
        onStart={players => {
          setLives(Object.fromEntries(players.map(p => [p, MAX_LIVES])))
          startGame('bombe', players, questions)
        }}
      />
    )
  }

  if (state.phase === 'results') {
    const survivor = state.players.find(p => (lives[p] ?? MAX_LIVES) > 0) ?? state.players[0]
    const fakeScores = Object.fromEntries(state.players.map(p => [p, p === survivor ? 1 : 0]))
    return (
      <Results
        players={state.players}
        scores={fakeScores}
        onPlayAgain={() => {
          setLives(Object.fromEntries(state.players.map(p => [p, MAX_LIVES])))
          resetGame()
          startGame('bombe', state.players, questions)
        }}
      />
    )
  }

  const alivePlayers = state.players.filter(p => (lives[p] ?? MAX_LIVES) > 0)
  const q = state.currentQuestion

  return (
    <div className="game-screen game-bombe">
      <div className="bombe-lives">
        {alivePlayers.map(p => (
          <div key={p} className={`player-lives ${p === currentPlayer ? 'active' : ''}`}>
            <span>{p}</span>
            <span>{'❤️'.repeat(lives[p] ?? MAX_LIVES)}</span>
          </div>
        ))}
      </div>

      <div className="bombe-timer">
        <svg viewBox="0 0 100 100" className="timer-circle">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="8" />
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke={timeLeft <= 5 ? '#ff4444' : '#ff1493'}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - timeLeft / TIME_LIMIT)}`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <span className="timer-text">{timeLeft}</span>
      </div>

      <p className="current-player-label">💣 {currentPlayer}</p>
      <h2 className="question-text">{q?.q}</h2>
      <div className="options-grid">
        {options.map((opt, i) => (
          <button key={i} className="option-btn" onClick={() => handleAnswer(opt)}>{opt}</button>
        ))}
      </div>
    </div>
  )
}
