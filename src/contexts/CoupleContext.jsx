import { createContext, useContext, useReducer, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const CoupleContext = createContext(null)

const LEVELS = [
  { level: 1, name: 'Étincelle', minXp: 0 },
  { level: 2, name: 'Complicité', minXp: 100 },
  { level: 3, name: 'Flamme', minXp: 250 },
  { level: 4, name: 'Fusion', minXp: 500 },
  { level: 5, name: 'Passion', minXp: 800 },
  { level: 6, name: 'Alchimie', minXp: 1200 },
  { level: 7, name: 'Devotion', minXp: 1700 },
  { level: 8, name: 'Légende du Couple', minXp: 2500 },
]

const initialState = {
  coupleId: null,
  player1: '',
  player2: '',
  xp: 0,
  level: 1,
  streak: 0,
  history: [],
  loading: false,
}

function coupleReducer(state, action) {
  switch (action.type) {
    case 'LOAD_COUPLE':
      return { ...state, ...action.data, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.value }
    case 'ADD_XP': {
      const newXp = state.xp + action.amount
      const newLevel = [...LEVELS].reverse().find(l => newXp >= l.minXp)?.level ?? 1
      return { ...state, xp: newXp, level: newLevel }
    }
    case 'UPDATE_STREAK':
      return { ...state, streak: action.streak }
    case 'ADD_HISTORY':
      return { ...state, history: [...state.history, action.entry] }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function CoupleProvider({ children }) {
  const [state, dispatch] = useReducer(coupleReducer, initialState)

  async function loadCouple(coupleId) {
    dispatch({ type: 'SET_LOADING', value: true })
    const { data, error } = await supabase
      .from('couples')
      .select('*, couple_history(*)')
      .eq('id', coupleId)
      .single()

    if (!error && data) {
      dispatch({
        type: 'LOAD_COUPLE',
        data: {
          coupleId: data.id,
          player1: data.player1_name,
          player2: data.player2_name,
          xp: data.xp,
          level: data.level,
          streak: data.streak,
          history: data.couple_history ?? [],
        },
      })
    } else {
      dispatch({ type: 'SET_LOADING', value: false })
    }
  }

  async function createCouple(player1, player2, userId = null) {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase()
    const { data, error } = await supabase.from('couples').insert({
      id,
      player1_name: player1,
      player2_name: player2,
      user_id: userId,
    }).select().single()

    if (!error && data) {
      dispatch({
        type: 'LOAD_COUPLE',
        data: { coupleId: data.id, player1, player2, xp: 0, level: 1, streak: 0, history: [] },
      })
      return data.id
    }
    return null
  }

  async function recordChallenge(challengeId, status) {
    if (!state.coupleId) return

    const xpMap = { completed: 50, skipped: 10, refused: 0 }
    const xpGain = xpMap[status] ?? 0

    await supabase.from('couple_history').insert({
      couple_id: state.coupleId,
      challenge_id: challengeId,
      status,
    })

    const newStreak = status === 'completed' ? state.streak + 1 : 0
    const bonusXp = newStreak > 0 && newStreak % 3 === 0 ? 25 : 0

    dispatch({ type: 'ADD_XP', amount: xpGain + bonusXp })
    dispatch({ type: 'UPDATE_STREAK', streak: newStreak })

    await supabase.from('couples').update({
      xp: state.xp + xpGain + bonusXp,
      streak: newStreak,
    }).eq('id', state.coupleId)

    dispatch({ type: 'ADD_HISTORY', entry: { challengeId, status } })
  }

  return (
    <CoupleContext.Provider value={{ state, loadCouple, createCouple, recordChallenge, levels: LEVELS }}>
      {children}
    </CoupleContext.Provider>
  )
}

export const useCouple = () => useContext(CoupleContext)
