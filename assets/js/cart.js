/* =========================================================================
   Anmol Islamic General Store — Cart engine
   Persisted in localStorage so it survives across pages (index/shop/checkout).
   ========================================================================= */

const CART_KEY = "anmol_cart_v1";

/* ADD near the top, after CART_KEY */
function flyToCart(originEl, product){
  const cartIcon = document.querySelector('[data-open-cart]');
  if(!originEl || !cartIcon) return;

  const startRect = originEl.getBoundingClientRect();
  const endRect = cartIcon.getBoundingClientRect();

  const startWidth = startRect.width;
  const startHeight = startRect.height;
  const startTop = startRect.top;
  const startLeft = startRect.left;

  const fly = document.createElement("div");
  fly.className = "fly-item";
  fly.style.top = `${startTop}px`;
  fly.style.left = `${startLeft}px`;
  fly.style.width = `${startWidth}px`;
  fly.style.height = `${startHeight}px`;
  fly.style.borderRadius = "14px";
  // no transition yet — this first frame must render at full size instantly
  fly.style.transition = "none";

  const cat = CATEGORIES.find(c => c.id === product.category);
  fly.innerHTML = product.image
    ? `<img src="${product.image}" alt="" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
       <div class="fly-fallback" style="display:none;">${icon(cat.icon)}</div>`
    : `<div class="fly-fallback">${icon(cat.icon)}</div>`;

  document.body.appendChild(fly);
  void fly.offsetWidth;

  const endSize = 14;
  const endTop = endRect.top + endRect.height / 2 - endSize / 2;
  const endLeft = endRect.left + endRect.width / 2 - endSize / 2;
  const startCenterX = startLeft + startWidth / 2;
  const startCenterY = startTop + startHeight / 2;

  // phase 1: lift off at full size, travel most of the way, barely shrinking
  const midT = 0.55;
  const midLeft = startLeft + (endLeft - startLeft) * midT;
  const midTop = startTop + (endTop - startTop) * midT;
  const midWidth = startWidth * 0.7;
  const midHeight = startHeight * 0.7;

  requestAnimationFrame(() => {
    fly.style.transition = "transform .45s cubic-bezier(.3,.05,.3,1), left .45s cubic-bezier(.3,.05,.3,1), top .45s cubic-bezier(.3,.05,.3,1), width .45s cubic-bezier(.3,.05,.3,1), height .45s cubic-bezier(.3,.05,.3,1), border-radius .45s ease";
    fly.style.left = `${midLeft}px`;
    fly.style.top = `${midTop}px`;
    fly.style.width = `${midWidth}px`;
    fly.style.height = `${midHeight}px`;
    fly.style.borderRadius = "50%";
  });

  // phase 2: rapid shrink into the cart icon for the final stretch
  setTimeout(() => {
    fly.style.transition = "transform .35s cubic-bezier(.5,0,.75,0), left .35s cubic-bezier(.5,0,.75,0), top .35s cubic-bezier(.5,0,.75,0), width .35s cubic-bezier(.5,0,.75,0), height .35s cubic-bezier(.5,0,.75,0), opacity .35s ease, border-radius .35s ease";
    fly.style.left = `${endLeft}px`;
    fly.style.top = `${endTop}px`;
    fly.style.width = `${endSize}px`;
    fly.style.height = `${endSize}px`;
    fly.style.borderRadius = "50%";
    fly.style.opacity = "0.85";
  }, 460);

  setTimeout(() => {
    fly.remove();
    bumpBadge();
  }, 830);
}
function setButtonAdded(btn, type){
  if(!btn || btn.classList.contains("is-added")) return;
  btn.classList.add("is-added");
  clearTimeout(btn._addedTimer);
  btn._addedTimer = setTimeout(() => {
    btn.classList.remove("is-added");
  }, 1800);
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderMiniCartBar();
}

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

/* REPLACE with */
function addToCart(id, qty = 1, sourceEl = null){
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if(line){ line.qty += qty; } else { cart.push({ id, qty }); }
  saveCart(cart);
  renderCartDrawer();
  const p = findProduct(id);
  const lang = getLang();

  if(sourceEl){
    const mediaEl = sourceEl.closest(".product-card")?.querySelector(".product-media") || sourceEl;
    flyToCart(mediaEl, p);

    if(sourceEl.classList.contains("add-btn")){
      setButtonAdded(sourceEl, "circle");
    } else {
      const quickBtn = sourceEl.closest(".quick-add")?.querySelector(".btn") || sourceEl;
      setButtonAdded(quickBtn, "pill");
    }
  } else {
    bumpBadge();
  }
}

