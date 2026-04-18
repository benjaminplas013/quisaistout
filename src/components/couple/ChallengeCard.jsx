export default function ChallengeCard({ challenge, onComplete, onSkip, onRefuse }) {
  return (
    <div className="challenge-card">
      <span className="challenge-emoji">{challenge.emoji}</span>
      <span className="challenge-intensity">{'🔥'.repeat(challenge.intensity)}</span>
      <p className="challenge-description">{challenge.description}</p>
      <div className="challenge-actions">
        <button className="btn-refuse" onClick={onRefuse}>✗ Refuser</button>
        <button className="btn-skip" onClick={onSkip}>↷ Passer</button>
        <button className="btn-complete" onClick={onComplete}>✓ Fait !</button>
      </div>
    </div>
  )
}
