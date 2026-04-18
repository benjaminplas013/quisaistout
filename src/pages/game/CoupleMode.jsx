import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useCouple } from '../../contexts/CoupleContext'
import { useNavigate } from 'react-router-dom'
import ChallengeCard from '../../components/couple/ChallengeCard'
import LevelDisplay from '../../components/couple/LevelDisplay'

const INTENSITY_LABELS = {
  1: { label: 'Soft', emoji: '🌸' },
  2: { label: 'Doux', emoji: '💕' },
  3: { label: 'Fun', emoji: '😄' },
  4: { label: 'Hot', emoji: '🔥' },
  5: { label: 'Hardcore', emoji: '💀' },
}

export default function CoupleMode() {
  const { state, loadCouple, createCouple, recordChallenge } = useCouple()
  const navigate = useNavigate()
  const [setup, setSetup] = useState(!state.coupleId)
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [coupleIdInput, setCoupleIdInput] = useState('')
  const [challenges, setChallenges] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [maxIntensity, setMaxIntensity] = useState(3)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!setup) fetchChallenges()
  }, [setup, maxIntensity])

  async function fetchChallenges() {
    setLoading(true)
    const { data } = await supabase
      .from('challenges')
      .select('*')
      .lte('intensity', maxIntensity)
      .order('intensity')
    setChallenges((data ?? []).sort(() => Math.random() - 0.5))
    setCurrentIndex(0)
    setLoading(false)
  }

  async function handleNewCouple() {
    const id = await createCouple(p1 || 'Joueur 1', p2 || 'Joueur 2')
    if (id) setSetup(false)
  }

  async function handleLoadCouple() {
    await loadCouple(coupleIdInput.toUpperCase())
    if (state.coupleId) setSetup(false)
  }

  async function handleChallengeAction(status) {
    const challenge = challenges[currentIndex]
    if (!challenge) return
    await recordChallenge(challenge.id, status)
    setCurrentIndex(i => i + 1)
  }

  if (setup) {
    return (
      <div className="couple-setup">
        <h1>💑 Défis Couple</h1>

        <div className="setup-section">
          <h2>Nouveau couple</h2>
          <input placeholder="Prénom joueur 1" value={p1} onChange={e => setP1(e.target.value)} />
          <input placeholder="Prénom joueur 2" value={p2} onChange={e => setP2(e.target.value)} />
          <button className="btn-primary" onClick={handleNewCouple}>Créer notre profil</button>
        </div>

        <div className="setup-divider">— ou —</div>

        <div className="setup-section">
          <h2>Reprendre une partie</h2>
          <input
            placeholder="Code couple (ex: ABC123)"
            value={coupleIdInput}
            onChange={e => setCoupleIdInput(e.target.value)}
            maxLength={6}
          />
          <button className="btn-secondary" onClick={handleLoadCouple}>Reprendre</button>
        </div>

        <button className="btn-back" onClick={() => navigate('/')}>← Retour</button>
      </div>
    )
  }

  const challenge = challenges[currentIndex]

  return (
    <div className="game-screen game-couple">
      <LevelDisplay xp={state.xp} level={state.level} streak={state.streak} />

      <div className="intensity-selector">
        {Object.entries(INTENSITY_LABELS).map(([lvl, { label, emoji }]) => (
          <button
            key={lvl}
            className={`intensity-btn ${maxIntensity >= Number(lvl) ? 'active' : ''}`}
            onClick={() => setMaxIntensity(Number(lvl))}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-screen">Chargement des défis...</div>
      ) : challenge ? (
        <ChallengeCard
          challenge={challenge}
          onComplete={() => handleChallengeAction('completed')}
          onSkip={() => handleChallengeAction('skipped')}
          onRefuse={() => handleChallengeAction('refused')}
        />
      ) : (
        <div className="no-more-challenges">
          <p>🎉 Tous les défis terminés !</p>
          <button className="btn-primary" onClick={fetchChallenges}>Recommencer</button>
        </div>
      )}

      <p className="couple-id-display">Code : <strong>{state.coupleId}</strong></p>
    </div>
  )
}
