/* =========================================================================
   Anmol Islamic General Store — Shop page
   Filtering, searching, sorting over the static PRODUCTS catalog.
   ========================================================================= */

/* REPLACE with */
const shopState = {
  category: "all",
  search: "",
  sort: "featured",
  maxPrice: 3000
};

function openFilterPanel(){
  document.getElementById("filterPanel")?.classList.add("open");
  document.getElementById("filterOverlay")?.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeFilterPanel(){
  document.getElementById("filterPanel")?.classList.remove("open");
  document.getElementById("filterOverlay")?.classList.remove("open");
  document.body.style.overflow = "";
}
function renderFilterPanel(){
  const list = document.getElementById("categoryFilterList");
  if(!list) return;
  const lang = getLang();
  const allActive = shopState.category === "all" ? "active" : "";
  let html = `
    <li class="cat-filter-item ${allActive}" data-cat="all">
      <span data-en="All Products" data-ur="تمام مصنوعات">${lang === "ur" ? "تمام مصنوعات" : "All Products"}</span>
      <span class="count">${PRODUCTS.length}</span>
    </li>`;
  html += CATEGORIES.map(cat => {
    const active = shopState.category === cat.id ? "active" : "";
    const count = productCountInCategory(cat.id);
    return `
      <li class="cat-filter-item ${active}" data-cat="${cat.id}">
        <span data-en="${cat.en}" data-ur="${cat.ur}">${lang === "ur" ? cat.ur : cat.en}</span>
        <span class="count">${count}</span>
      </li>`;
  }).join("");
  list.innerHTML = html;

  list.querySelectorAll(".cat-filter-item").forEach(item => {
    item.addEventListener("click", () => {
      shopState.category = item.dataset.cat;
      const params = new URLSearchParams(window.location.search);
      if(shopState.category === "all") params.delete("cat"); else params.set("cat", shopState.category);
      history.replaceState(null, "", "shop.html" + (params.toString() ? "?" + params.toString() : ""));
      renderFilterPanel();
      loadProducts();
      closeFilterPanel();
    });
  });
}

function getFilteredSortedProducts(){
  let list = PRODUCTS.slice();
  if(shopState.category !== "all") list = list.filter(p => p.category === shopState.category);
  if(shopState.search.trim()){
    const q = shopState.search.trim().toLowerCase();
    list = list.filter(p =>
      p.name_en.toLowerCase().includes(q) ||
      p.name_ur.includes(shopState.search.trim()) ||
      p.desc_en.toLowerCase().includes(q)
    );
  }
  list = list.filter(p => p.price <= shopState.maxPrice);

  switch(shopState.sort){
    case "price-asc": list.sort((a,b) => a.price - b.price); break;
    case "price-desc": list.sort((a,b) => b.price - a.price); break;
    case "name": list.sort((a,b) => a.name_en.localeCompare(b.name_en)); break;
    default:
      list.sort((a,b) => (b.badge === "bestseller") - (a.badge === "bestseller"));
  }
  return list;
}

function loadProducts(){
  const grid = document.getElementById("shopGrid");
  const countEl = document.getElementById("resultsCount");
  if(!grid) return;

  grid.innerHTML = Array(8).fill(0).map(skeletonCardHTML).join("");

  setTimeout(() => {
    const results = getFilteredSortedProducts();
    const lang = getLang();
    if(countEl){
      const label = lang === "ur" ? "نتائج" : "results";
      countEl.textContent = `${results.length} ${label}`;
    }
    if(results.length === 0){
      grid.innerHTML = `
        <div class="no-results">
          ${icon("search")}
          <p data-en="No products match your filters. Try clearing a filter or search term." data-ur="آپ کے فلٹرز سے کوئی مصنوعات میل نہیں کھاتیں۔ فلٹر یا تلاش کو صاف کریں۔">
            ${lang === "ur" ? "آپ کے فلٹرز سے کوئی مصنوعات میل نہیں کھاتیں۔ فلٹر یا تلاش کو صاف کریں۔" : "No products match your filters. Try clearing a filter or search term."}
          </p>
        </div>`;
      return;
    }
    grid.innerHTML = results.map(productCardHTML).join("");
  }, 480);
}

function initShopControls(){
  const params = new URLSearchParams(window.location.search);
  if(params.get("cat")) shopState.category = params.get("cat");

  const searchInput = document.getElementById("shopSearch");
  if(searchInput){
    let debounce;
    searchInput.addEventListener("input", (e) => {
      shopState.search = e.target.value;
      clearTimeout(debounce);
      debounce = setTimeout(loadProducts, 260);
    });
  }

  const sortSelect = document.getElementById("shopSort");
  if(sortSelect){
    sortSelect.addEventListener("change", (e) => {
      shopState.sort = e.target.value;
      loadProducts();
    });
  }

  const priceRange = document.getElementById("priceRange");
  const priceRangeMax = document.getElementById("priceRangeMax");
  if(priceRange){
    priceRange.addEventListener("input", (e) => {
      shopState.maxPrice = Number(e.target.value);
      if(priceRangeMax) priceRangeMax.textContent = "Rs " + shopState.maxPrice.toLocaleString("en-PK");
    });
    priceRange.addEventListener("change", loadProducts);
  }

  document.getElementById("clearFilters")?.addEventListener("click", (e) => {
    e.preventDefault();
    shopState.category = "all"; shopState.search = ""; shopState.sort = "featured"; shopState.maxPrice = 3000;
    if(searchInput) searchInput.value = "";
    if(sortSelect) sortSelect.value = "featured";
    if(priceRange) priceRange.value = 3000;
    if(priceRangeMax) priceRangeMax.textContent = "Rs 3,000";
    history.replaceState(null, "", "shop.html");
    renderFilterPanel();
    loadProducts();
    closeFilterPanel();
  });

 document.getElementById("mobileFilterToggle")?.addEventListener("click", openFilterPanel);
  document.getElementById("filterCloseBtn")?.addEventListener("click", closeFilterPanel);
  document.getElementById("filterOverlay")?.addEventListener("click", closeFilterPanel);
}

document.addEventListener("DOMContentLoaded", () => {
  initShopControls();
  renderFilterPanel();
  loadProducts();
});
document.addEventListener("languagechange", () => {
  renderFilterPanel();
  loadProducts();
});
