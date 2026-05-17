// Moestuin.nl — zaaikalender data + render

// Phase codes
const PHASES = {
  i: "zaai-in",    // binnen voorzaaien
  o: "zaai-out",   // buiten direct zaaien
  p: "planten",    // uitplanten / pootgoed
  h: "oogst"       // oogsten
};

const MONTH_NAMES = ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"];
const NOW_MONTH = 5; // mei

// crops: each entry has months[1..12] = string of phase codes (any combo of i, o, p, h)
// cat: "groente" / "kruid" / "vrucht"
const CROPS = [
  // GROENTE
  { name: "Aardappel",    lat: "Solanum tuberosum",       cat: "groente", months: { 3:"p", 4:"p", 7:"h", 8:"h", 9:"h", 10:"h" } },
  { name: "Andijvie",     lat: "Cichorium endivia",       cat: "groente", months: { 4:"i", 5:"ip", 6:"op", 7:"oph", 8:"oh", 9:"h", 10:"h" } },
  { name: "Aubergine",    lat: "Solanum melongena",       cat: "vrucht",  months: { 2:"i", 3:"i", 4:"i", 5:"p", 6:"p", 7:"h", 8:"h", 9:"h" } },
  { name: "Biet",         lat: "Beta vulgaris",           cat: "groente", months: { 4:"o", 5:"o", 6:"o", 7:"oh", 8:"h", 9:"h", 10:"h" } },
  { name: "Bloemkool",    lat: "Brassica oleracea",       cat: "groente", months: { 3:"i", 4:"ip", 5:"p", 6:"p", 7:"h", 8:"h", 9:"h", 10:"h" } },
  { name: "Boerenkool",   lat: "Brassica oleracea",       cat: "groente", months: { 4:"i", 5:"i", 6:"p", 7:"p", 11:"h", 12:"h", 1:"h", 2:"h" } },
  { name: "Broccoli",     lat: "Brassica oleracea",       cat: "groente", months: { 3:"i", 4:"i", 5:"p", 6:"p", 7:"h", 8:"h", 9:"h", 10:"h" } },
  { name: "Courgette",    lat: "Cucurbita pepo",          cat: "vrucht",  months: { 4:"i", 5:"op", 6:"op", 7:"h", 8:"h", 9:"h", 10:"h" } },
  { name: "Erwt",         lat: "Pisum sativum",           cat: "groente", months: { 3:"o", 4:"o", 5:"o", 6:"oh", 7:"h", 8:"h" } },
  { name: "Knoflook",     lat: "Allium sativum",          cat: "groente", months: { 10:"p", 11:"p", 6:"h", 7:"h", 8:"h" } },
  { name: "Komkommer",    lat: "Cucumis sativus",         cat: "vrucht",  months: { 4:"i", 5:"ip", 6:"p", 7:"h", 8:"h", 9:"h", 10:"h" } },
  { name: "Kropsla",      lat: "Lactuca sativa",          cat: "groente", months: { 2:"i", 3:"io", 4:"iop", 5:"opH", 6:"oph", 7:"oph", 8:"oph", 9:"oph", 10:"h" } },
  { name: "Mais",         lat: "Zea mays",                cat: "vrucht",  months: { 4:"i", 5:"op", 6:"op", 8:"h", 9:"h", 10:"h" } },
  { name: "Paprika",      lat: "Capsicum annuum",         cat: "vrucht",  months: { 2:"i", 3:"i", 4:"i", 5:"p", 6:"p", 7:"h", 8:"h", 9:"h", 10:"h" } },
  { name: "Pompoen",      lat: "Cucurbita maxima",        cat: "vrucht",  months: { 4:"i", 5:"op", 6:"p", 9:"h", 10:"h", 11:"h" } },
  { name: "Prei",         lat: "Allium porrum",           cat: "groente", months: { 3:"i", 4:"i", 5:"i", 6:"p", 7:"p", 9:"h", 10:"h", 11:"h", 12:"h", 1:"h", 2:"h" } },
  { name: "Radijs",       lat: "Raphanus sativus",        cat: "groente", months: { 3:"o", 4:"oh", 5:"oh", 6:"oh", 7:"oh", 8:"oh", 9:"oh", 10:"h" } },
  { name: "Rabarber",     lat: "Rheum rhabarbarum",       cat: "groente", months: { 3:"p", 4:"h", 5:"h", 6:"h", 7:"h" } },
  { name: "Rode kool",    lat: "Brassica oleracea",       cat: "groente", months: { 3:"i", 4:"i", 5:"p", 6:"p", 9:"h", 10:"h", 11:"h" } },
  { name: "Snijbiet",     lat: "Beta vulgaris cicla",     cat: "groente", months: { 3:"o", 4:"o", 5:"o", 6:"oh", 7:"oh", 8:"oh", 9:"oh", 10:"h" } },
  { name: "Spinazie",     lat: "Spinacia oleracea",       cat: "groente", months: { 3:"o", 4:"oh", 5:"oh", 6:"h", 8:"o", 9:"oh", 10:"h" } },
  { name: "Spruitjes",    lat: "Brassica oleracea",       cat: "groente", months: { 3:"i", 4:"ip", 5:"p", 6:"p", 10:"h", 11:"h", 12:"h", 1:"h" } },
  { name: "Sperziebonen", lat: "Phaseolus vulgaris",      cat: "groente", months: { 5:"o", 6:"o", 7:"oh", 8:"oh", 9:"h", 10:"h" } },
  { name: "Stamboon",     lat: "Phaseolus vulgaris",      cat: "groente", months: { 5:"o", 6:"o", 7:"h", 8:"h", 9:"h" } },
  { name: "Tomaat",       lat: "Solanum lycopersicum",    cat: "vrucht",  months: { 2:"i", 3:"i", 4:"i", 5:"p", 6:"p", 7:"h", 8:"h", 9:"h", 10:"h" } },
  { name: "Tuinboon",     lat: "Vicia faba",              cat: "groente", months: { 2:"o", 3:"o", 4:"o", 6:"h", 7:"h", 8:"h" } },
  { name: "Ui",           lat: "Allium cepa",             cat: "groente", months: { 3:"op", 4:"op", 7:"h", 8:"h", 9:"h" } },
  { name: "Veldsla",      lat: "Valerianella locusta",    cat: "groente", months: { 3:"oh", 4:"oh", 5:"h", 8:"o", 9:"oh", 10:"oh", 11:"h", 12:"h", 1:"h", 2:"h" } },
  { name: "Witlof",       lat: "Cichorium intybus",       cat: "groente", months: { 5:"o", 6:"o", 11:"ph", 12:"ph", 1:"ph", 2:"ph" } },
  { name: "Wortel",       lat: "Daucus carota",           cat: "groente", months: { 3:"o", 4:"o", 5:"o", 6:"o", 7:"oh", 8:"oh", 9:"oh", 10:"h", 11:"h" } },
  // KRUIDEN
  { name: "Basilicum",    lat: "Ocimum basilicum",        cat: "kruid",   months: { 3:"i", 4:"i", 5:"ip", 6:"oph", 7:"oh", 8:"oh", 9:"oh", 10:"h" } },
  { name: "Bieslook",     lat: "Allium schoenoprasum",    cat: "kruid",   months: { 3:"op", 4:"oph", 5:"oh", 6:"h", 7:"h", 8:"h", 9:"h", 10:"h" } },
  { name: "Dille",        lat: "Anethum graveolens",      cat: "kruid",   months: { 4:"o", 5:"oh", 6:"oh", 7:"oh", 8:"oh", 9:"h" } },
  { name: "Koriander",    lat: "Coriandrum sativum",      cat: "kruid",   months: { 3:"o", 4:"oh", 5:"oh", 6:"oh", 7:"oh", 8:"oh", 9:"h" } },
  { name: "Peterselie",   lat: "Petroselinum crispum",    cat: "kruid",   months: { 3:"o", 4:"o", 5:"oh", 6:"oh", 7:"oh", 8:"oh", 9:"oh", 10:"h" } },
  { name: "Tijm",         lat: "Thymus vulgaris",         cat: "kruid",   months: { 4:"ip", 5:"ph", 6:"h", 7:"h", 8:"h", 9:"h", 10:"h" } }
];

