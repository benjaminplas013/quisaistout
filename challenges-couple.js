/* ══════════════════════════════════════════════════════════════
   DÉFIS COUPLE ÉVOLUTIF — Base de données
   ══════════════════════════════════════════════════════════════ */

var COUPLE_CHALLENGES = [

  // ─────────────────────────────────────────────────────────────
  // SOLO — Intensité 1
  // ─────────────────────────────────────────────────────────────
  { id: 1, type: 'solo', intensity: 1, category: 'romantique', emoji: '💌',
    description: 'Écris un petit mot doux et glisse-le dans une poche ou un sac de ton/ta partenaire sans qu\'il/elle le voie.' },
  { id: 2, type: 'solo', intensity: 1, category: 'communication', emoji: '🗣️',
    description: 'Regarde ton/ta partenaire dans les yeux et dis-lui à voix haute 3 choses que tu adores chez lui/elle. Pas d\'ironie.' },
  { id: 3, type: 'solo', intensity: 1, category: 'fun', emoji: '🤪',
    description: 'Prends le selfie le plus ridicule que tu peux faire et envoie-le à ton/ta partenaire maintenant.' },
  { id: 4, type: 'solo', intensity: 1, category: 'romantique', emoji: '☕',
    description: 'Sans qu\'il/elle demande rien, prépare la boisson préférée de ton/ta partenaire et apporte-la lui avec le sourire.' },
  { id: 5, type: 'solo', intensity: 1, category: 'communication', emoji: '📝',
    description: 'Écris sur un papier ton premier souvenir fort de votre relation et lis-le à voix haute à ton/ta partenaire.' },
  { id: 6, type: 'solo', intensity: 1, category: 'fun', emoji: '🕺',
    description: 'Imite la démarche de ton/ta partenaire pendant 30 secondes. Il/elle a le droit de rire et de corriger.' },

  // ─────────────────────────────────────────────────────────────
  // SOLO — Intensité 2
  // ─────────────────────────────────────────────────────────────
  { id: 7, type: 'solo', intensity: 2, category: 'romantique', emoji: '🕯️',
    description: 'Mets la musique que vous aimez tous les deux et prépare un coin cosy : bougies (ou lumière tamisée), couverture, silence.' },
  { id: 8, type: 'solo', intensity: 2, category: 'fun', emoji: '🎨',
    description: 'Dessine le portrait de ton/ta partenaire en 60 secondes chrono. Montre-le-lui sans te justifier.' },
  { id: 9, type: 'solo', intensity: 2, category: 'communication', emoji: '🙏',
    description: 'Dis à ton/ta partenaire quelque chose que tu ne lui as encore jamais dit. Quelque chose de vrai, qui vient du cœur.' },
  { id: 10, type: 'solo', intensity: 2, category: 'coquin', emoji: '💋',
    description: 'Envoie un message flirty et mystérieux à ton/ta partenaire (même s\'il/elle est dans la pièce). Laisse-le/la intrigué(e).' },
  { id: 11, type: 'solo', intensity: 2, category: 'romantique', emoji: '🍳',
    description: 'Cuisine le plat ou le dessert préféré de ton/ta partenaire pour le prochain repas, même si c\'est simple.' },
  { id: 12, type: 'solo', intensity: 2, category: 'communication', emoji: '💭',
    description: 'Partage un rêve ou un projet que tu as en tête depuis un moment mais que tu n\'as pas encore osé dire.' },

  // ─────────────────────────────────────────────────────────────
  // SOLO — Intensité 3
  // ─────────────────────────────────────────────────────────────
  { id: 13, type: 'solo', intensity: 3, category: 'coquin', emoji: '🌶️',
    description: 'Écris un message décrivant ce que tu voudrais faire ce soir. Envoie-le à ton/ta partenaire maintenant.' },
  { id: 14, type: 'solo', intensity: 3, category: 'romantique', emoji: '🛁',
    description: 'Prépare un bain ou une douche romantique pour l\'autre : lumières tamisées, musique douce, serviettes chaudes. Surprise complète.' },
  { id: 15, type: 'solo', intensity: 3, category: 'communication', emoji: '🔓',
    description: 'Confie à ton/ta partenaire une peur ou une insécurité que tu gardes habituellement pour toi. Sois honnête, il/elle écoute.' },
  { id: 16, type: 'solo', intensity: 3, category: 'fun', emoji: '🎭',
    description: 'Rejoue la scène de votre premier rendez-vous en version dramatique et exagérée. L\'autre observe et réagit.' },
  { id: 17, type: 'solo', intensity: 3, category: 'coquin', emoji: '👀',
    description: 'Mets ta tenue que ton/ta partenaire préfère (ou ce qu\'il/elle te trouve le plus attirant(e)), entre dans la pièce sans dire un mot.' },
  { id: 18, type: 'solo', intensity: 3, category: 'romantique', emoji: '✉️',
    description: 'Écris une lettre d\'une page à lire dans 1 an : ce que vous êtes maintenant, ce que tu espères pour vous deux. Donne-la scellée.' },

  // ─────────────────────────────────────────────────────────────
  // SOLO — Intensité 4
  // ─────────────────────────────────────────────────────────────
  { id: 19, type: 'solo', intensity: 4, category: 'coquin', emoji: '🔥',
    description: 'Envoie une photo esthétique et désirable accompagnée d\'un message qui donne clairement envie.' },
  { id: 20, type: 'solo', intensity: 4, category: 'domination', emoji: '👑',
    description: 'Tu prends les commandes de la soirée : programme, dîner, ambiance. Ton/ta partenaire dit oui à tout ce que tu décides.' },
  { id: 21, type: 'solo', intensity: 4, category: 'coquin', emoji: '🎁',
    description: 'Planifie une surprise intime pour ce soir. Annonce-la à l\'avance avec un seul indice. Fais monter l\'impatience.' },
  { id: 22, type: 'solo', intensity: 4, category: 'communication', emoji: '🗝️',
    description: 'Exprime à voix haute un désir ou un fantasme que tu as mais n\'as jamais osé formuler. Pas de jugement de l\'autre côté.' },

  // ─────────────────────────────────────────────────────────────
  // SOLO — Intensité 5
  // ─────────────────────────────────────────────────────────────
  { id: 23, type: 'solo', intensity: 5, category: 'domination', emoji: '⛓️',
    description: 'Pour 30 minutes, tu es complètement aux ordres de ton/ta partenaire (dans vos limites convenues). Il/elle décide de tout.' },
  { id: 24, type: 'solo', intensity: 5, category: 'coquin', emoji: '🌙',
    description: 'Crée un scénario de jeu de rôle complet (décor, rôles, ambiance) et propose-le à ton/ta partenaire pour ce soir.' },
  { id: 25, type: 'solo', intensity: 5, category: 'coquin', emoji: '💎',
    description: 'Offre à ton/ta partenaire une soirée 100 % dédiée à son plaisir. Tu organises tout. C\'est lui/elle qui reçoit.' },

  // ─────────────────────────────────────────────────────────────
  // DUO — Intensité 1
  // ─────────────────────────────────────────────────────────────
  { id: 26, type: 'duo', intensity: 1, category: 'romantique', emoji: '🤗',
    description: 'Faites un câlin de 30 secondes sans parler, sans bouger. Respirez doucement au même rythme.' },
  { id: 27, type: 'duo', intensity: 1, category: 'communication', emoji: '🗨️',
    description: 'À tour de rôle, dites 2 choses que vous avez préférées dans la semaine partagée. Soyez précis.' },
  { id: 28, type: 'duo', intensity: 1, category: 'fun', emoji: '🎲',
    description: 'Pierre Feuille Ciseaux 3 fois de suite. Le/la grand(e) perdant(e) doit faire l\'imitation que l\'autre choisit.' },
  { id: 29, type: 'duo', intensity: 1, category: 'romantique', emoji: '📸',
    description: 'Regardez ensemble une photo ou vidéo d\'un beau souvenir. Parlez-en 5 minutes. Racontez-vous ce que vous ressentez.' },
  { id: 30, type: 'duo', intensity: 1, category: 'communication', emoji: '🙌',
    description: 'Listez 5 choses que vous réussissez particulièrement bien ensemble. Comparez vos listes.' },
  { id: 31, type: 'duo', intensity: 1, category: 'fun', emoji: '🎵',
    description: 'Chantez ensemble la première chanson qui vous vient à l\'esprit, même faux. Du début à la fin. Pas le choix.' },

  // ─────────────────────────────────────────────────────────────
  // DUO — Intensité 2
  // ─────────────────────────────────────────────────────────────
  { id: 32, type: 'duo', intensity: 2, category: 'fun', emoji: '🍕',
    description: 'Préparez ensemble un repas ou un snack en silence total : que des gestes, des regards, des mimiques.' },
  { id: 33, type: 'duo', intensity: 2, category: 'romantique', emoji: '🌙',
    description: 'Allongez-vous l\'un(e) contre l\'autre dans le noir, en silence, pendant 10 minutes. Rien d\'autre.' },
  { id: 34, type: 'duo', intensity: 2, category: 'communication', emoji: '❓',
    description: '10 questions rapides : posez-vous alternativement des questions sur vos rêves, peurs, envies. Aucune limite sauf la bienveillance.' },
  { id: 35, type: 'duo', intensity: 2, category: 'fun', emoji: '🎬',
    description: 'Recréez une scène connue de film ou de série avec les moyens du bord. Filmez si vous voulez.' },
  { id: 36, type: 'duo', intensity: 2, category: 'coquin', emoji: '👁️',
    description: 'Regardez-vous dans les yeux, sans parler, pendant 2 minutes. Le/la premier(ère) qui rit embrasse l\'autre.' },
  { id: 37, type: 'duo', intensity: 2, category: 'romantique', emoji: '💃',
    description: 'Dansez ensemble sur une chanson au choix. Même si vous ne savez pas danser. Laissez-vous faire.' },

  // ─────────────────────────────────────────────────────────────
  // DUO — Intensité 3
  // ─────────────────────────────────────────────────────────────
  { id: 38, type: 'duo', intensity: 3, category: 'romantique', emoji: '💆',
    description: 'Massage des épaules et du dos : 10 minutes chacun. Celui/celle qui reçoit dit ce qu\'il/elle aime.' },
  { id: 39, type: 'duo', intensity: 3, category: 'fun', emoji: '🍓',
    description: 'Bandeau : l\'un(e) les yeux fermés doit deviner ce que l\'autre lui fait goûter ou sentir (nourriture, parfum, épice…).' },
  { id: 40, type: 'duo', intensity: 3, category: 'communication', emoji: '🔓',
    description: '"Qu\'est-ce que je fais qui t\'agace parfois ?" Répondez honnêtement. Écoutez sans vous défendre.' },
  { id: 41, type: 'duo', intensity: 3, category: 'fun', emoji: '🎭',
    description: 'Jeu de rôle : vous êtes deux inconnus qui se rencontrent pour la toute première fois. Improvisez 10 minutes.' },
  { id: 42, type: 'duo', intensity: 3, category: 'coquin', emoji: '💋',
    description: 'Embrassez-vous pendant 1 minute entière. Pas de destination, pas de presse. Juste l\'instant.' },
  { id: 43, type: 'duo', intensity: 3, category: 'domination', emoji: '🎯',
    description: 'L\'un(e) donne 5 "ordres doux" que l\'autre exécute sans poser de questions (câlin, chanson, geste, regard…).' },

  // ─────────────────────────────────────────────────────────────
  // DUO — Intensité 4
  // ─────────────────────────────────────────────────────────────
  { id: 44, type: 'duo', intensity: 4, category: 'coquin', emoji: '🌶️',
    description: 'Questions intimes : posez-vous 5 questions sur vos envies, préférences et désirs du moment. Honnêteté obligatoire.' },
  { id: 45, type: 'duo', intensity: 4, category: 'domination', emoji: '🔮',
    description: 'L\'un(e) décide du programme intime pour les 30 prochaines minutes. L\'autre accepte dans vos limites.' },
  { id: 46, type: 'duo', intensity: 4, category: 'coquin', emoji: '🕯️',
    description: 'Massage à l\'huile ou à la crème : 15 minutes chacun. Lumière tamisée, musique douce. Prenez votre temps.' },
  { id: 47, type: 'duo', intensity: 4, category: 'communication', emoji: '🫦',
    description: 'Décrivez à voix haute ce que vous trouvez le plus désirable chez l\'autre, avec tous les détails. Yeux dans les yeux.' },

  // ─────────────────────────────────────────────────────────────
  // DUO — Intensité 5
  // ─────────────────────────────────────────────────────────────
  { id: 48, type: 'duo', intensity: 5, category: 'domination', emoji: '🔐',
    description: 'Soirée D/s légère : définissez ensemble les rôles pour 1 heure. Choisissez un mot safe avant de commencer.' },
  { id: 49, type: 'duo', intensity: 5, category: 'coquin', emoji: '🌟',
    description: 'Réalisez ensemble un fantasme partagé que vous avez tous les deux validé. Ce soir, ça se fait vraiment.' },
  { id: 50, type: 'duo', intensity: 5, category: 'communication', emoji: '💯',
    description: 'Partagez chacun votre plus grand désir intime que vous n\'avez jamais osé demander. Discutez si vous voulez l\'explorer.' },

];

