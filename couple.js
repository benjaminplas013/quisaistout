/* ══════════════════════════════════════════════════════════════
   DÉFIS COUPLE ÉVOLUTIF — Logique & UI
   ══════════════════════════════════════════════════════════════ */

// ── Constantes ────────────────────────────────────────────────
const COMFORT_MAX    = { soft: 2, fun: 3, hot: 4, hardcore: 5 };
const COMFORT_LABELS = { soft: '🌸 Soft', fun: '😄 Fun', hot: '🔥 Hot', hardcore: '💀 Hardcore' };
const COMFORT_CATS   = {
  soft:     ['romantique', 'communication', 'fun'],
  fun:      ['romantique', 'communication', 'fun', 'coquin'],
  hot:      ['romantique', 'communication', 'fun', 'coquin', 'domination'],
  hardcore: ['romantique', 'communication', 'fun', 'coquin', 'domination'],
};

const COUPLE_LEVELS = [
  { level: 1, name: 'Étincelle',         emoji: '✨', xp: 0    },
  { level: 2, name: 'Flamme',            emoji: '🔥', xp: 150  },
  { level: 3, name: 'Feu Sacré',         emoji: '🌟', xp: 350  },
  { level: 4, name: 'Duo Magnétique',    emoji: '🧲', xp: 650  },
  { level: 5, name: 'Âmes Sœurs',        emoji: '💞', xp: 1100 },
  { level: 6, name: 'Fusionnels',        emoji: '🔮', xp: 1700 },
  { level: 7, name: 'Inséparables',      emoji: '💎', xp: 2500 },
  { level: 8, name: 'Légende du Couple', emoji: '👑', xp: 3500 },
];

const XP_REWARDS  = { completed: 50, skipped: 10, refused: 0 };
const STREAK_BONUS = 25;
const LS_KEY = 'qst_couples_v1';

// ── Cat labels ────────────────────────────────────────────────
const CAT_LABELS = {
  romantique:    '💗 Romantique',
  fun:           '😄 Fun',
  coquin:        '🌶️ Coquin',
  domination:    '👑 Domination',
  communication: '💬 Communication',
};

// ── LocalStorage ──────────────────────────────────────────────
function lsLoadAll() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }
  catch { return {}; }
}
function lsSaveAll(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

// ── Couple state ──────────────────────────────────────────────
let cp = null; // active couple data

function cpSave() {
  if (!cp) return;
  const all = lsLoadAll();
  all[cp.id] = cp;
  lsSaveAll(all);
}

function cpLoad(id) {
  const all = lsLoadAll();
  return all[id] || null;
}

function cpGenId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const existing = lsLoadAll();
  let id, attempts = 0;
  do {
    id = '';
    for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
    attempts++;
  } while (existing[id] && attempts < 20);
  return id;
}

function cpCreate(p1, p2, comfort) {
  const cats = [...COMFORT_CATS[comfort]];
  const id   = cpGenId();
  cp = {
    id, p1, p2, comfort,
    categories: cats,
    xp: 0, level: 1,
    streak: 0, lastActiveDate: null,
    adaptiveIntensity: Math.max(1, Math.ceil(COMFORT_MAX[comfort] / 2)),
    history: [],
    confessions: [],
    currentPack: null,
    packStatus: {},   // { solo: 'pending'|'completed'|'skipped'|'refused', duo: …, question: … }
    currentItemKey: null,
  };
  cpSave();
  return cp;
}

// ── Level helpers ─────────────────────────────────────────────
function getLevelData(xp) {
  let cur = COUPLE_LEVELS[0];
  for (const l of COUPLE_LEVELS) { if (xp >= l.xp) cur = l; else break; }
  return cur;
}

function getNextLevelData(xp) {
  for (let i = 0; i < COUPLE_LEVELS.length - 1; i++) {
    if (xp < COUPLE_LEVELS[i + 1].xp) return COUPLE_LEVELS[i + 1];
  }
  return null;
}

