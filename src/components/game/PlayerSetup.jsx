import { useState } from 'react'

export default function PlayerSetup({ minPlayers = 2, maxPlayers = 12, exactCount = null, onStart }) {
  const count = exactCount ?? 2
  const [playerCount, setPlayerCount] = useState(count)
  const [names, setNames] = useState(Array(count).fill(''))

  function handleCountChange(n) {
    setPlayerCount(n)
    setNames(prev => {
      const next = [...prev]
      while (next.length < n) next.push('')
      return next.slice(0, n)
    })
  }

  function handleName(i, val) {
    setNames(prev => prev.map((n, idx) => idx === i ? val : n))
  }

  function handleStart() {
    const finalNames = names.map((n, i) => n.trim() || `Joueur ${i + 1}`)
    onStart(finalNames)
  }

  return (
    <div className="player-setup">
      <h2>Configurer la partie</h2>

      {!exactCount && (
        <div className="player-count-selector">
          <label>Nombre de joueurs</label>
          <div className="count-buttons">
            {Array.from({ length: maxPlayers - minPlayers + 1 }, (_, i) => i + minPlayers).map(n => (
              <button
                key={n}
                className={`count-btn ${playerCount === n ? 'active' : ''}`}
                onClick={() => handleCountChange(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="player-names">
        {names.map((name, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Joueur ${i + 1}`}
            value={name}
            onChange={e => handleName(i, e.target.value)}
            className="player-input"
            maxLength={20}
          />
        ))}
      </div>

      <button className="btn-primary" onClick={handleStart}>
        Lancer la partie 🚀
      </button>
    </div>
  )
}