// ─────────────────────────────────────────────────────────────
// QUESTIONS
// ─────────────────────────────────────────────────────────────
var COUPLE_QUESTIONS = [

  // Intensité 1
  { id: 1, intensity: 1, category: 'communication', type: 'vrai_faux',
    text: 'Je connais le plat préféré de mon/ma partenaire.' },
  { id: 2, intensity: 1, category: 'romantique', type: 'ouvert',
    text: 'Quel est le premier souvenir qui te vient quand tu penses à nous deux ?' },
  { id: 3, intensity: 1, category: 'fun', type: 'vrai_faux',
    text: 'Je pourrais deviner l\'humeur de mon/ma partenaire rien qu\'à sa façon de marcher.' },
  { id: 4, intensity: 1, category: 'communication', type: 'ouvert',
    text: 'Si tu devais décrire notre relation en un seul mot, lequel ce serait ?' },
  { id: 5, intensity: 1, category: 'romantique', type: 'vrai_faux',
    text: 'Mon/ma partenaire connaît mon film ou ma série préféré(e) du moment.' },
  { id: 6, intensity: 1, category: 'fun', type: 'ouvert',
    text: 'Quelle est la chose la plus drôle que tu aies faite pour moi depuis qu\'on est ensemble ?' },

  // Intensité 2
  { id: 7, intensity: 2, category: 'communication', type: 'ouvert',
    text: 'Qu\'est-ce que je fais qui te fait le plus te sentir aimé(e) ?' },
  { id: 8, intensity: 2, category: 'romantique', type: 'vrai_faux',
    text: 'Je sais quelle chanson mon/ma partenaire associerait à notre relation.' },
  { id: 9, intensity: 2, category: 'fun', type: 'ouvert',
    text: 'Si notre relation était un film, quel genre on serait et qui jouerait nos rôles ?' },
  { id: 10, intensity: 2, category: 'coquin', type: 'vrai_faux',
    text: 'Mon/ma partenaire pense souvent à moi de manière romantique même quand on est séparés.' },
  { id: 11, intensity: 2, category: 'communication', type: 'ouvert',
    text: 'Qu\'est-ce que tu aimerais qu\'on fasse plus souvent ensemble ?' },
  { id: 12, intensity: 2, category: 'romantique', type: 'vrai_faux',
    text: 'Mon/ma partenaire a une zone du corps particulièrement sensible et je la connais.' },

  // Intensité 3
  { id: 13, intensity: 3, category: 'coquin', type: 'vrai_faux',
    text: 'Mon/ma partenaire a un fantasme qu\'il/elle n\'a pas encore tout à fait osé me dire.' },
  { id: 14, intensity: 3, category: 'communication', type: 'ouvert',
    text: 'Qu\'est-ce qui t\'attire le plus chez moi, au-delà du physique ?' },
  { id: 15, intensity: 3, category: 'coquin', type: 'ouvert',
    text: 'Décris une scène ou situation qui te rend instantanément attiré(e) par moi.' },
  { id: 16, intensity: 3, category: 'domination', type: 'vrai_faux',
    text: 'L\'idée de prendre les commandes dans notre intimité m\'attire.' },
  { id: 17, intensity: 3, category: 'romantique', type: 'ouvert',
    text: 'Quel est le moment où tu as ressenti le plus d\'attirance pour moi depuis qu\'on est ensemble ?' },

  // Intensité 4
  { id: 18, intensity: 4, category: 'coquin', type: 'ouvert',
    text: 'Décris quelque chose que tu aimerais qu\'on essaie et qu\'on n\'a jamais fait ensemble.' },
  { id: 19, intensity: 4, category: 'domination', type: 'vrai_faux',
    text: 'L\'idée d\'un jeu domination/soumission léger m\'attire vraiment.' },
  { id: 20, intensity: 4, category: 'coquin', type: 'ouvert',
    text: 'Quel est le fantasme que tu veux qu\'on réalise ensemble un jour ?' },
  { id: 21, intensity: 4, category: 'communication', type: 'vrai_faux',
    text: 'Il y a des désirs que j\'hésite encore à exprimer pleinement à mon/ma partenaire.' },

  // Intensité 5
  { id: 22, intensity: 5, category: 'domination', type: 'ouvert',
    text: 'Dans notre intimité, qu\'est-ce que tu n\'as jamais osé demander mais penses souvent ?' },
  { id: 23, intensity: 5, category: 'coquin', type: 'vrai_faux',
    text: 'Il y a une expérience intime très précise que je veux vivre avec mon/ma partenaire cette année.' },
  { id: 24, intensity: 5, category: 'communication', type: 'ouvert',
    text: 'Sans filtre : dis la chose la plus intime et désirable que tu penses de moi en ce moment.' },

];
