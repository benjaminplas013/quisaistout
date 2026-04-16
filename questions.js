/* ══════════════════════════════════════════════════════════════
   QUI SAIT TOUT ? — Banque de questions
   Format : { q, a, w: [...], c, f }
   ══════════════════════════════════════════════════════════════ */

const QUESTIONS = [

  // ── GÉOGRAPHIE ───────────────────────────────────────────────

  {
    q: "Quelle est la capitale de l'Australie ?",
    a: "Canberra",
    w: ["Sydney", "Melbourne", "Brisbane"],
    c: "geo",
    f: "Beaucoup pensent que c'est Sydney, mais Canberra a été choisie en 1908 pour éviter la rivalité entre Sydney et Melbourne !"
  },
  {
    q: "Quel est le plus grand océan du monde ?",
    a: "L'océan Pacifique",
    w: ["L'océan Atlantique", "L'océan Indien", "L'océan Arctique"],
    c: "geo",
    f: "L'océan Pacifique est si vaste qu'il couvre plus de superficie que l'ensemble des terres émergées de la planète réunies."
  },
  {
    q: "Quel est le plus long fleuve du monde ?",
    a: "Le Nil",
    w: ["L'Amazone", "Le Mississippi", "Le Yang-Tsé-Kiang"],
    c: "geo",
    f: "Le débat entre le Nil et l'Amazone n'est pas totalement tranché : selon la source choisie pour l'Amazone, ce dernier pourrait être plus long."
  },
  {
    q: "Dans quel pays se trouve le Mont Everest ?",
    a: "Népal et Chine",
    w: ["Inde et Tibet", "Bhoutan et Népal", "Pakistan et Afghanistan"],
    c: "geo",
    f: "L'Everest grandit d'environ 4 mm par an à cause du mouvement des plaques tectoniques. Il mesure actuellement 8 848,86 mètres."
  },
  {
    q: "Quelle est la capitale de la Russie ?",
    a: "Moscou",
    w: ["Saint-Pétersbourg", "Vladivostok", "Kazan"],
    c: "geo",
    f: "Saint-Pétersbourg a été la capitale de la Russie jusqu'en 1918. Moscou compte environ 12 millions d'habitants."
  },
  {
    q: "Quel désert est le plus grand du monde ?",
    a: "Le désert Antarctique",
    w: ["Le Sahara", "Le désert d'Arabie", "Le désert de Gobi"],
    c: "geo",
    f: "Un désert se définit par ses faibles précipitations. L'Antarctique, avec moins de 200 mm de pluie par an, est le plus grand désert."
  },
  {
    q: "Combien de pays composent le continent africain ?",
    a: "54",
    w: ["48", "62", "44"],
    c: "geo",
    f: "L'Afrique est le continent avec le plus grand nombre de pays. Le Soudan du Sud, créé en 2011, est le plus récemment indépendant."
  },
  {
    q: "Quel pays possède le plus grand nombre d'îles au monde ?",
    a: "La Suède",
    w: ["L'Indonésie", "La Finlande", "Le Canada"],
    c: "geo",
    f: "La Suède compte plus de 220 000 îles. L'Indonésie est souvent citée, mais c'est la Suède qui détient officiellement le record."
  },
  {
    q: "Quelle est la plus grande île du monde ?",
    a: "Le Groenland",
    w: ["La Nouvelle-Guinée", "Bornéo", "Madagascar"],
    c: "geo",
    f: "Le Groenland appartient au Danemark mais est recouvert à 80 % de glace, malgré son nom qui signifie 'Terre verte'."
  },
  {
    q: "Dans quel pays se trouve la ville de Buenos Aires ?",
    a: "Argentine",
    w: ["Brésil", "Chili", "Uruguay"],
    c: "geo",
    f: "Buenos Aires signifie 'bons airs' en espagnol. C'est l'une des villes les plus australes parmi les grandes capitales mondiales."
  },

  // ── HISTOIRE ─────────────────────────────────────────────────

  {
    q: "Qui a peint la Joconde ?",
    a: "Léonard de Vinci",
    w: ["Michel-Ange", "Raphaël", "Botticelli"],
    c: "histoire",
    f: "Léonard de Vinci a commencé ce tableau vers 1503 et ne l'a jamais livré à son commanditaire, le gardant jusqu'à sa mort."
  },
  {
    q: "En quelle année la Révolution française a-t-elle débuté ?",
    a: "1789",
    w: ["1776", "1804", "1815"],
    c: "histoire",
    f: "La Bastille ne contenait que 7 prisonniers le 14 juillet 1789 lors de sa prise, symbole de la Révolution française."
  },
  {
    q: "Quel événement a marqué le début de la Première Guerre mondiale en 1914 ?",
    a: "L'assassinat de l'archiduc François-Ferdinand",
    w: ["L'invasion de la Pologne", "La chute du tsar Nicolas II", "Le traité de Versailles"],
    c: "histoire",
    f: "L'archiduc a été tué à Sarajevo par Gavrilo Princip. Le chauffeur s'était trompé de route ce jour-là, mettant accidentellement la voiture sur le chemin de l'assassin."
  },
  {
    q: "Qui était le premier président des États-Unis ?",
    a: "George Washington",
    w: ["Abraham Lincoln", "Thomas Jefferson", "Benjamin Franklin"],
    c: "histoire",
    f: "George Washington est le seul président américain à avoir été élu à l'unanimité par le collège électoral, et ce à deux reprises."
  },
  {
    q: "En quelle année le mur de Berlin est-il tombé ?",
    a: "1989",
    w: ["1991", "1985", "1979"],
    c: "histoire",
    f: "La chute du mur le 9 novembre 1989 fut en partie due à une erreur lors d'une conférence de presse : un porte-parole annonça par mégarde l'ouverture immédiate des frontières."
  },
  {
    q: "Quel pharaon est associé à la construction de la Grande Pyramide de Gizeh ?",
    a: "Khéops",
    w: ["Ramsès II", "Toutânkhamon", "Nefertiti"],
    c: "histoire",
    f: "La Grande Pyramide de Khéops est la seule des Sept Merveilles du monde antique encore debout aujourd'hui, après plus de 4 500 ans."
  },
  {
    q: "Quel navigateur a découvert l'Amérique en 1492 ?",
    a: "Christophe Colomb",
    w: ["Amerigo Vespucci", "Vasco de Gama", "Ferdinand Magellan"],
    c: "histoire",
    f: "Christophe Colomb est mort convaincu d'avoir atteint l'Asie. C'est Amerigo Vespucci qui comprit le premier qu'il s'agissait d'un nouveau continent."
  },
  {
    q: "Qui a été le premier homme à marcher sur la Lune ?",
    a: "Neil Armstrong",
    w: ["Buzz Aldrin", "Youri Gagarine", "John Glenn"],
    c: "histoire",
    f: "Neil Armstrong a dit : 'Un petit pas pour l'homme, un bond de géant pour l'humanité.' Il a affirmé plus tard que le mot 'un' avait été coupé par la transmission."
  },
  {
    q: "Quelle civilisation a construit le Machu Picchu ?",
    a: "Les Incas",
    w: ["Les Aztèques", "Les Mayas", "Les Olmèques"],
    c: "histoire",
    f: "Le Machu Picchu n'a été redécouvert par le monde occidental qu'en 1911, mais des habitants locaux le connaissaient parfaitement."
  },
  {
    q: "Quel empire était dirigé par Jules César ?",
    a: "L'Empire romain",
    w: ["L'Empire grec", "L'Empire ottoman", "L'Empire byzantin"],
    c: "histoire",
    f: "Jules César n'a jamais porté le titre d'Empereur — il était Dictateur à vie. C'est Auguste, son héritier, qui devint le premier véritable Empereur romain."
  },

  // ── SCIENCE ──────────────────────────────────────────────────

  {
    q: "Combien d'os y a-t-il dans le corps humain adulte ?",
    a: "206",
    w: ["180", "212", "250"],
    c: "science",
    f: "Les bébés naissent avec environ 270 os, mais certains fusionnent en grandissant pour n'en former que 206 chez l'adulte."
  },
  {
    q: "Quelle est la planète la plus grande du système solaire ?",
    a: "Jupiter",
    w: ["Saturne", "Uranus", "Neptune"],
    c: "science",
    f: "Jupiter est si grande qu'on pourrait y faire rentrer plus de 1 300 planètes Terre ! Sa Grande Tache Rouge est une tempête qui dure depuis plus de 300 ans."
  },
  {
    q: "Combien de côtés a un hexagone ?",
    a: "6",
    w: ["5", "7", "8"],
    c: "science",
    f: "Les alvéoles des ruches d'abeilles sont hexagonales : c'est la forme qui utilise le moins de cire tout en stockant le maximum de miel."
  },
  {
    q: "Quelle est la vitesse de la lumière dans le vide ?",
    a: "300 000 km/s",
    w: ["150 000 km/s", "450 000 km/s", "1 080 000 km/s"],
    c: "science",
    f: "La lumière met environ 8 minutes et 20 secondes pour parcourir la distance entre le Soleil et la Terre."
  },
  {
    q: "Quel est le symbole chimique de l'or ?",
    a: "Au",
    w: ["Or", "Go", "Ag"],
    c: "science",
    f: "Le symbole Au vient du latin 'aurum'. L'or est si malléable qu'un seul gramme peut être étiré en un fil de 3 km."
  },
  {
    q: "Combien de chromosomes possède un être humain en bonne santé ?",
    a: "46",
    w: ["23", "48", "44"],
    c: "science",
    f: "Les chromosomes viennent par paires : 23 viennent de la mère et 23 du père. La paire 23 détermine le sexe biologique."
  },
  {
    q: "Quel organe produit l'insuline dans le corps humain ?",
    a: "Le pancréas",
    w: ["Le foie", "Le rein", "La rate"],
    c: "science",
    f: "Le pancréas est à la fois une glande digestive et endocrinienne. Il produit aussi le glucagon, l'hormone opposée à l'insuline."
  },
  {
    q: "Quelle planète est surnommée la 'planète rouge' ?",
    a: "Mars",
    w: ["Vénus", "Saturne", "Jupiter"],
    c: "science",
    f: "La couleur rouge de Mars est due à l'oxyde de fer (rouille). Elle possède le plus grand volcan du système solaire : l'Olympus Mons."
  },
  {
    q: "Quel gaz représente environ 78 % de l'atmosphère terrestre ?",
    a: "L'azote",
    w: ["L'oxygène", "Le dioxyde de carbone", "L'argon"],
    c: "science",
    f: "Beaucoup pensent que l'air est surtout de l'oxygène, mais l'azote domine largement. L'oxygène ne représente qu'environ 21 %."
  },
  {
    q: "À quelle température l'eau bout-elle au niveau de la mer ?",
    a: "100 °C",
    w: ["90 °C", "110 °C", "95 °C"],
    c: "science",
    f: "En altitude, l'eau bout à moins de 100 °C à cause de la pression atmosphérique plus faible. Au sommet de l'Everest, elle bout à environ 70 °C."
  },

  // ── TECH & JEUX VIDÉO ────────────────────────────────────────

  {
    q: "Quelle entreprise a créé le système d'exploitation Windows ?",
    a: "Microsoft",
    w: ["Apple", "IBM", "Google"],
    c: "tech",
    f: "La première version de Windows est sortie en 1985. À ses débuts, Windows n'était qu'une interface graphique posée sur MS-DOS."
  },
  {
    q: "Dans quel jeu vidéo incarne-t-on un plombier qui sauve une princesse ?",
    a: "Super Mario Bros",
    w: ["Donkey Kong", "The Legend of Zelda", "Kirby's Adventure"],
    c: "tech",
    f: "Mario s'appelait 'Jumpman' dans Donkey Kong (1981). Son prénom vient de Mario Segale, le propriétaire des bureaux de Nintendo of America."
  },
  {
    q: "Combien de bits composent un octet ?",
    a: "8",
    w: ["4", "16", "32"],
    c: "tech",
    f: "Le terme 'byte' a été délibérément orthographié différemment de 'bite' pour éviter les erreurs de frappe. Un octet peut représenter 256 valeurs différentes."
  },
  {
    q: "Quel langage de programmation est souvent symbolisé par un café ?",
    a: "Java",
    w: ["Python", "C++", "Ruby"],
    c: "tech",
    f: "Java tire son nom de l'île de Java en Indonésie, grande productrice de café. Ses créateurs voulaient un nom évoquant l'énergie."
  },
  {
    q: "Quelle console de jeu portable a été lancée par Nintendo en 1989 ?",
    a: "Game Boy",
    w: ["Game Gear", "Lynx", "Neo Geo Pocket"],
    c: "tech",
    f: "La Game Boy originale fonctionnait avec 4 piles AA et avait un écran monochrome vert. Elle s'est vendue à plus de 118 millions d'unités."
  },
  {
    q: "Que signifie le sigle 'CPU' en informatique ?",
    a: "Central Processing Unit",
    w: ["Core Processing Unit", "Central Program Unit", "Computer Processing Unit"],
    c: "tech",
    f: "Le premier microprocesseur commercial, l'Intel 4004 (1971), avait une puissance bien inférieure à celle d'une calculatrice de poche actuelle."
  },
  {
    q: "Quel jeu vidéo met des joueurs sur une île où ils doivent être le dernier survivant ?",
    a: "Fortnite",
    w: ["Minecraft", "Apex Legends", "Overwatch"],
    c: "tech",
    f: "Le mode Battle Royale de Fortnite a été développé en seulement deux mois. À son pic en 2018, le jeu comptait plus de 250 millions de joueurs."
  },
  {
    q: "Qu'est-ce que le Wi-Fi permet de faire ?",
    a: "Se connecter à Internet sans fil",
    w: ["Transférer des fichiers par câble USB", "Relier deux écrans en Bluetooth", "Synchroniser une montre connectée"],
    c: "tech",
    f: "'Wi-Fi' n'est pas l'abréviation de 'Wireless Fidelity'. C'est simplement un nom de marque inventé par une agence marketing en 1999."
  },
  {
    q: "Quel réseau social a été fondé par Mark Zuckerberg en 2004 ?",
    a: "Facebook",
    w: ["Twitter", "MySpace", "LinkedIn"],
    c: "tech",
    f: "Facebook a été créé dans le dortoir de Zuckerberg à Harvard, réservé aux seuls étudiants avant de s'ouvrir au grand public en 2006."
  },
  {
    q: "Dans Minecraft, quel matériau est le plus résistant pour fabriquer des outils ?",
    a: "Le diamant",
    w: ["Le fer", "L'or", "La pierre"],
    c: "tech",
    f: "L'or est le matériau le moins durable pour les outils dans Minecraft, même s'il est rare. Les outils en or ont cependant la vitesse de minage la plus élevée."
  },

  // ── CINÉMA & TV ──────────────────────────────────────────────

  {
    q: "Dans quel film dit-on la réplique : 'La vie, c'est comme une boîte de chocolats' ?",
    a: "Forrest Gump",
    w: ["Rain Man", "La ligne verte", "Cast Away"],
    c: "cinema",
    f: "Dans le film, Forrest dit exactement : 'Mama always said life was like a box of chocolates.' Le son de la version originale a parfois été mal retranscrit."
  },
  {
    q: "Quel film de James Cameron est devenu le plus gros succès mondial au box-office en 1997 ?",
    a: "Titanic",
    w: ["Braveheart", "The Matrix", "Gladiator"],
    c: "cinema",
    f: "Titanic a coûté environ 200 millions de dollars à produire, soit plus que la construction du vrai Titanic, ajustée à l'inflation."
  },
  {
    q: "Dans quel film entend-on la réplique : 'Je te fais une offre que tu ne peux pas refuser' ?",
    a: "Le Parrain",
    w: ["Scarface", "Les Affranchis", "Casino"],
    c: "cinema",
    f: "Marlon Brando a fourré du coton dans ses joues pour obtenir la voix graveleuse du Don Corleone, une technique improvisée lors du casting."
  },
  {
    q: "Quel acteur joue le rôle de Jack Sparrow dans la saga Pirates des Caraïbes ?",
    a: "Johnny Depp",
    w: ["Orlando Bloom", "Geoffrey Rush", "Jude Law"],
    c: "cinema",
    f: "Johnny Depp s'est inspiré du musicien Keith Richards des Rolling Stones pour créer le personnage de Jack Sparrow."
  },
  {
    q: "Quel studio d'animation a produit le film 'Le Roi Lion' en 1994 ?",
    a: "Disney",
    w: ["Pixar", "DreamWorks", "Warner Bros"],
    c: "cinema",
    f: "Le Roi Lion s'inspire librement de la pièce Hamlet de Shakespeare — un prince, un oncle traître et un père assassiné."
  },
  {
    q: "Dans quel film d'animation Pixar un robot tombe-t-il amoureux sur une Terre abandonnée ?",
    a: "WALL-E",
    w: ["Ratatouille", "Là-haut", "Monstres & Cie"],
    c: "cinema",
    f: "WALL-E ne prononce presque aucun dialogue pendant la première demi-heure du film, un pari osé pour un film d'animation grand public."
  },
  {
    q: "Quelle actrice française a remporté l'Oscar de la meilleure actrice pour le film 'La Môme' ?",
    a: "Marion Cotillard",
    w: ["Audrey Tautou", "Isabelle Huppert", "Juliette Binoche"],
    c: "cinema",
    f: "Marion Cotillard est la première actrice à avoir remporté un Oscar pour un rôle en langue française depuis 1961."
  },
  {
    q: "Dans quel film Christopher Nolan met-il en scène des espions qui s'infiltrent dans les rêves ?",
    a: "Inception",
    w: ["Interstellar", "The Dark Knight", "Tenet"],
    c: "cinema",
    f: "Christopher Nolan a mis plus de dix ans à écrire le scénario d'Inception avant que le film soit finalement produit en 2010."
  },
  {
    q: "Dans quelle saga de science-fiction dit-on 'Que la Force soit avec toi' ?",
    a: "Star Wars",
    w: ["Star Trek", "Dune", "Avatar"],
    c: "cinema",
    f: "La franchise Star Wars a généré plus de 70 milliards de dollars toutes sources confondues, l'une des plus lucratives de l'histoire."
  },
  {
    q: "Dans la saga Harry Potter, quel acteur incarne Dumbledore à partir du 3e film ?",
    a: "Michael Gambon",
    w: ["Richard Harris", "Ian McKellen", "Anthony Hopkins"],
    c: "cinema",
    f: "Richard Harris, qui jouait Dumbledore dans les deux premiers films, est décédé en 2002, forçant le casting d'un remplaçant."
  },

  // ── MUSIQUE ──────────────────────────────────────────────────

  {
    q: "Quel groupe a chanté 'Bohemian Rhapsody' ?",
    a: "Queen",
    w: ["The Beatles", "Led Zeppelin", "The Rolling Stones"],
    c: "musique",
    f: "Sorti en 1975, ce titre dure 5h55 et les maisons de disques pensaient qu'il était trop long pour la radio. Il est devenu l'un des plus grands succès de l'histoire."
  },
  {
    q: "Quel groupe britannique est surnommé 'Les Fab Four' ?",
    a: "Les Beatles",
    w: ["Les Rolling Stones", "The Who", "Led Zeppelin"],
    c: "musique",
    f: "Les Beatles ont vendu plus de 600 millions d'albums dans le monde, un record qui n'a jamais été battu par aucun autre groupe."
  },
  {
    q: "Quel chanteur français est connu pour la chanson 'La Bohème' ?",
    a: "Charles Aznavour",
    w: ["Jacques Brel", "Georges Brassens", "Serge Gainsbourg"],
    c: "musique",
    f: "Charles Aznavour a continué à se produire sur scène jusqu'à l'âge de 94 ans, peu de temps avant son décès en 2018."
  },
  {
    q: "Quel artiste a sorti l'album 'Thriller' en 1982, le plus vendu de l'histoire ?",
    a: "Michael Jackson",
    w: ["Prince", "Stevie Wonder", "James Brown"],
    c: "musique",
    f: "L'album Thriller s'est vendu à plus de 70 millions d'exemplaires dans le monde."
  },
  {
    q: "Quelle chanteuse est connue sous le surnom de 'Queen of Pop' ?",
    a: "Madonna",
    w: ["Britney Spears", "Whitney Houston", "Mariah Carey"],
    c: "musique",
    f: "Madonna a vendu plus de 300 millions de disques dans le monde, ce qui en fait l'artiste féminine la plus vendue de l'histoire."
  },
  {
    q: "Quel célèbre chanteur américain est surnommé 'The King of Rock and Roll' ?",
    a: "Elvis Presley",
    w: ["Chuck Berry", "Jerry Lee Lewis", "Little Richard"],
    c: "musique",
    f: "Elvis Presley a vendu plus de 500 millions de disques et reste l'un des artistes les plus influents du XXe siècle."
  },
  {
    q: "Quel est le vrai nom de la chanteuse Lady Gaga ?",
    a: "Stefani Joanne Angelina Germanotta",
    w: ["Stephanie Ann Johnson", "Sarah Gaga Lorenza", "Gabriella Anne Gonçalves"],
    c: "musique",
    f: "Le nom 'Lady Gaga' est inspiré de la chanson 'Radio Ga Ga' du groupe Queen, créant un lien amusant avec Freddie Mercury."
  },
  {
    q: "Quel groupe suédois a cartonné dans les années 70 avec 'Dancing Queen' ?",
    a: "ABBA",
    w: ["Roxette", "Europe", "Ace of Base"],
    c: "musique",
    f: "ABBA a refusé une offre d'un milliard de dollars pour une tournée de réunion dans les années 1990, préférant garder intact le souvenir de leur époque."
  },
  {
    q: "Dans quelle ville se déroule le célèbre festival de musique de Glastonbury ?",
    a: "Angleterre (Somerset)",
    w: ["Écosse (Édimbourg)", "Pays de Galles (Cardiff)", "Irlande (Dublin)"],
    c: "musique",
    f: "Glastonbury peut accueillir jusqu'à 210 000 festivaliers et nécessite la construction d'une véritable ville temporaire chaque année."
  },
  {
    q: "Quel instrument de musique Jimi Hendrix jouait-il de façon légendaire ?",
    a: "La guitare électrique",
    w: ["La basse", "La batterie", "Le piano"],
    c: "musique",
    f: "Jimi Hendrix était gaucher mais jouait sur une guitare droite retournée et remontée, ce qui contribuait à son son unique."
  },

  // ── SPORT ────────────────────────────────────────────────────

  {
    q: "Quel pays a remporté la première Coupe du Monde de football en 1930 ?",
    a: "Uruguay",
    w: ["Brésil", "Argentine", "Italie"],
    c: "sport",
    f: "La finale se jouait à Montevideo. L'Uruguay a battu l'Argentine 4-2 devant 93 000 spectateurs."
  },
  {
    q: "Quel pays a remporté le plus de Coupes du Monde de football ?",
    a: "Brésil",
    w: ["Allemagne", "Italie", "Argentine"],
    c: "sport",
    f: "Le Brésil est le seul pays à avoir participé à toutes les phases finales de la Coupe du Monde depuis sa création."
  },
  {
    q: "Combien de joueurs compose une équipe de basketball sur le terrain ?",
    a: "5",
    w: ["6", "7", "4"],
    c: "sport",
    f: "Le basketball a été inventé en 1891 par James Naismith, qui utilisait des paniers de pêches en osier comme cibles."
  },
  {
    q: "Dans quel sport utilise-t-on un volant ?",
    a: "Badminton",
    w: ["Tennis de table", "Squash", "Padel"],
    c: "sport",
    f: "Un volant de badminton peut atteindre 493 km/h, ce qui en fait le projectile le plus rapide de tous les sports de raquette."
  },
  {
    q: "Combien de sets faut-il gagner pour remporter un match de tennis en Grand Chelem masculin ?",
    a: "3",
    w: ["2", "4", "5"],
    c: "sport",
    f: "Le match le plus long de Wimbledon a duré 11 heures et 5 minutes, étalé sur trois jours, entre Isner et Mahut en 2010."
  },
  {
    q: "Combien de points vaut un essai au rugby à XV ?",
    a: "5",
    w: ["3", "4", "6"],
    c: "sport",
    f: "La valeur de l'essai au rugby a changé plusieurs fois : elle était de 1 point en 1871, puis est passée à 5 points en 1992."
  },
  {
    q: "Quel nageur a remporté le plus de médailles d'or olympiques de l'histoire ?",
    a: "Michael Phelps",
    w: ["Ian Thorpe", "Mark Spitz", "Ryan Lochte"],
    c: "sport",
    f: "Michael Phelps détient 23 médailles d'or olympiques, soit plus que la plupart des pays dans toute leur histoire aux Jeux Olympiques."
  },
  {
    q: "Combien de joueurs composent une équipe de volleyball sur le terrain ?",
    a: "6",
    w: ["5", "7", "8"],
    c: "sport",
    f: "Le volleyball a été inventé en 1895 par William Morgan, qui voulait créer un sport moins intense que le basketball."
  },
  {
    q: "Quelle discipline n'est pas un sport olympique d'été ?",
    a: "Ski alpin",
    w: ["Tir à l'arc", "Haltérophilie", "Escrime"],
    c: "sport",
    f: "Le ski alpin est un sport des Jeux Olympiques d'hiver depuis les Jeux de Garmisch-Partenkirchen en 1936."
  },
  {
    q: "Dans quel sport frappe-t-on une balle avec un club sur un parcours en plein air ?",
    a: "Golf",
    w: ["Hockey sur gazon", "Baseball", "Croquet"],
    c: "sport",
    f: "Le golf est l'un des deux seuls sports pratiqués sur la Lune : Alan Shepard a frappé deux balles de golf lors de la mission Apollo 14 en 1971."
  },

  // ── ANIMAUX ──────────────────────────────────────────────────

  {
    q: "Quel animal est le plus rapide sur terre ?",
    a: "Le guépard",
    w: ["Le lion", "Le lièvre", "Le faucon pèlerin"],
    c: "animaux",
    f: "Le guépard peut atteindre 110 km/h, mais seulement sur de courtes distances. Après une course, il doit se reposer 20 minutes pour récupérer !"
  },
  {
    q: "Quel est le plus grand animal terrestre du monde ?",
    a: "Éléphant d'Afrique",
    w: ["Hippopotame", "Girafe", "Rhinocéros blanc"],
    c: "animaux",
    f: "Un éléphant d'Afrique peut peser jusqu'à 7 tonnes et vivre plus de 70 ans. Il est le seul mammifère incapable de sauter."
  },
  {
    q: "Quel oiseau ne peut pas voler mais est le plus grand du monde ?",
    a: "Autruche",
    w: ["Pingouin", "Émeu", "Kiwi"],
    c: "animaux",
    f: "L'autruche peut courir à 70 km/h. Ses œufs sont les plus grands du règne animal."
  },
  {
    q: "Combien de pattes possède une araignée ?",
    a: "8",
    w: ["6", "10", "12"],
    c: "animaux",
    f: "Les araignées ne sont pas des insectes mais des arachnides. Leur soie est cinq fois plus résistante que l'acier à poids égal."
  },
  {
    q: "Quel mammifère marin est le plus grand animal ayant jamais existé ?",
    a: "Baleine bleue",
    w: ["Cachalot", "Requin baleine", "Orque"],
    c: "animaux",
    f: "La baleine bleue peut peser jusqu'à 180 tonnes et son cœur est si gros qu'un humain pourrait ramper dans son aorte."
  },
  {
    q: "Quel animal peut dormir debout grâce à un mécanisme de verrouillage de ses pattes ?",
    a: "Cheval",
    w: ["Vache", "Éléphant", "Girafe"],
    c: "animaux",
    f: "Les chevaux peuvent dormir debout mais ils ont besoin de s'allonger pour atteindre le sommeil paradoxal."
  },
  {
    q: "Quel est l'animal le plus venimeux du monde ?",
    a: "Méduse de boîte",
    w: ["Mamba noir", "Araignée veuve noire", "Poisson-globe"],
    c: "animaux",
    f: "La méduse de boîte peut tuer un humain en moins de 3 minutes. Ses tentacules contiennent des millions de cellules urticantes."
  },
  {
    q: "Quel animal possède les empreintes digitales les plus similaires à celles de l'humain ?",
    a: "Koala",
    w: ["Chimpanzé", "Gorille", "Raton laveur"],
    c: "animaux",
    f: "Les empreintes de koala sont si proches des empreintes humaines qu'elles ont parfois trompé des enquêteurs légistes."
  },
  {
    q: "Quel est l'animal terrestre le plus rapide après le guépard ?",
    a: "Pronghorn d'Amérique",
    w: ["Lion", "Tigre", "Lièvre"],
    c: "animaux",
    f: "Le pronghorn peut courir à 88 km/h et, contrairement au guépard, il peut maintenir cette vitesse sur de longues distances."
  },
  {
    q: "Combien de cœurs possède une pieuvre ?",
    a: "3",
    w: ["1", "2", "4"],
    c: "animaux",
    f: "Une pieuvre a trois cœurs : deux pompent le sang vers les branchies et un vers le reste du corps. Son sang est bleu car il contient du cuivre."
  },

  // ── CUISINE ──────────────────────────────────────────────────

  {
    q: "Quel est l'ingrédient principal du guacamole ?",
    a: "L'avocat",
    w: ["Le concombre", "La courgette", "Le poivron"],
    c: "cuisine",
    f: "Le mot 'guacamole' vient du nahuatl (langue aztèque) et signifie littéralement 'sauce à l'avocat'."
  },
  {
    q: "Quelle est la principale épice qui donne sa couleur au curry indien ?",
    a: "Curcuma",
    w: ["Paprika", "Cumin", "Cannelle"],
    c: "cuisine",
    f: "Le curcuma est utilisé en médecine ayurvédique depuis plus de 4000 ans."
  },
  {
    q: "De quel pays est originaire la pizza Margherita ?",
    a: "Italie",
    w: ["Grèce", "Espagne", "France"],
    c: "cuisine",
    f: "La pizza Margherita a été créée en 1889 à Naples en l'honneur de la reine Margherita, avec les couleurs du drapeau italien."
  },
  {
    q: "Quel est l'ingrédient de base du houmous ?",
    a: "Pois chiches",
    w: ["Lentilles", "Haricots blancs", "Fèves"],
    c: "cuisine",
    f: "Le houmous est consommé depuis l'Antiquité au Moyen-Orient et son nom signifie simplement 'pois chiches' en arabe."
  },
  {
    q: "Quelle herbe aromatique est indispensable dans le pesto génois ?",
    a: "Basilic",
    w: ["Persil", "Menthe", "Coriandre"],
    c: "cuisine",
    f: "Le pesto traditionnel est préparé au mortier en pierre. Son nom vient du verbe italien 'pestare' qui signifie 'écraser'."
  },
  {
    q: "De quel animal provient le lait utilisé pour faire la mozzarella di bufala ?",
    a: "Buffle",
    w: ["Vache", "Chèvre", "Brebis"],
    c: "cuisine",
    f: "La vraie mozzarella di bufala est produite uniquement dans certaines régions d'Italie et bénéficie d'une appellation d'origine protégée depuis 1996."
  },
  {
    q: "Quel est le plat japonais servi avec des tranches de poisson cru ?",
    a: "Sashimi",
    w: ["Ramen", "Tempura", "Gyoza"],
    c: "cuisine",
    f: "Le sashimi est considéré comme un art culinaire au Japon et les chefs mettent des années à maîtriser la découpe précise du poisson."
  },
  {
    q: "Quelle est la base d'une sauce béchamel ?",
    a: "Beurre, farine et lait",
    w: ["Crème, œufs et fromage", "Huile, amidon et eau", "Beurre, crème et ail"],
    c: "cuisine",
    f: "La béchamel est l'une des cinq sauces mères de la cuisine française classique codifiées par Auguste Escoffier au XIXe siècle."
  },
  {
    q: "Quel légume est indispensable dans la ratatouille provençale ?",
    a: "Courgette",
    w: ["Poireau", "Chou-fleur", "Brocoli"],
    c: "cuisine",
    f: "La ratatouille est un plat paysan niçois qui permettait d'utiliser les surplus de légumes du jardin en fin d'été."
  },
  {
    q: "Comment appelle-t-on la technique de cuisson des aliments sous vide à basse température ?",
    a: "Sous vide",
    w: ["Blanching", "Confit", "Braisage"],
    c: "cuisine",
    f: "La cuisson sous vide a été développée dans les années 1970 par le chef Georges Pralus pour améliorer la texture du foie gras."
  },

  // ── INSOLITE ─────────────────────────────────────────────────

  {
    q: "Combien de temps un escargot peut-il dormir d'affilée en hibernation ?",
    a: "3 ans",
    w: ["6 mois", "1 an", "5 ans"],
    c: "insolite",
    f: "Un escargot du Muséum d'Histoire Naturelle de Londres, collé sur une étiquette en 1846, a été réhydraté et a survécu 4 ans de plus."
  },
  {
    q: "Quelle est la langue la plus parlée au monde ?",
    a: "Mandarin",
    w: ["Anglais", "Espagnol", "Hindi"],
    c: "insolite",
    f: "Le mandarin est parlé par plus d'un milliard de personnes, mais l'anglais est la langue la plus apprise comme langue étrangère."
  },
  {
    q: "Quel pays possède le plus grand nombre de lacs au monde ?",
    a: "Canada",
    w: ["Russie", "Finlande", "États-Unis"],
    c: "insolite",
    f: "Le Canada possède environ 60 % des lacs d'eau douce de la planète, soit plus de 2 millions de lacs sur son territoire."
  },
  {
    q: "Combien d'os possède un requin dans son corps ?",
    a: "Zéro",
    w: ["12", "47", "200"],
    c: "insolite",
    f: "Le squelette des requins est entièrement composé de cartilage, ce qui les rend plus légers et plus agiles dans l'eau."
  },
  {
    q: "Quelle est la plus petite planète du système solaire ?",
    a: "Mercure",
    w: ["Mars", "Vénus", "Pluton"],
    c: "insolite",
    f: "Mercure est si petite que les lunes Ganymède (Jupiter) et Titan (Saturne) sont toutes deux plus grandes qu'elle."
  },
  {
    q: "Quel pays a envoyé le premier homme dans l'espace ?",
    a: "Union soviétique",
    w: ["États-Unis", "Chine", "France"],
    c: "insolite",
    f: "Youri Gagarine a effectué son vol historique le 12 avril 1961 et a mis seulement 108 minutes pour faire le tour complet de la Terre."
  },
  {
    q: "Quel est le seul mammifère capable de voler ?",
    a: "La chauve-souris",
    w: ["L'écureuil volant", "Le galéopithèque", "Le sucre planeur"],
    c: "insolite",
    f: "Il existe plus de 1 400 espèces de chauves-souris dans le monde, ce qui représente environ 20 % de toutes les espèces de mammifères connues."
  },
  {
    q: "Quelle est la montagne la plus haute du monde ?",
    a: "L'Everest",
    w: ["Le K2", "Le Kangchenjunga", "Le Mont Blanc"],
    c: "insolite",
    f: "L'Everest grandit d'environ 4 mm chaque année en raison du mouvement des plaques tectoniques."
  },
  {
    q: "Quel pays possède le plus long littoral au monde ?",
    a: "Canada",
    w: ["Russie", "Australie", "Norvège"],
    c: "insolite",
    f: "Le littoral canadien mesure plus de 202 000 km, soit le tour de la Terre plus de cinq fois !"
  },
  {
    q: "Quel fruit flotte sur l'eau ?",
    a: "La pastèque",
    w: ["L'ananas", "La mangue", "La noix de coco"],
    c: "insolite",
    f: "La pastèque flotte car elle est composée à environ 92 % d'eau et sa densité globale est inférieure à celle de l'eau."
  },

  // ── HISTOIRE (lot 2) ─────────────────────────────────────────

  {
    q: "Quelle ville fut la capitale de l'Empire romain d'Orient pendant plus de 1000 ans ?",
    a: "Constantinople",
    w: ["Alexandrie", "Athènes", "Carthage"],
    c: "histoire",
    f: "Constantinople (aujourd'hui Istanbul) fut la capitale de l'Empire byzantin de 330 à 1453, soit plus de 1 100 ans de règne ininterrompu."
  },
  {
    q: "Quel roi de France fut surnommé 'le Roi-Soleil' ?",
    a: "Louis XIV",
    w: ["Louis XIII", "Louis XVI", "François Ier"],
    c: "histoire",
    f: "Louis XIV régna 72 ans, le règne le plus long de l'histoire de France. Il aurait choisi le soleil comme emblème car il se levait chaque matin pour toute la cour à Versailles."
  },
  {
    q: "En quelle année Gutenberg inventa-t-il l'imprimerie à caractères mobiles en Europe ?",
    a: "1450",
    w: ["1350", "1520", "1215"],
    c: "histoire",
    f: "Avant l'imprimerie, copier un seul livre pouvait prendre plusieurs mois. Gutenberg permit de produire des centaines d'exemplaires en quelques jours."
  },
  {
    q: "Qui fut le premier empereur à unifier la Chine ?",
    a: "Qin Shi Huang",
    w: ["Confucius", "Kublai Khan", "Sun Yat-sen"],
    c: "histoire",
    f: "Qin Shi Huang fit construire les premières sections de la Grande Muraille et fut enterré avec une armée de 8 000 soldats en terre cuite."
  },
  {
    q: "Quel événement marqua la fin de la Seconde Guerre mondiale en Europe ?",
    a: "La capitulation de l'Allemagne nazie",
    w: ["Le débarquement en Normandie", "La bataille de Stalingrad", "La libération de Paris"],
    c: "histoire",
    f: "La capitulation fut signée le 8 mai 1945, jour célébré comme le 'Jour de la Victoire en Europe' (V-E Day) dans les pays anglophones."
  },
  {
    q: "Quelle civilisation a construit le Colisée de Rome ?",
    a: "Les Romains",
    w: ["Les Grecs", "Les Étrusques", "Les Carthaginois"],
    c: "histoire",
    f: "Le Colisée pouvait accueillir entre 50 000 et 80 000 spectateurs et était équipé d'un auvent appelé 'velarium' pour protéger le public du soleil."
  },
  {
    q: "Quel explorateur portugais fut le premier à tenter de circumnaviguer le globe ?",
    a: "Fernand de Magellan",
    w: ["Vasco de Gama", "Bartolomeu Dias", "Pedro Álvares Cabral"],
    c: "histoire",
    f: "Magellan mourut aux Philippines en 1521 sans terminer le tour du monde. C'est son lieutenant Juan Sebastián Elcano qui ramena le dernier navire en Espagne."
  },
  {
    q: "Quelle est la période historique qui suit le Moyen Âge en Europe ?",
    a: "La Renaissance",
    w: ["L'Antiquité", "Le Baroque", "Les Lumières"],
    c: "histoire",
    f: "La Renaissance, née en Italie au XVe siècle, signifie 'renaissance des arts et de la culture antique'. Florence, grâce aux Médicis, en fut le berceau principal."
  },
  {
    q: "Quel pharaon, mort très jeune, a eu sa tombe découverte intacte en 1922 ?",
    a: "Toutânkhamon",
    w: ["Ramsès II", "Akhenaton", "Thoutmosis III"],
    c: "histoire",
    f: "Toutânkhamon monta sur le trône à 9 ans et mourut vers 19 ans. Sa tombe contenait plus de 5 000 objets, dont le célèbre masque en or."
  },
  {
    q: "Dans quel pays eut lieu la révolution bolchevique de 1917 ?",
    a: "La Russie",
    w: ["L'Allemagne", "La Pologne", "L'Autriche-Hongrie"],
    c: "histoire",
    f: "La révolution d'Octobre 1917 fut en réalité déclenchée en novembre selon le calendrier grégorien — la Russie utilisait encore le calendrier julien, qui avait 13 jours de retard."
  },

  // ── GÉOGRAPHIE (lot 2) ───────────────────────────────────────

  {
    q: "Quel est le plus grand pays du monde par sa superficie ?",
    a: "La Russie",
    w: ["Le Canada", "La Chine", "Les États-Unis"],
    c: "geo",
    f: "La Russie s'étend sur 11 fuseaux horaires. Quand il est midi à Moscou, il est déjà minuit dans l'extrême est du pays."
  },
  {
    q: "Quelle est la capitale du Japon ?",
    a: "Tokyo",
    w: ["Osaka", "Kyoto", "Hiroshima"],
    c: "geo",
    f: "Tokyo est l'une des villes les plus peuplées du monde avec plus de 37 millions d'habitants dans son aire urbaine. Elle s'appelait 'Edo' jusqu'en 1868."
  },
  {
    q: "Sur quel continent se trouve le Brésil ?",
    a: "Amérique du Sud",
    w: ["Amérique centrale", "Afrique", "Amérique du Nord"],
    c: "geo",
    f: "Le Brésil occupe presque la moitié de l'Amérique du Sud et partage ses frontières avec presque tous les pays du continent, sauf le Chili et l'Équateur."
  },
  {
    q: "Quelle est la plus haute chaîne de montagnes d'Europe ?",
    a: "Les Alpes",
    w: ["Les Pyrénées", "Les Carpates", "Les Apennins"],
    c: "geo",
    f: "Le Mont Blanc, point culminant des Alpes à 4 808 m, est situé à la frontière franco-italienne. Il fut gravi pour la première fois en 1786."
  },
  {
    q: "Quel est le plus petit pays du monde ?",
    a: "Le Vatican",
    w: ["Monaco", "Saint-Marin", "Liechtenstein"],
    c: "geo",
    f: "Le Vatican ne fait que 0,44 km². C'est pourtant un État indépendant avec ses propres passeports, sa monnaie et son armée (la Garde suisse)."
  },
  {
    q: "Par combien de pays la France métropolitaine est-elle entourée ?",
    a: "8",
    w: ["6", "7", "5"],
    c: "geo",
    f: "La France partage ses frontières avec la Belgique, le Luxembourg, l'Allemagne, la Suisse, l'Italie, Monaco, l'Andorre et l'Espagne."
  },
  {
    q: "Quel détroit sépare l'Europe de l'Afrique ?",
    a: "Le détroit de Gibraltar",
    w: ["Le détroit de Bosphore", "Le détroit de Malacca", "Le détroit de Messine"],
    c: "geo",
    f: "Le détroit de Gibraltar ne mesure que 14 km à son point le plus étroit. Par temps clair, on peut voir les côtes marocaines depuis l'Espagne à l'œil nu."
  },
  {
    q: "Quelle est la capitale du Canada ?",
    a: "Ottawa",
    w: ["Toronto", "Montréal", "Vancouver"],
    c: "geo",
    f: "Ottawa fut choisie en 1857 par la reine Victoria, en partie pour sa position géographique entre Toronto et Montréal. Beaucoup pensent que c'est Toronto."
  },
  {
    q: "Dans quels pays se trouve le lac Titicaca, le plus haut lac navigable du monde ?",
    a: "Pérou et Bolivie",
    w: ["Chili et Argentine", "Colombie et Venezuela", "Équateur et Pérou"],
    c: "geo",
    f: "Le lac Titicaca est à 3 812 m d'altitude. Les Uros construisent leurs îles flottantes entièrement en roseaux appelés 'totora'."
  },
  {
    q: "Quel fleuve traverse la ville de Paris ?",
    a: "La Seine",
    w: ["La Loire", "Le Rhône", "La Garonne"],
    c: "geo",
    f: "La Seine mesure 775 km. Ses berges à Paris sont classées au patrimoine mondial de l'UNESCO depuis 1991."
  },

  // ── SCIENCE (lot 2) ──────────────────────────────────────────

  {
    q: "Quelle planète est connue pour ses magnifiques anneaux visibles depuis la Terre ?",
    a: "Saturne",
    w: ["Uranus", "Neptune", "Jupiter"],
    c: "science",
    f: "Les anneaux de Saturne sont principalement composés de glace et de roches. Ils sont si larges qu'ils pourraient couvrir la distance entre la Terre et la Lune."
  },
  {
    q: "Quel organe du corps humain produit la bile pour aider à la digestion ?",
    a: "Le foie",
    w: ["L'estomac", "Les reins", "La rate"],
    c: "science",
    f: "Le foie est le plus grand organe interne du corps. Il peut se régénérer : même s'il perd 75 % de sa masse, il repousse jusqu'à sa taille d'origine."
  },
  {
    q: "Quel est le plus petit os du corps humain ?",
    a: "L'étrier (dans l'oreille)",
    w: ["Le péroné", "Le coccyx", "La phalange du petit orteil"],
    c: "science",
    f: "L'étrier mesure seulement 3 mm et se trouve dans l'oreille moyenne. Il est essentiel pour transmettre les vibrations sonores vers l'oreille interne."
  },
  {
    q: "Combien de temps met la lumière du Soleil pour atteindre la Terre ?",
    a: "Environ 8 minutes",
    w: ["Environ 1 seconde", "Environ 1 heure", "Environ 24 heures"],
    c: "science",
    f: "Si le Soleil disparaissait soudainement, on ne le saurait que 8 minutes plus tard. Ce qu'on voit du Soleil est toujours 'vieux' de 8 minutes."
  },
  {
    q: "Quel scientifique a découvert la pénicilline, le premier antibiotique ?",
    a: "Alexander Fleming",
    w: ["Louis Pasteur", "Marie Curie", "Charles Darwin"],
    c: "science",
    f: "Fleming a découvert la pénicilline par accident en 1928 en remarquant qu'une moisissure avait tué les bactéries autour d'elle dans une boîte de Petri."
  },
  {
    q: "Quel gaz est produit par les plantes lors de la photosynthèse ?",
    a: "L'oxygène",
    w: ["Le dioxyde de carbone", "L'hydrogène", "L'azote"],
    c: "science",
    f: "Une forêt d'un hectare peut produire suffisamment d'oxygène pour faire respirer 45 personnes pendant un an."
  },
  {
    q: "Quelle planète tourne sur elle-même 'sur le côté', avec une inclinaison d'environ 98° ?",
    a: "Uranus",
    w: ["Neptune", "Vénus", "Saturne"],
    c: "science",
    f: "Une théorie suggère qu'Uranus a été percutée par un objet de la taille de la Terre il y a des milliards d'années, ce qui lui a donné cette inclinaison unique."
  },
  {
    q: "Quelle couche de l'atmosphère absorbe les rayons ultraviolets du Soleil ?",
    a: "La couche d'ozone",
    w: ["La troposphère", "La mésosphère", "La ionosphère"],
    c: "science",
    f: "La couche d'ozone se situe entre 15 et 35 km d'altitude. Grâce aux accords de Montréal de 1987, elle se reconstitue lentement après avoir été endommagée par les CFC."
  },
  {
    q: "Combien de temps met la Lune pour faire le tour de la Terre ?",
    a: "Environ 27 jours",
    w: ["Environ 7 jours", "Environ 365 jours", "Environ 60 jours"],
    c: "science",
    f: "La Lune met exactement autant de temps à tourner sur elle-même qu'à faire le tour de la Terre, c'est pourquoi on voit toujours la même face depuis notre planète."
  },
  {
    q: "Quel est le métal le plus léger du monde ?",
    a: "Le lithium",
    w: ["L'aluminium", "Le magnésium", "Le titane"],
    c: "science",
    f: "Le lithium est si léger qu'il flotte sur l'eau ! C'est aussi le métal utilisé dans les batteries de nos smartphones et voitures électriques."
  },

  // ── TECH & JEUX VIDÉO (lot 2) ────────────────────────────────

  {
    q: "Quel langage de programmation est connu pour son logo représentant un serpent ?",
    a: "Python",
    w: ["Ruby", "Perl", "Swift"],
    c: "tech",
    f: "Python a été nommé d'après le groupe comique 'Monty Python', pas d'après le serpent ! Son créateur Guido van Rossum voulait un nom court et mystérieux."
  },
  {
    q: "Dans quel jeu vidéo le personnage 'Lara Croft' est-il la protagoniste principale ?",
    a: "Tomb Raider",
    w: ["Uncharted", "Prince of Persia", "Assassin's Creed"],
    c: "tech",
    f: "Lara Croft est apparue pour la première fois en 1996 et est devenue l'une des icônes les plus reconnaissables du jeu vidéo."
  },
  {
    q: "Quelle entreprise a créé la console PlayStation ?",
    a: "Sony",
    w: ["Nintendo", "Sega", "Microsoft"],
    c: "tech",
    f: "La PlayStation est née d'un partenariat avorté entre Sony et Nintendo. Quand Nintendo a abandonné le projet, Sony l'a transformé en console indépendante."
  },
  {
    q: "Dans le jeu Pokémon, quel est le premier Pokémon dans le Pokédex national ?",
    a: "Bulbizarre",
    w: ["Salamèche", "Carapuce", "Pikachu"],
    c: "tech",
    f: "Ce que nous appelons graines sur la fraise sont en réalité des akènes, les vrais fruits botaniques. La partie charnue est techniquement un faux-fruit."
  },
  {
    q: "Que signifie l'acronyme 'URL' en informatique ?",
    a: "Uniform Resource Locator",
    w: ["Universal Router Link", "User Request Language", "Unified Resource Library"],
    c: "tech",
    f: "La première URL de l'histoire était celle du tout premier site web, créé par Tim Berners-Lee en 1991 au CERN : info.cern.ch. Ce site est toujours accessible aujourd'hui."
  },
  {
    q: "Quel jeu de stratégie MOBA met en scène des 'champions' dans des batailles 5 contre 5 ?",
    a: "League of Legends",
    w: ["Dota 2", "Heroes of the Storm", "Smite"],
    c: "tech",
    f: "League of Legends est l'un des jeux les plus joués au monde. Son championnat du monde remplit des stades entiers, rivalisant avec les sports traditionnels."
  },
  {
    q: "Quel composant est principalement responsable du rendu des graphismes dans les jeux vidéo ?",
    a: "La carte graphique (GPU)",
    w: ["Le processeur (CPU)", "La RAM", "Le disque dur (SSD)"],
    c: "tech",
    f: "Les GPU modernes, conçus pour les jeux vidéo, sont devenus les outils privilégiés pour entraîner les intelligences artificielles."
  },
  {
    q: "Qu'est-ce que le 'phishing' en informatique ?",
    a: "Une tentative d'escroquerie pour voler des données personnelles",
    w: ["Un virus qui ralentit l'ordinateur", "Un type de compression de fichiers", "Un protocole de transfert de données"],
    c: "tech",
    f: "Le terme 'phishing' est un jeu de mots sur 'fishing' (pêche) — les pirates 'pêchent' les victimes avec un appât. Le 'ph' vient de la culture hacker des années 1990."
  },
  {
    q: "Quel est le nom du moteur de recherche le plus utilisé au monde ?",
    a: "Google",
    w: ["Bing", "Yahoo", "DuckDuckGo"],
    c: "tech",
    f: "Le mot 'Google' vient de 'googol', le nombre 1 suivi de 100 zéros. Les fondateurs voulaient symboliser la quantité astronomique d'informations à indexer."
  },
  {
    q: "Dans quelle série Netflix des adolescents affrontent-ils des créatures surnaturelles dans les années 80 ?",
    a: "Stranger Things",
    w: ["Dark", "The OA", "Locke & Key"],
    c: "tech",
    f: "Les frères Duffer ont essuyé plus de 15 refus d'autres chaînes avant que Netflix accepte de produire Stranger Things."
  },

  // ── CINÉMA & TV (lot 2) ──────────────────────────────────────

  {
    q: "Dans quel film de Spielberg un parc à thème rempli de dinosaures tourne-t-il au cauchemar ?",
    a: "Jurassic Park",
    w: ["King Kong", "Predator", "The Lost World"],
    c: "cinema",
    f: "Les rugissements du T-Rex dans Jurassic Park ont été créés en mixant des sons d'éléphants, d'alligators et de tigres."
  },
  {
    q: "Quel acteur joue le rôle du super-héros Iron Man dans les films Marvel ?",
    a: "Robert Downey Jr.",
    w: ["Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
    c: "cinema",
    f: "Robert Downey Jr. improvise souvent ses répliques. La fameuse phrase 'I am Iron Man' du premier film n'était pas dans le scénario original."
  },
  {
    q: "Dans 'Le Silence des agneaux', quel est le nom du célèbre tueur cannibale ?",
    a: "Hannibal Lecter",
    w: ["Norman Bates", "Patrick Bateman", "John Doe"],
    c: "cinema",
    f: "Anthony Hopkins n'apparaît à l'écran que 16 minutes dans le film, mais a quand même remporté l'Oscar du meilleur acteur."
  },
  {
    q: "Dans quelle série télévisée suit-on la famille Soprano, une famille de la mafia américaine ?",
    a: "Les Soprano",
    w: ["Boardwalk Empire", "Gomorra", "Narcos"],
    c: "cinema",
    f: "Les Soprano est souvent citée comme la meilleure série télévisée de tous les temps et a révolutionné la télévision américaine."
  },
  {
    q: "Quel acteur incarne le personnage de Joker dans le film de 2019 récompensé à Venise ?",
    a: "Joaquin Phoenix",
    w: ["Heath Ledger", "Jared Leto", "Jack Nicholson"],
    c: "cinema",
    f: "Pour préparer son rôle, Joaquin Phoenix a perdu plus de 23 kg et a étudié des vidéos de personnes atteintes de troubles du rire pathologique."
  },
  {
    q: "Quel film d'animation met en scène un rat qui rêve de devenir grand chef cuisinier à Paris ?",
    a: "Ratatouille",
    w: ["Luca", "Soul", "En avant"],
    c: "cinema",
    f: "Ratatouille a nécessité 4 ans de production. Les animateurs ont pris des cours de cuisine et visité de grands restaurants parisiens pour rendre le film authentique."
  },
  {
    q: "Quel film de Tim Burton met en scène un coiffeur vengeur dans l'Angleterre victorienne ?",
    a: "Sweeney Todd",
    w: ["Edward aux mains d'argent", "Sleepy Hollow", "Dark Shadows"],
    c: "cinema",
    f: "Johnny Depp a appris à chanter spécialement pour ce film et a interprété toutes ses chansons en direct sur le plateau."
  },
  {
    q: "Dans la saga Fast & Furious, quel personnage est joué par Vin Diesel ?",
    a: "Dominic Toretto",
    w: ["Brian O'Conner", "Luke Hobbs", "Roman Pearce"],
    c: "cinema",
    f: "Vin Diesel a produit lui-même les derniers films de la saga pour avoir plus de contrôle sur son personnage, qu'il considère comme son alter ego."
  },
  {
    q: "Quel film français 'Intouchables' a réalisé plus de 19 millions d'entrées en France ?",
    a: "Éric Toledano et Olivier Nakache",
    w: ["Luc Besson", "François Ozon", "Michel Gondry"],
    c: "cinema",
    f: "Intouchables est devenu le deuxième film français le plus vu de l'histoire. Il a été adapté au cinéma dans plusieurs pays dont les États-Unis."
  },
  {
    q: "Dans quel film de Christopher Nolan des voleurs pénètrent-ils dans les rêves de leurs cibles ?",
    a: "Inception",
    w: ["Interstellar", "Memento", "The Prestige"],
    c: "cinema",
    f: "Christopher Nolan a mis plus de dix ans à écrire le scénario d'Inception. Le film a rapporté plus de 836 millions de dollars dans le monde."
  },

  // ── MUSIQUE (lot 2) ──────────────────────────────────────────

  {
    q: "Quel groupe de rock britannique est connu pour l'album 'Dark Side of the Moon' sorti en 1973 ?",
    a: "Pink Floyd",
    w: ["Led Zeppelin", "The Rolling Stones", "The Who"],
    c: "musique",
    f: "Dark Side of the Moon est resté dans le classement Billboard Top 200 pendant plus de 900 semaines, soit environ 17 ans."
  },
  {
    q: "Quelle chanteuse française a popularisé 'La Vie en rose' dans le monde entier ?",
    a: "Édith Piaf",
    w: ["Dalida", "Barbara", "Juliette Gréco"],
    c: "musique",
    f: "Édith Piaf mesurait seulement 1,47 m, ce qui lui a valu le surnom de 'La Môme Piaf', piaf signifiant moineau en argot parisien."
  },
  {
    q: "Quel chanteur américain est surnommé 'The Boss' et connu pour 'Born in the USA' ?",
    a: "Bruce Springsteen",
    w: ["Bob Dylan", "Tom Petty", "Billy Joel"],
    c: "musique",
    f: "Malgré son titre patriotique, 'Born in the USA' est en réalité une critique sombre du traitement réservé aux vétérans du Vietnam."
  },
  {
    q: "Quel groupe de pop coréen a battu des records mondiaux de streaming avec 'Dynamite' en 2020 ?",
    a: "BTS",
    w: ["EXO", "BLACKPINK", "Stray Kids"],
    c: "musique",
    f: "Dynamite de BTS a atteint 101 millions de vues sur YouTube en seulement 24 heures, établissant un nouveau record mondial."
  },
  {
    q: "Quel pianiste polonais du XIXe siècle est célèbre pour ses nocturnes et ses valses ?",
    a: "Frédéric Chopin",
    w: ["Franz Liszt", "Claude Debussy", "Robert Schumann"],
    c: "musique",
    f: "Chopin n'a donné qu'une trentaine de concerts publics dans sa vie, préférant les salons intimistes aux grandes salles de concert."
  },
  {
    q: "Quel artiste belge se cache derrière le pseudonyme 'Stromae' ?",
    a: "Paul Van Haver",
    w: ["Louis Bertignac", "Renaud Capuçon", "Pierre Sarkozy"],
    c: "musique",
    f: "Le pseudonyme 'Stromae' est l'anagramme du mot 'maestro', reflétant l'ambition musicale de l'artiste dès ses débuts."
  },
  {
    q: "Quel groupe irlandais emmené par Bono est l'un des groupes de rock les plus vendus de l'histoire ?",
    a: "U2",
    w: ["The Cranberries", "Coldplay", "Snow Patrol"],
    c: "musique",
    f: "En 2014, U2 a offert son album 'Songs of Innocence' à 500 millions d'utilisateurs iTunes, la sortie d'album la plus large de l'histoire."
  },
  {
    q: "Quelle chanteuse britannique est connue pour les tubes 'Rolling in the Deep' et 'Hello' ?",
    a: "Adele",
    w: ["Amy Winehouse", "Duffy", "Paloma Faith"],
    c: "musique",
    f: "L'album '21' d'Adele a été certifié disque de diamant aux États-Unis avec plus de 10 millions d'exemplaires vendus dans ce seul pays."
  },
  {
    q: "Quel rappeur américain de Compton est considéré comme l'un des pères du gangsta rap ?",
    a: "Dr. Dre",
    w: ["Snoop Dogg", "Ice Cube", "Tupac Shakur"],
    c: "musique",
    f: "Dr. Dre a fondé le label Aftermath Entertainment, lançant les carrières d'Eminem et de 50 Cent."
  },
  {
    q: "Dans quelle ville américaine le jazz est-il né à la fin du XIXe siècle ?",
    a: "La Nouvelle-Orléans",
    w: ["Chicago", "New York", "Memphis"],
    c: "musique",
    f: "Le jazz est né dans le quartier du Storyville à La Nouvelle-Orléans, mêlant blues, ragtime et musiques africaines."
  },

  // ── SPORT (lot 2) ────────────────────────────────────────────

  {
    q: "Combien de points vaut un panier à trois points au basketball ?",
    a: "3 points",
    w: ["2 points", "4 points", "1 point"],
    c: "sport",
    f: "La ligne à trois points n'a été introduite en NBA qu'en 1979, mais elle est aujourd'hui responsable d'une révolution tactique majeure dans le jeu."
  },
  {
    q: "Quel pays a accueilli les premiers Jeux Olympiques modernes en 1896 ?",
    a: "Grèce",
    w: ["France", "Angleterre", "Italie"],
    c: "sport",
    f: "Ces Jeux d'Athènes réunissaient seulement 14 nations et 241 athlètes, tous masculins. Aujourd'hui, les JO rassemblent plus de 200 pays."
  },
  {
    q: "Depuis quand les balles de tennis sont-elles jaunes ?",
    a: "Depuis 1972",
    w: ["Depuis 1950", "Depuis 1990", "Depuis 1960"],
    c: "sport",
    f: "Les balles de tennis sont jaunes depuis 1972 pour être mieux visibles à la télévision. Avant cela, elles étaient blanches !"
  },
  {
    q: "Combien de joueurs compose une équipe de football sur le terrain ?",
    a: "11 joueurs",
    w: ["10 joueurs", "9 joueurs", "12 joueurs"],
    c: "sport",
    f: "Le nombre de 11 joueurs par équipe a été officialisé en 1863 par la Football Association en Angleterre, berceau du football moderne."
  },
  {
    q: "Dans quel sport peut-on réaliser un 'strike' en renversant toutes les quilles ?",
    a: "Bowling",
    w: ["Baseball", "Cricket", "Softball"],
    c: "sport",
    f: "Un jeu parfait, ou '300', consiste à réaliser 12 strikes consécutifs. C'est l'exploit ultime au bowling."
  },
  {
    q: "Quelle nation a remporté la première Coupe du Monde de rugby en 1987 ?",
    a: "Nouvelle-Zélande",
    w: ["Australie", "Afrique du Sud", "France"],
    c: "sport",
    f: "Les All Blacks pratiquent le 'Haka', une danse guerrière maorie, avant chaque match pour intimider leurs adversaires."
  },
  {
    q: "Quel sport se pratique sur un filet avec des raquettes et un volant en plumes ?",
    a: "Badminton",
    w: ["Tennis de table", "Squash", "Pickleball"],
    c: "sport",
    f: "Le volant de badminton peut atteindre plus de 300 km/h lors d'un smash, ce qui en fait l'objet le plus rapide de tous les sports de raquette."
  },
  {
    q: "Quel est le Tour de France ?",
    a: "Une course cycliste par étapes",
    w: ["Un marathon à vélo en une journée", "Une course de vélo de montagne", "Un championnat de vélo en salle"],
    c: "sport",
    f: "Le Tour de France a été créé en 1903 par le journal L'Auto pour augmenter ses ventes. La première édition comptait seulement 60 coureurs."
  },
  {
    q: "Dans quel sport marque-t-on des buts en lançant une rondelle dans des filets avec une crosse ?",
    a: "Hockey sur glace",
    w: ["Polo", "Crosse", "Rink hockey"],
    c: "sport",
    f: "Les gardiens de but au hockey sur glace portent un équipement pesant jusqu'à 20 kg pour se protéger des rondelles qui filent à 160 km/h."
  },
  {
    q: "Qui est considéré comme le meilleur sprinter de tous les temps avec 9 titres mondiaux ?",
    a: "Usain Bolt",
    w: ["Carl Lewis", "Maurice Greene", "Asafa Powell"],
    c: "sport",
    f: "Usain Bolt détient le record du 100 m avec 9,58 secondes, établi à Berlin en 2009. À sa vitesse maximale, il couvrait 10,44 m par seconde."
  },

  // ── ANIMAUX (lot 2) ──────────────────────────────────────────

  {
    q: "Quel animal est le plus grand primate du monde ?",
    a: "Gorille",
    w: ["Chimpanzé", "Orang-outan", "Bonobo"],
    c: "animaux",
    f: "Le gorille des plaines peut peser jusqu'à 200 kg, mais il est herbivore à 97 %. Malgré son apparence imposante, il est très pacifique."
  },
  {
    q: "Quel oiseau est incapable de voler mais est excellent nageur ?",
    a: "Manchot",
    w: ["Flamant rose", "Héron", "Ibis"],
    c: "animaux",
    f: "Les manchots empereurs peuvent plonger jusqu'à 550 mètres de profondeur et retenir leur souffle pendant 20 minutes pour chasser."
  },
  {
    q: "Combien de chambres possède le cœur d'un mammifère ?",
    a: "4",
    w: ["2", "3", "6"],
    c: "animaux",
    f: "Le cœur d'une baleine peut peser jusqu'à 180 kg et battre seulement 2 fois par minute lors d'une plongée profonde."
  },
  {
    q: "Quel reptile peut changer de couleur pour se camoufler et exprimer ses émotions ?",
    a: "Caméléon",
    w: ["Gecko", "Iguane", "Lézard vert"],
    c: "animaux",
    f: "Le caméléon ne change pas de couleur uniquement pour se camoufler : il exprime aussi ses émotions et régule sa température corporelle via ses couleurs."
  },
  {
    q: "Combien d'exemplaires de miel une abeille ouvrière produit-elle dans sa vie ?",
    a: "Un douzième de cuillère à café",
    w: ["Un pot entier", "Une cuillère à soupe", "La moitié d'un pot"],
    c: "animaux",
    f: "Il faut environ 1 200 abeilles pour remplir un pot de 500 g de miel. Une abeille ouvrière vit seulement 6 semaines en été."
  },
  {
    q: "Quel mammifère marin est connu pour ses chants pouvant durer jusqu'à 20 heures ?",
    a: "Baleine à bosse",
    w: ["Dauphin commun", "Orque", "Dugong"],
    c: "animaux",
    f: "Les chants des baleines à bosse peuvent s'entendre à plus de 10 000 km de distance sous l'eau."
  },
  {
    q: "Quel animal est surnommé le 'roi de la jungle' bien qu'il vive dans la savane ?",
    a: "Lion",
    w: ["Tigre", "Léopard", "Jaguar"],
    c: "animaux",
    f: "Ce sont les lionnes qui chassent la majorité du temps, tandis que le mâle protège le territoire."
  },
  {
    q: "Quel animal peut régénérer sa queue après l'avoir perdue ?",
    a: "Lézard",
    w: ["Serpent", "Crocodile", "Tortue"],
    c: "animaux",
    f: "La queue régénérée d'un lézard est constituée de cartilage et non d'os, et peut avoir une couleur différente de l'originale."
  },
  {
    q: "Quel est l'insecte qui produit de la soie pour fabriquer son cocon ?",
    a: "Ver à soie",
    w: ["Araignée", "Chenille du sphinx", "Abeille"],
    c: "animaux",
    f: "Un seul cocon de ver à soie peut contenir jusqu'à 900 mètres de fil de soie. La Chine produit environ 70 % de la soie mondiale."
  },
  {
    q: "Quel animal possède la morsure la plus puissante du règne animal ?",
    a: "Crocodile du Nil",
    w: ["Grand requin blanc", "Hyène", "Hippopotame"],
    c: "animaux",
    f: "Le crocodile du Nil peut exercer une pression de morsure de 22 000 newtons, soit environ 2 tonnes par centimètre carré."
  },

  // ── CUISINE (lot 2) ──────────────────────────────────────────

  {
    q: "Quel pays est considéré comme le berceau des pâtes à base de blé dur ?",
    a: "Italie",
    w: ["Chine", "Grèce", "Espagne"],
    c: "cuisine",
    f: "Bien que la Chine utilise des nouilles depuis des millénaires, c'est l'Italie qui a codifié et popularisé les pâtes de blé dur dans le monde entier."
  },
  {
    q: "Comment appelle-t-on la technique culinaire qui consiste à flamber un plat à l'alcool ?",
    a: "Le flambé",
    w: ["Le braisé", "Le poché", "Le sauté"],
    c: "cuisine",
    f: "La célèbre Crêpe Suzette a été créée par accident en 1895 quand un apprenti cuisinier renversa de la liqueur sur des crêpes."
  },
  {
    q: "Quel fromage français est affiné dans des caves naturelles à Roquefort-sur-Soulzon ?",
    a: "Le Roquefort",
    w: ["Le Camembert", "Le Brie", "Le Comté"],
    c: "cuisine",
    f: "Selon la légende, un berger aurait découvert le Roquefort par accident en oubliant son repas dans une grotte il y a près de 2 000 ans."
  },
  {
    q: "Quel est l'ingrédient principal de la soupe miso japonaise ?",
    a: "La pâte de soja fermentée",
    w: ["Le tofu séché", "L'algue nori", "La farine de riz"],
    c: "cuisine",
    f: "Certains misos vieillissent plus de 3 ans et développent des arômes très complexes, presque comme un bon vin."
  },
  {
    q: "Quel dessert français est composé de choux garnis de crème liés par du caramel ?",
    a: "Le croquembouche",
    w: ["Le mille-feuille", "L'éclair", "Le Paris-Brest"],
    c: "cuisine",
    f: "Le croquembouche, dont le nom signifie 'croque en bouche', est le gâteau de mariage traditionnel en France depuis le XIXe siècle."
  },
  {
    q: "De quelle origine est la sauce Worcestershire ?",
    a: "Anglaise",
    w: ["Américaine", "Indienne", "Australienne"],
    c: "cuisine",
    f: "Créée en 1837 par deux pharmaciens de Worcester, la recette exacte reste un secret commercial. Elle contient des anchois fermentés."
  },
  {
    q: "Quel légume est à la base du célèbre plat coréen kimchi ?",
    a: "Le chou chinois",
    w: ["Le radis daikon", "La courgette", "Le concombre"],
    c: "cuisine",
    f: "Les Coréens consomment en moyenne 18 kg de kimchi par an. La préparation familiale du kimchi, le 'kimjang', est inscrite au patrimoine immatériel de l'UNESCO."
  },
  {
    q: "Quelle est la base liquide traditionnelle d'un risotto ?",
    a: "Le bouillon",
    w: ["Le lait", "L'eau minérale", "Le vin blanc uniquement"],
    c: "cuisine",
    f: "Le risotto doit son onctuosité à l'amidon du riz Arborio ou Carnaroli. Un bon risotto nécessite environ 18 minutes de remuage constant."
  },
  {
    q: "Quelle épice donne sa couleur rouge au paprika ?",
    a: "Le poivron séché et moulu",
    w: ["Le safran", "L'annatto", "Le piment de Cayenne"],
    c: "cuisine",
    f: "Le paprika est simplement du poivron rouge séché et réduit en poudre. La Hongrie en est le plus grand producteur et l'utilise dans son célèbre goulache."
  },
  {
    q: "Qu'est-ce que le 'grignage' en boulangerie ?",
    a: "Inciser la surface du pain avant d'enfourner",
    w: ["Pétrir la pâte à la main", "Laisser lever la pâte une nuit", "Badigeonner le pain à l'eau"],
    c: "cuisine",
    f: "Le grignage permet au pain de se développer de façon contrôlée lors de la cuisson. Les motifs dessinés sont la 'signature' du boulanger."
  },

  // ── INSOLITE (lot 2) ─────────────────────────────────────────

  {
    q: "Quel animal peut se souvenir de plus de 200 visages humains ?",
    a: "L'éléphant",
    w: ["Le dauphin", "Le chimpanzé", "Le corbeau"],
    c: "insolite",
    f: "Les éléphants peuvent reconnaître des centaines d'individus après des années de séparation. Ils sont aussi l'un des rares animaux à se reconnaître dans un miroir."
  },
  {
    q: "Quelle est la seule lettre de l'alphabet absente des 50 noms d'États américains ?",
    a: "Q",
    w: ["X", "Z", "J"],
    c: "insolite",
    f: "La lettre E est la plus fréquente dans les noms d'États américains. La lettre Q, elle, est totalement absente des 50 États."
  },
  {
    q: "Quel pays possède le plus grand nombre de volcans actifs au monde ?",
    a: "L'Indonésie",
    w: ["Le Japon", "Les États-Unis", "L'Islande"],
    c: "insolite",
    f: "L'Indonésie compte plus de 130 volcans actifs, soit environ un tiers du total mondial. Le pays est situé sur la 'ceinture de feu' du Pacifique."
  },
  {
    q: "Quel est le seul fruit dont les graines se trouvent à l'extérieur ?",
    a: "La fraise",
    w: ["Le kiwi", "La figue", "La grenade"],
    c: "insolite",
    f: "Ce que l'on appelle 'graines' sur la fraise sont en réalité les vrais fruits botaniques (des akènes). La partie charnue que l'on mange est techniquement un faux-fruit."
  },
  {
    q: "Combien de temps une personne peut-elle rester sans dormir au maximum ?",
    a: "Environ 11 jours",
    w: ["3 jours maximum", "21 jours", "30 jours"],
    c: "insolite",
    f: "Le record homologué est de 11 jours et 25 minutes, établi par Randy Gardner en 1964. Après quelques jours sans sommeil, on commence à avoir des hallucinations."
  },
  {
    q: "Quelle planète du système solaire tourne dans le sens contraire des autres ?",
    a: "Vénus",
    w: ["Neptune", "Saturne", "Mars"],
    c: "insolite",
    f: "Sur Vénus, le soleil se lève à l'ouest et se couche à l'est. De plus, une journée vénusienne (243 jours terrestres) est plus longue que son année (225 jours)."
  },
  {
    q: "Quel est l'objet manufacturé le plus vendu dans le monde chaque année ?",
    a: "Le stylo à bille",
    w: ["La bouteille d'eau en plastique", "Le téléphone portable", "La carte SIM"],
    c: "insolite",
    f: "On estime que 15 milliards de stylos à bille sont vendus chaque année. Le Bic Cristal, lancé en 1950, est l'un des objets les plus vendus de l'histoire humaine."
  },
  {
    q: "Combien de capitales officielles possède l'Afrique du Sud ?",
    a: "3",
    w: ["1", "2", "4"],
    c: "insolite",
    f: "L'Afrique du Sud a trois capitales : Pretoria (exécutive), Le Cap (législative) et Bloemfontein (judiciaire). C'est l'un des rares pays au monde dans ce cas."
  },
  {
    q: "Quelle est la vitesse maximale du faucon pèlerin en piqué ?",
    a: "Environ 390 km/h",
    w: ["Environ 150 km/h", "Environ 250 km/h", "Environ 500 km/h"],
    c: "insolite",
    f: "Le faucon pèlerin est l'animal le plus rapide du monde en piqué. Pour protéger ses yeux à cette vitesse, il possède une membrane transparente appelée membrane nictitante."
  },
  {
    q: "Combien de temps une pieuvre peut-elle survivre hors de l'eau ?",
    a: "Plusieurs heures",
    w: ["Quelques secondes", "Maximum 5 minutes", "Jamais, elle meurt immédiatement"],
    c: "insolite",
    f: "Les pieuvres peuvent survivre hors de l'eau pendant plusieurs heures tant que leur peau reste humide. On les a observées sortir pour chasser des crabes sur des rochers."
  }

];
