/* ══════════════════════════════════════════════════════════════
   QUI SAIT TOUT ? — Logique du jeu
   ══════════════════════════════════════════════════════════════ */

// ── État global ──────────────────────────────────────────────
const AVATARS = ['🦁','🐯','🦊','🐺','🐻','🦝','🐸','🦋','🦄','🐉','🦅','🐙'];

const state = {
  players: [],          // [{name, score, jokers:{double,pass,survey}}]
  targetScore: 0,
  currentPlayerIndex: 0,
  presenterIndex: 0,
  currentQuestion: null,
  usedQuestions: new Set(),
  chosenHelp: null,     // 'direct' | 'four' | 'two'
  doubleActive: false,
  pendingJoker: null,   // joker en attente de confirmation
  shuffledOptions: [],  // options mélangées pour l'affichage
  kidsMode: false,      // true = mode enfants
};

// ── Navigation entre les écrans ──────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ══════════════════════════════════════════════════════════════
// GESTION DES JOUEURS
// ══════════════════════════════════════════════════════════════
function addPlayer() {
  const input = document.getElementById('player-input');
  const name = input.value.trim();
  if (!name) return;
  if (state.players.length >= 12) {
    showToast('Maximum 12 joueurs !');
    return;
  }
  if (state.players.find(p => p.name.toLowerCase() === name.toLowerCase())) {
    showToast('Ce prénom est déjà utilisé !');
    return;
  }
  const avatar = AVATARS[state.players.length % AVATARS.length];
  state.players.push({
    name,
    avatar,
    score: 0,
    jokers: { double: false, pass: false, survey: false }
  });
  input.value = '';
  renderPlayersList();
  updateNextButton();
  input.focus();
}

function removePlayer(index) {
  state.players.splice(index, 1);
  renderPlayersList();
  updateNextButton();
}

function renderPlayersList() {
  const list = document.getElementById('players-list');
  list.innerHTML = '';
  state.players.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'player-item';
    div.innerHTML = `
      <span class="player-item-avatar">${p.avatar}</span>
      <span class="player-item-name">${escapeHtml(p.name)}</span>
      <button class="player-item-remove" onclick="removePlayer(${i})">✕</button>
    `;
    list.appendChild(div);
  });
}

function updateNextButton() {
  const btn = document.getElementById('btn-next-config');
  btn.disabled = state.players.length < 2;
}

// Enter key on player input
document.getElementById('player-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') addPlayer();
});

// ══════════════════════════════════════════════════════════════
// CONFIGURATION
// ══════════════════════════════════════════════════════════════
function selectScore(e, n) {
  state.targetScore = n;
  document.querySelectorAll('.score-btn').forEach(btn => btn.classList.remove('selected'));
  e.currentTarget.classList.add('selected');
  // Reset les jokers de tous les joueurs
  state.players.forEach(p => {
    p.jokers = { double: false, pass: false, survey: false };
    p.score = 0;
  });
  state.usedQuestions.clear();
  state.currentPlayerIndex = 0;
  startTurn();
}

// ══════════════════════════════════════════════════════════════
// GESTION DES TOURS
// ══════════════════════════════════════════════════════════════
function startTurn() {
  const player = state.players[state.currentPlayerIndex];
  // Le présentateur = joueur suivant dans la liste (circulaire)
  state.presenterIndex = (state.currentPlayerIndex + 1) % state.players.length;
  const presenter = state.players[state.presenterIndex];

  // Sélectionne une question
  state.currentQuestion = pickQuestion();
  state.chosenHelp = null;
  state.doubleActive = false;

  // Mise à jour de l'écran de tour
  document.getElementById('turn-player-name').textContent = player.name;
  document.getElementById('turn-presenter-name').textContent = presenter.name;

  showScreen('screen-turn');
}

function showPresenter() {
  const q = state.currentQuestion;
  const player = state.players[state.currentPlayerIndex];
  const presenter = state.players[state.presenterIndex];

  document.getElementById('presenter-name-label').textContent = presenter.name;
  document.getElementById('presenter-category').textContent = categoryLabel(q.c);
  document.getElementById('presenter-question').textContent = q.q;
  document.getElementById('presenter-answer').textContent = q.a;
  document.getElementById('presenter-candidate-name').textContent = player.name;

  showScreen('screen-presenter');
}

function showCandidate() {
  const q = state.currentQuestion;
  const player = state.players[state.currentPlayerIndex];

  document.getElementById('candidate-name-label').textContent = player.name;
  document.getElementById('candidate-category').textContent = categoryLabel(q.c);
  document.getElementById('candidate-question').textContent = q.q;

  // Met à jour l'état des jokers
  refreshJokerButtons();
  document.getElementById('joker-status').textContent = '';
  document.getElementById('double-active-banner').classList.add('hidden');

  showScreen('screen-candidate');
}

function refreshJokerButtons() {
  const player = state.players[state.currentPlayerIndex];
  const jDouble = document.getElementById('joker-double');
  const jPass   = document.getElementById('joker-pass');
  const jSurvey = document.getElementById('joker-survey');

  // Remet les boutons à zéro avant d'appliquer l'état du joueur courant
  jDouble.classList.remove('used');
  jPass.classList.remove('used');
  jSurvey.classList.remove('used');

  // Désactive uniquement les jokers déjà utilisés par CE joueur
  jDouble.disabled = player.jokers.double;
  jPass.disabled   = player.jokers.pass;
  jSurvey.disabled = player.jokers.survey;

  if (player.jokers.double) jDouble.classList.add('used');
  if (player.jokers.pass)   jPass.classList.add('used');
  if (player.jokers.survey) jSurvey.classList.add('used');
}

