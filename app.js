const DATA = {
  nfl: {
    week: "Week 3",
    games: [
      ["ATL", "GB", "Sep 25", "12:15 AM", "#c8102e", "#203731"],
      ["KC", "MIA", "Sep 27", "5:00 PM", "#e31837", "#008e97"],
      ["CAR", "CLE", "Sep 27", "5:00 PM", "#0085ca", "#311d00"],
      ["TEN", "NYG", "Sep 27", "5:00 PM", "#4b92db", "#0b2265"],
      ["NE", "JAX", "Sep 27", "5:00 PM", "#002244", "#006778"],
      ["LAC", "BUF", "Sep 27", "5:00 PM", "#0080c6", "#00338d"],
      ["NYJ", "DET", "Sep 27", "5:00 PM", "#125740", "#0076b6"],
      ["HOU", "IND", "Sep 27", "5:00 PM", "#03202f", "#002c5f"],
      ["SEA", "WAS", "Sep 27", "5:00 PM", "#002244", "#5a1414"]
    ],
    props: [
      { id: "cw", name: "C. Watson", vs: "vs ATL", market: "Anytime TD", odds: "+165", pos: true, hits: [["Hit in 4 of last 4 games", "100%"], ["Hit in 2 of last 2 home games", "100%"]] },
      { id: "br", name: "B. Robinson", vs: "@ GB", market: "Anytime TD", odds: "-112", pos: false, hits: [["Hit in 4 of last 6 games", "67%"], ["Hit in 4 of last 4 away games", "100%"], ["GB is a good Anytime TD matchup", "29th"]] },
      { id: "jg", name: "J. Gibbs", vs: "vs NYJ", market: "Anytime TD", odds: "-141", pos: false, hits: [["Hit in 3 of last 3 games", "100%"], ["Hit in 3 of last 3 home games", "100%"]] },
      { id: "ph", name: "P. Mahomes", vs: "vs MIA", market: "Over 2.5 pass TD", odds: "+118", pos: true, hits: [["Hit in 7 of last 10", "70%"], ["MIA ranks 27th vs pass TD", "27th"]] },
      { id: "ja", name: "J. Allen", vs: "vs LAC", market: "Over 34.5 rush yds", odds: "-105", pos: false, hits: [["Hit in 6 of last 8", "75%"], ["Designed keepers up this week", "—"]] },
      { id: "cd", name: "C. Lamb", vs: "@ CHI", market: "Over 79.5 rec yds", odds: "-110", pos: false, hits: [["Hit in 5 of last 6", "83%"], ["Target share 29%", "—"]] }
    ],
    trends: [
      { title: "Home favorites covering after a short week", rate: "18-7", note: "Last 3 seasons, NFL" },
      { title: "Anytime TD on lead backs vs bottom-10 run D", rate: "71%", note: "This season" },
      { title: "QB rush overs when opponent blitzes 35%+", rate: "64%", note: "Last 8 weeks" },
      { title: "Divisional unders in week 3", rate: "12-8", note: "Since 2023" }
    ]
  },
  nba: {
    week: "Preseason",
    games: [
      ["BOS", "NYK", "Oct 4", "7:30 PM", "#007a33", "#f58426"],
      ["LAL", "DEN", "Oct 4", "10:00 PM", "#552583", "#0e2240"],
      ["GSW", "SAC", "Oct 5", "8:30 PM", "#1d428a", "#5a2d81"]
    ],
    props: [
      { id: "sc", name: "S. Curry", vs: "vs SAC", market: "Over 25.5 pts", odds: "-120", pos: false, hits: [["Hit in 8 of last 10", "80%"], ["Pace up vs SAC", "—"]] },
      { id: "jt", name: "J. Tatum", vs: "vs NYK", market: "Over 8.5 reb", odds: "+102", pos: true, hits: [["Hit in 6 of last 8", "75%"]] }
    ],
    trends: [
      { title: "Road favorites in preseason unders", rate: "9-4", note: "Sample board" }
    ]
  },
  mlb: {
    week: "Late season",
    games: [
      ["NYY", "BOS", "Sep 24", "7:10 PM", "#0c2340", "#bd3039"],
      ["LAD", "SDP", "Sep 24", "10:10 PM", "#005a9c", "#2f241d"]
    ],
    props: [
      { id: "aj", name: "A. Judge", vs: "vs BOS", market: "Over 1.5 total bases", odds: "-115", pos: false, hits: [["Hit in 7 of last 10", "70%"]] }
    ],
    trends: [
      { title: "Aces vs top-5 OPS lineups still strike out 9+", rate: "62%", note: "September" }
    ]
  }
};

