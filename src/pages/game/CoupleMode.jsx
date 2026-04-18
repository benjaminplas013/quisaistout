import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const LEVELS = [
  { level: 1, name: 'Étincelle ✨',        minXp: 0 },
  { level: 2, name: 'Flamme 🔥',            minXp: 150 },
  { level: 3, name: 'Feu Sacré 🌟',         minXp: 350 },
  { level: 4, name: 'Duo Magnétique 🧲',    minXp: 650 },
  { level: 5, name: 'Âmes Sœurs 💞',        minXp: 1100 },
  { level: 6, name: 'Fusionnels 🔮',         minXp: 1700 },
  { level: 7, name: 'Inséparables 💎',       minXp: 2500 },
  { level: 8, name: 'Légende du Couple 👑', minXp: 3500 },
]

const COMFORT_OPTIONS = [
  { id: 'soft',     label: 'Soft',     icon: '🌸', desc: 'Romantique & doux',     maxIntensity: 2 },
  { id: 'fun',      label: 'Fun',      icon: '😄', desc: 'Joueur & amusant',       maxIntensity: 3 },
  { id: 'hot',      label: 'Hot',      icon: '🔥', desc: 'Flirty & passionné',     maxIntensity: 4 },
  { id: 'hardcore', label: 'Hardcore', icon: '💀', desc: 'Tout est permis',        maxIntensity: 5 },
]

const XP_MAP = { completed: 50, skipped: 10, refused: 0 }

function getLevel(xp) {
  return [...LEVELS].reverse().find(l => xp >= l.minXp) ?? LEVELS[0]
}

function getProgress(xp) {
  const current = getLevel(xp)
  const next = LEVELS.find(l => l.level === current.level + 1)
  if (!next) return 100
  return Math.min(100, ((xp - current.minXp) / (next.minXp - current.minXp)) * 100)
}

