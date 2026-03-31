export const friendsCharacterProfiles = [
  {
    id: "chandler",
    name: "Chandler Bing",
    group: "main",
    job: "office",
    home: "joeyflat",
    romance: "monica",
    vibe: "sarcastic",
  },
  {
    id: "rachel",
    name: "Rachel Green",
    group: "main",
    job: "fashion",
    home: "monicaflat",
    romance: "ross",
    vibe: "stylish",
  },
  {
    id: "ross",
    name: "Ross Geller",
    group: "main",
    job: "science",
    home: "other",
    romance: "rachel",
    vibe: "academic",
  },
  {
    id: "joey",
    name: "Joey Tribbiani",
    group: "main",
    job: "actor",
    home: "joeyflat",
    romance: "single",
    vibe: "flirty",
  },
  {
    id: "monica",
    name: "Monica Geller",
    group: "main",
    job: "chef",
    home: "monicaflat",
    romance: "chandler",
    vibe: "organized",
  },
  {
    id: "phoebe",
    name: "Phoebe Buffay",
    group: "main",
    job: "music",
    home: "other",
    romance: "mike",
    vibe: "chaotic",
  },
  {
    id: "gunther",
    name: "Gunther",
    group: "side",
    job: "cafe",
    home: "centralperk",
    romance: "single",
    vibe: "quiet",
  },
  {
    id: "janice",
    name: "Janice",
    group: "side",
    job: "otherjob",
    home: "other",
    romance: "chandler",
    vibe: "loud",
  }
];

export const friendsCharacterChallenges = [
  { date: "2026-03-30", answerId: "chandler", hint: "Humor sarcÃ¡stico y oficina." },
  { date: "2026-03-31", answerId: "rachel", hint: "Moda, estilo y Ross." },
  { date: "2026-04-01", answerId: "ross", hint: "Ciencia, dinosaurios y Monica." },
  { date: "2026-04-02", answerId: "joey", hint: "Actor y How you doin." },
  { date: "2026-04-03", answerId: "monica", hint: "Chef y control absoluto." },
  { date: "2026-04-04", answerId: "phoebe", hint: "Musica, rareza y energia libre." },
  { date: "2026-04-05", answerId: "gunther", hint: "Central Perk y amor silencioso." },
  { date: "2026-04-06", answerId: "janice", hint: "Voz inolvidable y Chandler." }
];

export const friendsQuoteChallenges = [
  {
    date: "2026-03-30",
    prompt: "Quien dijo esta frase",
    quote: "Could I be wearing any more clothes?",
    options: ["Joey Tribbiani", "Chandler Bing", "Ross Geller", "Gunther"],
    answer: "Joey Tribbiani",
    explanation: "Es uno de los momentos mas iconicos de Joey imitando a Chandler."
  },
  {
    date: "2026-03-31",
    prompt: "Quien dijo esta frase",
    quote: "Smelly Cat, Smelly Cat...",
    options: ["Phoebe Buffay", "Monica Geller", "Rachel Green", "Janice"],
    answer: "Phoebe Buffay",
    explanation: "La cancion mas recordada de la serie pertenece a Phoebe."
  },
  {
    date: "2026-04-01",
    prompt: "Quien dijo esta frase",
    quote: "We were on a break!",
    options: ["Ross Geller", "Joey Tribbiani", "Chandler Bing", "Richard Burke"],
    answer: "Ross Geller",
    explanation: "Es la frase mas asociada a Ross."
  },
  {
    date: "2026-04-02",
    prompt: "Quien dijo esta frase",
    quote: "How you doin'?",
    options: ["Joey Tribbiani", "Ross Geller", "Mike Hannigan", "Gunther"],
    answer: "Joey Tribbiani",
    explanation: "Es la frase mas famosa de Joey al ligar."
  }
];

