/* =========================================================================
   Anmol Islamic General Store — Core site behaviour
   Language switching, header interactions, scroll reveals, page transitions.
   ========================================================================= */

const LANG_KEY = "anmol_lang";

function getLang(){
  return localStorage.getItem(LANG_KEY) || "en";
}

function applyLanguage(lang){
  localStorage.setItem(LANG_KEY, lang);
  document.body.classList.remove("lang-en", "lang-ur");
  document.body.classList.add("lang-" + lang);
  document.documentElement.setAttribute("lang", lang === "ur" ? "ur" : "en");
  document.documentElement.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");

  document.querySelectorAll("[data-en][data-ur]").forEach(el => {
    const text = lang === "ur" ? el.dataset.ur : el.dataset.en;
    if(text !== undefined) el.textContent = text;
  });
  document.querySelectorAll("[data-en-html][data-ur-html]").forEach(el => {
    const html = lang === "ur" ? el.dataset.urHtml : el.dataset.enHtml;
    if(html !== undefined) el.innerHTML = html;
  });
  document.querySelectorAll("[data-en-placeholder][data-ur-placeholder]").forEach(el => {
    el.placeholder = lang === "ur" ? el.dataset.urPlaceholder : el.dataset.enPlaceholder;
  });

  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // let page-specific scripts re-render dynamic (data-driven) content
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

function initLanguageSwitch(){
  applyLanguage(getLang());
  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
}

/* ---------- Header scroll state + mobile nav ---------- */
let miniCartForcedHidden = false;

function refreshMiniCartVisibility(){
  const bar = document.getElementById("miniCartBar");
  if(!bar || !bar.classList.contains("show")) return;
  const header = document.querySelector(".site-header");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
  const nearTop = window.scrollY < headerBottom + 40;
  const shouldHide = miniCartForcedHidden || nearTop;
  bar.classList.toggle("bar-hidden", shouldHide);
  bar.classList.toggle("bar-visible", !shouldHide);
}

function initHeader(){
  const header = document.querySelector(".site-header");
  if(header){
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 12);
      refreshMiniCartVisibility();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if(toggle && nav){
    const closeNav = () => {
      nav.classList.remove("open");
      toggle.innerHTML = icon("menu");
    };
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = nav.classList.toggle("open");
      toggle.innerHTML = open ? icon("close") : icon("menu");
    });
    nav.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", closeNav);
    });
    // close when clicking/tapping anywhere outside the open nav
    document.addEventListener("click", (e) => {
      if(nav.classList.contains("open") && !nav.contains(e.target) && !toggle.contains(e.target)){
        closeNav();
      }
    });
    // close on Escape for keyboard users
    document.addEventListener("keydown", (e) => {
      if(e.key === "Escape" && nav.classList.contains("open")) closeNav();
    });
  }
}

/* ---------- Scroll reveal ---------- */
function initReveal(){
  const targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if(!("IntersectionObserver" in window)){
    targets.forEach(t => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });
  targets.forEach(t => io.observe(t));
}

/* ---------- Page transition veil ---------- */
function initPageTransitions(){
  // 1) Reveal the page we just landed on: a veil starts fully covering the
  //    viewport, then shrinks away top-to-bottom.
  const enterVeil = document.createElement("div");
  enterVeil.className = "route-veil veil-enter";
  document.body.appendChild(enterVeil);
  // force the browser to paint the "covering" state first, then trigger
  // the transition on the next frame so it's actually animated.
  void enterVeil.offsetWidth;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      enterVeil.classList.add("veil-run");
    });
  });
  enterVeil.addEventListener("transitionend", () => enterVeil.remove());
  // safety net in case transitionend doesn't fire (e.g. reduced motion)
  setTimeout(() => enterVeil.remove(), 900);

  // 2) Cover the page before navigating away to the next internal page.
  document.querySelectorAll("a[href]").forEach(a => {
    const url = a.getAttribute("href");
    if(!url) return;
    if(url.startsWith("#")) return; // same-page anchor, no transition
    if(/^([a-z]+:)?\/\//i.test(url) || url.startsWith("mailto:") || url.startsWith("tel:")) return; // external
    if(a.target === "_blank" || a.hasAttribute("data-no-transition")) return;

    a.addEventListener("click", (e) => {
      // allow ctrl/cmd/middle-click to open in a new tab as usual
      if(e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();

      const leaveVeil = document.createElement("div");
      leaveVeil.className = "route-veil veil-leave";
      document.body.appendChild(leaveVeil);
      void leaveVeil.offsetWidth;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          leaveVeil.classList.add("veil-run");
        });
      });

      const go = () => { window.location.href = url; };
      leaveVeil.addEventListener("transitionend", go, { once: true });
      setTimeout(go, 600); // safety net
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitch();
  initHeader();
  initReveal();
  initPageTransitions();
});
