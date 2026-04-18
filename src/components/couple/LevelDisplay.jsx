const LEVELS = [
  { level: 1, name: 'Étincelle', minXp: 0, maxXp: 100 },
  { level: 2, name: 'Complicité', minXp: 100, maxXp: 250 },
  { level: 3, name: 'Flamme', minXp: 250, maxXp: 500 },
  { level: 4, name: 'Fusion', minXp: 500, maxXp: 800 },
  { level: 5, name: 'Passion', minXp: 800, maxXp: 1200 },
  { level: 6, name: 'Alchimie', minXp: 1200, maxXp: 1700 },
  { level: 7, name: 'Devotion', minXp: 1700, maxXp: 2500 },
  { level: 8, name: 'Légende du Couple', minXp: 2500, maxXp: 2500 },
]

export default function LevelDisplay({ xp, level, streak }) {
  const current = LEVELS.find(l => l.level === level) ?? LEVELS[0]
  const next = LEVELS.find(l => l.level === level + 1)
  const progress = next
    ? Math.min(100, ((xp - current.minXp) / (next.minXp - current.minXp)) * 100)
    : 100

  return (
    <div className="level-display">
      <div className="level-info">
        <span className="level-name">Niveau {level} — {current.name}</span>
        <span className="level-xp">{xp} XP</span>
      </div>
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: `${progress}%` }} />
      </div>
      {streak > 0 && <span className="streak-badge">🔥 Streak ×{streak}</span>}
    </div>
  )
}
