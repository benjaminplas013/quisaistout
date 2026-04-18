import { useRef } from 'react'

export default function ModeCard({ mode, onClick }) {
  const cardRef = useRef(null)

  function handleMouseMove(e) {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(700px) rotateX(${y * -18}deg) rotateY(${x * 18}deg) translateZ(10px)`
    const glow = card.querySelector('.mode-card-glow')
    if (glow) glow.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, ${mode.glow} 0%, transparent 60%)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    card.style.transform = ''
  }

  return (
    <div
      ref={cardRef}
      className={`mode-card mode-card-${mode.id}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mode-card-glow" />
      {mode.badge && <span className={`mode-badge ${mode.badge.cls}`}>{mode.badge.label}</span>}
      <span className="mode-icon">{mode.icon}</span>
      <h2 className="mode-title">{mode.title}</h2>
      <p className="mode-desc">{mode.description}</p>
      <div className="mode-tags">
        {mode.tags.map(t => <span key={t} className="mode-tag">{t}</span>)}
      </div>
    </div>
  )
}