function updateQty(id, delta) {
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (!line) return;
  line.qty += delta;
  const filtered = line.qty <= 0 ? cart.filter(l => l.id !== id) : cart;
  saveCart(filtered);
  renderCartDrawer();
  if (typeof renderCheckoutSummary === "function") renderCheckoutSummary();
}

function removeFromCart(id) {
  const cart = getCart().filter(l => l.id !== id);
  saveCart(cart);
  renderCartDrawer();
  if (typeof renderCheckoutSummary === "function") renderCheckoutSummary();
}

function cartCount() {
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}

function cartLinesWithData() {
  return getCart().map(l => {
    const p = findProduct(l.id);
    return p ? { ...l, product: p, lineTotal: p.price * l.qty } : null;
  }).filter(Boolean);
}

function cartSubtotal() {
  return cartLinesWithData().reduce((sum, l) => sum + l.lineTotal, 0);
}

function formatPKR(n) {
  return "Rs " + n.toLocaleString("en-PK");
}

function updateCartBadge() {
  document.querySelectorAll(".cart-badge").forEach(badge => {
    const count = cartCount();
    badge.textContent = count;
    badge.classList.toggle("show", count > 0);
  });
}

function bumpBadge() {
  document.querySelectorAll(".cart-badge").forEach(b => {
    b.classList.remove("bump");
    void b.offsetWidth;
    b.classList.add("bump");
  });
}

/* ---------- Drawer ---------- */
function cartLineThumbHTML(l){
  const catIcon = icon(CATEGORIES.find(c=>c.id===l.product.category)?.icon || "star");
  if(l.product.image){
    return `<div class="thumb">
      <img src="${l.product.image}" alt="" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="thumb-fallback" style="display:none;">${catIcon}</div>
    </div>`;
  }
  return `<div class="thumb">${catIcon}</div>`;
}

function cartLineHTML(l, lang){
  return `
    ${cartLineThumbHTML(l)}
    <div class="info">
      <h5>${lang === "ur" ? l.product.name_ur : l.product.name_en}</h5>
      <div class="unit-price">${formatPKR(l.product.price)} × <span class="js-qty-text">${l.qty}</span></div>
      <div class="qty-stepper">
        <button type="button" onclick="updateQty('${l.id}',-1)" aria-label="Decrease quantity">${icon("minus")}</button>
        <span class="js-qty">${l.qty}</span>
        <button type="button" onclick="updateQty('${l.id}',1)" aria-label="Increase quantity">${icon("plus")}</button>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:10px;">
      <div class="line-price js-line-price">${formatPKR(l.lineTotal)}</div>
      <button type="button" class="remove-x" onclick="removeFromCart('${l.id}')" aria-label="Remove item">${icon("trash")}</button>
    </div>`;
}

