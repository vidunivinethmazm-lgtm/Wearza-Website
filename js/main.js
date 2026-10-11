/* Wearza website – interactions
   Edit CONFIG below to change the contact email or GitHub link. */
const CONFIG = {
  contactEmail: "wearzaewardrobe@gmail.com",
  githubUrl: "https://github.com/vidunivinethmazm-lgtm/Wearza-Website"
};

/* ---------- Navbar ---------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// Highlight the nav link for the section in view
const sectionIds = ["home", "domain", "milestones", "documents", "presentations", "about", "contact"];
const linkFor = id => navLinks.querySelector(`a[href="#${id}"]`);
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.querySelectorAll("a").forEach(a => a.classList.remove("active"));
        const l = linkFor(e.target.id);
        if (l && !l.classList.contains("nav-cta")) l.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sectionIds.forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });
}

document.getElementById("githubLink").href = CONFIG.githubUrl;
document.getElementById("contactEmailText").textContent = CONFIG.contactEmail;

/* ---------- Garment illustrations (SVG) ---------- */
const SHAPES = {
  tee: "M30 18 L42 12 Q50 22 58 12 L70 18 L88 34 L77 46 L69 40 L69 88 L31 88 L31 40 L23 46 L12 34 Z",
  shirt: "M31 16 L43 11 L50 20 L57 11 L69 16 L88 36 L80 46 L70 38 L70 90 L30 90 L30 38 L20 46 L12 36 Z",
  trousers: "M30 10 L70 10 L75 90 L56 90 L50 38 L44 90 L25 90 Z",
  dress: "M40 9 L60 9 L62 28 Q57 33 59 38 L83 90 L17 90 L41 38 Q43 33 38 28 Z",
  jacket: "M32 14 L44 10 L50 26 L56 10 L68 14 L86 30 L85 82 L75 82 L72 44 L71 90 L29 90 L28 44 L25 82 L15 82 L14 30 Z",
  skirt: "M32 20 L68 20 L84 86 L16 86 Z",
  saree: "M38 10 L62 10 L66 34 L80 90 L20 90 L34 34 Z"
};
const DETAILS = {
  shirt: '<path d="M50 20 V88" stroke="rgba(0,0,0,.18)" stroke-width="2"/><circle cx="50" cy="36" r="1.8" fill="rgba(255,255,255,.8)"/><circle cx="50" cy="52" r="1.8" fill="rgba(255,255,255,.8)"/><circle cx="50" cy="68" r="1.8" fill="rgba(255,255,255,.8)"/>',
  jacket: '<path d="M50 26 V90" stroke="rgba(0,0,0,.22)" stroke-width="2"/><path d="M44 10 L50 26 L44 46" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/><path d="M56 10 L50 26 L56 46" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>',
  trousers: '<path d="M30 18 H70" stroke="rgba(0,0,0,.18)" stroke-width="2"/>',
  skirt: '<path d="M32 28 H68" stroke="rgba(0,0,0,.15)" stroke-width="2"/><path d="M42 28 L36 86 M58 28 L64 86" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>',
  dress: '<path d="M41 38 H59" stroke="rgba(255,255,255,.5)" stroke-width="2"/>',
  saree: '<path d="M62 10 L28 90" stroke="rgba(255,255,255,.55)" stroke-width="5"/><path d="M20 84 H80" stroke="#ffd36b" stroke-width="3"/>',
  tee: '<path d="M43 13 Q50 20 57 13" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="2"/>'
};
function garment(kind, color, pattern) {
  const id = "p" + Math.random().toString(36).slice(2, 8);
  let defs = "", fill = color;
  if (pattern === "striped") {
    defs = `<defs><pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${color}"/><rect width="8" height="3" fill="rgba(255,255,255,.55)"/></pattern></defs>`;
    fill = `url(#${id})`;
  } else if (pattern === "floral") {
    defs = `<defs><pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="${color}"/><circle cx="4" cy="4" r="2.2" fill="#fff" opacity=".8"/><circle cx="11" cy="10" r="1.6" fill="#ffd36b"/></pattern></defs>`;
    fill = `url(#${id})`;
  } else if (pattern === "checked") {
    defs = `<defs><pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${color}"/><rect width="5" height="10" fill="rgba(0,0,0,.18)"/><rect width="10" height="5" fill="rgba(255,255,255,.18)"/></pattern></defs>`;
    fill = `url(#${id})`;
  }
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${defs}<path d="${SHAPES[kind]}" fill="${fill}" stroke="rgba(0,0,0,.12)" stroke-width="1.5" stroke-linejoin="round"/>${DETAILS[kind] || ""}</svg>`;
}

/* ---------- Interactive wardrobe demo (sample data) ---------- */
const T_W = 3;   // wear count threshold
const T_D = 30;  // inactivity threshold (days)
const closetData = [
  { id: 1, name: "Navy Shirt",     kind: "shirt",    color: "#24407a", pattern: "plain",   fabric: "Cotton", wear: 6, days: 4,  dirty: false },
  { id: 2, name: "Beige Chinos",   kind: "trousers", color: "#d8b98a", pattern: "plain",   fabric: "Cotton", wear: 5, days: 4,  dirty: false },
  { id: 3, name: "Floral Dress",   kind: "dress",    color: "#ff5c93", pattern: "floral",  fabric: "Linen",  wear: 1, days: 47, dirty: false },
  { id: 4, name: "Denim Jacket",   kind: "jacket",   color: "#3d8bfd", pattern: "plain",   fabric: "Denim",  wear: 9, days: 2,  dirty: true  },
  { id: 5, name: "Striped Tee",    kind: "tee",      color: "#6b2bd9", pattern: "striped", fabric: "Cotton", wear: 3, days: 9,  dirty: false },
  { id: 6, name: "Batik Saree",    kind: "saree",    color: "#19c3a6", pattern: "plain",   fabric: "Silk",   wear: 0, days: 63, dirty: false },
  { id: 7, name: "Linen Skirt",    kind: "skirt",    color: "#ffb020", pattern: "plain",   fabric: "Linen",  wear: 2, days: 35, dirty: false },
  { id: 8, name: "Check Shirt",    kind: "shirt",    color: "#c0392b", pattern: "checked", fabric: "Cotton", wear: 4, days: 12, dirty: false },
  { id: 9, name: "White Tee",      kind: "tee",      color: "#f2eefb", pattern: "plain",   fabric: "Cotton", wear: 11, days: 1, dirty: true  }
];
const isForgotten = i => i.wear < T_W && i.days > T_D;

const outfits = [
  { ids: [1, 2], score: 92, why: "Navy shirt harmonizes with beige chinos, fits your professional persona and the cotton breathes in humid weather." },
  { ids: [3],    score: 88, why: "Not worn in 47 days. Breathable linen floral dress suits a casual outdoor lunch at 78% humidity." },
  { ids: [5, 7], score: 85, why: "Rarely worn linen skirt gets rotation priority. Purple stripes pair with warm yellow for a playful casual look." },
  { ids: [8, 2], score: 81, why: "Checked cotton shirt with beige chinos keeps a smart-casual balance for an air-conditioned office." }
];
let filter = "all";

const closetEl = document.getElementById("closet");
const pickItems = document.getElementById("pickItems");
const pickWhy = document.getElementById("pickWhy");
const pickScore = document.getElementById("pickScore");
const appFoot = document.getElementById("appFoot");

function bestOutfit() {
  // Prefer outfits whose items are all clean; boost ones containing forgotten items
  const avail = outfits
    .filter(o => o.ids.every(id => !closetData.find(c => c.id === id).dirty))
    .map(o => ({ ...o, rank: o.score + (o.ids.some(id => isForgotten(closetData.find(c => c.id === id))) ? 6 : 0) }))
    .sort((a, b) => b.rank - a.rank);
  return avail[0] || null;
}

function renderPick() {
  const o = bestOutfit();
  if (!o) {
    pickItems.innerHTML = "";
    pickScore.textContent = "–";
    pickWhy.textContent = "Everything in your outfits is in the laundry. Tap items to mark them washed.";
    return;
  }
  pickItems.innerHTML = o.ids.map(id => {
    const c = closetData.find(x => x.id === id);
    return `<div class="g" title="${c.name}">${garment(c.kind, c.color, c.pattern)}</div>`;
  }).join("");
  pickScore.textContent = o.score + "%";
  pickWhy.textContent = o.why;
  pickWhy.dataset.ids = o.ids.join(",");
}

function renderCloset() {
  const items = closetData.filter(i =>
    filter === "all" ? true :
    filter === "clean" ? !i.dirty :
    filter === "laundry" ? i.dirty :
    isForgotten(i)
  );
  closetEl.innerHTML = items.length ? items.map(i => `
    <li class="${i.dirty ? "dirty" : ""} ${isForgotten(i) ? "forgot" : ""}" data-id="${i.id}" tabindex="0"
        title="${i.name} · ${i.fabric} · ${i.dirty ? "In laundry" : "Clean"}">
      <span class="st"></span>
      ${garment(i.kind, i.color, i.pattern)}
      <span class="nm">${i.name}</span>
      <span class="wc">${i.wear}× worn · ${i.days}d</span>
    </li>`).join("")
    : `<li class="empty">No items here right now.</li>`;
}

function render() { renderCloset(); renderPick(); }

closetEl.addEventListener("click", e => {
  const li = e.target.closest("li[data-id]");
  if (!li) return;
  const item = closetData.find(c => c.id === Number(li.dataset.id));
  item.dirty = !item.dirty;
  appFoot.textContent = item.dirty ? `${item.name} moved to laundry` : `${item.name} washed and back in rotation`;
  render();
});
closetEl.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("li[data-id]")) { e.preventDefault(); e.target.click(); }
});

document.getElementById("wearPick").addEventListener("click", () => {
  const ids = (pickWhy.dataset.ids || "").split(",").filter(Boolean).map(Number);
  if (!ids.length) return;
  ids.forEach(id => {
    const c = closetData.find(x => x.id === id);
    c.wear += 1; c.days = 0; c.dirty = true;   // wear count + laundry logic
  });
  appFoot.textContent = "Wear count updated · items marked for laundry";
  render();
});

document.querySelectorAll(".filters .chip").forEach(btn =>
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters .chip").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    renderCloset();
  })
);

render();

/* ---------- Contact form (opens the visitor's email app) ---------- */
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const msg = form.elements.message.value.trim();
  if (!name || !email || !msg) { note.textContent = "Please fill in your name, email and message."; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note.textContent = "Please enter a valid email address."; return; }
  const subject = encodeURIComponent(`Wearza enquiry from ${name}`);
  const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  note.textContent = `Your email app should open with the message ready. If it doesn't, write to ${CONFIG.contactEmail}.`;
});

/* ---------- Demo video ---------- */
const demoBtn = document.getElementById("demoBtn");
const demoModal = document.getElementById("demoModal");
const demoVideo = document.getElementById("demoVideo");
if (demoBtn && demoModal && demoModal.showModal) {
  demoBtn.addEventListener("click", e => {
    e.preventDefault();
    demoModal.showModal();
    demoVideo.play().catch(() => {});
  });
  const closeDemo = () => demoModal.close();
  document.getElementById("demoClose").addEventListener("click", closeDemo);
  demoModal.addEventListener("click", e => { if (e.target === demoModal) closeDemo(); });
  demoModal.addEventListener("close", () => demoVideo.pause());
}