export const friendsEmojiChallenges = [
  {
    date: "2026-03-30",
    prompt: "Adivina el personaje por emojis",
    emojis: "ðŸ›‹ï¸ â˜• ðŸ‘” ðŸ˜",
    options: ["Chandler Bing", "Ross Geller", "Gunther", "Joey Tribbiani"],
    answer: "Chandler Bing",
    explanation: "Oficina, sarcasmo y vida de sofa con Joey."
  },
  {
    date: "2026-03-31",
    prompt: "Adivina el personaje por emojis",
    emojis: "ðŸ¦ž ðŸŽµ ðŸ± âœ¨",
    options: ["Phoebe Buffay", "Rachel Green", "Monica Geller", "Janice"],
    answer: "Phoebe Buffay",
    explanation: "Lobster, Smelly Cat y energia peculiar."
  },
  {
    date: "2026-04-01",
    prompt: "Adivina el personaje por emojis",
    emojis: "ðŸ¦– ðŸ“š â˜• ðŸ§ ",
    options: ["Ross Geller", "Joey Tribbiani", "Richard Burke", "Mike Hannigan"],
    answer: "Ross Geller",
    explanation: "Dinosaurios y perfil academico."
  },
  {
    date: "2026-04-02",
    prompt: "Adivina el personaje por emojis",
    emojis: "ðŸŽ­ ðŸ• ðŸ˜‰ ðŸ“º",
    options: ["Joey Tribbiani", "Chandler Bing", "Gunther", "Mike Hannigan"],
    answer: "Joey Tribbiani",
    explanation: "Actor, carisma y comida."
  }
];

export const friendsPixelChallenges = [
  {
    date: "2026-03-30",
    prompt: "Adivina el personaje con foto revelada",
    image: "/friends/pixel/chandler-bing.jpg",
    answer: "Chandler Bing",
    aliases: ["chandler", "chandler bing"],
    hint: "Sarcasmo y oficina.",
    explanation: "Era Chandler Bing."
  },
  {
    date: "2026-03-31",
    prompt: "Adivina el personaje con foto revelada",
    image: "/friends/pixel/rachel-green.jpg",
    answer: "Rachel Green",
    aliases: ["rachel", "rachel green"],
    hint: "Moda y Ross.",
    explanation: "Era Rachel Green."
  },
  {
    date: "2026-04-01",
    prompt: "Adivina el personaje con foto revelada",
    image: "/friends/pixel/ross-geller.jpg",
    answer: "Ross Geller",
    aliases: ["ross", "ross geller"],
    hint: "Ciencia y dinosaurios.",
    explanation: "Era Ross Geller."
  },
  {
    date: "2026-04-02",
    prompt: "Adivina el personaje con foto revelada",
    image: "/friends/pixel/joey-tribbiani.jpg",
    answer: "Joey Tribbiani",
    aliases: ["joey", "joey tribbiani"],
    hint: "Actor y frase de ligue.",
    explanation: "Era Joey Tribbiani."
  }
];

export const friendsTriviaChallenges = [
  {
    date: "2026-03-30",
    prompt: "Pregunta diaria",
    quote: "Could I be wearing any more clothes?",
    options: ["Joey Tribbiani", "Chandler Bing", "Ross Geller", "Gunther"],
    answer: "Joey Tribbiani",
    explanation: "Es uno de los momentos mas iconicos de Joey imitando a Chandler."
  },
  {
    date: "2026-03-31",
    prompt: "Pregunta diaria",
    quote: "Smelly Cat, Smelly Cat...",
    options: ["Phoebe Buffay", "Monica Geller", "Rachel Green", "Janice"],
    answer: "Phoebe Buffay",
    explanation: "La cancion mas recordada de la serie pertenece a Phoebe."
  },
  {
    date: "2026-04-01",
    prompt: "Pregunta diaria",
    quote: "We were on a break!",
    options: ["Ross Geller", "Joey Tribbiani", "Chandler Bing", "Richard Burke"],
    answer: "Ross Geller",
    explanation: "Es la frase mas asociada a Ross."
  },
  {
    date: "2026-04-02",
    prompt: "Pregunta diaria",
    quote: "How you doin'?",
    options: ["Joey Tribbiani", "Ross Geller", "Mike Hannigan", "Gunther"],
    answer: "Joey Tribbiani",
    explanation: "Es la frase mas famosa de Joey al ligar."
  }
];
