import { useGame } from '../contexts/GameContext'

export function useGameLogic() {
  const { state, dispatch } = useGame()

  function startGame(mode, players, questions) {
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    dispatch({ type: 'START_GAME', mode, players, questions: shuffled })
  }

  function answerQuestion(player, points) {
    if (points > 0) dispatch({ type: 'ADD_SCORE', player, points })
    dispatch({ type: 'NEXT_QUESTION' })
  }

  function useJoker(player, joker) {
    if (!state.jokers[player]?.[joker]) return false
    dispatch({ type: 'USE_JOKER', player, joker })
    return true
  }

  function endGame() {
    dispatch({ type: 'END_GAME' })
  }

  function resetGame() {
    dispatch({ type: 'RESET' })
  }

  const currentPlayer = state.players[state.currentPlayerIndex]
  const isGameOver = state.phase === 'results' || !state.currentQuestion

  const winner = isGameOver
    ? state.players.reduce((a, b) => (state.scores[a] ?? 0) >= (state.scores[b] ?? 0) ? a : b, state.players[0])
    : null

  return {
    state,
    currentPlayer,
    isGameOver,
    winner,
    startGame,
    answerQuestion,
    useJoker,
    endGame,
    resetGame,
  }
}