function getXpPct(xp) {
  const cur  = getLevelData(xp);
  const next = getNextLevelData(xp);
  if (!next) return 100;
  return Math.round(((xp - cur.xp) / (next.xp - cur.xp)) * 100);
}

// ── Streak ────────────────────────────────────────────────────
function cpUpdateStreak() {
  const today = new Date().toDateString();
  if (!cp.lastActiveDate) {
    cp.streak = 1;
    cp.xp += STREAK_BONUS;
  } else if (cp.lastActiveDate !== today) {
    const last = new Date(cp.lastActiveDate);
    const diff = Math.floor((new Date() - last) / 86400000);
    if (diff === 1) { cp.streak++; cp.xp += STREAK_BONUS; }
    else if (diff > 1) { cp.streak = 1; }
  }
  cp.lastActiveDate = today;
}

// ── Pack generation ───────────────────────────────────────────
function cpGeneratePack() {
  const maxInt   = COMFORT_MAX[cp.comfort];
  const target   = Math.min(maxInt, Math.max(1, Math.round(cp.adaptiveIntensity)));
  const cats     = cp.categories;
  const recentIds = new Set(cp.history.slice(-18).map(h => h.id));

  function pickChallenge(type) {
    let pool = COUPLE_CHALLENGES.filter(c =>
      c.type === type &&
      cats.includes(c.category) &&
      c.intensity <= maxInt &&
      !recentIds.has(String(c.id))
    );
    if (!pool.length) {
      // Fallback sans historique
      pool = COUPLE_CHALLENGES.filter(c =>
        c.type === type && cats.includes(c.category) && c.intensity <= maxInt
      );
    }
    if (!pool.length) return null;
    const preferred = pool.filter(c => c.intensity === target);
    const nearby    = pool.filter(c => Math.abs(c.intensity - target) <= 1);
    const src = preferred.length ? preferred : (nearby.length ? nearby : pool);
    return src[Math.floor(Math.random() * src.length)];
  }

  function pickQuestion() {
    let pool = COUPLE_QUESTIONS.filter(q =>
      cats.includes(q.category) &&
      q.intensity <= maxInt &&
      !recentIds.has('q' + q.id)
    );
    if (!pool.length) {
      pool = COUPLE_QUESTIONS.filter(q =>
        cats.includes(q.category) && q.intensity <= maxInt
      );
    }
    if (!pool.length) return null;
    const preferred = pool.filter(q => q.intensity === target);
    const nearby    = pool.filter(q => Math.abs(q.intensity - target) <= 1);
    const src = preferred.length ? preferred : (nearby.length ? nearby : pool);
    return src[Math.floor(Math.random() * src.length)];
  }

  const solo     = pickChallenge('solo');
  const duo      = pickChallenge('duo');
  const question = pickQuestion();

  cp.currentPack   = { solo, duo, question };
  cp.packStatus    = { solo: 'pending', duo: 'pending', question: 'pending' };
  cp.currentItemKey = null;
  cpSave();
  return cp.currentPack;
}

// ── Adaptive intensity ────────────────────────────────────────
function cpAdjust(status) {
  const max = COMFORT_MAX[cp.comfort];
  if      (status === 'completed') cp.adaptiveIntensity = Math.min(max, cp.adaptiveIntensity + 0.3);
  else if (status === 'skipped')   cp.adaptiveIntensity = Math.max(1,   cp.adaptiveIntensity - 0.1);
  else if (status === 'refused')   cp.adaptiveIntensity = Math.max(1,   cp.adaptiveIntensity - 0.5);
}

// ── Handle action on an item ──────────────────────────────────
function cpHandleAction(key, status) {
  const isQuestion = key === 'question';
  const item  = cp.currentPack[key];
  const histId = isQuestion ? 'q' + item.id : String(item.id);

  const xpGained = XP_REWARDS[status] || 0;
  const oldLevel = getLevelData(cp.xp).level;
  cp.xp += xpGained;
  const newLevel = getLevelData(cp.xp).level;
  cp.level = newLevel;

  cp.history.push({ id: histId, status, date: new Date().toISOString() });
  cp.packStatus[key] = status;
  cpAdjust(status);
  cpUpdateStreak();
  cpSave();
  return { xpGained, levelUp: newLevel > oldLevel, newLevelData: getLevelData(cp.xp) };
}

