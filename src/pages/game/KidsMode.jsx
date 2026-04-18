import { useQuestions } from '../../hooks/useQuestions'
import { useGameLogic } from '../../hooks/useGameLogic'
import PlayerSetup from '../../components/game/PlayerSetup'
import QuestionCard from '../../components/game/QuestionCard'
import ScoreBoard from '../../components/game/ScoreBoard'
import Results from '../../components/game/Results'

const TARGET_SCORE = 10

export default function KidsMode() {
  const { questions, loading } = useQuestions('kids')
  const { state, currentPlayer, startGame, answerQuestion, endGame, resetGame } = useGameLogic()

  if (loading) return <div className="loading-screen">Chargement...</div>

  if (state.phase === 'setup') {
    return <PlayerSetup onStart={players => startGame('kids', players, questions)} />
  }

  if (state.phase === 'results') {
    return (
      <Results
        players={state.players}
        scores={state.scores}
        onPlayAgain={() => { resetGame(); startGame('kids', state.players, questions) }}
      />
    )
  }

  const hasWinner = state.players.some(p => (state.scores[p] ?? 0) >= TARGET_SCORE)
  if (hasWinner) endGame()

  return (
    <div className="game-screen game-kids">
      <div className="game-top">
        <ScoreBoard players={state.players} scores={state.scores} currentPlayer={currentPlayer} />
      </div>
      <div className="game-center">
        <p className="current-player-label">🌈 Tour de <strong>{currentPlayer}</strong></p>
        <QuestionCard
          key={state.questionIndex}
          question={state.currentQuestion}
          helpLevel={1}
          onAnswer={points => answerQuestion(currentPlayer, points > 0 ? 1 : 0)}
        />
      </div>
    </div>
  )
}
