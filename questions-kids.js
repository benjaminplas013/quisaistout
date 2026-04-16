/* ══════════════════════════════════════════════════════════════
   QUI SAIT TOUT ? — Questions pour enfants
   Format : { q, a, w: [...], c }
   ══════════════════════════════════════════════════════════════ */

const KIDS_QUESTIONS = [

  // ── ANIMAUX 🐾 ───────────────────────────────────────────────

  {
    q: "Quel animal est le plus grand du monde ?",
    a: "La baleine bleue",
    w: ["L'éléphant", "Le requin baleine", "La girafe"],
    c: "animaux"
  },
  {
    q: "Quel est le plus petit oiseau du monde ?",
    a: "Le colibri",
    w: ["Le moineau", "Le canari", "Le roitelet"],
    c: "animaux"
  },
  {
    q: "Combien de pattes a une araignée ?",
    a: "Huit pattes",
    w: ["Six pattes", "Quatre pattes", "Dix pattes"],
    c: "animaux"
  },
  {
    q: "Quel est l'animal terrestre le plus rapide ?",
    a: "Le guépard",
    w: ["Le lion", "Le cheval", "L'autruche"],
    c: "animaux"
  },
  {
    q: "Comment s'appelle le bébé d'un cheval ?",
    a: "Un poulain",
    w: ["Un veau", "Un agneau", "Un chiot"],
    c: "animaux"
  },
  {
    q: "Quel animal est connu pour sa mémoire exceptionnelle ?",
    a: "L'éléphant",
    w: ["Le dauphin", "Le corbeau", "Le chimpanzé"],
    c: "animaux"
  },
  {
    q: "Quel animal peut changer de couleur pour se camoufler ?",
    a: "Le caméléon",
    w: ["Le lézard", "La pieuvre", "Le crabe"],
    c: "animaux"
  },
  {
    q: "Combien de cœurs a un poulpe ?",
    a: "Trois cœurs",
    w: ["Un cœur", "Deux cœurs", "Quatre cœurs"],
    c: "animaux"
  },
  {
    q: "Quel est le plus grand mammifère terrestre ?",
    a: "L'éléphant",
    w: ["Le rhinocéros", "L'hippopotame", "La girafe"],
    c: "animaux"
  },
  {
    q: "Quel est le plus gros reptile du monde ?",
    a: "Le crocodile du Nil",
    w: ["Le boa constrictor", "Le varan de Komodo", "La tortue géante"],
    c: "animaux"
  },

  // ── NATURE 🌿 ────────────────────────────────────────────────

  {
    q: "De quelle couleur est l'eau de la mer Morte ?",
    a: "Claire et transparente",
    w: ["Bleue foncée", "Verte", "Rouge"],
    c: "nature"
  },
  {
    q: "Quel est le plus grand lac d'eau douce du monde ?",
    a: "Le lac Baïkal",
    w: ["Le lac Supérieur", "Le lac Victoria", "Le lac Titicaca"],
    c: "nature"
  },
  {
    q: "Combien de types de nuages principaux existe-t-il ?",
    a: "Quatre (cirrus, cumulus, stratus, nimbus)",
    w: ["Deux", "Six", "Dix"],
    c: "nature"
  },
  {
    q: "Quel arbre produit des glands ?",
    a: "Le chêne",
    w: ["Le peuplier", "Le sapin", "Le hêtre"],
    c: "nature"
  },
  {
    q: "Quelle est la planète la plus proche du Soleil ?",
    a: "Mercure",
    w: ["Vénus", "La Terre", "Mars"],
    c: "nature"
  },
  {
    q: "Quel est le plus grand désert du monde ?",
    a: "Le Sahara",
    w: ["Le désert d'Arabie", "Le désert de Gobi", "Le désert d'Atacama"],
    c: "nature"
  },
  {
    q: "Combien de continents y a-t-il sur Terre ?",
    a: "Sept continents",
    w: ["Cinq continents", "Six continents", "Huit continents"],
    c: "nature"
  },
  {
    q: "Quel est le nom de la chaîne de montagnes qui traverse l'Amérique du Sud ?",
    a: "Les Andes",
    w: ["Les Rocheuses", "Les Alpes", "L'Himalaya"],
    c: "nature"
  },
  {
    q: "Où vit le panda géant ?",
    a: "En Chine",
    w: ["Au Japon", "En Inde", "En Thaïlande"],
    c: "nature"
  },
  {
    q: "Quelle est la capitale de la France ?",
    a: "Paris",
    w: ["Lyon", "Marseille", "Bordeaux"],
    c: "nature"
  },
  {
    q: "Combien de couleurs y a-t-il dans un arc-en-ciel ?",
    a: "Sept couleurs",
    w: ["Cinq couleurs", "Six couleurs", "Huit couleurs"],
    c: "nature"
  },

  // ── HISTOIRE 🏺 ──────────────────────────────────────────────

  {
    q: "Qui a découvert l'Amérique ?",
    a: "Christophe Colomb",
    w: ["Marco Polo", "Vasco de Gama", "Magellan"],
    c: "histoire"
  },
  {
    q: "Quel est le nom du premier homme à marcher sur la Lune ?",
    a: "Neil Armstrong",
    w: ["Buzz Aldrin", "Yuri Gagarine", "John Glenn"],
    c: "histoire"
  },
  {
    q: "Qui a écrit \"Les Misérables\" ?",
    a: "Victor Hugo",
    w: ["Émile Zola", "Alexandre Dumas", "Gustave Flaubert"],
    c: "histoire"
  },
  {
    q: "Quel est le nom du célèbre bateau qui a coulé en 1912 ?",
    a: "Le Titanic",
    w: ["Le Lusitania", "Le Normandie", "Le Queen Mary"],
    c: "histoire"
  },
  {
    q: "Quelle civilisation a construit les pyramides d'Égypte ?",
    a: "Les Égyptiens",
    w: ["Les Romains", "Les Grecs", "Les Mayas"],
    c: "histoire"
  },
  {
    q: "En quelle année a commencé la Première Guerre mondiale ?",
    a: "1914",
    w: ["1905", "1918", "1939"],
    c: "histoire"
  },
  {
    q: "Quel pharaon est célèbre pour ses pyramides ?",
    a: "Toutankhamon",
    w: ["Ramsès II", "Khéops", "Néfertiti"],
    c: "histoire"
  },
  {
    q: "Dans quel pays a eu lieu la Révolution française ?",
    a: "En France",
    w: ["En Angleterre", "En Italie", "En Espagne"],
    c: "histoire"
  },
  {
    q: "Qui était Cléopâtre ?",
    a: "La reine d'Égypte ancienne",
    w: ["Une déesse grecque", "Une impératrice romaine", "Une princesse perse"],
    c: "histoire"
  },
  {
    q: "Quel célèbre emperor romain a été assassiné ?",
    a: "Jules César",
    w: ["Auguste", "Néron", "Caligula"],
    c: "histoire"
  },

  // ── SCIENCE 🔬 ───────────────────────────────────────────────

  {
    q: "Qui a inventé l'ampoule électrique ?",
    a: "Thomas Edison",
    w: ["Nikola Tesla", "Albert Einstein", "Isaac Newton"],
    c: "science"
  },
  {
    q: "Quel est le nom du gaz que l'on respire ?",
    a: "L'oxygène",
    w: ["L'azote", "Le dioxyde de carbone", "L'hydrogène"],
    c: "science"
  },
  {
    q: "Quelle est la principale source d'énergie pour la Terre ?",
    a: "Le Soleil",
    w: ["La Lune", "Le vent", "L'eau"],
    c: "science"
  },
  {
    q: "Qui a découvert la théorie de la gravité ?",
    a: "Isaac Newton",
    w: ["Albert Einstein", "Galilée", "Copernic"],
    c: "science"
  },
  {
    q: "Quel est le plus petit os du corps humain ?",
    a: "L'étrier, dans l'oreille",
    w: ["Le péroné", "La phalange", "Le coccyx"],
    c: "science"
  },
  {
    q: "Combien de dents un adulte a-t-il normalement ?",
    a: "32 dents",
    w: ["28 dents", "30 dents", "36 dents"],
    c: "science"
  },
  {
    q: "Quel est l'organe qui pompe le sang dans le corps ?",
    a: "Le cœur",
    w: ["Le foie", "Les poumons", "Les reins"],
    c: "science"
  },
  {
    q: "Qu'est-ce qu'une éclipse ?",
    a: "Quand la Lune cache le Soleil ou la Terre cache la Lune",
    w: ["Une comète qui passe", "Une étoile qui explose", "Un très grand nuage"],
    c: "science"
  },
  {
    q: "Quel est l'élément chimique dont le symbole est \"H\" ?",
    a: "L'hydrogène",
    w: ["L'hélium", "L'oxygène", "L'azote"],
    c: "science"
  },

  // ── MATHS ➗ ─────────────────────────────────────────────────

  {
    q: "Combien font 5 + 3 ?",
    a: "8",
    w: ["7", "9", "6"],
    c: "maths"
  },
  {
    q: "Si tu as 10 pommes et que tu en manges 3, combien t'en reste-t-il ?",
    a: "7 pommes",
    w: ["6 pommes", "8 pommes", "5 pommes"],
    c: "maths"
  },
  {
    q: "Quel est le résultat de 12 x 3 ?",
    a: "36",
    w: ["32", "34", "38"],
    c: "maths"
  },
  {
    q: "Combien de côtés a un hexagone ?",
    a: "6 côtés",
    w: ["5 côtés", "7 côtés", "8 côtés"],
    c: "maths"
  },
  {
    q: "Quel est le carré de 4 ?",
    a: "16",
    w: ["12", "14", "18"],
    c: "maths"
  },
  {
    q: "Combien de centimètres y a-t-il dans un mètre ?",
    a: "100 centimètres",
    w: ["10 centimètres", "50 centimètres", "1000 centimètres"],
    c: "maths"
  },
  {
    q: "Quel est le nombre suivant dans cette série : 2, 4, 6, 8 ?",
    a: "10",
    w: ["9", "11", "12"],
    c: "maths"
  },
  {
    q: "Combien de jours y a-t-il dans une année ?",
    a: "365 jours",
    w: ["360 jours", "364 jours", "400 jours"],
    c: "maths"
  },
  {
    q: "Combien de zéros y a-t-il dans un million ?",
    a: "Six zéros",
    w: ["Cinq zéros", "Sept zéros", "Quatre zéros"],
    c: "maths"
  },
  {
    q: "Quel est le nom du triangle qui a tous ses côtés de la même longueur ?",
    a: "Un triangle équilatéral",
    w: ["Un triangle isocèle", "Un triangle rectangle", "Un triangle scalène"],
    c: "maths"
  },

  // ── DIVERTISSEMENT 🎉 ────────────────────────────────────────

  {
    q: "Quel est le nom du super-héros avec un bouclier rond ?",
    a: "Captain America",
    w: ["Iron Man", "Thor", "Spider-Man"],
    c: "kids_pop"
  },
  {
    q: "Quel est le nom du célèbre chien de la BD \"Tintin\" ?",
    a: "Milou",
    w: ["Rantanplan", "Idéfix", "Rex"],
    c: "kids_pop"
  },
  {
    q: "Combien de joueurs y a-t-il dans une équipe de football ?",
    a: "Onze joueurs",
    w: ["Neuf joueurs", "Dix joueurs", "Douze joueurs"],
    c: "kids_pop"
  },
  {
    q: "Dans quelle ville se trouve la Tour Eiffel ?",
    a: "Paris",
    w: ["Lyon", "Bordeaux", "Nice"],
    c: "kids_pop"
  },
  {
    q: "Qui est le héros principal de la saga \"Harry Potter\" ?",
    a: "Harry Potter",
    w: ["Ron Weasley", "Hermione Granger", "Neville Londubat"],
    c: "kids_pop"
  },
  {
    q: "Qui est le meilleur ami de Mickey Mouse ?",
    a: "Donald Duck",
    w: ["Goofy", "Pluto", "Dingo"],
    c: "kids_pop"
  },
  {
    q: "Dans quel film trouve-t-on un poisson clown appelé Nemo ?",
    a: "Le Monde de Nemo",
    w: ["Shrek", "Cars", "Ratatouille"],
    c: "kids_pop"
  },
  {
    q: "Quel est le nom de la princesse dans \"La Belle au Bois Dormant\" ?",
    a: "Aurore",
    w: ["Cendrillon", "Blanche-Neige", "Belle"],
    c: "kids_pop"
  },
  {
    q: "Comment s'appelle la petite sirène dans le film Disney ?",
    a: "Ariel",
    w: ["Marina", "Nadia", "Coraline"],
    c: "kids_pop"
  },
  {
    q: "Quel est le nom du cowboy dans \"Toy Story\" ?",
    a: "Woody",
    w: ["Buzz l'Éclair", "Rex", "Jessie"],
    c: "kids_pop"
  },
  {
    q: "Quelle princesse Disney a une très longue chevelure magique ?",
    a: "Raiponce",
    w: ["Mulan", "Jasmine", "Pocahontas"],
    c: "kids_pop"
  },
  {
    q: "Quelle est la couleur du soleil dans un dessin d'enfant ?",
    a: "Jaune",
    w: ["Orange", "Blanc", "Rouge"],
    c: "kids_pop"
  },
  {
    q: "Quelle est la couleur de la peau des singes ?",
    a: "Souvent brune ou noire",
    w: ["Verte", "Bleue", "Jaune"],
    c: "kids_pop"
  },
  {
    q: "Quelle est la forme d'une balle de tennis ?",
    a: "Ronde",
    w: ["Ovale", "Carrée", "Triangulaire"],
    c: "kids_pop"
  },
  {
    q: "Quel est le nom du film où un garçon se lie d'amitié avec un extraterrestre ?",
    a: "E.T. l'extra-terrestre",
    w: ["Alf", "Les Envahisseurs", "Doctor Who"],
    c: "kids_pop"
  },
  {
    q: "Comment s'appelle l'inventeur de la voiture ?",
    a: "Karl Benz",
    w: ["Henry Ford", "Thomas Edison", "Nicolas Cugnot"],
    c: "kids_pop"
  },
  {
    q: "Quel est le nom du chien dans la série Scooby-Doo ?",
    a: "Scooby-Doo",
    w: ["Rex", "Rantanplan", "Lassie"],
    c: "kids_pop"
  },
  {
    q: "Dans quel dessin animé Aladdin possède-t-il une lampe magique ?",
    a: "Aladdin",
    w: ["Sinbad", "Ali Baba", "Les Mille et Une Nuits"],
    c: "kids_pop"
  },
  {
    q: "Dans quel dessin animé les personnages vivent dans un monde de pâte à modeler ?",
    a: "Wallace et Gromit",
    w: ["Chicken Run", "Bob l'Éponge", "Pingu"],
    c: "kids_pop"
  },
  {
    q: "Dans quel dessin animé les personnages sont des sorciers avec des pouvoirs magiques ?",
    a: "Les Sorciers de Waverly Place",
    w: ["Sabrina", "Les Apprentis Sorciers", "Hocus Pocus"],
    c: "kids_pop"
  },
  {
    q: "Qui est la méchante sorcière dans \"Blanche-Neige\" ?",
    a: "La Reine Maléfique",
    w: ["Ursula", "Cruella", "Maléfique"],
    c: "kids_pop"
  },
  {
    q: "Quel bonbon est une barre chocolatée avec du caramel et du nougat ?",
    a: "Mars",
    w: ["Twix", "Snickers", "Bounty"],
    c: "kids_pop"
  },

  // ── BONBONS 🍬 ───────────────────────────────────────────────

  {
    q: "Quelle couleur de M&M's n'existait pas avant les années 90 ?",
    a: "Bleu",
    w: ["Rouge", "Jaune", "Vert"],
    c: "bonbons"
  },
  {
    q: "Quel bonbon est célèbre pour ses boules colorées dans de petits paquets ?",
    a: "Les Dragibus",
    w: ["Les Smarties", "Les Skittles", "Les M&M's"],
    c: "bonbons"
  },
  {
    q: "Quel bonbon a une texture molle et la forme de vers de terre ?",
    a: "Les gummy worms",
    w: ["Les oursons gélifiés", "Les Chamallows", "Les Carambar"],
    c: "bonbons"
  },
  {
    q: "Quel bonbon en forme de bâton de sucre est associé aux fêtes de Noël ?",
    a: "Le sucre d'orge",
    w: ["La canne en bonbon", "La guimauve", "Le nougat"],
    c: "bonbons"
  },
  {
    q: "Quel bonbon a un goût de réglisse et se présente souvent en forme de pieds ?",
    a: "Les Pieds de Mouton",
    w: ["Les Carambar", "Les Nounours", "Les Têtes Brûlées"],
    c: "bonbons"
  },
  {
    q: "Quel bonbon est fabriqué à partir de sucre durci en forme de sucette ?",
    a: "Les sucettes lollipops",
    w: ["Les Chupa Chups", "Les Caramels", "Les réglisses"],
    c: "bonbons"
  },
  {
    q: "Quel bonbon américain contient du chocolat, du caramel et des cacahuètes ?",
    a: "Snickers",
    w: ["Twix", "Kit Kat", "Bounty"],
    c: "bonbons"
  },
  {
    q: "Quel bonbon est une petite boule dure multicolore qui fond dans la bouche ?",
    a: "Les Dragées",
    w: ["Les Smarties", "Les M&M's", "Les Tic Tac"],
    c: "bonbons"
  },

  // ── MAGIE & FANTAISIE ✨ ──────────────────────────────────────

  {
    q: "Quelle créature magique a une seule corne sur son front ?",
    a: "La licorne",
    w: ["Le dragon", "La fée", "Le centaure"],
    c: "magie"
  },
  {
    q: "Quel monstre peut se transformer en loup pendant la pleine lune ?",
    a: "Le loup-garou",
    w: ["Le vampire", "Le zombie", "Le fantôme"],
    c: "magie"
  },
  {
    q: "Quel est le nom de l'oiseau magique qui renaît de ses cendres ?",
    a: "Le phœnix",
    w: ["La cigogne", "Le griffon", "L'hippogriffe"],
    c: "magie"
  },
  {
    q: "Quelle créature a un corps de poisson et une tête de femme ?",
    a: "La sirène",
    w: ["La naïade", "La nixe", "La mélusine"],
    c: "magie"
  },
  {
    q: "Quel animal mythologique crache du feu et a des ailes ?",
    a: "Le dragon",
    w: ["La licorne", "Le pégase", "Le griffon"],
    c: "magie"
  },
  {
    q: "Quelle fée est petite, a des ailes et porte une robe bleue ?",
    a: "La fée Clochette",
    w: ["La fée Rose", "La fée Marraine", "Elsa"],
    c: "magie"
  },
  {
    q: "Quelle princesse Disney a des cheveux qui brillent dans la nuit ?",
    a: "Raiponce",
    w: ["Elsa", "Aurore", "Ariel"],
    c: "magie"
  },
  {
    q: "Quel personnage célèbre a une baguette magique et peut lancer des sorts ?",
    a: "Harry Potter",
    w: ["Gandalf", "Merlin", "Dumbledore"],
    c: "magie"
  },
  {
    q: "Quel personnage peut transformer des animaux en créatures maléfiques dans un conte ?",
    a: "La sorcière Maléfique",
    w: ["La Bonne Fée", "Ursula", "La Fée Clochette"],
    c: "magie"
  }

];