// ── Sélection du mode d'aide ──────────────────────────────────
function selectHelp(mode) {
  state.chosenHelp = mode;

  const player = state.players[state.currentPlayerIndex];
  if (mode === 'direct' && player.jokers.survey) {
    showToast('⚠️ Le sondage ne fonctionne qu\'avec 4 ou 2 choix !');
  }

  if (mode === 'direct') {
    showDirectMode();
  } else if (mode === 'four') {
    showFourMode();
  } else {
    showTwoMode();
  }
}

// ══════════════════════════════════════════════════════════════
// MODE DIRECT (réponse à voix haute, présentateur juge)
// ══════════════════════════════════════════════════════════════
function showDirectMode() {
  const q = state.currentQuestion;
  const player = state.players[state.currentPlayerIndex];

  document.getElementById('direct-candidate').textContent = player.name;
  document.getElementById('direct-answer').textContent = q.a;

  toggleDoubleBanner('direct-banner-direct');
  showScreen('screen-direct');
}

function judgeAnswer(isCorrect) {
  const points = getBasePoints();
  resolveAnswer(isCorrect, points);
}

// ══════════════════════════════════════════════════════════════
// MODE 4 CHOIX
// ══════════════════════════════════════════════════════════════
function showFourMode() {
  const q = state.currentQuestion;
  document.getElementById('four-category').textContent = categoryLabel(q.c);
  document.getElementById('four-question').textContent = q.q;
  toggleDoubleBanner('double-banner-four');

  // Mélange les 4 options
  const options = shuffle([q.a, ...q.w.slice(0, 3)]);
  state.shuffledOptions = options;

  const grid = document.getElementById('four-options');
  grid.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.dataset.value = opt;
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span>${escapeHtml(opt)}`;
    btn.onclick = () => selectOption(opt, btn, grid);
    grid.appendChild(btn);
  });

  // Afficher ou masquer le sondage
  const surveyDiv = document.getElementById('survey-results-four');
  const player = state.players[state.currentPlayerIndex];
  if (player.jokers.survey) {
    showSurveyResults(surveyDiv, options, q.a);
    surveyDiv.classList.remove('hidden');
  } else {
    surveyDiv.classList.add('hidden');
    surveyDiv.innerHTML = '';
  }

  showScreen('screen-four');
}

// ══════════════════════════════════════════════════════════════
// MODE 2 CHOIX
// ══════════════════════════════════════════════════════════════
function showTwoMode() {
  const q = state.currentQuestion;
  document.getElementById('two-category').textContent = categoryLabel(q.c);
  document.getElementById('two-question').textContent = q.q;
  toggleDoubleBanner('double-banner-two');

  // 1 bonne + 1 mauvaise, mélangées
  const wrong = shuffle([...q.w])[0];
  const options = shuffle([q.a, wrong]);
  state.shuffledOptions = options;

  const grid = document.getElementById('two-options');
  grid.innerHTML = '';
  const letters = ['A', 'B'];
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.dataset.value = opt;
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span>${escapeHtml(opt)}`;
    btn.onclick = () => selectOption(opt, btn, grid);
    grid.appendChild(btn);
  });

  // Sondage pour 2 choix aussi
  const surveyDiv = document.getElementById('survey-results-two');
  const player = state.players[state.currentPlayerIndex];
  if (player.jokers.survey) {
    showSurveyResults(surveyDiv, options, q.a);
    surveyDiv.classList.remove('hidden');
  } else {
    surveyDiv.classList.add('hidden');
    surveyDiv.innerHTML = '';
  }

  showScreen('screen-two');
}

function selectOption(value, btn, grid) {
  if (btn.classList.contains('revealed')) return;

  const isCorrect = value === state.currentQuestion.a;
  const points = getBasePoints();

  // Révèle toutes les réponses
  grid.querySelectorAll('.option-btn').forEach(b => {
    b.classList.add('revealed');
    if (b.dataset.value === state.currentQuestion.a) {
      b.classList.add('correct-reveal');
    } else if (b === btn && !isCorrect) {
      b.classList.add('wrong-reveal');
    }
    b.onclick = null;
  });

  // Délai avant d'afficher le résultat
  setTimeout(() => resolveAnswer(isCorrect, points), 1200);
}

// ══════════════════════════════════════════════════════════════
// RÉSOLUTION DE LA RÉPONSE
// ══════════════════════════════════════════════════════════════
function resolveAnswer(isCorrect, basePoints) {
  const player = state.players[state.currentPlayerIndex];
  let pointsEarned = 0;

  if (state.doubleActive) {
    if (isCorrect) {
      pointsEarned = basePoints * 2;
      player.score += pointsEarned;
    } else {
      // Perd les points (min 0)
      pointsEarned = -basePoints;
      player.score = Math.max(0, player.score - basePoints);
    }
  } else {
    if (isCorrect) {
      pointsEarned = basePoints;
      player.score += pointsEarned;
    }
  }

  showResult(isCorrect, pointsEarned, player.score);
}

