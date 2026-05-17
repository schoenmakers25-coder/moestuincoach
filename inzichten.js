// Moestuin.nl — inzichten / admin dashboard

(function () {
  const MC = window.MoestuinCoach;
  MC.seedIfEmpty();

  const all = MC.loadQuestions();
  const now = Date.now();
  const WEEK = 7 * 24 * 3600 * 1000;
  const DAY = 24 * 3600 * 1000;

  const last7 = all.filter(q => now - q.ts < WEEK);
  const today = all.filter(q => now - q.ts < DAY);
  const answered = all.filter(q => q.answered).length;

  // ----- KPIs

  const kpiEl = document.getElementById("kpis");
  kpiEl.innerHTML = `
    <div class="kpi">
      <div class="lbl">Vragen totaal</div>
      <div class="val">${all.length}<span class="it">.</span></div>
      <div class="delta">↗ +${last7.length} deze week</div>
    </div>
    <div class="kpi">
      <div class="lbl">Vandaag</div>
      <div class="val"><span class="it">${today.length}</span></div>
      <div class="delta">${today.length > 8 ? "↗ boven gemiddeld" : "→ rustig"}</div>
    </div>
    <div class="kpi">
      <div class="lbl">Unieke gewassen</div>
      <div class="val">${new Set(all.map(q => q.plant).filter(Boolean)).size}</div>
      <div class="delta">↗ kleine kanon</div>
    </div>
    <div class="kpi">
      <div class="lbl">% beantwoord</div>
      <div class="val">${Math.round(answered / all.length * 100)}<span class="it" style="font-size:36px;">%</span></div>
      <div class="delta">${answered}/${all.length} succesvol</div>
    </div>
  `;

  // ----- Categories bar chart

  const catCounts = {};
  for (const q of last7) {
    catCounts[q.category] = (catCounts[q.category] || 0) + 1;
  }
  const catList = Object.entries(catCounts)
    .map(([key, n]) => {
      const cat = MC.CATEGORIES.find(c => c.key === key);
      return { key, n, label: cat?.label || "Overig", color: cat?.color || "#6b6358" };
    })
    .sort((a, b) => b.n - a.n);
  const max = Math.max(1, ...catList.map(c => c.n));
  document.getElementById("bars").innerHTML = catList.map(c => `
    <div class="row">
      <div class="name">${c.label}</div>
      <div class="bar-track"><div class="bar-fill" style="width: ${(c.n / max) * 100}%; background: ${c.color};"></div></div>
      <div class="n">${c.n}</div>
    </div>
  `).join("");

  // ----- Top plants

  const plantCounts = {};
  for (const q of all) {
    if (q.plant) plantCounts[q.plant] = (plantCounts[q.plant] || 0) + 1;
  }
  const plantList = Object.entries(plantCounts)
    .map(([name, n]) => ({ name, n }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 10);
  document.getElementById("plants").innerHTML = plantList.map((p, i) => `
    <div class="row">
      <span class="ord">№ ${String(i + 1).padStart(2, "0")}</span>
      <span class="name">${p.name}</span>
      <span class="count">${p.n} vragen</span>
    </div>
  `).join("");

  // ----- Content gaps — group questions by plant+category, find clusters w/o "answered" article
  //   Demo-versie: groepeer op plant; toon top combinaties.
  //   In productie: kruisen met je artikel-database om écht uncovered topics te vinden.

  const gapGroups = {};
  for (const q of all) {
    if (!q.plant) continue;
    const key = q.plant + "|" + q.category;
    gapGroups[key] = gapGroups[key] || { plant: q.plant, cat: q.category, n: 0, sample: q.text };
    gapGroups[key].n++;
  }
  const gaps = Object.values(gapGroups)
    .sort((a, b) => b.n - a.n)
    .slice(0, 8);

  const gapEl = document.getElementById("gaps");
  gapEl.innerHTML = `
    <div class="gap-row">
      <span>Vragen</span>
      <span>Onderwerp</span>
      <span>Categorie</span>
      <span></span>
    </div>
    ${gaps.map(g => {
      const cat = MC.CATEGORIES.find(c => c.key === g.cat);
      const catLabel = cat?.label || "Overig";
      return `
        <div class="gap-row">
          <span class="vol">${g.n}×</span>
          <span class="topic">${g.plant[0].toUpperCase() + g.plant.slice(1)} <span class="it">— ${catLabel.toLowerCase()}</span></span>
          <span class="cat-pill" style="color: ${cat?.color || 'var(--ink)'}">${catLabel}</span>
          <button class="cta">Schrijf artikel →</button>
        </div>
      `;
    }).join("")}
  `;

  // ----- Recent stream

  const streamEl = document.getElementById("stream");
  const recent = all.slice(0, 20);

  function timeAgo(ts) {
    const d = (Date.now() - ts) / 1000;
    if (d < 60) return "nu net";
    if (d < 3600) return Math.floor(d / 60) + " min";
    if (d < 86400) return Math.floor(d / 3600) + " uur";
    return Math.floor(d / 86400) + " d";
  }

  streamEl.innerHTML = `
    <div class="stream-row">
      <span>Tijd</span>
      <span>Categorie</span>
      <span>Vraag</span>
      <span>Plant</span>
    </div>
    ${recent.map(q => {
      const cat = MC.CATEGORIES.find(c => c.key === q.category);
      return `
        <div class="stream-row">
          <span class="when">${timeAgo(q.ts)}</span>
          <span class="cat-pill" style="color: ${cat?.color || 'var(--ink)'}">${cat?.label || "Overig"}</span>
          <span class="qt">${q.text.replace(/</g, "&lt;")}</span>
          <span class="plant-tag">${q.plant ? "↳ " + q.plant : "—"}</span>
        </div>
      `;
    }).join("")}
  `;

  // Clear demo data
  document.getElementById("clear-btn")?.addEventListener("click", () => {
    if (confirm("Alle gelogde vragen wissen?")) {
      localStorage.removeItem("moestuin.questions.v1");
      location.reload();
    }
  });
})();
