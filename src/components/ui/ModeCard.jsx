import { useRef } from 'react'

export default function ModeCard({ title, description, emoji, badge, onClick }) {
  const cardRef = useRef(null)

  function handleMouseMove(e) {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    card.style.transform = `perspective(600px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) scale(1.03)`
  }

  function handleMouseLeave() {
    cardRef.current.style.transform = ''
  }

  return (
    <div
      ref={cardRef}
      className="mode-card"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {badge && <span className="mode-badge">{badge}</span>}
      <span className="mode-emoji">{emoji}</span>
      <h2 className="mode-title">{title}</h2>
      <p className="mode-description">{description}</p>
    </div>
  )
}