export default function CoupleMode() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('age') // age | setup | dashboard | challenge | result
  const [coupleData, setCoupleData] = useState(null)
  const [comfort, setComfort] = useState(null)
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [codeInput, setCodeInput] = useState('')
  const [challenges, setChallenges] = useState([])
  const [pack, setPack] = useState(null)          // [solo, duo, question]
  const [packStatus, setPackStatus] = useState({}) // { id: 'pending'|'completed'|'skipped'|'refused' }
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [lastXp, setLastXp] = useState(null)

  // ── Age gate ──────────────────────────────────────────────────────
  if (phase === 'age') {
    return (
      <div className="age-gate">
        <div className="age-gate-icon">🔞</div>
        <h2>Vérification d'âge</h2>
        <p>Ce mode contient du contenu réservé aux adultes. Vous devez avoir 18 ans ou plus pour continuer.</p>
        <div className="age-gate-warning">
          ⚠️ Contenu adulte — intensité variable selon votre niveau de confort
        </div>
        <div className="age-gate-buttons">
          <button className="btn btn-primary" onClick={() => setPhase('setup')}>
            ✅ J'ai 18 ans ou plus
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            ← Retour
          </button>
        </div>
      </div>
    )
  }

  // ── Setup ─────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="game-page">
        <div className="couple-setup">
          <h1>💑 Défis Couple</h1>

          <div className="setup-card">
            <h2>Nouveau couple</h2>
            <div className="player-input-row">
              <span className="player-avatar">🧑</span>
              <input className="player-input" placeholder="Prénom joueur 1" value={p1} onChange={e => setP1(e.target.value)} maxLength={20} />
            </div>
            <div className="player-input-row">
              <span className="player-avatar">🧑</span>
              <input className="player-input" placeholder="Prénom joueur 2" value={p2} onChange={e => setP2(e.target.value)} maxLength={20} />
            </div>

            <div className="setup-label" style={{ marginTop: 4 }}>Niveau de confort</div>
            <div className="comfort-grid">
              {COMFORT_OPTIONS.map(opt => (
                <button key={opt.id} className={`comfort-btn ${comfort === opt.id ? 'active' : ''}`} onClick={() => setComfort(opt.id)}>
                  <span className="comfort-btn-icon">{opt.icon}</span>
                  <span className="comfort-btn-name">{opt.label}</span>
                  <span className="comfort-btn-desc">{opt.desc}</span>
                </button>
              ))}
            </div>

            <button
              className="btn btn-primary btn-lg"
              disabled={!comfort}
              onClick={() => createCouple(p1, p2, comfort)}
            >
              Créer notre profil 💑
            </button>
          </div>

          <div className="couple-divider">— ou reprendre —</div>

          <div className="setup-card">
            <h2>Reprendre une partie</h2>
            <input
              className="code-input"
              placeholder="ABC123"
              value={codeInput}
              onChange={e => setCodeInput(e.target.value.toUpperCase())}
              maxLength={6}
            />
            <button className="btn btn-secondary" onClick={() => loadCouple(codeInput)} disabled={codeInput.length < 6}>
              Reprendre →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Dashboard ─────────────────────────────────────────────────────
  if (phase === 'dashboard' && coupleData) {
    const lvl = getLevel(coupleData.xp)
    const progress = getProgress(coupleData.xp)
    const allDone = pack && Object.values(packStatus).every(s => s !== 'pending')

    return (
      <div className="game-page">
        <div className="level-card">
          <div className="level-header">
            <div>
              <div className="level-name">{lvl.name}</div>
              <div className="level-num">Niveau {lvl.level}</div>
            </div>
            <div className="level-xp">{coupleData.xp} XP</div>
          </div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${progress}%` }} />
          </div>
          {coupleData.streak > 0 && <div className="streak-badge">🔥 Série de {coupleData.streak}</div>}
        </div>

        {pack ? (
          <div className="pack-grid">
            {pack.map(c => (
              <div
                key={c.id}
                className={`pack-card type-${c.type} ${packStatus[c.id] && packStatus[c.id] !== 'pending' ? 'done' : ''}`}
                onClick={() => { if (!packStatus[c.id] || packStatus[c.id] === 'pending') openChallenge(c) }}
              >
                <span className="pack-card-icon">{c.emoji || '💫'}</span>
                <div className="pack-card-content">
                  <div className="pack-card-type">{c.type === 'solo' ? 'Solo' : c.type === 'duo' ? 'À deux' : 'Question'}</div>
                  <div className="pack-card-desc">{c.description?.slice(0, 60)}{c.description?.length > 60 ? '…' : ''}</div>
                </div>
                <span className="pack-card-status">
                  {packStatus[c.id] === 'completed' ? '✅' : packStatus[c.id] === 'skipped' ? '⏭️' : packStatus[c.id] === 'refused' ? '✗' : '▶️'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={generatePack}>
            Générer un pack de défis 🎲
          </button>
        )}

        {allDone && (
          <button className="btn btn-secondary" onClick={generatePack}>Nouveau pack →</button>
        )}

        <div className="couple-code">Code : <strong>{coupleData.id}</strong></div>
      </div>
    )
  }

  // ── Challenge view ────────────────────────────────────────────────
  if (phase === 'challenge' && currentChallenge) {
    const intensity = COMFORT_OPTIONS.find(c => c.id === coupleData?.comfort)?.maxIntensity ?? 3

    return (
      <div className="game-page">
        <button className="back-btn" onClick={() => setPhase('dashboard')}>← Retour</button>
        <div className="challenge-view">
          <div className="challenge-emoji-big">{currentChallenge.emoji || '💫'}</div>
          <div className="challenge-intensity">{'🔥'.repeat(currentChallenge.intensity)}</div>
          <div className="challenge-desc">{currentChallenge.description}</div>
          <div className="challenge-actions">
            <button className="btn-refuse" onClick={() => resolveChallenge('refused')}>✗ Refuser</button>
            <button className="btn-skip"   onClick={() => resolveChallenge('skipped')}>⏭️ Passer</button>
            <button className="btn-complete" onClick={() => resolveChallenge('completed')}>✓ Fait !</button>
          </div>
        </div>
      </div>
    )
  }

  // ── XP result ─────────────────────────────────────────────────────
  if (phase === 'result' && lastXp !== null) {
    return (
      <div className="result-screen">
        <div className="result-icon">✨</div>
        <div className="result-title" style={{ color: 'var(--green)' }}>
          {lastXp.status === 'completed' ? 'Défi accompli !' : lastXp.status === 'skipped' ? 'Passé' : 'Refusé'}
        </div>
        {lastXp.xpGain > 0 && <div className="result-points">+{lastXp.xpGain} XP</div>}
        {lastXp.levelUp && <div style={{ color: 'var(--yellow)', fontWeight: 700 }}>🎉 Niveau {lastXp.newLevel} débloqué !</div>}
        <button className="btn btn-primary" onClick={() => setPhase('dashboard')}>← Retour au pack</button>
      </div>
    )
  }

  return null

  // ── Helpers ───────────────────────────────────────────────────────

  async function createCouple(name1, name2, comfortId) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const id = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    const { data, error } = await supabase.from('couples').insert({
      id,
      player1_name: name1 || 'Joueur 1',
      player2_name: name2 || 'Joueur 2',
      xp: 0, level: 1, streak: 0,
    }).select().single()
    if (!error && data) {
      setCoupleData({ ...data, comfort: comfortId })
      await loadChallenges(comfortId)
      setPhase('dashboard')
    }
  }

  async function loadCouple(code) {
    const { data, error } = await supabase.from('couples').select('*').eq('id', code).single()
    if (!error && data) {
      setCoupleData({ ...data, comfort: 'fun' })
      await loadChallenges('fun')
      setPhase('dashboard')
    } else {
      alert('Code introuvable. Vérifie les 6 caractères.')
    }
  }

  async function loadChallenges(comfortId) {
    const maxIntensity = COMFORT_OPTIONS.find(c => c.id === comfortId)?.maxIntensity ?? 3
    const { data } = await supabase.from('challenges').select('*').lte('intensity', maxIntensity)
    setChallenges(data ?? [])
  }

  function generatePack() {
    const solo = challenges.filter(c => c.type === 'solo')
    const duo = challenges.filter(c => c.type === 'duo')
    const question = challenges.filter(c => c.type === 'question')
    const pick = arr => arr[Math.floor(Math.random() * arr.length)]
    const newPack = [
      solo.length ? pick(solo) : challenges[0],
      duo.length ? pick(duo) : challenges[1],
      question.length ? pick(question) : challenges[2],
    ].filter(Boolean)
    setPack(newPack)
    setPackStatus(Object.fromEntries(newPack.map(c => [c.id, 'pending'])))
  }

  function openChallenge(challenge) {
    setCurrentChallenge(challenge)
    setPhase('challenge')
  }

  async function resolveChallenge(status) {
    const xpGain = XP_MAP[status] ?? 0
    const newXp = (coupleData.xp ?? 0) + xpGain
    const oldLevel = getLevel(coupleData.xp).level
    const newLevel = getLevel(newXp).level
    const newStreak = status === 'completed' ? (coupleData.streak ?? 0) + 1 : 0

    // Streak bonus
    const bonus = newStreak > 0 && newStreak % 3 === 0 ? 25 : 0
    const finalXp = newXp + bonus

    setCoupleData(prev => ({ ...prev, xp: finalXp, level: newLevel, streak: newStreak }))
    setPackStatus(prev => ({ ...prev, [currentChallenge.id]: status }))

    await supabase.from('couple_history').insert({ couple_id: coupleData.id, challenge_id: currentChallenge.id, status })
    await supabase.from('couples').update({ xp: finalXp, level: newLevel, streak: newStreak }).eq('id', coupleData.id)

    setLastXp({ status, xpGain: xpGain + bonus, levelUp: newLevel > oldLevel, newLevel })
    setPhase('result')
  }
}