function showResult(isCorrect, pointsEarned, newScore) {
  const q = state.currentQuestion;
  const resultIcon = document.getElementById('result-icon');
  const resultTitle = document.getElementById('result-title');
  const resultAnswer = document.getElementById('result-correct-answer');
  const resultPoints = document.getElementById('result-points');

  const successMessages = ['Bravo ! 🎉', 'Excellent !', 'Génie !', 'Parfait !', 'Incroyable !', 'Tu cartonnes !'];
  const failMessages = ['Raté ! 😅', 'Pas tout à fait...', 'Presque !', 'Oh non !', 'Zut !', 'On y croyait !'];

  if (isCorrect) {
    resultIcon.textContent = ['🎯', '⭐', '🔥', '💥', '🎊'][Math.floor(Math.random() * 5)];
    resultTitle.textContent = successMessages[Math.floor(Math.random() * successMessages.length)];
    resultTitle.className = 'result-title win';
    resultAnswer.textContent = `Bonne réponse : ${q.a}`;

    if (state.doubleActive) {
      resultPoints.textContent = `+${pointsEarned} pts 🎲`;
      resultPoints.className = 'result-points';
    } else {
      resultPoints.textContent = `+${pointsEarned} pt${pointsEarned > 1 ? 's' : ''}`;
      resultPoints.className = 'result-points';
    }
  } else {
    resultIcon.textContent = ['😢', '💀', '🙈', '😬', '🤦'][Math.floor(Math.random() * 5)];
    resultTitle.textContent = failMessages[Math.floor(Math.random() * failMessages.length)];
    resultTitle.className = 'result-title lose';
    resultAnswer.textContent = `La bonne réponse était : ${q.a}`;

    if (state.doubleActive && pointsEarned < 0) {
      resultPoints.textContent = `${pointsEarned} pt${Math.abs(pointsEarned) > 1 ? 's' : ''} 💀`;
      resultPoints.className = 'result-points lose';
    } else {
      resultPoints.textContent = '0 point';
      resultPoints.className = 'result-points lose';
    }
  }

  // Fun fact si disponible
  if (q.f) {
    const funFact = document.getElementById('result-fun-fact');
    funFact.textContent = `💡 ${q.f}`;
    funFact.classList.remove('hidden');
  } else {
    document.getElementById('result-fun-fact').classList.add('hidden');
  }

  showScreen('screen-result');
}

// ══════════════════════════════════════════════════════════════
// SCORES
// ══════════════════════════════════════════════════════════════
function showScores() {
  // Vérifie si quelqu'un a gagné
  const winner = state.players.find(p => p.score >= state.targetScore);
  if (winner) {
    showGameOver(winner);
    return;
  }

  const sorted = [...state.players].sort((a, b) => b.score - a.score);
  const rankEmojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔹', '🔹'];

  document.getElementById('score-target-display').textContent =
    `Objectif : ${state.targetScore} pts — ${state.players.length} joueurs`;

  const list = document.getElementById('scores-list');
  list.innerHTML = '';

  sorted.forEach((p, rank) => {
    const pct = Math.min(100, Math.round((p.score / state.targetScore) * 100));
    const div = document.createElement('div');
    div.className = `score-item rank-${rank + 1}`;
    div.innerHTML = `
      <span class="score-rank">${rankEmojis[rank]}</span>
      <span class="score-player-name">${p.avatar} ${escapeHtml(p.name)}</span>
      <div class="score-progress-wrap">
        <div class="score-progress-track">
          <div class="score-progress-fill" style="width: ${pct}%"></div>
        </div>
      </div>
      <span class="score-pts">${p.score} <span>/ ${state.targetScore}</span></span>
    `;
    list.appendChild(div);
  });

  showScreen('screen-scores');
}

function nextTurn() {
  // Passe au joueur suivant
  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  startTurn();
}

// ══════════════════════════════════════════════════════════════
// FIN DE PARTIE
// ══════════════════════════════════════════════════════════════
function showGameOver(winner) {
  document.getElementById('winner-name').textContent = winner.name;
  document.getElementById('winner-score').textContent = `${winner.score} point${winner.score > 1 ? 's' : ''}`;

  const sorted = [...state.players].sort((a, b) => b.score - a.score);
  const rankEmojis = ['🥇', '🥈', '🥉'];
  const list = document.getElementById('final-scores');
  list.innerHTML = '';

  sorted.forEach((p, rank) => {
    const row = document.createElement('div');
    row.className = 'final-score-row';
    row.innerHTML = `
      <span>${rankEmojis[rank] || '▪️'} ${p.avatar} ${escapeHtml(p.name)}</span>
      <strong>${p.score} pts</strong>
    `;
    list.appendChild(row);
  });

  showScreen('screen-gameover');
}

function restartGame() {
  // Remet tout à zéro
  state.players = [];
  state.targetScore = 0;
  state.currentPlayerIndex = 0;
  state.usedQuestions.clear();
  state.chosenHelp = null;
  state.doubleActive = false;
  state.kidsMode = false;

  document.getElementById('players-list').innerHTML = '';
  document.getElementById('btn-next-config').disabled = true;
  document.querySelectorAll('.score-btn').forEach(b => b.classList.remove('selected'));

  showScreen('screen-welcome');
}

// ══════════════════════════════════════════════════════════════
// SYSTÈME DE JOKERS
// ══════════════════════════════════════════════════════════════
const JOKER_CONFIG = {
  double: {
    icon: '🎲',
    title: 'Double ou Rien',
    desc: 'Si tu réponds correctement, tes points sont doublés ! Mais si tu te trompes, tu perds le même nombre de points.\n\nUtilise-le avant de choisir ton mode de réponse.',
    confirm: 'Activer le Double ou Rien'
  },
  pass: {
    icon: '⏭️',
    title: 'Joker Passer',
    desc: 'Tu n\'aimes pas cette question ? Change-la pour une nouvelle ! Sans pénalité.\n\nUne seule utilisation par partie.',
    confirm: 'Changer de question'
  },
  survey: {
    icon: '📊',
    title: 'Joker Sondage',
    desc: 'Découvre ce que le public aurait répondu ! Les pourcentages s\'affichent directement sur les réponses (mode 4 choix ou 2 choix).\n\nUtilise-le avant de choisir ton aide.',
    confirm: 'Activer le Sondage'
  }
};

