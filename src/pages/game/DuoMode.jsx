import { useState } from 'react'
import { useQuestions } from '../../hooks/useQuestions'
import { useGameLogic } from '../../hooks/useGameLogic'
import PlayerSetup from '../../components/game/PlayerSetup'
import Results from '../../components/game/Results'

const TARGET_SCORE = 10

export default function DuoMode() {
  const { questions, loading } = useQuestions('duo')
  const { state, startGame, answerQuestion, endGame, resetGame } = useGameLogic()
  const [phase, setPhase] = useState('answer') // 'answer' | 'predict'
  const [p1Answer, setP1Answer] = useState(null)

  if (loading) return <div className="loading-screen">Chargement...</div>

  if (state.phase === 'setup') {
    return <PlayerSetup exactCount={2} onStart={players => startGame('duo', players, questions)} />
  }

  if (state.phase === 'results') {
    return (
      <Results
        players={state.players}
        scores={state.scores}
        onPlayAgain={() => { resetGame(); setPhase('answer'); setP1Answer(null); startGame('duo', state.players, questions) }}
      />
    )
  }

  const [p1, p2] = state.players
  const q = state.currentQuestion
  if (!q) { endGame(); return null }

  const statement = q.q.replace('{name}', p1)

  function handleP1Answer(answer) {
    setP1Answer(answer)
    setPhase('predict')
  }

  function handleP2Predict(prediction) {
    const correct = prediction === p1Answer
    answerQuestion(p2, correct ? 2 : 0)
    setPhase('answer')
    setP1Answer(null)

    const hasWinner = state.players.some(p => (state.scores[p] ?? 0) >= TARGET_SCORE)
    if (hasWinner) endGame()
  }

  return (
    <div className="game-screen game-duo">
      <div className="duo-scores">
        {state.players.map(p => (
          <div key={p} className="duo-player-score">
            <span>{p}</span>
            <strong>{state.scores[p] ?? 0} pts</strong>
          </div>
        ))}
      </div>

      <div className="duo-card">
        <h2 className="statement-text">"{statement}"</h2>

        {phase === 'answer' ? (
          <>
            <p className="duo-instruction"><strong>{p1}</strong>, c'est vrai ou faux pour toi ?</p>
            <div className="duo-buttons">
              <button className="btn-true" onClick={() => handleP1Answer('vrai')}>✅ Vrai</button>
              <button className="btn-false" onClick={() => handleP1Answer('faux')}>❌ Faux</button>
            </div>
          </>
        ) : (
          <>
            <p className="duo-instruction"><strong>{p2}</strong>, qu'a répondu {p1} ?</p>
            <div className="duo-buttons">
              <button className="btn-true" onClick={() => handleP2Predict('vrai')}>✅ Vrai</button>
              <button className="btn-false" onClick={() => handleP2Predict('faux')}>❌ Faux</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