const board = document.getElementById("board");
const leagueSelect = document.getElementById("league-select");
const picksList = document.getElementById("picks-list");
const pickCount = document.getElementById("pick-count");
const checkout = document.getElementById("checkout");
const embedPlus = document.getElementById("embed-plus");
const embedPro = document.getElementById("embed-pro");
const sheetLabel = document.getElementById("sheet-label");

let view = "home";
let filter = "Most bet on";
let picks = [];

function teamMark(abbr, color) {
  return `<span class="badge-team" style="background:${color}">${abbr.slice(0, 2)}</span>`;
}

function renderHome(league) {
  const d = DATA[league];
  return `
    <div class="section-head">
      <span class="logo" style="width:22px;height:22px;font-size:9px">CL</span>
      <h2>This Week’s Matchups</h2>
      <span class="week">${d.week}</span>
      <button class="more" type="button">Show more</button>
    </div>
    <div class="games">
      ${d.games.map(([a, b, day, time, ca, cb]) => `
        <article class="game">
          <div class="side">${teamMark(a, ca)}<div class="abbr">${a}</div></div>
          <div class="when">${day}<br>${time}</div>
          <div class="side">${teamMark(b, cb)}<div class="abbr">${b}</div></div>
        </article>
      `).join("")}
    </div>
    <div class="section-head" style="margin-top:28px">
      <h2>Trending today for</h2>
      <span class="week">${filter}</span>
    </div>
    <div class="filter-row">
      ${["Most bet on", "Anytime TD", "Passing", "Highest hit rate"].map((f) =>
        `<button class="chip ${f === filter ? "on" : ""}" data-filter="${f}">${f}</button>`
      ).join("")}
    </div>
    <div class="props">${d.props.map(propCard).join("")}</div>
  `;
}

function propCard(p) {
  return `
    <button class="prop" data-add="${p.id}" type="button">
      <div class="prop-top">
        <span class="avatar" style="background:#1f2937">${p.name.split(" ").map((w) => w[0]).join("")}</span>
        <div>
          <div class="who">${p.name} <span class="vs">${p.vs}</span></div>
          <div class="market">${p.market}</div>
        </div>
        <div class="odds ${p.pos ? "pos" : "neg"}">${p.odds}</div>
      </div>
      <div class="hits">
        ${p.hits.map(([t, v]) => `<div class="hit"><span><span class="dot"></span>${t}</span><b>${v}</b></div>`).join("")}
      </div>
    </button>
  `;
}

function renderTrends(league) {
  const d = DATA[league];
  return `
    <div class="section-head"><h2>Trends</h2><span class="week">${league.toUpperCase()} · ${d.week}</span></div>
    <div class="card-list">
      ${d.trends.map((t) => `
        <article class="row-card">
          <div>
            <strong>${t.title}</strong>
            <div class="market">${t.note}</div>
          </div>
          <div><b>${t.rate}</b></div>
        </article>
      `).join("")}
      <article class="row-card locked">
        <div>
          <strong>Same-game parlay engine</strong>
          <div class="market">Stack 2–4 badge-backed legs.</div>
        </div>
        <div class="lock">Clearline+</div>
      </article>
    </div>
  `;
}

function renderTools() {
  return `
    <div class="section-head"><h2>Workstation</h2><span class="week">Filter the slate</span></div>
    <div class="filter-row">
      <button class="chip on">Player props</button>
      <button class="chip">Spreads</button>
      <button class="chip">Totals</button>
      <button class="chip">Hit rate 70%+</button>
    </div>
    <div class="props">${DATA[leagueSelect.value].props.map(propCard).join("")}</div>
  `;
}

