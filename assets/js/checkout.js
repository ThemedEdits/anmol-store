/* =========================================================================
   Anmol Islamic General Store — Checkout
   Renders the order summary and turns the filled form + cart into a
   pre-filled WhatsApp message sent to one of the two shop numbers.
   ========================================================================= */

const WHATSAPP_NUMBERS = [
  { label: "0311-3788002", value: "923113788002" },
  { label: "0333-3488764", value: "923333488764" }
];

function renderCheckoutSummary(){
  const wrap = document.getElementById("summaryItems");
  const emptyState = document.getElementById("checkoutEmptyState");
  const formSection = document.getElementById("checkoutFormSection");
  if(!wrap) return;

  const lines = cartLinesWithData();
  const lang = getLang();

  if(lines.length === 0){
    emptyState?.classList.remove("hidden");
    formSection?.classList.add("hidden");
    return;
  }
  emptyState?.classList.add("hidden");
  formSection?.classList.remove("hidden");

  const existing = new Map(
    Array.from(wrap.querySelectorAll(".cart-line")).map(el => [el.dataset.id, el])
  );
  const seen = new Set();
  let prevEl = null;

  lines.forEach(l => {
    seen.add(l.id);
    let el = existing.get(l.id);
    if(el){
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
      el.className = "cart-line js-enter";
      el.dataset.id = l.id;
      el.innerHTML = cartLineHTML(l, lang);
    }
    if(prevEl ? prevEl.nextSibling !== el : wrap.firstChild !== el){
      wrap.insertBefore(el, prevEl ? prevEl.nextSibling : wrap.firstChild);
    }
    prevEl = el;
  });

  existing.forEach((el, id) => {
    if(!seen.has(id)){
      el.style.transition = "opacity .25s ease, transform .25s ease";
      el.style.opacity = "0";
      el.style.transform = "translateX(12px)";
      setTimeout(() => el.remove(), 250);
    }
  });

  const subtotal = cartSubtotal();
  const shipping = subtotal >= 3000 || subtotal === 0 ? 0 : 200;
  const total = subtotal + shipping;

  document.getElementById("sumSubtotal").textContent = formatPKR(subtotal);
  const shipEl = document.getElementById("sumShipping");
  shipEl.textContent = shipping === 0 ? (lang === "ur" ? "مفت" : "Free") : formatPKR(shipping);
  document.getElementById("sumTotal").textContent = formatPKR(total);
}

function fieldValue(id) { return (document.getElementById(id)?.value || "").trim(); }

function validateCheckoutForm() {
  let valid = true;
  const required = [
    { id: "custName", msgEn: "Please enter your full name.", msgUr: "براہ کرم اپنا پورا نام درج کریں۔" },
    { id: "custPhone", msgEn: "Please enter a valid phone number.", msgUr: "براہ کرم درست فون نمبر درج کریں۔" },
    { id: "custAddress", msgEn: "Please enter your delivery address.", msgUr: "براہ کرم اپنا ترسیل کا پتہ درج کریں۔" },
    { id: "custCity", msgEn: "Please enter your city.", msgUr: "براہ کرم اپنا شہر درج کریں۔" }
  ];
  const lang = getLang();
  required.forEach(f => {
    const input = document.getElementById(f.id);
    const errorEl = document.getElementById(f.id + "Error");
    const fieldWrap = input.closest(".field");
    let ok = input.value.trim().length > 0;
    if (f.id === "custPhone" && ok) {
      ok = /^[0-9+\-\s]{7,15}$/.test(input.value.trim());
    }
    fieldWrap.classList.toggle("has-error", !ok);
    if (errorEl) errorEl.textContent = ok ? "" : (lang === "ur" ? f.msgUr : f.msgEn);
    if (!ok) valid = false;
  });
  return valid;
}

function buildWhatsAppMessage() {
  const lines = cartLinesWithData();
  const lang = getLang();
  const name = fieldValue("custName");
  const phone = fieldValue("custPhone");
  const address = fieldValue("custAddress");
  const city = fieldValue("custCity");
  const notes = fieldValue("custNotes");
  const subtotal = cartSubtotal();
  const shipping = subtotal >= 3000 ? 0 : 200;
  const total = subtotal + shipping;

  let msg = `*Anmol Islamic General Store*\n`;
  msg += `New Order / نیا آرڈر\n`;
  msg += `------------------------------\n`;
  lines.forEach((l, i) => {
    msg += `${i + 1}. ${l.product.name_en} (${l.product.name_ur})\n`;
    msg += `   Qty: ${l.qty} x Rs ${l.product.price.toLocaleString("en-PK")} = Rs ${l.lineTotal.toLocaleString("en-PK")}\n`;
  });
  msg += `------------------------------\n`;
  msg += `Subtotal: Rs ${subtotal.toLocaleString("en-PK")}\n`;
  msg += `Shipping: ${shipping === 0 ? "Free" : "Rs " + shipping.toLocaleString("en-PK")}\n`;
  msg += `Total: Rs ${total.toLocaleString("en-PK")}\n`;
  msg += `------------------------------\n`;
  msg += `Name: ${name}\n`;
  msg += `Phone: ${phone}\n`;
  msg += `Address: ${address}\n`;
  msg += `City: ${city}\n`;
  if (notes) msg += `Notes: ${notes}\n`;
  msg += `Payment: Cash on Delivery\n`;
  return msg;
}

function sendOrderToWhatsApp(numberValue) {
  if (!validateCheckoutForm()) {
    document.getElementById("formErrorsBanner")?.classList.remove("hidden");
    document.querySelector(".field.has-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  document.getElementById("formErrorsBanner")?.classList.add("hidden");
  const message = buildWhatsAppMessage();
  const url = `https://wa.me/${numberValue}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  // reflect a lightweight confirmation without losing the cart until they actually confirm on WhatsApp
  showToast(getLang() === "ur" ? "واٹس ایپ کھل رہا ہے۔۔۔" : "Opening WhatsApp...");
}

function initCheckout() {
  renderCheckoutSummary();
  document.querySelectorAll("[data-wa-number]").forEach(btn => {
    btn.addEventListener("click", () => sendOrderToWhatsApp(btn.dataset.waNumber));
  });
}

document.addEventListener("DOMContentLoaded", initCheckout);
document.addEventListener("languagechange", renderCheckoutSummary);
