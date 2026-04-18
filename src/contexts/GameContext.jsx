import { createContext, useContext, useReducer } from 'react'

const GameContext = createContext(null)

const initialState = {
  mode: null,
  players: [],
  scores: {},
  currentPlayerIndex: 0,
  currentQuestion: null,
  questions: [],
  questionIndex: 0,
  phase: 'setup', // 'setup' | 'playing' | 'results'
  jokers: {},
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        mode: action.mode,
        players: action.players,
        questions: action.questions,
        currentQuestion: action.questions[0] ?? null,
        scores: Object.fromEntries(action.players.map(p => [p, 0])),
        jokers: Object.fromEntries(action.players.map(p => [p, { double: true, pass: true, survey: true }])),
        phase: 'playing',
      }
    case 'NEXT_QUESTION':
      const nextIndex = state.questionIndex + 1
      return {
        ...state,
        questionIndex: nextIndex,
        currentQuestion: state.questions[nextIndex] ?? null,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      }
    case 'ADD_SCORE':
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.player]: (state.scores[action.player] ?? 0) + action.points,
        },
      }
    case 'USE_JOKER':
      return {
        ...state,
        jokers: {
          ...state.jokers,
          [action.player]: { ...state.jokers[action.player], [action.joker]: false },
        },
      }
    case 'END_GAME':
      return { ...state, phase: 'results' }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
