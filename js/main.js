/**
 * Dapur Pasutri — Main Interactive Script
 * Pure Vanilla JavaScript (ES6+) matching Cimeler architecture
 */

const WHATSAPP_NUMBER = "6285775932525";

const ICON_WHATSAPP = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.07c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.3-1.64-.6-2.88-1.24-4.76-4.12-4.9-4.31-.14-.19-1.18-1.56-1.18-2.98s.74-2.11 1-2.4c.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48l-.44.51c-.14.14-.29.29-.13.57.16.29.71 1.18 1.53 1.91 1.05.94 1.94 1.23 2.22 1.37.28.14.45.12.61-.07.16-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.1 1.65.78 1.94.92.28.14.47.21.54.33.07.12.07.68-.17 1.35Z"/></svg>`;
const ICON_SHOPEE = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="#EE4D2D"><path d="M17 8h-1.5a3.5 3.5 0 0 0-7 0H7a2 2 0 0 0-2 2l-.8 9.2A2 2 0 0 0 6.2 21.4h11.6a2 2 0 0 0 2-2.2L19 10a2 2 0 0 0-2-2Zm-5-2a1.5 1.5 0 0 1 1.5 1.5h-3A1.5 1.5 0 0 1 12 6Zm-2.5 5.5a2.5 2.5 0 0 0 5 0V10h1.5v1.5a4 4 0 0 1-8 0V10h1.5v1.5Z"/></svg>`;
const ICON_TOKOPEDIA = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="#03AC0E"><path d="M19.4 6.7c-.5-.7-1.3-1.1-2.2-1.1-.3 0-.6 0-.8.1-.8-1.5-2.4-2.6-4.4-2.6-2 0-3.6 1.1-4.4 2.6-.2-.1-.5-.1-.8-.1-.9 0-1.7.4-2.2 1.1C3.8 7.9 3.5 9.7 3.5 12c0 4.7 3.8 8.5 8.5 8.5s8.5-3.8 8.5-8.5c0-2.3-.3-4.1-1.1-5.3zm-7.4-1.9c1.2 0 2.2.8 2.6 2h-5.2c.4-1.2 1.4-2 2.6-2zm-4.7 7.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5zm9.4 0c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5z"/></svg>`;

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function attr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function formatPrice(price) {
  if (price == null) return null;
  return `Rp ${(price).toLocaleString('id-ID')}`;
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html != null) node.innerHTML = html;
  return node;
}

