export default function ScoreBoard({ players, scores, currentPlayer }) {
  const sorted = [...players].sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))

  return (
    <div className="scoreboard">
      {sorted.map((player, i) => (
        <div key={player} className={`score-row ${player === currentPlayer ? 'active' : ''}`}>
          <span className="score-rank">#{i + 1}</span>
          <span className="score-name">{player}</span>
          <span className="score-points">{scores[player] ?? 0} pts</span>
        </div>
      ))}
    </div>
  )
}
