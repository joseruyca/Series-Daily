export const friendsCharacterProfiles = [
  { id: "chandler", name: "Chandler Bing", group: "main", job: "office", home: "joeyflat", romance: "monica", vibe: "sarcastic" },
  { id: "rachel", name: "Rachel Green", group: "main", job: "fashion", home: "monicaflat", romance: "ross", vibe: "stylish" },
  { id: "ross", name: "Ross Geller", group: "main", job: "science", home: "other", romance: "rachel", vibe: "academic" },
  { id: "joey", name: "Joey Tribbiani", group: "main", job: "actor", home: "joeyflat", romance: "single", vibe: "flirty" },
  { id: "monica", name: "Monica Geller", group: "main", job: "chef", home: "monicaflat", romance: "chandler", vibe: "organized" },
  { id: "phoebe", name: "Phoebe Buffay", group: "main", job: "music", home: "other", romance: "mike", vibe: "chaotic" },
  { id: "gunther", name: "Gunther", group: "side", job: "cafe", home: "centralperk", romance: "single", vibe: "quiet" },
  { id: "janice", name: "Janice", group: "side", job: "otherjob", home: "other", romance: "chandler", vibe: "loud" }
];

export const friendsCharacterChallenges = [
  { date: "2026-03-30", answerId: "chandler", hintEs: "Humor sarcástico y oficina.", hintEn: "Sarcastic humor and office life." },
  { date: "2026-03-31", answerId: "rachel", hintEs: "Moda, estilo y Ross.", hintEn: "Fashion, style and Ross." },
  { date: "2026-04-01", answerId: "ross", hintEs: "Ciencia, dinosaurios y discusiones.", hintEn: "Science, dinosaurs and arguments." },
  { date: "2026-04-02", answerId: "joey", hintEs: "Actor y frase de ligue.", hintEn: "Actor and iconic pickup line." },
  { date: "2026-04-03", answerId: "monica", hintEs: "Chef y control absoluto.", hintEn: "Chef and full control." },
  { date: "2026-04-04", answerId: "phoebe", hintEs: "Música, rareza y energía libre.", hintEn: "Music, weirdness and free energy." }
];

export const friendsQuoteChallenges = [
  {
    date: "2026-03-30",
    promptEs: "¿Quién dijo esta frase?",
    promptEn: "Who said this quote?",
    quoteEs: "¿Podría llevar más ropa encima?",
    quoteEn: "Could I BE wearing any more clothes?",
    options: ["Joey Tribbiani", "Chandler Bing", "Ross Geller", "Gunther"],
    answer: "Joey Tribbiani",
    explanationEs: "Es uno de los momentos más icónicos de Joey imitando a Chandler.",
    explanationEn: "It is one of Joey's most iconic moments while mocking Chandler."
  },
  {
    date: "2026-03-31",
    promptEs: "¿Quién dijo esta frase?",
    promptEn: "Who said this quote?",
    quoteEs: "Gato apestoso, gato apestoso...",
    quoteEn: "Smelly Cat, Smelly Cat...",
    options: ["Phoebe Buffay", "Monica Geller", "Rachel Green", "Janice"],
    answer: "Phoebe Buffay",
    explanationEs: "La canción más recordada de la serie pertenece a Phoebe.",
    explanationEn: "The most memorable song belongs to Phoebe."
  },
  {
    date: "2026-04-01",
    promptEs: "¿Quién dijo esta frase?",
    promptEn: "Who said this quote?",
    quoteEs: "¡Estábamos en un descanso!",
    quoteEn: "We were on a break!",
    options: ["Ross Geller", "Joey Tribbiani", "Chandler Bing", "Richard Burke"],
    answer: "Ross Geller",
    explanationEs: "Es la frase más asociada a Ross.",
    explanationEn: "It is Ross's most iconic line."
  },
  {
    date: "2026-04-02",
    promptEs: "¿Quién dijo esta frase?",
    promptEn: "Who said this quote?",
    quoteEs: "¿Qué tal vas?",
    quoteEn: "How you doin'?",
    options: ["Joey Tribbiani", "Ross Geller", "Mike Hannigan", "Gunther"],
    answer: "Joey Tribbiani",
    explanationEs: "Es la frase más famosa de Joey al ligar.",
    explanationEn: "It is Joey's most famous flirting line."
  }
];