function useJoker(type) {
  const player = state.players[state.currentPlayerIndex];
  if (player.jokers[type]) return; // déjà utilisé

  state.pendingJoker = type;
  const cfg = JOKER_CONFIG[type];

  document.getElementById('modal-icon').textContent = cfg.icon;
  document.getElementById('modal-title').textContent = cfg.title;
  document.getElementById('modal-desc').textContent = cfg.desc;
  document.getElementById('modal-confirm').textContent = cfg.confirm;

  document.getElementById('joker-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('joker-modal').classList.add('hidden');
  state.pendingJoker = null;
}

function confirmJoker() {
  const player = state.players[state.currentPlayerIndex];
  const type = state.pendingJoker;
  closeModal();

  if (type === 'double') {
    player.jokers.double = true;
    state.doubleActive = true;
    document.getElementById('double-active-banner').classList.remove('hidden');
    document.getElementById('joker-status').textContent = '🎲 Double ou Rien activé !';
    document.getElementById('joker-double').classList.add('used');

  } else if (type === 'pass') {
    player.jokers.pass = true;
    // Change la question
    state.currentQuestion = pickQuestion();
    document.getElementById('candidate-question').textContent = state.currentQuestion.q;
    document.getElementById('candidate-category').textContent = categoryLabel(state.currentQuestion.c);
    document.getElementById('presenter-question').textContent = state.currentQuestion.q;
    document.getElementById('presenter-answer').textContent = state.currentQuestion.a;
    document.getElementById('joker-status').textContent = '⏭️ Nouvelle question chargée !';
    document.getElementById('joker-pass').classList.add('used');

  } else if (type === 'survey') {
    player.jokers.survey = true;
    document.getElementById('joker-status').textContent = '📊 Sondage activé ! Les % apparaîtront avec les réponses.';
    document.getElementById('joker-survey').classList.add('used');
  }

  refreshJokerButtons();
}

// ══════════════════════════════════════════════════════════════
// SONDAGE — affichage des pourcentages simulés
// ══════════════════════════════════════════════════════════════
function showSurveyResults(container, options, correctAnswer) {
  // Génère des % réalistes : la bonne réponse a plus de chances d'être choisie
  const n = options.length;
  let pcts = options.map(opt => {
    if (opt === correctAnswer) return 40 + Math.floor(Math.random() * 25); // 40–64%
    return 5 + Math.floor(Math.random() * 20); // 5–24%
  });

  // Normalise à 100%
  const total = pcts.reduce((a, b) => a + b, 0);
  pcts = pcts.map(p => Math.round((p / total) * 100));
  // Ajuste pour que ça fasse 100
  const diff = 100 - pcts.reduce((a, b) => a + b, 0);
  pcts[0] += diff;

  const letters = ['A', 'B', 'C', 'D'];
  container.innerHTML = '<strong style="font-size:12px;color:var(--cyan);margin-bottom:8px;display:block;">📊 Résultats du sondage :</strong>';

  options.forEach((opt, i) => {
    const row = document.createElement('div');
    row.className = 'survey-row';
    row.innerHTML = `
      <span class="survey-label">${letters[i]}. ${opt.substring(0, 12)}${opt.length > 12 ? '…' : ''}</span>
      <div class="survey-track">
        <div class="survey-fill" style="width: 0%"></div>
      </div>
      <span class="survey-pct">${pcts[i]}%</span>
    `;
    container.appendChild(row);
    // Anime la barre après un court délai
    setTimeout(() => {
      row.querySelector('.survey-fill').style.width = pcts[i] + '%';
    }, 50 + i * 100);
  });
}

// ══════════════════════════════════════════════════════════════
// UTILITAIRES
// ══════════════════════════════════════════════════════════════
function pickQuestion() {
  const bank = state.kidsMode ? KIDS_QUESTIONS : activeQuestions;
  if (state.usedQuestions.size >= bank.length) {
    state.usedQuestions.clear();
  }
  const availableIdxs = bank.map((_, i) => i).filter(i => !state.usedQuestions.has(i));
  const originalIdx = availableIdxs[Math.floor(Math.random() * availableIdxs.length)];
  state.usedQuestions.add(originalIdx);
  return bank[originalIdx];
}

function getBasePoints() {
  switch (state.chosenHelp) {
    case 'direct': return 3;
    case 'four':   return 2;
    case 'two':    return 1;
    default:       return 0;
  }
}

function toggleDoubleBanner(bannerId) {
  const banner = document.getElementById(bannerId);
  if (banner) {
    if (state.doubleActive) banner.classList.remove('hidden');
    else banner.classList.add('hidden');
  }
}

function categoryLabel(cat) {
  const labels = {
    histoire:  '🏺 Histoire',
    science:   '🔬 Science',
    cinema:    '🎬 Cinéma & TV',
    musique:   '🎵 Musique',
    sport:     '⚽ Sport',
    geo:       '🌍 Géographie',
    animaux:   '🐾 Animaux',
    cuisine:   '🍕 Cuisine',
    insolite:  '💡 Insolite',
    tech:      '🎮 Tech & Jeux',
    nature:    '🌿 Nature',
    maths:     '➗ Maths',
    kids_pop:  '🎉 Divertissement',
    magie:     '✨ Magie & Fantaisie',
    bonbons:   '🍬 Bonbons'
  };
  return labels[cat] || cat;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ══════════════════════════════════════════════════════════════
// MODE DUO — Qui se connaît le mieux ?
// ══════════════════════════════════════════════════════════════

const duoState = {
  players: [{ name: '', score: 0 }, { name: '', score: 0 }],
  questions: [],
  currentIndex: 0,
  totalQuestions: 10,
  aboutIdx: 0,    // la question porte sur ce joueur
  guessIdx: 1,    // ce joueur doit deviner
  selfAnswer: null,   // réponse donnée par le joueur "about"
  currentGuess: null, // réponse devinée par le joueur "guess"
};

function startKidsMode() {
  state.kidsMode = true;
  state.bombMode = false;
  state.players = [];
  document.getElementById('players-list').innerHTML = '';
  document.getElementById('btn-next-config').disabled = true;
  showScreen('screen-players');
}

function startDuoMode() {
  document.getElementById('duo-player-1').value = '';
  document.getElementById('duo-player-2').value = '';
  showScreen('screen-duo-players');
}

function validateDuoPlayers() {
  const n1 = document.getElementById('duo-player-1').value.trim();
  const n2 = document.getElementById('duo-player-2').value.trim();
  if (!n1 || !n2) { showToast('Entrez les 2 prénoms !'); return; }
  if (n1.toLowerCase() === n2.toLowerCase()) { showToast('Choisissez deux prénoms différents !'); return; }
  duoState.players[0] = { name: n1, score: 0 };
  duoState.players[1] = { name: n2, score: 0 };
  showScreen('screen-duo-config');
}

function selectDuoCount(e, n) {
  document.querySelectorAll('.duo-count-btn').forEach(b => b.classList.remove('selected'));
  e.currentTarget.classList.add('selected');

  const total = Math.min(n, DUO_QUESTIONS.length);
  duoState.totalQuestions = total;
  duoState.questions = shuffle([...DUO_QUESTIONS]).slice(0, total);
  duoState.currentIndex = 0;
  duoState.aboutIdx = 0;
  duoState.guessIdx = 1;
  duoState.players[0].score = 0;
  duoState.players[1].score = 0;

  startDuoRound();
}

function startDuoRound() {
  const q = duoState.questions[duoState.currentIndex];
  const about   = duoState.players[duoState.aboutIdx];
  const guesser = duoState.players[duoState.guessIdx];
  const statement = q.q.replace(/\{name\}/g, about.name);

  // Écran 1 : le joueur "about" répond pour lui-même (le guesser ne regarde pas)
  document.getElementById('duo-progress').textContent =
    `Question ${duoState.currentIndex + 1} / ${duoState.totalQuestions}`;
  document.getElementById('duo-self-name').textContent         = about.name;
  document.getElementById('duo-guesser-nolook').textContent    = guesser.name;
  document.getElementById('duo-statement').textContent         = statement;
  document.getElementById('duo-guesser-confirm-name').textContent = guesser.name;

  document.querySelectorAll('#screen-duo-self .tf-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('btn-duo-self-confirm').disabled = true;
  duoState.selfAnswer   = null;
  duoState.currentGuess = null;

  showScreen('screen-duo-self');
}

function selectSelf(answer, btn) {
  duoState.selfAnswer = answer;
  document.querySelectorAll('#screen-duo-self .tf-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('btn-duo-self-confirm').disabled = false;
}

function confirmSelf() {
  // Efface immédiatement la réponse du joueur 1 avant tout
  document.querySelectorAll('#screen-duo-self .tf-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('btn-duo-self-confirm').disabled = true;

  const guesser = duoState.players[duoState.guessIdx];

  // Écran intermédiaire : passe le téléphone au guesser
  document.getElementById('duo-pass-name').textContent       = guesser.name;
  document.getElementById('duo-pass-ready-name').textContent = guesser.name;

  showScreen('screen-duo-pass');
}

function showDuoGuess() {
  const q = duoState.questions[duoState.currentIndex];
  const about   = duoState.players[duoState.aboutIdx];
  const guesser = duoState.players[duoState.guessIdx];
  const statement = q.q.replace(/\{name\}/g, about.name);

  // Écran 2 : le guesser devine ce qu'a répondu "about"
  document.getElementById('duo-guesser-name').textContent    = guesser.name;
  document.getElementById('duo-about-name').textContent      = about.name;
  document.getElementById('duo-about-name-2').textContent    = about.name;
  document.getElementById('duo-guess-statement').textContent = statement;

  document.querySelectorAll('#screen-duo-guess .tf-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('btn-duo-confirm').disabled = true;

  showScreen('screen-duo-guess');
}

function selectGuess(answer, btn) {
  duoState.currentGuess = answer;
  document.querySelectorAll('#screen-duo-guess .tf-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('btn-duo-confirm').disabled = false;
}

function confirmGuess() {
  const guesser = duoState.players[duoState.guessIdx];
  const about   = duoState.players[duoState.aboutIdx];
  const correct = duoState.currentGuess === duoState.selfAnswer;

  if (correct) guesser.score++;

  const icon  = document.getElementById('duo-result-icon');
  const title = document.getElementById('duo-result-title');
  const desc  = document.getElementById('duo-result-desc');

  if (correct) {
    icon.textContent  = ['🎯','⭐','🔥','💥'][Math.floor(Math.random()*4)];
    title.textContent = `Bien joué ${guesser.name} !`;
    title.className   = 'result-title win';
    desc.textContent  = `Tu connais bien ${about.name} ! +1 point`;
  } else {
    icon.textContent  = ['😬','🙈','💀'][Math.floor(Math.random()*3)];
    title.textContent = `Raté !`;
    title.className   = 'result-title lose';
    const actualLabel = duoState.selfAnswer === 'vrai' ? 'VRAI' : 'FAUX';
    desc.textContent  = `${about.name} avait répondu ${actualLabel}. 0 point.`;
  }

  const p0 = duoState.players[0];
  const p1 = duoState.players[1];
  document.getElementById('duo-score-p1').textContent =
    `${p0.name} : ${p0.score} pt${p0.score !== 1 ? 's' : ''}`;
  document.getElementById('duo-score-p2').textContent =
    `${p1.name} : ${p1.score} pt${p1.score !== 1 ? 's' : ''}`;

  showScreen('screen-duo-result');
}

function nextDuoRound() {
  duoState.currentIndex++;
  if (duoState.currentIndex >= duoState.totalQuestions) {
    showDuoGameOver();
    return;
  }
  // Alterne : question suivante porte sur l'autre joueur
  duoState.aboutIdx = duoState.currentIndex % 2;
  duoState.guessIdx = 1 - duoState.aboutIdx;
  startDuoRound();
}

function showDuoGameOver() {
  const p0 = duoState.players[0];
  const p1 = duoState.players[1];

  let winnerText, subtitle;
  if (p0.score > p1.score) {
    winnerText = `🏆 ${p0.name} gagne !`;
    subtitle   = `${p0.name} connaît mieux ${p1.name} !`;
  } else if (p1.score > p0.score) {
    winnerText = `🏆 ${p1.name} gagne !`;
    subtitle   = `${p1.name} connaît mieux ${p0.name} !`;
  } else {
    winnerText = `🤝 Égalité !`;
    subtitle   = `Vous vous connaissez parfaitement !`;
  }

  document.getElementById('duo-winner-text').textContent    = winnerText;
  document.getElementById('duo-winner-subtitle').textContent = subtitle;
  document.getElementById('duo-final-p1').textContent =
    `${p0.name} : ${p0.score} pts`;
  document.getElementById('duo-final-p2').textContent =
    `${p1.name} : ${p1.score} pts`;

  showScreen('screen-duo-gameover');
}

function replayDuo() {
  duoState.players[0].score = 0;
  duoState.players[1].score = 0;
  showScreen('screen-duo-config');
}

// ──────────────────────────────────────────────────────────────

function showToast(msg) {
  // Mini toast notification
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
    background: rgba(30,30,50,0.95); color: white; padding: 12px 24px;
    border-radius: 24px; font-size: 14px; font-weight: 600;
    border: 1px solid rgba(255,255,255,0.2); z-index: 999;
    animation: slideIn 0.3s ease; pointer-events: none;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// ══════════════════════════════════════════════════════════════
// SÉLECTION DES CATÉGORIES — Mode Culture Générale
// ══════════════════════════════════════════════════════════════

let activeQuestions = typeof QUESTIONS !== 'undefined' ? QUESTIONS : [];

const ALL_CATEGORIES = ['geo','histoire','science','tech','cinema','musique','sport','animaux','cuisine','insolite'];
let selectedCategories = new Set(ALL_CATEGORIES);

function initCategoryScreen() {
  selectedCategories = new Set(ALL_CATEGORIES);
  document.querySelectorAll('.cat-toggle-btn').forEach(btn => btn.classList.add('active'));
  updateToggleAllBtn();
}

function toggleCategory(cat, btn) {
  if (selectedCategories.has(cat)) {
    selectedCategories.delete(cat);
    btn.classList.remove('active');
  } else {
    selectedCategories.add(cat);
    btn.classList.add('active');
  }
  updateToggleAllBtn();
}

function toggleAllCategories() {
  if (selectedCategories.size === ALL_CATEGORIES.length) {
    selectedCategories.clear();
    document.querySelectorAll('.cat-toggle-btn').forEach(btn => btn.classList.remove('active'));
  } else {
    ALL_CATEGORIES.forEach(c => selectedCategories.add(c));
    document.querySelectorAll('.cat-toggle-btn').forEach(btn => btn.classList.add('active'));
  }
  updateToggleAllBtn();
}

function updateToggleAllBtn() {
  const btn = document.getElementById('btn-toggle-all');
  if (!btn) return;
  btn.textContent = selectedCategories.size === ALL_CATEGORIES.length
    ? '☑️ Tout déselectionner'
    : '☐ Tout sélectionner';
}

function confirmCategorySelection() {
  if (selectedCategories.size === 0) {
    showToast('⚠️ Sélectionne au moins une catégorie !');
    return;
  }
  activeQuestions = QUESTIONS.filter(q => selectedCategories.has(q.c));
  state.usedQuestions.clear();
  showScreen('screen-config');
}

/* ══════════════════════════════════════════════════════════════
   ACCUEIL PREMIUM — Particules · Typewriter · Counter · Tilt · Notifs
   ══════════════════════════════════════════════════════════════ */

// ── Canvas Particles ──────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  const mouse = { x: W / 2, y: H / 2 };

  const SYMBOLS = ['?', '✦', '★', '◆', '✿'];
  const COLORS  = [
    'rgba(167,139,250,', 'rgba(236,72,153,',
    'rgba(6,182,212,',   'rgba(251,191,36,',
  ];

  const particles = Array.from({ length: 52 }, () => ({
    x:      Math.random() * W,
    y:      Math.random() * H,
    vx:     (Math.random() - 0.5) * 0.35,
    vy:     (Math.random() - 0.5) * 0.35,
    size:   Math.random() * 15 + 8,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    color:  COLORS[Math.floor(Math.random() * COLORS.length)],
    phase:  Math.random() * Math.PI * 2,
  }));

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.phase += 0.018;
      const alpha = 0.06 + Math.sin(p.phase) * 0.1;

      // Subtle mouse repulsion
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        p.vx -= (dx / dist) * 0.014;
        p.vy -= (dy / dist) * 0.014;
      }
      p.vx *= 0.992;
      p.vy *= 0.992;
      p.x  += p.vx;
      p.y  += p.vy;
      if (p.x < -60) p.x = W + 60;
      if (p.x > W + 60) p.x = -60;
      if (p.y < -60) p.y = H + 60;
      if (p.y > H + 60) p.y = -60;

      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle   = p.color + '1)';
      ctx.font        = `${p.size}px serif`;
      ctx.fillText(p.symbol, p.x, p.y);
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Typewriter ────────────────────────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;
  const texts = [
    'Le jeu de culture générale (un peu fou)',
    'Qui va remporter la victoire ce soir ?',
    'Défiez vos amis, famille et collègues !',
  ];
  let ti = 0, ci = 0, deleting = false;

  function tick() {
    const cur = texts[ti];
    if (!deleting) {
      el.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) { deleting = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 52);
    } else {
      el.textContent = cur.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
      setTimeout(tick, 26);
    }
  }
  setTimeout(tick, 900);
})();

// ── Animated Counters ─────────────────────────────────────────
(function initCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const step   = target / (1600 / 16);
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = Math.floor(cur).toLocaleString('fr-FR');
      if (cur >= target) clearInterval(id);
    }, 16);
  });
})();