// ---------- RENDER NOW GRID ----------

function phaseShort(code) {
  return {
    i: "Binnen voorzaaien",
    o: "Buiten zaaien",
    p: "Uitplanten",
    h: "Oogsten"
  }[code];
}

function renderNowGrid(filter = "all") {
  const grid = document.getElementById("now-grid");
  if (!grid) return;
  const list = CROPS.filter(c => c.months[NOW_MONTH] && (filter === "all" || c.cat === filter));
  grid.innerHTML = list.slice(0, 12).map((c, i) => {
    const phases = (c.months[NOW_MONTH] || "").toLowerCase().split("");
    const action = phases.includes("o") ? "Direct buiten zaaien"
                : phases.includes("i") ? "Binnen voorzaaien"
                : phases.includes("p") ? "Uitplanten"
                : "Oogsten";
    const variant = i % 3 === 1 ? "terra" : "";
    return `
      <a class="crop-card" href="#">
        <div class="top">
          <span class="ord">№ ${String(i + 1).padStart(2, "0")}</span>
          <span class="lat">${c.lat}</span>
        </div>
        <div class="ph photo ${variant}"><span class="ph-label">${c.name.toLowerCase()}</span></div>
        <h3>${c.name}</h3>
        <div class="what">
          <span>Actie</span><b>${action}</b>
          <span>Categorie</span><b>${c.cat[0].toUpperCase() + c.cat.slice(1)}</b>
          <span class="green">Maand</span><b>Mei</b>
        </div>
      </a>
    `;
  }).join("");
}

