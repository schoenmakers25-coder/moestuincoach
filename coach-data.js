// Moestuin.nl — coach logging + categorisation utility
// All client-side voor nu. Hang dit later aan een backend door
// `logQuestion` en `loadQuestions` te vervangen door fetch-calls.

(function () {
  const KEY = "moestuin.questions.v1";

  // ---- Categorisering — eenvoudige keyword-match.
  // Voor productie zou je dit door de AI laten doen, maar deze regel-set
  // is goed genoeg voor de eerste paar honderd vragen.
  const CATEGORIES = [
    { key: "probleem", label: "Probleem / ziekte", color: "#a3501f",
      words: ["geel", "bruin", "vlekken", "rot", "schimmel", "luis", "wormen", "slakken",
              "krullen", "verleppen", "verwelken", "valt af", "wat is er mis", "ziek",
              "aangevreten", "verbrand", "barst", "scheurt", "gaat dood"] },
    { key: "zaaien", label: "Zaaien & planten", color: "#3d5a3a",
      words: ["zaaien", "voorzaaien", "kiemen", "uitplanten", "planten", "stekken",
              "wanneer", "afharden", "kiemtemperatuur"] },
    { key: "verzorging", label: "Verzorging", color: "#6f8a5a",
      words: ["water", "begieten", "snoeien", "dieven", "uitbreken", "bemesten",
              "mest", "compost", "schoffelen", "wieden", "afdekken", "mulch"] },
    { key: "oogst", label: "Oogsten & bewaren", color: "#c2a13a",
      words: ["oogst", "rijp", "plukken", "rooien", "bewaren", "invriezen",
              "inmaken", "wecken", "fermenteren"] },
    { key: "ruimte", label: "Klein/balkon", color: "#7a2a2a",
      words: ["balkon", "pot", "bak", "klein", "weinig ruimte", "vierkante meter",
              "stadstuin", "vensterbank", "moestuinbak"] },
    { key: "bodem", label: "Bodem & grond", color: "#6b6358",
      words: ["grond", "bodem", "ph", "klei", "zand", "vruchtwisseling", "groenbemester",
              "stalmest", "kalk", "humus"] },
    { key: "plagen", label: "Plagen & dieren", color: "#a3501f",
      words: ["slak", "luis", "rups", "kever", "mier", "kool wit", "wortelvlieg",
              "vogel", "kat", "konijn", "muis", "mol"] },
    { key: "algemeen", label: "Algemeen / starter", color: "#6b6358",
      words: ["beginnen", "starter", "eerste", "tip", "advies", "hoe begin"] }
  ];

  function categorize(text) {
    const t = (text || "").toLowerCase();
    for (const c of CATEGORIES) {
      if (c.words.some(w => t.includes(w))) return c.key;
    }
    return "overig";
  }

  // ---- Plant-naam herkenning — top 30 namen.
  // Idem: dit kan je later door een AI doen voor synoniemen en verbuigingen.
  const PLANTS = [
    "tomaat", "tomaten", "courgette", "pompoen", "komkommer", "paprika", "aubergine",
    "aardappel", "ui", "knoflook", "prei", "wortel", "biet", "radijs",
    "sla", "andijvie", "spinazie", "snijbiet", "boerenkool", "spruitjes", "broccoli", "bloemkool",
    "boon", "bonen", "erwt", "tuinboon", "witlof", "rabarber", "asperge",
    "basilicum", "peterselie", "bieslook", "tijm", "dille", "koriander", "mint",
    "aardbei", "framboos", "bes"
  ];

  function detectPlant(text) {
    const t = (text || "").toLowerCase();
    for (const p of PLANTS) {
      if (t.includes(p)) {
        return p === "tomaten" ? "tomaat"
             : p === "bonen"   ? "boon"
             : p;
      }
    }
    return null;
  }

  // ---- Persistence

  function loadQuestions() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  }

  function saveQuestions(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) { /* quota */ }
  }

  function logQuestion(text, opts = {}) {
    const list = loadQuestions();
    const entry = {
      id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      ts: Date.now(),
      text: text,
      category: categorize(text),
      plant: detectPlant(text),
      source: opts.source || "homepage", // homepage / starter
      answered: false
    };
    list.unshift(entry);
    // Cap at 1000 for demo
    if (list.length > 1000) list.length = 1000;
    saveQuestions(list);
    return entry;
  }

  function markAnswered(id) {
    const list = loadQuestions();
    const e = list.find(x => x.id === id);
    if (e) { e.answered = true; saveQuestions(list); }
  }

  // ---- Seed-data — zodat het inzichten-dashboard direct iets toont voor de demo.
  // In productie verwijder je dit blok.
  function seedIfEmpty() {
    if (loadQuestions().length > 0) return;
    const samples = [
      "Waarom worden de blaadjes van mijn tomaten geel?",
      "Wanneer kan ik courgette uitplanten?",
      "Hoe vaak moet ik mijn moestuin water geven?",
      "Mijn paprika krijgt bruine vlekken — wat doe ik?",
      "Welke groente kan ik op een balkon in pot kweken?",
      "Hoe bestrijd ik slakken zonder gif?",
      "Mijn courgette bloeit wel maar zet geen vruchten",
      "Wat is het beste tijdstip om sla te zaaien?",
      "Kan ik aardappels in een bak op het balkon kweken?",
      "Mijn tomaten krullen aan de bovenkant — wat is er aan de hand?",
      "Hoe maak ik compost in een klein tuintje?",
      "Welke kruiden zijn makkelijk voor een beginner?",
      "Wanneer is het te laat om bonen te zaaien?",
      "Mijn courgetteplant heeft witte schimmel op de blaadjes",
      "Wat doe ik tegen luis op mijn paprika?",
      "Hoe diep plant ik tomaten?",
      "Mijn sla schiet meteen door — hoe voorkom ik dat?",
      "Welke groente kan ik nu nog zaaien in mei?",
      "Hoe vaak bemest ik mijn tomaten?",
      "Kan ik twee oogsten per jaar van dezelfde plant halen?",
      "Mijn wortels zijn helemaal krom geworden",
      "Hoe lang duurt het voor knoflook klaar is om te oogsten?",
      "Wat zaai ik na de aardappels?",
      "Welke bodem hebben tomaten nodig?",
      "Mijn pompoenplant heeft enorme bladeren maar geen vruchten",
      "Hoe begin ik een moestuin op zware kleigrond?",
      "Mijn courgette is bitter — kan ik die nog eten?",
      "Wanneer plant ik knoflook?",
      "Hoe stek ik tomatenscheuten?",
      "Welke groenten zijn schaduwtolerant?",
      "Mijn basilicum gaat slap hangen ondanks water geven",
      "Hoe doe ik aan vruchtwisseling in een kleine moestuin?"
    ];
    const now = Date.now();
    const list = samples.map((q, i) => ({
      id: "seed-" + i,
      ts: now - i * 1000 * 60 * 60 * Math.random() * 12,
      text: q,
      category: categorize(q),
      plant: detectPlant(q),
      source: "homepage",
      answered: i % 4 !== 0
    }));
    saveQuestions(list);
  }

  // ---- Public API
  window.MoestuinCoach = {
    CATEGORIES, PLANTS,
    categorize, detectPlant,
    logQuestion, loadQuestions, saveQuestions, markAnswered,
    seedIfEmpty
  };
})();