function renderDesk() {
  return `
    <div class="section-head"><h2>Expert desk</h2><span class="week">Train the model · get paid</span></div>
    <p class="fine" style="margin-bottom:16px;max-width:640px">
      Clearline also runs a desk like an AI trainer marketplace: domain experts write hard prompts,
      grade model parlays, and ship rubrics. No AI experience needed. Paid weekly on Pro.
    </p>
    <div class="desk-grid">
      <div class="card-list">
        <article class="task">
          <div class="eyebrow">Task</div>
          <h3>Write a challenging prompt</h3>
          <p class="market">Build a week-3 matchup question that would fool a generic model. Then write the correct research answer.</p>
        </article>
        <article class="task">
          <div class="eyebrow">Task</div>
          <h3>Grade and rank answers</h3>
          <p class="market">Score three model-built parlays against hit-rate evidence. Flag hallucinations.</p>
        </article>
        <article class="task">
          <div class="eyebrow">Task</div>
          <h3>Create a grading rubric</h3>
          <p class="market">Define what “good research” means for Anytime TD props this week.</p>
        </article>
      </div>
      <aside class="task">
        <div class="eyebrow">Why experts join</div>
        <h3>Earn as you research.</h3>
        <p class="market">Flexible hours. Quality bonuses. Your grades make the public board sharper.</p>
        <button class="pill-btn" id="desk-trial" type="button" style="margin-top:14px">Start Pro trial</button>
      </aside>
    </div>
  `;
}

function render() {
  const league = leagueSelect.value;
  board.innerHTML =
    view === "trends" ? renderTrends(league) :
    view === "tools" ? renderTools() :
    view === "desk" ? renderDesk() :
    renderHome(league);
}

function findProp(id) {
  return Object.values(DATA).flatMap((d) => d.props).find((p) => p.id === id);
}

function renderPicks() {
  pickCount.textContent = picks.length;
  if (!picks.length) {
    picksList.innerHTML = `<p class="empty">No picks yet. Tap a prop to add it.</p>`;
    return;
  }
  picksList.innerHTML = picks.map((p) => `
    <div class="pick-row">
      <div><strong>${p.name}</strong><div class="market">${p.market} · ${p.odds}</div></div>
      <button type="button" data-remove="${p.id}">✕</button>
    </div>
  `).join("");
}

function openCheckout(plan) {
  const isPro = plan === "pro";
  sheetLabel.textContent = isPro ? "Pro" : "Clearline+";
  embedPlus.hidden = isPro;
  embedPro.hidden = !isPro;
  document.querySelectorAll(".plan-switch button").forEach((b) => {
    b.classList.toggle("on", b.dataset.open === (isPro ? "pro" : "plus"));
  });
  checkout.hidden = false;
  checkout.classList.add("is-open");
}

function closeCheckout() {
  checkout.hidden = true;
  checkout.classList.remove("is-open");
}

document.querySelectorAll("[data-whop-checkout-return-url]").forEach((el) => {
  el.setAttribute("data-whop-checkout-return-url", `${location.origin}/success.html`);
});

closeCheckout();
render();
renderPicks();

document.querySelectorAll(".nav-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    view = btn.dataset.view;
    document.querySelectorAll(".nav-link").forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });
});

leagueSelect.addEventListener("change", render);

board.addEventListener("click", (e) => {
  const filterBtn = e.target.closest("[data-filter]");
  if (filterBtn) {
    filter = filterBtn.dataset.filter;
    render();
    return;
  }
  const add = e.target.closest("[data-add]");
  if (add) {
    const prop = findProp(add.dataset.add);
    if (prop && !picks.some((p) => p.id === prop.id)) picks.push(prop);
    renderPicks();
  }
  if (e.target.id === "desk-trial") openCheckout("pro");
});

picksList.addEventListener("click", (e) => {
  const rm = e.target.closest("[data-remove]");
  if (!rm) return;
  picks = picks.filter((p) => p.id !== rm.dataset.remove);
  renderPicks();
});

document.getElementById("open-trial").addEventListener("click", () => openCheckout("plus"));
document.getElementById("open-plus").addEventListener("click", () => openCheckout("plus"));
document.getElementById("close-checkout").addEventListener("click", closeCheckout);
checkout.addEventListener("click", (e) => { if (e.target === checkout) closeCheckout(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCheckout(); });
document.querySelectorAll(".plan-switch button").forEach((b) => {
  b.addEventListener("click", () => openCheckout(b.dataset.open));
});
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