// ---------- RENDER FULL TABLE ----------

function renderTable(filter = "all") {
  const table = document.getElementById("cal-table");
  if (!table) return;
  const list = CROPS.filter(c => filter === "all" || c.cat === filter)
                    .sort((a, b) => a.name.localeCompare(b.name, "nl"));

  let html = "<thead><tr><th>Gewas</th>";
  for (let m = 1; m <= 12; m++) {
    const cls = m === NOW_MONTH ? "now" : "";
    html += `<th class="${cls}">${MONTH_NAMES[m-1]}</th>`;
  }
  html += "</tr></thead><tbody>";

  list.forEach(c => {
    html += `<tr>
      <td class="crop-name">
        <span class="cat">${c.cat}</span><br/>
        ${c.name}
        <span class="lat">${c.lat}</span>
      </td>`;
    for (let m = 1; m <= 12; m++) {
      const codes = (c.months[m] || "").toLowerCase();
      const isNow = m === NOW_MONTH;
      const has = codes.length > 0;
      const cls = `cell ${isNow ? "now-col" : ""} ${has && isNow ? "has" : ""}`;
      let marks = "";
      if (has) {
        marks = '<div class="marks">';
        for (const ch of codes) {
          if (PHASES[ch]) {
            marks += `<div class="mark ${PHASES[ch]}" title="${phaseShort(ch)}"></div>`;
          }
        }
        marks += "</div>";
      }
      html += `<td class="${cls}">${marks}</td>`;
    }
    html += "</tr>";
  });
  html += "</tbody>";
  table.innerHTML = html;
}

// ---------- WIRE UP ----------

let currentFilter = "all";
let currentMonth = NOW_MONTH;

function refresh() {
  renderNowGrid(currentFilter);
  renderTable(currentFilter);
}

document.getElementById("filter")?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  document.querySelectorAll("#filter button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.c;
  refresh();
});

document.getElementById("months")?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  document.querySelectorAll("#months button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentMonth = Number(btn.dataset.m);
  // Update the "now" section header to reflect picked month
  const headerH2 = document.querySelector(".now-section .section-head h2");
  if (headerH2) {
    const count = CROPS.filter(c => c.months[currentMonth] && (currentFilter === "all" || c.cat === currentFilter)).length;
    headerH2.innerHTML = `Nu in <span class="it">${MONTH_NAMES[currentMonth-1]}</span> · ${count} gewassen`;
  }
  // Re-render now grid for selected month
  const grid = document.getElementById("now-grid");
  if (grid) {
    const list = CROPS.filter(c => c.months[currentMonth] && (currentFilter === "all" || c.cat === currentFilter));
    grid.innerHTML = list.slice(0, 12).map((c, i) => {
      const phases = (c.months[currentMonth] || "").toLowerCase().split("");
      const action = phases.includes("o") ? "Direct buiten zaaien"
                  : phases.includes("i") ? "Binnen voorzaaien"
                  : phases.includes("p") ? "Uitplanten"
                  : "Oogsten";
      const variant = i % 3 === 1 ? "terra" : "";
      return `
        <a class="crop-card" href="#">
          <div class="top">
            <span class="ord">№ ${String(i + 1).padStart(2, "0")}</span>
            <span class="lat">${c.lat}</span>
          </div>
          <div class="ph photo ${variant}"><span class="ph-label">${c.name.toLowerCase()}</span></div>
          <h3>${c.name}</h3>
          <div class="what">
            <span>Actie</span><b>${action}</b>
            <span>Categorie</span><b>${c.cat[0].toUpperCase() + c.cat.slice(1)}</b>
            <span class="green">Maand</span><b>${MONTH_NAMES[currentMonth-1][0].toUpperCase() + MONTH_NAMES[currentMonth-1].slice(1)}</b>
          </div>
        </a>
      `;
    }).join("");
  }
});

refresh();
