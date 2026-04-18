import { createContext, useContext, useReducer } from 'react'

const GameContext = createContext(null)

// phases: setup | category | config | turn | presenter | candidate | answering | result | scores | gameover
const initialState = {
  mode: null,
  players: [],
  scores: {},
  jokers: {},         // { [player]: { double, pass, survey } }
  doubleActive: {},   // { [player]: bool }
  currentPlayerIndex: 0,
  presenterIndex: 1,
  questions: [],
  usedIds: new Set(),
  currentQuestion: null,
  helpLevel: null,    // 'direct' | 'four' | 'two'
  surveyActive: false,
  lastResult: null,   // { correct, points, answer }
  targetScore: 15,
  selectedCategories: [],
  phase: 'setup',
}

function gameReducer(state, action) {
  switch (action.type) {

    case 'SET_MODE':
      return { ...initialState, mode: action.mode, phase: 'setup' }

    case 'SET_PLAYERS': {
      const jokers = Object.fromEntries(action.players.map(p => [p, { double: true, pass: true, survey: true }]))
      const scores = Object.fromEntries(action.players.map(p => [p, 0]))
      const doubleActive = Object.fromEntries(action.players.map(p => [p, false]))
      return { ...state, players: action.players, scores, jokers, doubleActive, phase: action.nextPhase ?? 'config' }
    }

    case 'SET_CATEGORIES':
      return { ...state, selectedCategories: action.categories, phase: 'config' }

    case 'SET_TARGET':
      return { ...state, targetScore: action.target, phase: 'turn' }

    case 'LOAD_QUESTIONS':
      return { ...state, questions: action.questions }

    case 'START_TURN':
      return { ...state, phase: 'turn', helpLevel: null, surveyActive: false, doubleActive: { ...state.doubleActive, [state.players[state.currentPlayerIndex]]: false } }

    case 'GO_PRESENTER': {
      const q = pickQuestion(state)
      return { ...state, currentQuestion: q, phase: 'presenter' }
    }

    case 'GO_CANDIDATE':
      return { ...state, phase: 'candidate' }

    case 'SET_HELP': {
      if (action.level === 'pass') {
        // Use pass joker → new question
        const q = pickQuestion(state)
        const player = state.players[state.currentPlayerIndex]
        return {
          ...state,
          currentQuestion: q,
          jokers: { ...state.jokers, [player]: { ...state.jokers[player], pass: false } },
          phase: 'presenter',
        }
      }
      return { ...state, helpLevel: action.level, phase: 'answering' }
    }

    case 'USE_DOUBLE': {
      const player = state.players[state.currentPlayerIndex]
      return {
        ...state,
        doubleActive: { ...state.doubleActive, [player]: true },
        jokers: { ...state.jokers, [player]: { ...state.jokers[player], double: false } },
      }
    }

    case 'USE_SURVEY': {
      const player = state.players[state.currentPlayerIndex]
      return {
        ...state,
        surveyActive: true,
        jokers: { ...state.jokers, [player]: { ...state.jokers[player], survey: false } },
      }
    }

    case 'ANSWER': {
      const player = state.players[state.currentPlayerIndex]
      const basePoints = action.correct ? (state.helpLevel === 'direct' ? 3 : state.helpLevel === 'four' ? 2 : 1) : 0
      const isDouble = state.doubleActive[player]
      let points
      if (isDouble) {
        points = action.correct ? basePoints * 2 : -basePoints
      } else {
        points = basePoints
      }
      const newScore = Math.max(0, (state.scores[player] ?? 0) + points)
      return {
        ...state,
        scores: { ...state.scores, [player]: newScore },
        lastResult: { correct: action.correct, points, answer: state.currentQuestion.a },
        phase: 'result',
      }
    }

    case 'SHOW_SCORES':
      return { ...state, phase: 'scores' }

    case 'NEXT_TURN': {
      const nextIdx = (state.currentPlayerIndex + 1) % state.players.length
      const presIdx = (nextIdx + 1) % state.players.length
      const winner = state.players.find(p => (state.scores[p] ?? 0) >= state.targetScore)
      if (winner) return { ...state, phase: 'gameover' }
      return { ...state, currentPlayerIndex: nextIdx, presenterIndex: presIdx, phase: 'turn' }
    }

    case 'RESET':
      return { ...initialState }

    default:
      return state
  }
}

function pickQuestion(state) {
  const pool = state.selectedCategories.length > 0
    ? state.questions.filter(q => state.selectedCategories.includes(q.category))
    : state.questions
  const available = pool.filter(q => !state.usedIds.has(q.id))
  const bank = available.length > 0 ? available : pool
  const q = bank[Math.floor(Math.random() * bank.length)]
  if (q) state.usedIds.add(q.id)
  return q ?? null
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