export const friendsEmojiChallenges = [
  {
    date: "2026-03-30",
    promptEs: "Adivina el personaje por emojis",
    promptEn: "Guess the character from emojis",
    emojis: "🛋️ ☕ 👔 😏",
    options: ["Chandler Bing", "Ross Geller", "Gunther", "Joey Tribbiani"],
    answer: "Chandler Bing",
    explanationEs: "Oficina, sarcasmo y piso compartido con Joey.",
    explanationEn: "Office life, sarcasm and living with Joey."
  },
  {
    date: "2026-03-31",
    promptEs: "Adivina el personaje por emojis",
    promptEn: "Guess the character from emojis",
    emojis: "🎵 🐱 ✨ 🌙",
    options: ["Phoebe Buffay", "Rachel Green", "Monica Geller", "Janice"],
    answer: "Phoebe Buffay",
    explanationEs: "Canción, rareza y energía totalmente Phoebe.",
    explanationEn: "Songs, weirdness and pure Phoebe energy."
  },
  {
    date: "2026-04-01",
    promptEs: "Adivina el personaje por emojis",
    promptEn: "Guess the character from emojis",
    emojis: "🦖 📚 ☕ 🧠",
    options: ["Ross Geller", "Joey Tribbiani", "Richard Burke", "Mike Hannigan"],
    answer: "Ross Geller",
    explanationEs: "Dinosaurios y perfil académico.",
    explanationEn: "Dinosaurs and an academic profile."
  },
  {
    date: "2026-04-02",
    promptEs: "Adivina el personaje por emojis",
    promptEn: "Guess the character from emojis",
    emojis: "🎭 🍕 😉 📺",
    options: ["Joey Tribbiani", "Chandler Bing", "Gunther", "Mike Hannigan"],
    answer: "Joey Tribbiani",
    explanationEs: "Actor, carisma y comida.",
    explanationEn: "Actor, charisma and food."
  }
];

export const friendsPixelChallenges = [
  {
    date: "2026-03-30",
    promptEs: "Adivina el personaje con foto revelada",
    promptEn: "Guess the character with the reveal image",
    imageCandidates: ["/pixel/friends/chandler-bing.jpg", "/pixel/friends/chandler-bing.jpeg", "/pixel/friends/chandler-bing.png", "/pixel/friends/chandler-bing.webp"],
    answer: "Chandler Bing",
    aliases: ["chandler", "chandler bing"],
    hintEs: "Sarcasmo y oficina.",
    hintEn: "Sarcasm and office life.",
    explanationEs: "Era Chandler Bing.",
    explanationEn: "It was Chandler Bing."
  },
  {
    date: "2026-03-31",
    promptEs: "Adivina el personaje con foto revelada",
    promptEn: "Guess the character with the reveal image",
    imageCandidates: ["/pixel/friends/rachel-green.jpg", "/pixel/friends/rachel-green.jpeg", "/pixel/friends/rachel-green.png", "/pixel/friends/rachel-green.webp"],
    answer: "Rachel Green",
    aliases: ["rachel", "rachel green"],
    hintEs: "Moda y Ross.",
    hintEn: "Fashion and Ross.",
    explanationEs: "Era Rachel Green.",
    explanationEn: "It was Rachel Green."
  },
  {
    date: "2026-04-01",
    promptEs: "Adivina el personaje con foto revelada",
    promptEn: "Guess the character with the reveal image",
    imageCandidates: ["/pixel/friends/ross-geller.jpg", "/pixel/friends/ross-geller.jpeg", "/pixel/friends/ross-geller.png", "/pixel/friends/ross-geller.webp"],
    answer: "Ross Geller",
    aliases: ["ross", "ross geller"],
    hintEs: "Ciencia y dinosaurios.",
    hintEn: "Science and dinosaurs.",
    explanationEs: "Era Ross Geller.",
    explanationEn: "It was Ross Geller."
  },
  {
    date: "2026-04-02",
    promptEs: "Adivina el personaje con foto revelada",
    promptEn: "Guess the character with the reveal image",
    imageCandidates: ["/pixel/friends/joey-tribbiani.jpg", "/pixel/friends/joey-tribbiani.jpg.jpg", "/pixel/friends/joey-tribbiani.jpeg", "/pixel/friends/joey-tribbiani.png", "/pixel/friends/joey-tribbiani.webp"],
    answer: "Joey Tribbiani",
    aliases: ["joey", "joey tribbiani"],
    hintEs: "Actor y frase de ligue.",
    hintEn: "Actor and pickup line.",
    explanationEs: "Era Joey Tribbiani.",
    explanationEn: "It was Joey Tribbiani."
  },
  {
    date: "2026-04-03",
    promptEs: "Adivina el personaje con foto revelada",
    promptEn: "Guess the character with the reveal image",
    imageCandidates: ["/pixel/friends/monica-geller.jpg", "/pixel/friends/monica-geller.jpeg", "/pixel/friends/monica-geller.png", "/pixel/friends/monica-geller.webp"],
    answer: "Monica Geller",
    aliases: ["monica", "monica geller"],
    hintEs: "Chef y orden.",
    hintEn: "Chef and order.",
    explanationEs: "Era Monica Geller.",
    explanationEn: "It was Monica Geller."
  },
  {
    date: "2026-04-04",
    promptEs: "Adivina el personaje con foto revelada",
    promptEn: "Guess the character with the reveal image",
    imageCandidates: ["/pixel/friends/phoebe-buffay.jpg", "/pixel/friends/phoebe-buffay.jpeg", "/pixel/friends/phoebe-buffay.png", "/pixel/friends/phoebe-buffay.webp"],
    answer: "Phoebe Buffay",
    aliases: ["phoebe", "phoebe buffay"],
    hintEs: "Música y caos.",
    hintEn: "Music and chaos.",
    explanationEs: "Era Phoebe Buffay.",
    explanationEn: "It was Phoebe Buffay."
  }
];