function renderCartDrawer() {
  const wrap = document.getElementById("cartItems");
  if (!wrap) return;
  const lines = cartLinesWithData();
  const lang = getLang();

  if (lines.length === 0) {
    wrap.innerHTML = `
      <div class="cart-empty">
        ${icon("emptyCart")}
        <p data-en="Your cart is empty." data-ur="آپ کی ٹوکری خالی ہے۔">${lang === "ur" ? "آپ کی ٹوکری خالی ہے۔" : "Your cart is empty."}</p>
      </div>`;
  } else {
    wrap.querySelector(".cart-empty")?.remove();
    const existing = new Map(
      Array.from(wrap.querySelectorAll(".cart-line")).map(el => [el.dataset.id, el])
    );
    const seen = new Set();
    let prevEl = null;

    lines.forEach(l => {
      seen.add(l.id);
      let el = existing.get(l.id);
       if(el){
        // update only the numbers that changed — no re-render, no re-animate
        const qtyEls = el.querySelectorAll(".js-qty, .js-qty-text");
        qtyEls.forEach(q => { if(q.textContent != l.qty) q.textContent = l.qty; });
        const priceEl = el.querySelector(".js-line-price");
        const newPrice = formatPKR(l.lineTotal);
        if(priceEl && priceEl.textContent !== newPrice) priceEl.textContent = newPrice;
        const nameEl = el.querySelector(".info h5");
        const newName = lang === "ur" ? l.product.name_ur : l.product.name_en;
        if(nameEl && nameEl.textContent !== newName) nameEl.textContent = newName;
      } else {
        el = document.createElement("div");
        el.className = "cart-line";
        el.dataset.id = l.id;
        el.innerHTML = cartLineHTML(l, lang);
      }
      // ensure correct order without touching untouched nodes
      if (prevEl ? prevEl.nextSibling !== el : wrap.firstChild !== el) {
        wrap.insertBefore(el, prevEl ? prevEl.nextSibling : wrap.firstChild);
      }
      prevEl = el;
    });

    // remove lines that no longer exist (these get their own fade-out)
    existing.forEach((el, id) => {
      if (!seen.has(id)) {
        el.style.transition = "opacity .25s ease, transform .25s ease";
        el.style.opacity = "0";
        el.style.transform = "translateX(12px)";
        setTimeout(() => el.remove(), 250);
      }
    });
  }

  const subtotalEl = document.getElementById("cartSubtotal");
  if (subtotalEl) subtotalEl.textContent = formatPKR(cartSubtotal());
  const checkoutBtn = document.getElementById("cartCheckoutBtn");
  if (checkoutBtn) checkoutBtn.toggleAttribute("disabled", lines.length === 0);

  updateCartBadge();
}

/* REPLACE with */
let cartScrollLockY = 0;

function openCart(){
  document.getElementById("cartOverlay")?.classList.add("open");
  requestAnimationFrame(() => {
    document.getElementById("cartDrawer")?.classList.add("open");
  });
  cartScrollLockY = window.scrollY;
  document.body.classList.add("scroll-locked");
  document.body.style.top = `-${cartScrollLockY}px`;
  miniCartForcedHidden = true;
  if(typeof refreshMiniCartVisibility === "function") refreshMiniCartVisibility();
}
function closeCart(){
  document.getElementById("cartOverlay")?.classList.remove("open");
  document.getElementById("cartDrawer")?.classList.remove("open");
  const y = cartScrollLockY;
  document.body.classList.remove("scroll-locked");
  document.body.style.top = "";
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  requestAnimationFrame(() => {
    document.documentElement.style.scrollBehavior = "";
  });
  miniCartForcedHidden = false;
  if(typeof refreshMiniCartVisibility === "function") refreshMiniCartVisibility();
}

/* REPLACE with */
function renderMiniCartBar(){
  const bar = document.getElementById("miniCartBar");
  if(!bar) return;
  const lines = cartLinesWithData();
  bar.classList.toggle("show", lines.length > 0);
  if(lines.length === 0) return;

  const thumbsWrap = document.getElementById("miniCartThumbs");
  const recent = lines.slice(-3).reverse();
  thumbsWrap.innerHTML = recent.map(l => {
    const catIcon = icon(CATEGORIES.find(c=>c.id===l.product.category)?.icon || "star");
    if(l.product.image){
      return `<div class="mini-thumb">
        <img src="${l.product.image}" alt="" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="mini-thumb-fallback" style="display:none;">${catIcon}</div>
      </div>`;
    }
    return `<div class="mini-thumb">${catIcon}</div>`;
  }).join("");

  document.getElementById("miniCartTotal").textContent = formatPKR(cartSubtotal());
  if(typeof refreshMiniCartVisibility === "function") refreshMiniCartVisibility();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderCartDrawer();
  renderMiniCartBar();
  document.getElementById("cartOverlay")?.addEventListener("click", closeCart);
  document.getElementById("cartCloseBtn")?.addEventListener("click", closeCart);
  document.querySelectorAll("[data-open-cart]").forEach(btn => btn.addEventListener("click", (e) => { e.preventDefault(); openCart(); }));
  document.getElementById("miniCartBar")?.addEventListener("click", openCart);
  if(typeof refreshMiniCartVisibility === "function") refreshMiniCartVisibility();
});

document.addEventListener("languagechange", () => {
  renderCartDrawer();
});