import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useQuestions(mode, category = null) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!mode) return

    async function fetchQuestions() {
      setLoading(true)
      let query = supabase.from('questions').select('*').eq('mode', mode)
      if (category) query = query.eq('category', category)

      const { data, error } = await query
      if (error) {
        setError(error.message)
      } else {
        setQuestions(data ?? [])
      }
      setLoading(false)
    }

    fetchQuestions()
  }, [mode, category])

  function shuffle() {
    return [...questions].sort(() => Math.random() - 0.5)
  }

  return { questions, loading, error, shuffle }
}
