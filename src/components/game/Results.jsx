import { useNavigate } from 'react-router-dom'

export default function Results({ players, scores, onPlayAgain }) {
  const navigate = useNavigate()
  const sorted = [...players].sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))
  const winner = sorted[0]

  return (
    <div className="results-screen">
      <h1>🏆 Fin de la partie !</h1>
      <p className="winner-announce">Bravo <strong>{winner}</strong> !</p>

      <div className="final-scores">
        {sorted.map((player, i) => (
          <div key={player} className={`final-row rank-${i + 1}`}>
            <span className="final-rank">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
            <span className="final-name">{player}</span>
            <span className="final-pts">{scores[player] ?? 0} pts</span>
          </div>
        ))}
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={onPlayAgain}>Rejouer</button>
        <button className="btn-secondary" onClick={() => navigate('/')}>Accueil</button>
      </div>
    </div>
  )
}