// ── 3D Tilt Cards ─────────────────────────────────────────────
(function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    function applyTilt(cx, cy, rect) {
      const rx = ((cy - rect.top)  / rect.height - 0.5) * -18;
      const ry = ((cx - rect.left) / rect.width  - 0.5) *  18;
      card.style.transform =
        `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
    }
    function reset() {
      card.style.transform =
        'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    card.addEventListener('mousemove', e =>
      applyTilt(e.clientX, e.clientY, card.getBoundingClientRect()));
    card.addEventListener('mouseleave', reset);
    card.addEventListener('touchmove', e => {
      const t = e.touches[0];
      applyTilt(t.clientX, t.clientY, card.getBoundingClientRect());
    }, { passive: true });
    card.addEventListener('touchend', reset);
  });
})();

// ══════════════════════════════════════════════════════════════
// MODE BOMBE — Logique complète
// ══════════════════════════════════════════════════════════════

// Ajouter bombMode à l'état global
state.bombMode = false;

// Routage du bouton "Suivant" selon le mode
function onNextConfig() {
  if (state.bombMode) {
    showScreen('screen-bomb-config');
  } else if (state.kidsMode) {
    showScreen('screen-config');
  } else {
    initCategoryScreen();
    showScreen('screen-cat-select');
  }
}

const bombState = {
  livesPerPlayer: 3,
  currentPlayerIndex: 0,
  currentQuestion: null,
  usedQuestions: new Set(),
  timerInterval: null,
  timeLeft: 20,
  totalTime: 20,
  answered: false,
};

function startBombMode() {
  state.bombMode = true;
  state.kidsMode = false;
  state.players = [];
  document.getElementById('players-list').innerHTML = '';
  document.getElementById('btn-next-config').disabled = true;
  showScreen('screen-players');
}

function selectBombLives(e, n) {
  document.querySelectorAll('.bomb-lives-btn').forEach(b => b.classList.remove('selected'));
  e.currentTarget.classList.add('selected');
  bombState.livesPerPlayer = n;

  // Init les vies de chaque joueur
  state.players.forEach(p => {
    p.lives = n;
    p.eliminated = false;
  });
  bombState.usedQuestions.clear();
  bombState.currentPlayerIndex = 0;
  bombState.answered = false;

  setTimeout(() => launchBombTurn(), 100);
}

function launchBombTurn() {
  bombState.currentQuestion = pickBombQuestion();
  showBombPlay();
}

function pickBombQuestion() {
  const available = QUESTIONS.filter((_, i) => !bombState.usedQuestions.has(i));
  if (available.length === 0) {
    bombState.usedQuestions.clear();
    return QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
  }
  const idx = Math.floor(Math.random() * available.length);
  const q = available[idx];
  bombState.usedQuestions.add(QUESTIONS.indexOf(q));
  return q;
}

function showBombPlay() {
  const player = state.players[bombState.currentPlayerIndex];
  const q = bombState.currentQuestion;

  document.getElementById('bomb-player-name').textContent = `${player.avatar} ${player.name}`;
  renderBombLives();

  document.getElementById('bomb-category').textContent = categoryLabel(q.c);
  document.getElementById('bomb-question').textContent = q.q;

  // 4 choix mélangés
  const options = shuffle([q.a, ...q.w.slice(0, 3)]);
  const grid = document.getElementById('bomb-options');
  grid.innerHTML = '';
  ['A','B','C','D'].forEach((letter, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.dataset.value = options[i];
    btn.innerHTML = `<span class="option-letter">${letter}</span>${escapeHtml(options[i])}`;
    btn.onclick = () => selectBombAnswer(options[i], btn, grid, q.a);
    grid.appendChild(btn);
  });

  bombState.answered = false;
  showScreen('screen-bomb-play');
  startBombTimer();
}

function renderBombLives() {
  const display = document.getElementById('bomb-lives-display');
  display.innerHTML = '';
  state.players.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'bomb-lives-row' + (p.eliminated ? ' bomb-eliminated' : '') + (i === bombState.currentPlayerIndex ? ' bomb-active-player' : '');
    let hearts = '';
    for (let h = 0; h < bombState.livesPerPlayer; h++) {
      hearts += `<span class="bomb-heart ${h < p.lives ? '' : 'bomb-heart-dead'}">${h < p.lives ? '❤️' : '🖤'}</span>`;
    }
    row.innerHTML = `<span class="bomb-lives-name">${p.avatar} ${escapeHtml(p.name)}</span><span class="bomb-hearts">${hearts}</span>`;
    display.appendChild(row);
  });
}

function startBombTimer() {
  bombState.timeLeft = bombState.totalTime;
  clearInterval(bombState.timerInterval);
  updateBombTimer();

  bombState.timerInterval = setInterval(() => {
    bombState.timeLeft -= 0.1;
    updateBombTimer();
    if (bombState.timeLeft <= 0) {
      clearInterval(bombState.timerInterval);
      if (!bombState.answered) triggerBombExplosion();
    }
  }, 100);
}

function updateBombTimer() {
  const t = Math.max(0, bombState.timeLeft);
  const pct = t / bombState.totalTime;
  const secs = Math.ceil(t);

  // Texte du timer
  const numEl = document.getElementById('bomb-timer-num');
  if (numEl) numEl.textContent = secs;

  // Cercle SVG — circonférence pour r=52 : 2*PI*52 ≈ 326.73
  const circ = 326.73;
  const fill = document.getElementById('bomb-ring-fill');
  if (fill) {
    fill.style.strokeDashoffset = circ * (1 - pct);
    if (pct > 0.5)      fill.style.stroke = '#22c55e';
    else if (pct > 0.25) fill.style.stroke = '#fbbf24';
    else                  fill.style.stroke = '#ef4444';
  }

  // Vitesse de pulsation de la bombe
  const bomb = document.getElementById('bomb-emoji');
  if (bomb) {
    if (t <= 5)       bomb.style.animationDuration = '0.25s';
    else if (t <= 10) bomb.style.animationDuration = '0.55s';
    else              bomb.style.animationDuration = '1s';
  }
}

function selectBombAnswer(value, btn, grid, correctAnswer) {
  if (bombState.answered) return;
  bombState.answered = true;
  clearInterval(bombState.timerInterval);

  const isCorrect = value === correctAnswer;

  grid.querySelectorAll('.option-btn').forEach(b => {
    b.classList.add('revealed');
    b.onclick = null;
    if (b.dataset.value === correctAnswer)    b.classList.add('correct-reveal');
    else if (b === btn && !isCorrect) b.classList.add('wrong-reveal');
  });

  setTimeout(() => {
    if (isCorrect) showBombSaved();
    else           triggerBombExplosion();
  }, 1100);
}

function triggerBombExplosion() {
  const player = state.players[bombState.currentPlayerIndex];
  player.lives--;
  if (player.lives <= 0) player.eliminated = true;

  // Overlay explosion
  const overlay = document.createElement('div');
  overlay.className = 'bomb-overlay bomb-overlay-boom';
  overlay.innerHTML = `
    <div class="bomb-overlay-content">
      <div class="bomb-overlay-emoji">💥</div>
      <h2 class="bomb-overlay-title">BOOM !</h2>
      <p class="bomb-overlay-sub">${escapeHtml(player.name)} perd une vie !</p>
      <div class="bomb-overlay-hearts">${Array(bombState.livesPerPlayer).fill(0).map((_,h) => h < player.lives ? '❤️' : '🖤').join('')}</div>
      ${player.eliminated ? `<p class="bomb-overlay-elim">💀 ${escapeHtml(player.name)} est éliminé !</p>` : ''}
    </div>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
    checkBombGameOver();
  }, 2200);
}

