/* =========================================================================
   Anmol Islamic General Store — Cart engine
   Persisted in localStorage so it survives across pages (index/shop/checkout).
   ========================================================================= */

const CART_KEY = "anmol_cart_v1";

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

function addToCart(id, qty = 1) {
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (line) { line.qty += qty; } else { cart.push({ id, qty }); }
  saveCart(cart);
  renderCartDrawer();
  const p = findProduct(id);
  const lang = getLang();
  bumpBadge();
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
function cartLineHTML(l, lang) {
  return `
    <div class="thumb">${icon(CATEGORIES.find(c => c.id === l.product.category)?.icon || "star")}</div>
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
      if (el) {
        // update only the numbers that changed — no re-render, no re-animate
        const qtyEls = el.querySelectorAll(".js-qty, .js-qty-text");
        qtyEls.forEach(q => { if (q.textContent != l.qty) q.textContent = l.qty; });
        const priceEl = el.querySelector(".js-line-price");
        const newPrice = formatPKR(l.lineTotal);
        if (priceEl && priceEl.textContent !== newPrice) priceEl.textContent = newPrice;
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
function openCart(){
  document.getElementById("cartOverlay")?.classList.add("open");
  requestAnimationFrame(() => {
    document.getElementById("cartDrawer")?.classList.add("open");
  });
  document.body.style.overflow = "hidden";
  miniCartForcedHidden = true;
  if(typeof refreshMiniCartVisibility === "function") refreshMiniCartVisibility();
}
function closeCart(){
  document.getElementById("cartOverlay")?.classList.remove("open");
  document.getElementById("cartDrawer")?.classList.remove("open");
  document.body.style.overflow = "";
  miniCartForcedHidden = false;
  if(typeof refreshMiniCartVisibility === "function") refreshMiniCartVisibility();
}

/* ADD this new function */
/* REPLACE with */
function renderMiniCartBar(){
  const bar = document.getElementById("miniCartBar");
  if(!bar) return;
  const lines = cartLinesWithData();
  bar.classList.toggle("show", lines.length > 0);
  if(lines.length === 0) return;

  const thumbsWrap = document.getElementById("miniCartThumbs");
  const recent = lines.slice(-3).reverse();
  thumbsWrap.innerHTML = recent.map(l => `
    <div class="mini-thumb">${icon(CATEGORIES.find(c=>c.id===l.product.category)?.icon || "star")}</div>
  `).join("");

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