// ══════════════════════════════════════════════════════════════
// UI — NAVIGATION
// ══════════════════════════════════════════════════════════════

function startCoupleMode() {
  // Vérification d'âge : demande seulement si pas encore confirmé dans cette session
  if (!sessionStorage.getItem('age18confirmed')) {
    document.getElementById('modal-age').classList.remove('hidden');
    return;
  }
  showScreen('screen-couple-home');
}

function ageConfirm() {
  sessionStorage.setItem('age18confirmed', '1');
  document.getElementById('modal-age').classList.add('hidden');
  showScreen('screen-couple-home');
}

function ageDeny() {
  document.getElementById('modal-age').classList.add('hidden');
  showToast('🔞 Ce mode est réservé aux 18 ans et plus.');
}

// ── ÉCRAN HOME : nouveau ou reprendre ────────────────────────
function coupleHomeNew() {
  document.getElementById('csetup-p1').value = '';
  document.getElementById('csetup-p2').value = '';
  _selectedComfort = null;
  document.querySelectorAll('.comfort-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('csetup-step1').classList.remove('hidden');
  document.getElementById('csetup-step2').classList.add('hidden');
  showScreen('screen-couple-setup');
}

function coupleHomeResume() {
  document.getElementById('cresume-input').value = '';
  document.getElementById('cresume-error').textContent = '';
  showScreen('screen-couple-resume');
}

function coupleResumeSubmit() {
  const code = document.getElementById('cresume-input').value.trim().toUpperCase();
  if (code.length !== 6) {
    document.getElementById('cresume-error').textContent = 'Le code doit contenir 6 caractères.';
    return;
  }
  const data = cpLoad(code);
  if (!data) {
    document.getElementById('cresume-error').textContent = 'Aucun couple trouvé avec ce code.';
    return;
  }
  // Validation des champs critiques pour éviter un crash sur données corrompues
  if (
    typeof data.xp !== 'number' ||
    !Array.isArray(data.history) ||
    !Array.isArray(data.confessions) ||
    typeof data.p1 !== 'string' ||
    typeof data.p2 !== 'string'
  ) {
    document.getElementById('cresume-error').textContent = 'Données corrompues. Recommencez une nouvelle partie.';
    return;
  }
  cp = data;
  showCoupleDashboard();
}

// ── SETUP WIZARD ─────────────────────────────────────────────
function cSetupNext1() {
  const p1 = document.getElementById('csetup-p1').value.trim();
  const p2 = document.getElementById('csetup-p2').value.trim();
  if (!p1 || !p2) { showToast('Entrez vos deux prénoms !'); return; }
  if (p1.toLowerCase() === p2.toLowerCase()) { showToast('Choisissez deux prénoms différents !'); return; }
  document.getElementById('csetup-step1').classList.add('hidden');
  document.getElementById('csetup-step2').classList.remove('hidden');
}

let _selectedComfort = null;

function cSelectComfort(level, el) {
  _selectedComfort = level;
  document.querySelectorAll('.comfort-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function cSetupNext2() {
  if (!_selectedComfort) { showToast('Choisissez un niveau de confort !'); return; }
  const p1 = document.getElementById('csetup-p1').value.trim();
  const p2 = document.getElementById('csetup-p2').value.trim();
  cpCreate(p1, p2, _selectedComfort);
  showCoupleDashboard();
}

// ── DASHBOARD ─────────────────────────────────────────────────
function showCoupleDashboard() {
  const lvl  = getLevelData(cp.xp);
  const next = getNextLevelData(cp.xp);
  const pct  = getXpPct(cp.xp);

  document.getElementById('cdash-names').textContent = `${escapeHtml(cp.p1)} & ${escapeHtml(cp.p2)}`;
  document.getElementById('cdash-level-badge').textContent = `${lvl.emoji} Niv. ${lvl.level} — ${lvl.name}`;
  document.getElementById('cdash-xp-bar').style.width = pct + '%';
  document.getElementById('cdash-xp-text').textContent = next
    ? `${cp.xp} / ${next.xp} XP`
    : `${cp.xp} XP — Niveau max !`;
  document.getElementById('cdash-streak').textContent = cp.streak > 0
    ? `🔥 ${cp.streak} jour${cp.streak > 1 ? 's' : ''} de suite`
    : '🔥 0 jour';
  document.getElementById('cdash-code').textContent = cp.id;
  document.getElementById('cdash-comfort').textContent = COMFORT_LABELS[cp.comfort];

  // Stats rapides
  const done   = cp.history.filter(h => h.status === 'completed').length;
  const skipped = cp.history.filter(h => h.status === 'skipped').length;
  document.getElementById('cdash-stat-done').textContent   = done;
  document.getElementById('cdash-stat-skip').textContent   = skipped;
  document.getElementById('cdash-stat-total').textContent  = cp.history.length;

  showScreen('screen-couple-dashboard');
}

// ── PACK ──────────────────────────────────────────────────────
function openCouplePack() {
  // Si pas de pack du jour ou pack terminé → en générer un
  const allDone = cp.currentPack && Object.values(cp.packStatus).every(s => s !== 'pending');
  if (!cp.currentPack || allDone) {
    cpGeneratePack();
  }
  renderCouplePack();
  showScreen('screen-couple-pack');
}

function renderCouplePack() {
  const pack   = cp.currentPack;
  const status = cp.packStatus;

  const defs = [
    { key: 'solo',     icon: '🧍', label: 'Défi Solo',  color: 'purple' },
    { key: 'duo',      icon: '🫂', label: 'Défi Duo',   color: 'pink'   },
    { key: 'question', icon: '💬', label: 'Question',   color: 'cyan'   },
  ];

  const container = document.getElementById('cpack-items');
  container.innerHTML = '';

  defs.forEach(({ key, icon, label, color }) => {
    const item   = pack[key];
    const st     = status[key];
    if (!item) return;

    const isDone     = st !== 'pending';
    const statusIcon = st === 'completed' ? '✅' : st === 'skipped' ? '⏭️' : st === 'refused' ? '❌' : '';

    const isQ = key === 'question';
    const desc = isQ ? item.text : item.description;
    const cat  = isQ
      ? CAT_LABELS[item.category] || item.category
      : CAT_LABELS[item.category] || item.category;
    const intensityStars = '★'.repeat(item.intensity) + '☆'.repeat(5 - item.intensity);

    const card = document.createElement('div');
    card.className = `cpack-card cpack-${color}${isDone ? ' cpack-done' : ''}`;
    card.innerHTML = `
      <div class="cpack-card-header">
        <span class="cpack-type-icon">${icon}</span>
        <span class="cpack-type-label">${label}</span>
        <span class="cpack-status-icon">${statusIcon}</span>
      </div>
      <div class="cpack-cat">${cat}</div>
      <p class="cpack-desc">${escapeHtml(desc)}</p>
      <div class="cpack-footer">
        <span class="cpack-stars">${intensityStars}</span>
        ${!isDone ? `<button class="btn-cpack-open" onclick="openCoupleChallenge('${key}')">Voir →</button>` : `<span class="cpack-done-label">${st === 'completed' ? 'Complété !' : st === 'skipped' ? 'Passé' : 'Refusé'}</span>`}
      </div>
    `;
    container.appendChild(card);
  });

  // Bouton Nouveau Pack si tout est fait
  const allDone = Object.values(status).every(s => s !== 'pending');
  document.getElementById('cpack-newpack-btn').style.display = allDone ? 'block' : 'none';
}

function openCoupleChallenge(key) {
  cp.currentItemKey = key;
  const item = cp.currentPack[key];
  const isQ  = key === 'question';

  document.getElementById('cchallenge-type-icon').textContent =
    key === 'solo' ? '🧍' : key === 'duo' ? '🫂' : '💬';
  document.getElementById('cchallenge-type-label').textContent =
    key === 'solo' ? 'Défi Solo' : key === 'duo' ? 'Défi à Deux' : 'Question';

  const cat = CAT_LABELS[item.category] || item.category;
  document.getElementById('cchallenge-cat').textContent = cat;

  const stars = '★'.repeat(item.intensity) + '☆'.repeat(5 - item.intensity);
  document.getElementById('cchallenge-stars').textContent = stars;

  document.getElementById('cchallenge-emoji').textContent = isQ ? '💬' : item.emoji;
  document.getElementById('cchallenge-desc').textContent  = isQ ? item.text : item.description;

  // Boutons action
  const actionsDiv = document.getElementById('cchallenge-actions');
  actionsDiv.innerHTML = '';

  if (isQ && item.type === 'vrai_faux') {
    // Mode vrai/faux interactif
    actionsDiv.innerHTML = `
      <p class="cchallenge-vf-label">Répondez chacun à votre tour (sans montrer à l'autre) :</p>
      <div class="cvf-section" id="cvf-p1-section">
        <p class="cvf-player-name">👤 ${escapeHtml(cp.p1)}, c'est <strong>VRAI</strong> ou <strong>FAUX</strong> ?</p>
        <div class="cvf-buttons">
          <button class="cvf-btn cvf-v" onclick="cvfSelect('p1','vrai',this)">✅ VRAI</button>
          <button class="cvf-btn cvf-f" onclick="cvfSelect('p1','faux',this)">❌ FAUX</button>
        </div>
      </div>
      <div class="cvf-pass" id="cvf-pass-msg" style="display:none">
        <p>📱 Passe le téléphone à <strong>${escapeHtml(cp.p2)}</strong> !</p>
        <button class="btn-primary" onclick="cvfShowP2()">Prêt(e) →</button>
      </div>
      <div class="cvf-section" id="cvf-p2-section" style="display:none">
        <p class="cvf-player-name">👤 ${escapeHtml(cp.p2)}, c'est <strong>VRAI</strong> ou <strong>FAUX</strong> ?</p>
        <div class="cvf-buttons">
          <button class="cvf-btn cvf-v" onclick="cvfSelect('p2','vrai',this)">✅ VRAI</button>
          <button class="cvf-btn cvf-f" onclick="cvfSelect('p2','faux',this)">❌ FAUX</button>
        </div>
      </div>
      <div id="cvf-reveal" style="display:none"></div>
      <div id="cvf-done-btns" style="display:none" class="cchallenge-btn-row">
        <button class="btn-cchallenge skip" onclick="cChallengeAction('skipped')">⏭️ Passer</button>
        <button class="btn-cchallenge done" onclick="cChallengeAction('completed')">✅ Complété</button>
      </div>
    `;
    window._cvfAnswers = { p1: null, p2: null };
  } else {
    // Question ouverte ou défi
    actionsDiv.innerHTML = `
      <div class="cchallenge-btn-row">
        <button class="btn-cchallenge refuse" onclick="cChallengeAction('refused')">❌ Refuser</button>
        <button class="btn-cchallenge skip"   onclick="cChallengeAction('skipped')">⏭️ Passer</button>
        <button class="btn-cchallenge done"   onclick="cChallengeAction('completed')">✅ Complété</button>
      </div>
    `;
  }

  showScreen('screen-couple-challenge');
}

// ── Vrai/Faux interactif ──────────────────────────────────────
function cvfSelect(player, answer, btn) {
  window._cvfAnswers[player] = answer;
  const section = document.getElementById('cvf-' + player + '-section');
  section.querySelectorAll('.cvf-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  if (player === 'p1') {
    setTimeout(() => {
      section.style.display = 'none';
      document.getElementById('cvf-pass-msg').style.display = 'block';
    }, 500);
  }
  if (player === 'p2' && window._cvfAnswers.p1) {
    setTimeout(() => {
      cvfReveal();
    }, 500);
  }
}

function cvfShowP2() {
  document.getElementById('cvf-pass-msg').style.display = 'none';
  document.getElementById('cvf-p2-section').style.display = 'block';
}

function cvfReveal() {
  const { p1, p2 } = window._cvfAnswers;
  const aligned = p1 === p2;
  const reveal = document.getElementById('cvf-reveal');
  reveal.style.display = 'block';
  document.getElementById('cvf-p2-section').style.display = 'none';

  const icon = aligned ? '🎉' : '🤔';
  const msg  = aligned
    ? `Vous pensez pareil ! Vous avez tous les deux répondu <strong>${p1.toUpperCase()}</strong>.`
    : `Pas d'accord ! ${escapeHtml(cp.p1)} a dit <strong>${p1.toUpperCase()}</strong>, ${escapeHtml(cp.p2)} a dit <strong>${p2.toUpperCase()}</strong>. Discutez-en !`;

  reveal.innerHTML = `
    <div class="cvf-reveal-box${aligned ? ' cvf-aligned' : ' cvf-split'}">
      <span class="cvf-reveal-icon">${icon}</span>
      <p>${msg}</p>
    </div>
  `;
  document.getElementById('cvf-done-btns').style.display = 'flex';
}

// ── Action sur un défi ────────────────────────────────────────
function cChallengeAction(status) {
  const key    = cp.currentItemKey;
  const result = cpHandleAction(key, status);

  // Prépare l'écran résultat
  const icons = { completed: '🎉', skipped: '⏭️', refused: '❌' };
  const titles = {
    completed: ['Super ! +' + result.xpGained + ' XP', 'Bien joué ! +' + result.xpGained + ' XP', 'Bravo ! +' + result.xpGained + ' XP'],
    skipped:   ['Pas de souci, passé. +' + result.xpGained + ' XP', 'La prochaine fois ! +' + result.xpGained + ' XP'],
    refused:   ['Refusé. Respecté.', 'Pas aujourd\'hui. C\'est ok.'],
  };

  document.getElementById('cresult-icon').textContent  = icons[status];
  document.getElementById('cresult-title').textContent =
    titles[status][Math.floor(Math.random() * titles[status].length)];

  // Barre XP
  const pct = getXpPct(cp.xp);
  document.getElementById('cresult-xp-bar').style.width = pct + '%';
  const lvl = getLevelData(cp.xp);
  const nxt = getNextLevelData(cp.xp);
  document.getElementById('cresult-xp-label').textContent = nxt
    ? `${cp.xp} / ${nxt.xp} XP`
    : `${cp.xp} XP — Max !`;
  document.getElementById('cresult-level').textContent =
    `${lvl.emoji} Niv. ${lvl.level} — ${lvl.name}`;

  // Level up ?
  const levelUpDiv = document.getElementById('cresult-levelup');
  if (result.levelUp) {
    levelUpDiv.textContent = `🎊 NIVEAU ${lvl.level} ATTEINT ! ${lvl.emoji} ${lvl.name} !`;
    levelUpDiv.classList.remove('hidden');
  } else {
    levelUpDiv.classList.add('hidden');
  }

  // Tous les items du pack traités ?
  const allDone = Object.values(cp.packStatus).every(s => s !== 'pending');
  document.getElementById('cresult-back-pack').textContent =
    allDone ? '🆕 Nouveau pack' : '📦 Retour au pack';
  document.getElementById('cresult-back-pack').onclick = allDone
    ? () => { cpGeneratePack(); renderCouplePack(); showScreen('screen-couple-pack'); }
    : () => { renderCouplePack(); showScreen('screen-couple-pack'); };

  showScreen('screen-couple-result');
}

function cPackNewPack() {
  cpGeneratePack();
}

// ══════════════════════════════════════════════════════════════
// CONFESSION MODE
// ══════════════════════════════════════════════════════════════
let _confessionFrom = null;

function openConfessionMode() {
  _confessionFrom = null;
  document.getElementById('conf-textarea').value = '';
  document.querySelectorAll('.conf-who-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('conf-who-p1').textContent = cp.p1;
  document.getElementById('conf-who-p2').textContent = cp.p2;
  renderConfessions();
  showScreen('screen-confession');
}

function confSelectWho(who, el) {
  _confessionFrom = who;
  document.querySelectorAll('.conf-who-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function confSend() {
  if (!_confessionFrom) { showToast('Dis qui tu es d\'abord !'); return; }
  const text = document.getElementById('conf-textarea').value.trim();
  if (!text) { showToast('Écris quelque chose !'); return; }

  const MAX_CONFESSIONS = 50;
  if (cp.confessions.length >= MAX_CONFESSIONS) {
    // Supprime la plus ancienne pour garder les 49 dernières
    cp.confessions.shift();
  }

  cp.confessions.push({
    id: Date.now(),
    from: _confessionFrom === 'p1' ? cp.p1 : cp.p2,
    text,
    reply: null,
    ts: new Date().toISOString(),
  });
  cpSave();

  document.getElementById('conf-textarea').value = '';
  _confessionFrom = null;
  document.querySelectorAll('.conf-who-btn').forEach(b => b.classList.remove('selected'));
  renderConfessions();
  showToast('💌 Confession envoyée !');
}

let _replyTargetId = null;

function renderConfessions() {
  const list = document.getElementById('conf-list');
  if (!cp.confessions.length) {
    list.innerHTML = '<p class="conf-empty">Aucune confession pour l\'instant…<br>Soyez courageux 💌</p>';
    return;
  }
  list.innerHTML = '';
  [...cp.confessions].reverse().forEach(c => {
    const div = document.createElement('div');
    div.className = 'conf-item';
    const d = new Date(c.ts);
    const dateStr = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

    let replyHtml = '';
    if (c.reply) {
      replyHtml = `<div class="conf-reply-bubble">💬 ${escapeHtml(c.reply)}</div>`;
    } else {
      replyHtml = `
        <div class="conf-reply-form" id="rform-${c.id}" style="display:none">
          <textarea class="conf-reply-input" id="rinput-${c.id}" placeholder="Ta réponse…" maxlength="200"></textarea>
          <button class="btn-primary" style="font-size:13px;padding:8px 16px" onclick="confReply(${c.id})">Envoyer</button>
        </div>
        <button class="conf-reply-btn" onclick="toggleReplyForm(${c.id})">💬 Répondre</button>
      `;
    }

    div.innerHTML = `
      <div class="conf-meta">
        <span class="conf-from">💌 ${escapeHtml(c.from)}</span>
        <span class="conf-date">${dateStr}</span>
      </div>
      <p class="conf-text">${escapeHtml(c.text)}</p>
      ${replyHtml}
    `;
    list.appendChild(div);
  });
}

function toggleReplyForm(id) {
  const form = document.getElementById('rform-' + id);
  if (form) form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}

function confReply(id) {
  const input = document.getElementById('rinput-' + id);
  const text  = input ? input.value.trim() : '';
  if (!text) { showToast('Écris une réponse !'); return; }
  const conf = cp.confessions.find(c => c.id === id);
  if (conf) { conf.reply = text; cpSave(); renderConfessions(); showToast('💬 Réponse envoyée !'); }
}

// ══════════════════════════════════════════════════════════════
// COPIER LE CODE
// ══════════════════════════════════════════════════════════════
function copyCoupleCode() {
  const code = cp ? cp.id : '';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => showToast('Code copié : ' + code));
  } else {
    showToast('Code : ' + code);
  }
}
