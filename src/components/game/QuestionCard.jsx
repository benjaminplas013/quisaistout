import { useState, useMemo } from 'react'

export default function QuestionCard({ question, helpLevel = 0, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const options = useMemo(() => {
    if (!question) return []
    const all = [question.a, ...question.w]
    const shuffled = all.sort(() => Math.random() - 0.5)
    if (helpLevel === 2) return shuffled.slice(0, 2)
    return shuffled
  }, [question, helpLevel])

  function handleSelect(option) {
    if (revealed) return
    setSelected(option)
    setRevealed(true)
    setTimeout(() => {
      const isCorrect = option === question.a
      const points = isCorrect ? (helpLevel === 0 ? 3 : helpLevel === 1 ? 2 : 1) : 0
      onAnswer(points)
      setSelected(null)
      setRevealed(false)
    }, 1200)
  }

  if (!question) return null

  return (
    <div className="question-card">
      <p className="question-category">{question.category}</p>
      <h2 className="question-text">{question.q}</h2>
      <div className="options-grid">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${
              revealed
                ? opt === question.a
                  ? 'correct'
                  : opt === selected
                  ? 'wrong'
                  : ''
                : ''
            }`}
            onClick={() => handleSelect(opt)}
            disabled={revealed}
          >
            {opt}
          </button>
        ))}
      </div>
      {revealed && question.fun_fact && (
        <p className="fun-fact">💡 {question.fun_fact}</p>
      )}
    </div>
  )
}
