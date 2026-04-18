export default function HelpModal({ onClose, modes }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Comment jouer ?</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-mode-cards">
          {modes.map(m => (
            <div key={m.id} className="modal-mode-card">
              <span className="modal-mode-icon">{m.icon}</span>
              <div className="modal-mode-info">
                <h3>{m.title}</h3>
                <p>{m.description} — {m.tags.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.5 }}>
            🎲 <strong>Jokers :</strong> chaque joueur dispose de 3 jokers utilisables une seule fois —
            <em>Double ou Rien</em> (double les points, mais pénalité si faux),
            <em>Passer</em> (changer de question) et
            <em>Sondage</em> (voir les % de bonnes réponses du public).
          </p>
        </div>
      </div>
    </div>
  )
}
