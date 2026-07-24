/* =========================================================================
   3-up centered carousel: center card active/clickable, sides blurred
   ========================================================================= */

function carouselCardHTML(p, lang){
  const cat = CATEGORIES.find(c => c.id === p.category);
  const name = lang === "ur" ? p.name_ur : p.name_en;
  const media = p.image
    ? `<img src="${p.image}" alt="${name}" loading="lazy" draggable="false" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
       <div class="carousel-fallback" style="display:none;">${icon(cat.icon)}</div>`
    : `<div class="carousel-fallback">${icon(cat.icon)}</div>`;

  return `
    <div class="carousel-card" data-id="${p.id}">
      ${media}
      <div class="carousel-overlay">
        <h4>${name}</h4>
        <a href="shop.html?cat=${p.category}" class="btn btn-gold btn-sm" data-en="Buy now" data-ur="ابھی خریدیں">
          ${lang === "ur" ? "ابھی خریدیں" : "Buy now"}
        </a>
      </div>
    </div>`;
}

function initCarousel(sectionId, products){
  const wrap = document.getElementById(sectionId);
  if(!wrap || products.length === 0) return;

  const viewport = wrap.querySelector(".carousel-track-viewport");
  const track = wrap.querySelector(".carousel-track");
  const prevBtn = wrap.querySelector(".carousel-arrow.prev");
  const nextBtn = wrap.querySelector(".carousel-arrow.next");

  let lang = getLang();
  let index = 0; // index of the active (center) product
  const count = products.length;

  function render(){
    track.innerHTML = products.map(p => carouselCardHTML(p, lang)).join("");
    updateClasses();
  }

  function updateClasses(){
    const cards = [...track.querySelectorAll(".carousel-card")];
    cards.forEach((card, i) => {
      card.classList.remove("is-active", "is-side", "is-hidden");
      if(i === index){
        card.classList.add("is-active");
      } else if(i === index - 1 || i === index + 1){
        card.classList.add("is-side");
      } else {
        card.classList.add("is-hidden");
      }
    });
    updateArrows();
    center();
  }

  function updateArrows(){
    if(prevBtn) prevBtn.style.display = index <= 0 ? "none" : "flex";
    if(nextBtn) nextBtn.style.display = index >= count - 1 ? "none" : "flex";
  }

  function center(){
    const cards = track.querySelectorAll(".carousel-card");
    const activeCard = cards[index];
    if(!activeCard) return;

    const viewportRect = viewport.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();

    // current offset already applied to track, so compute from track's own position
    const trackRect = track.getBoundingClientRect();
    const cardOffsetInTrack = cardRect.left - trackRect.left;
    const cardCenter = cardOffsetInTrack + cardRect.width / 2;
    const viewportCenter = viewportRect.width / 2;

    const currentTransform = getTranslateX(track);
    const newOffset = currentTransform + (viewportCenter - (cardCenter + currentTransform)) - currentTransform;
    // simpler: compute desired offset directly relative to un-translated positions
    const naturalLeft = activeCard.offsetLeft;
    const naturalCenter = naturalLeft + activeCard.offsetWidth / 2;
    const desired = viewportRect.width / 2 - naturalCenter;

    track.style.transform = `translateX(${desired}px)`;
  }

  function getTranslateX(el){
    const style = window.getComputedStyle(el);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return matrix.m41;
  }

  function goTo(newIndex){
    if(newIndex < 0 || newIndex > count - 1) return;
    index = newIndex;
    updateClasses();
  }

prevBtn?.addEventListener("click", () => goTo(index - 1));
  nextBtn?.addEventListener("click", () => goTo(index + 1));

  // click on a side card also navigates to it (optional convenience, still not "active"/clickable until centered)
  track.addEventListener("click", (e) => {
    const card = e.target.closest(".carousel-card");
    if(!card) return;
    const cards = [...track.querySelectorAll(".carousel-card")];
    const clickedIndex = cards.indexOf(card);
    if(clickedIndex !== index){
      e.preventDefault();
      e.stopPropagation();
      goTo(clickedIndex);
    }
    // if clickedIndex === index, let the Buy now link work normally
  });

  // basic touch/drag support: swipe left/right to move one card at a time
  let startX = 0, isDown = false, dragged = false;
  const startDrag = (x) => { isDown = true; dragged = false; startX = x; };
  const endDrag = (x) => {
    if(!isDown) return;
    isDown = false;
    const delta = x - startX;
    if(Math.abs(delta) > 40){
      dragged = true;
      if(delta < 0) goTo(index + 1);
      else goTo(index - 1);
    }
  };
  viewport.addEventListener("mousedown", (e) => startDrag(e.clientX));
  window.addEventListener("mouseup", (e) => endDrag(e.clientX));
  viewport.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX), { passive: true });
  viewport.addEventListener("touchend", (e) => endDrag(e.changedTouches[0].clientX), { passive: true });

  window.addEventListener("resize", () => center());

  document.addEventListener("languagechange", () => {
    lang = getLang();
    render();
  });

  render();
}