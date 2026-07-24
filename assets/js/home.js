/* =========================================================================
   Anmol Islamic General Store — Homepage dynamic sections
   Category showcase + featured product carousGrid, rendered from products.js
   ========================================================================= */

function productCountInCategory(catId){
  return PRODUCTS.filter(p => p.category === catId).length;
}

function renderCategoryGrid(){
  const grid = document.getElementById("categoryGrid");
  if(!grid) return;
  const lang = getLang();
  grid.innerHTML = CATEGORIES.map(cat => `
    <a class="cat-card" href="shop.html?cat=${cat.id}">
      <div class="cat-icon-wrap">${icon(cat.icon)}</div>
      <h4 data-en="${cat.en}" data-ur="${cat.ur}">${lang === "ur" ? cat.ur : cat.en}</h4>
      <div class="cat-count">${productCountInCategory(cat.id)} <span data-en="items" data-ur="اشیاء">${lang === "ur" ? "اشیاء" : "items"}</span></div>
    </a>
  `).join("");
}

function productCardHTML(p){
  const lang = getLang();
  const cat = CATEGORIES.find(c => c.id === p.category);
  const badgeMap = {
    bestseller: { en: "Bestseller", ur: "بہترین فروخت" },
    new: { en: "New", ur: "نیا" },
    premium: { en: "Premium", ur: "پریمیم" }
  };
  const badge = p.badge && badgeMap[p.badge] ? `<span class="product-badge badge-${p.badge}">${lang === "ur" ? badgeMap[p.badge].ur : badgeMap[p.badge].en}</span>` : "";
  return `
    <div class="product-card">
      <div class="product-media">
        ${badge}
        ${icon(cat.icon)}
        <div class="quick-add">
          <button type="button" class="btn btn-dark btn-sm btn-block" onclick="addToCart('${p.id}')">
            <span data-en="Add to Cart" data-ur="ٹوکری میں شامل کریں">${lang === "ur" ? "ٹوکری میں شامل کریں" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
      <div class="product-body">
        <span class="product-cat-tag">${lang === "ur" ? cat.ur : cat.en}</span>
        <h4 class="product-title">${lang === "ur" ? p.name_ur : p.name_en}</h4>
        <p class="product-desc">${lang === "ur" ? p.desc_ur : p.desc_en}</p>
        <div class="product-foot">
          <div class="price">${p.oldPrice ? `<span class="old">${formatPKR(p.oldPrice)}</span>` : ""}${formatPKR(p.price)}</div>
          <button type="button" class="add-btn" aria-label="Add to cart" onclick="addToCart('${p.id}')">${icon("plus")}</button>
        </div>
      </div>
    </div>`;
}

function skeletonCardHTML(){
  return `
    <div class="product-card skeleton">
      <div class="product-media shimmer"></div>
      <div class="product-body">
        <div class="shimmer s-line" style="width:35%;height:10px;margin-bottom:10px;"></div>
        <div class="shimmer s-line s-title"></div>
        <div class="shimmer s-line s-desc"></div>
        <div class="shimmer s-line s-desc short"></div>
        <div class="product-foot">
          <div class="shimmer s-line s-price"></div>
        </div>
      </div>
    </div>`;
}

function renderFeaturedProducts(){
  const grid = document.getElementById("featuredGrid");
  if(!grid) return;
  const featured = PRODUCTS.filter(p => p.badge === "bestseller").slice(0, 8);

  grid.innerHTML = Array(featured.length || 8).fill(0).map(skeletonCardHTML).join("");
  setTimeout(() => {
    grid.innerHTML = featured.map(productCardHTML).join("");
  }, 550);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryGrid();
  renderFeaturedProducts();
});
document.addEventListener("languagechange", () => {
  renderCategoryGrid();
  const grid = document.getElementById("featuredGrid");
  if(grid && !grid.querySelector(".skeleton")){
    const featured = PRODUCTS.filter(p => p.badge === "bestseller").slice(0, 8);
    grid.innerHTML = featured.map(productCardHTML).join("");
  }
});
