import { useState } from 'react'
import { useQuestions } from '../../hooks/useQuestions'
import { useGameLogic } from '../../hooks/useGameLogic'
import PlayerSetup from '../../components/game/PlayerSetup'
import QuestionCard from '../../components/game/QuestionCard'
import ScoreBoard from '../../components/game/ScoreBoard'
import Results from '../../components/game/Results'

const TARGET_SCORE = 15

export default function CultureGenerale() {
  const { questions, loading } = useQuestions('general')
  const { state, currentPlayer, startGame, answerQuestion, endGame, resetGame } = useGameLogic()
  const [helpLevel, setHelpLevel] = useState(0)

  if (loading) return <div className="loading-screen">Chargement des questions...</div>

  if (state.phase === 'setup') {
    return <PlayerSetup onStart={players => startGame('general', players, questions)} />
  }

  if (state.phase === 'results') {
    return (
      <Results
        players={state.players}
        scores={state.scores}
        onPlayAgain={() => { resetGame(); startGame('general', state.players, questions) }}
      />
    )
  }

  // Vérifie si quelqu'un a atteint le score cible
  const hasWinner = state.players.some(p => (state.scores[p] ?? 0) >= TARGET_SCORE)
  if (hasWinner) endGame()

  return (
    <div className="game-screen">
      <div className="game-top">
        <ScoreBoard players={state.players} scores={state.scores} currentPlayer={currentPlayer} />
      </div>

      <div className="game-center">
        <p className="current-player-label">Tour de <strong>{currentPlayer}</strong></p>

        <div className="help-selector">
          <button
            className={`help-btn ${helpLevel === 0 ? 'active' : ''}`}
            onClick={() => setHelpLevel(0)}
          >
            Réponse directe (3 pts)
          </button>
          <button
            className={`help-btn ${helpLevel === 1 ? 'active' : ''}`}
            onClick={() => setHelpLevel(1)}
          >
            4 choix (2 pts)
          </button>
          <button
            className={`help-btn ${helpLevel === 2 ? 'active' : ''}`}
            onClick={() => setHelpLevel(2)}
          >
            2 choix (1 pt)
          </button>
        </div>

        <QuestionCard
          key={state.questionIndex}
          question={state.currentQuestion}
          helpLevel={helpLevel}
          onAnswer={points => { answerQuestion(currentPlayer, points); setHelpLevel(0) }}
        />
      </div>
    </div>
  )
}