function showBombSaved() {
  const player = state.players[bombState.currentPlayerIndex];

  const overlay = document.createElement('div');
  overlay.className = 'bomb-overlay bomb-overlay-safe';
  overlay.innerHTML = `
    <div class="bomb-overlay-content">
      <div class="bomb-overlay-emoji">✂️</div>
      <h2 class="bomb-overlay-title" style="color:var(--green)">DÉSAMORCÉ !</h2>
      <p class="bomb-overlay-sub">${escapeHtml(player.name)} s'en sort !</p>
    </div>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
    nextBombTurn();
  }, 1600);
}

function checkBombGameOver() {
  const alive = state.players.filter(p => !p.eliminated);
  if (alive.length <= 1) {
    showBombGameOver();
    return;
  }
  nextBombTurn();
}

function nextBombTurn() {
  let next = (bombState.currentPlayerIndex + 1) % state.players.length;
  let tries = 0;
  while (state.players[next].eliminated && tries < state.players.length) {
    next = (next + 1) % state.players.length;
    tries++;
  }
  bombState.currentPlayerIndex = next;
  bombState.currentQuestion = pickBombQuestion();
  showBombPlay();
}

function showBombGameOver() {
  clearInterval(bombState.timerInterval);
  const alive = state.players.filter(p => !p.eliminated);
  const winner = alive[0] || [...state.players].sort((a, b) => b.lives - a.lives)[0];

  document.getElementById('bomb-winner-name').textContent = `${winner.avatar} ${winner.name}`;

  const sorted = [...state.players].sort((a, b) => {
    if (!a.eliminated && b.eliminated) return -1;
    if (a.eliminated && !b.eliminated) return 1;
    return b.lives - a.lives;
  });

  const list = document.getElementById('bomb-final-scores');
  list.innerHTML = '';
  sorted.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'final-score-row';
    row.innerHTML = `
      <span>${i === 0 ? '🏆' : p.eliminated ? '💀' : '❤️'} ${p.avatar} ${escapeHtml(p.name)}</span>
      <strong>${p.eliminated ? 'Éliminé' : p.lives + ' vie' + (p.lives > 1 ? 's' : '')}</strong>
    `;
    list.appendChild(row);
  });

  showScreen('screen-bomb-gameover');
}

function restartBombGame() {
  clearInterval(bombState.timerInterval);
  state.players = [];
  state.bombMode = true;
  state.kidsMode = false;
  bombState.usedQuestions.clear();
  bombState.currentPlayerIndex = 0;
  document.getElementById('players-list').innerHTML = '';
  document.getElementById('btn-next-config').disabled = true;
  showScreen('screen-players');
}

// ── Live Notification Ticker ──────────────────────────────────
(function initNotifs() {
  const ticker = document.getElementById('notif-ticker');
  if (!ticker) return;
  const msgs = [
    '👑 Sofia vient de gagner avec 20 points !',
    '🎯 Ahmed a répondu juste 5 fois de suite !',
    '🎲 Emma a utilisé Double ou Rien… et gagné !',
    '⚡ 6 joueurs viennent de lancer une partie',
    '🫂 Lucas et Léa se connaissent à 100% !',
    '🏆 Nouveau record : 12 bonnes réponses direct !',
  ];
  let i = 0;

  function showToast() {
    const div = document.createElement('div');
    div.className = 'notif-toast';
    div.textContent = msgs[i % msgs.length];
    ticker.innerHTML = '';
    ticker.appendChild(div);
    i++;
    setTimeout(showToast, 4800);
  }
  setTimeout(showToast, 2800);
})();


// ══════════════════════════════════════════════════════════════
// MODAL EXPLICATION DES MODES
// ══════════════════════════════════════════════════════════════
function openModesInfo() {
  document.getElementById('modal-modes-info').classList.remove('hidden');
}

function closeModesInfo() {
  document.getElementById('modal-modes-info').classList.add('hidden');
}

// Ferme si on clique sur le fond (pas sur la box)
function closeModeInfo(event) {
  if (event.target === document.getElementById('modal-modes-info')) {
    closeModesInfo();
  }
}