// Render Featured Products Grid
function renderFeaturedGrid(products) {
  const grid = document.getElementById("product-grid-featured");
  if (!grid) return;
  grid.innerHTML = "";
  
  const featured = products.filter((p) => p.featured);
  featured.forEach((p) => {
    const card = el("article", "product-card");
    const waMsg = `Halo Dapur Pasutri, saya ingin pesan ${p.name}`;
    
    card.innerHTML = `
      <div class="product-photo">
        <span class="category-tag">${p.category}</span>
        <img src="${p.image}" alt="${attr(p.name)}" loading="lazy">
        <span class="price-badge">${formatPrice(p.price)}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="channel-actions">
          <a class="btn btn-order-wa btn-sm" href="${waLink(waMsg)}" target="_blank" rel="noopener">
            ${ICON_WHATSAPP} Pesan WhatsApp
          </a>
          ${p.shopee ? `
            <a class="channel-icon-btn" href="${attr(p.shopee)}" target="_blank" rel="noopener" aria-label="Beli ${attr(p.name)} di Shopee" title="Shopee">
              ${ICON_SHOPEE}
            </a>
          ` : ""}
          ${p.tokopedia ? `
            <a class="channel-icon-btn" href="${attr(p.tokopedia)}" target="_blank" rel="noopener" aria-label="Beli ${attr(p.name)} di Tokopedia" title="Tokopedia">
              ${ICON_TOKOPEDIA}
            </a>
          ` : ""}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Render Other Products Strip
function renderOtherStrip(products) {
  const strip = document.getElementById("product-grid-other");
  if (!strip) return;
  strip.innerHTML = "";
  
  const others = products.filter((p) => !p.featured);
  others.forEach((p) => {
    const card = el("article", "product-card");
    const waMsg = `Halo Dapur Pasutri, saya mau tanya ${p.name}`;
    
    card.innerHTML = `
      <div class="product-photo" style="height: 200px;">
        <span class="category-tag">${p.category}</span>
        <img src="${p.image}" alt="${attr(p.name)}" loading="lazy">
        <span class="price-badge">${formatPrice(p.price)}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="channel-actions">
          <a class="btn btn-primary btn-sm btn-block" href="${waLink(waMsg)}" target="_blank" rel="noopener">
            ${ICON_WHATSAPP} Pesan Menu Ini
          </a>
        </div>
      </div>
    `;
    strip.appendChild(card);
  });
}

// Render Promos
function renderPromos(promos) {
  const section = document.getElementById("promo");
  const list = document.getElementById("promo-list");
  if (!section || !list) return;

  if (!promos || promos.length === 0) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  list.innerHTML = "";
  promos.forEach((p) => {
    const panel = el("article", "promo-panel");
    panel.innerHTML = `
      <div class="promo-copy">
        <span class="promo-badge">Promo Spesial Pasutri</span>
        <h2 class="promo-title">${p.title}</h2>
        <p class="promo-body">${p.desc}</p>
        <a class="btn btn-primary btn-lg" href="${waLink(`Halo Dapur Pasutri, saya mau klaim Promo: "${p.title}"`)}" target="_blank" rel="noopener">
          Ambil Promo Sekarang
        </a>
      </div>
      <div class="promo-visual">
        <img src="${p.image}" alt="${attr(p.title)}" loading="lazy">
      </div>
    `;
    list.appendChild(panel);
  });
}

// Load dynamic data via Fetch API
async function loadPromos() {
  const section = document.getElementById("promo");
  try {
    const res = await fetch("data/promos.json");
    if (res.ok) {
      const promos = await res.json();
      renderPromos(promos);
    }
  } catch (err) {
    console.error("Gagal memuat data promo:", err);
    if (section) section.hidden = true;
  }
}

async function loadProducts() {
  try {
    const res = await fetch("data/products.json");
    if (res.ok) {
      const products = await res.json();
      renderFeaturedGrid(products);
      renderOtherStrip(products);
    }
  } catch (err) {
    console.error("Gagal memuat data produk:", err);
  }
}

// Infinite Carousel for Feature List
function setupFeatureCarousel() {
  const track = document.getElementById("feature-list");
  const prevBtn = document.getElementById("feature-prev");
  const nextBtn = document.getElementById("feature-next");
  if (!track) return;

  const originalItems = Array.from(track.children);
  const count = originalItems.length;
  if (count === 0) return;

  // Duplicate items for infinite slide loop
  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let busy = false;

  function itemStep() {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    return originalItems[0].getBoundingClientRect().width + gap;
  }

  const SLIDE_MS = 420;

  function next() {
    if (busy) return;
    if (index === count - 1) {
      busy = true;
      track.scrollTo({ left: count * itemStep(), behavior: "smooth" });
      index = 0;
      window.setTimeout(() => {
        track.scrollTo({ left: 0, behavior: "auto" });
        busy = false;
      }, SLIDE_MS);
    } else {
      index += 1;
      track.scrollTo({ left: index * itemStep(), behavior: "smooth" });
    }
  }

  function prev() {
    if (busy) return;
    if (index === 0) {
      busy = true;
      track.scrollTo({ left: count * itemStep(), behavior: "auto" });
      index = count - 1;
      track.scrollTo({ left: index * itemStep(), behavior: "smooth" });
      window.setTimeout(() => { busy = false; }, SLIDE_MS);
    } else {
      index -= 1;
      track.scrollTo({ left: index * itemStep(), behavior: "smooth" });
    }
  }

  let timer = null;
  function startAutoplay() {
    if (prefersReducedMotion) return;
    timer = setInterval(next, 3000);
  }
  function restartAutoplay() {
    if (timer) clearInterval(timer);
    startAutoplay();
  }

  prevBtn?.addEventListener("click", () => {
    prev();
    restartAutoplay();
  });
  nextBtn?.addEventListener("click", () => {
    next();
    restartAutoplay();
  });

  window.addEventListener("resize", () => {
    track.scrollTo({ left: index * itemStep(), behavior: "auto" });
  });

  startAutoplay();
}

// Mobile Navigation Toggle
function setupNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ScrollSpy Navigation Highlight
function setupScrollSpy() {
  const links = Array.from(document.querySelectorAll('#main-nav a[href^="#"]'));
  const targets = links.map((a) => {
    const ids = [a.getAttribute("href").slice(1)].concat((a.dataset.also || "").split(",").filter(Boolean));
    return [a, ids.map((id) => document.getElementById(id)).filter(Boolean)];
  });
  const header = document.querySelector(".site-header");

  function update() {
    targets.forEach(([a, els]) => {
      if (els.length) a.hidden = els.every((el) => el.hidden);
    });

    const line = (header ? header.offsetHeight : 0) + window.innerHeight / 3;
    let current = null;
    targets.forEach(([a, els]) => {
      if (els.some((el) => !el.hidden && el.getBoundingClientRect().top <= line)) {
        current = a;
      }
    });

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) current = links[links.length - 1];

    links.forEach((a) => a.classList.toggle("is-active", a === current));
  }

  let lastRun = 0;
  let trailing = null;
  window.addEventListener("scroll", () => {
    const now = Date.now();
    if (now - lastRun >= 100) {
      lastRun = now;
      update();
    } else if (trailing === null) {
      trailing = window.setTimeout(() => {
        trailing = null;
        lastRun = Date.now();
        update();
      }, 100);
    }
  }, { passive: true });

  window.addEventListener("resize", update);
  update();
  return update;
}

// Showcase Slider for Corporate / Maklon
function setupShowcaseSlider() {
  const slider = document.getElementById("showcase-slider");
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll(".showcase-slides img"));
  const dotsWrap = slider.querySelector(".showcase-dots");
  if (slides.length < 2 || !dotsWrap) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer = null;

  dotsWrap.innerHTML = "";
  const dots = slides.map((img, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Foto ${i + 1}`);
    dot.addEventListener("click", () => {
      show(i);
      restartAutoplay();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((img, n) => img.classList.toggle("is-active", n === index));
    dots.forEach((dot, n) => {
      dot.classList.toggle("is-active", n === index);
      dot.setAttribute("aria-current", String(n === index));
    });
  }

  function startAutoplay() {
    if (prefersReducedMotion) return;
    timer = setInterval(() => show(index + 1), 3500);
  }
  function restartAutoplay() {
    if (timer) clearInterval(timer);
    startAutoplay();
  }

  show(0);
  startAutoplay();
}

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupNav();
  setupFeatureCarousel();
  setupShowcaseSlider();
  const refreshNav = setupScrollSpy();
  loadPromos().finally(refreshNav);
});
