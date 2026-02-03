function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeUseCases(appsText) {
  const s = (appsText || "")
    .replaceAll(" and ", ", ")
    .replaceAll("&", ", ");
  return s
    .split(",")
    .map(x => x.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

// ===== Scroll Hero Parallax =====
(function initScrollHero(){
  const hero = document.querySelector(".scrollHero");
  const sticky = document.querySelector(".scrollHero__sticky");
  const text = document.getElementById("heroText");
  const media = document.querySelector(".scrollHero__media");

  

  if (!hero || !sticky || !text || !media) return;

  let ticking = false;

  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

  function update(){
    ticking = false;

    const rect = hero.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // progress: 0 when hero top hits viewport top, 1 when hero scroll is done
    const totalScroll = hero.offsetHeight - viewportH;
    const scrolled = clamp(-rect.top, 0, totalScroll);
    const p = totalScroll === 0 ? 0 : scrolled / totalScroll;

    // TEXT moves faster upward (parallax)
    // Increase 120 -> stronger effect
    const textY = - (p * 140);                // moves up
    const textOpacity = clamp(1 - p * 1.2, 0, 1);

    text.style.transform = `translateY(${textY}px)`;
    text.style.opacity = String(textOpacity);

    // MEDIA slight zoom + tiny upward movement for elegance
    const mediaScale = 1.02 + p * 0.06;
    const mediaY = -(p * 12);
    media.style.transform = `translateY(${mediaY}px) scale(${mediaScale})`;
  }

  function onScroll(){
    if (!ticking){
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { update(); }, { passive: true });
})();


function categorize(appsText) {
  const a = (appsText || "").toLowerCase();
  if (a.includes("mocktails")) return "mocktail"
  if (a.includes("coffee") || a.includes("latte") || a.includes("frappe")) return "coffee";
  if (a.includes("milkshake") || a.includes("shakes") || a.includes("ice cream") )return "shake";
}

function labelForCategory(cat) {
  return ({
    mocktail: "Mocktail/Cocktail",
    coffee: "Coffee",
    shake: "Shakes",
  }[cat] || "Flavour");
}

// ===== Products (same dataset you already approved) =====
const PRODUCTS = [
  { name:"Mojito Mint", sizeMl:1000,
    img:"images/mojitomint.png", desc:"  Our Mojito Mint Syrup captures the invigorating freshness of mint leaves, perfect for creating the classic mojito flavor. It delivers a cool, crisp taste, enhancing your drinks with a burst of minty freshness", applications:"Great for Cocktails, Mocktails, Lemonades, Iced Teas" },
  { name:"Blue Curacao", sizeMl:1000,
    img:"images/bluecuracao.svg",desc:" Our Blue Curaçao Syrup brings the vibrant, citrusy flavor of tropical blue curaçao to your drinks. It offers a burst of tangy sweetness, adding a bright and exotic twist to any beverage.", applications:"Ideal for Cocktails, Mocktails, Sodas, Desserts" },
  { name:"India Masala", sizeMl:1000,
    img:"images/indianMasala.svg", desc:" Our Indian Masala Syrup is a spice-infused delight, reflecting the rich flavors of traditional Indian spices. This syrup adds a warm, aromatic twist to your drinks, making them uniquely flavorful.", applications:"Ideal for Cocktails, Mocktails, Sodas, Desserts" },
  { name:"Green Apple", sizeMl:1000,
    img:"images/green apple.svg", desc:" Our Green Apple Syrup delivers a crisp, tangy apple taste, reminiscent of a fresh orchard. Crafted with precision, it adds a refreshing twist to any drink, making it truly unforgettable.", applications:"Great for Cocktails, Mocktails, Sodas, and Smoothies" },
  { name:"Coconut", sizeMl:1000,
    img:"images/coconut.svg", desc:" Infused with the rich, tropical essence of coconut, our Coconut Syrup brings a taste of paradise to your drinks. This syrup adds a creamy, exotic flavor that enhances every sip.", applications:"Perfect for Cocktails, Mocktails, Milkshakes, and Desserts" },
  { name:"Kiwi", sizeMl:1000,
    img:"images/kiwi.png", desc:" Our Kiwi Syrup delivers a fresh, tangy kiwi taste that adds a tropical, refreshing note to beverages and desserts.", applications:"Ideal for Cocktails, Mocktails, Sodas, and Spa Water" },
  { name:"Strawberry", sizeMl:1000,
    img:"images/strawberry.svg", desc:" Our Strawberry Syrup offers a sweet, fruity burst of ripe strawberries, perfect for enhancing a wide range of drinks and desserts.", applications:"Perfect for Cocktails, Mocktails and Sodas" },
  { name:"Passion Fruit", sizeMl:1000, 
    img:"images/passionfruit.svg" ,desc:" Our Passion Fruit Syrup brings a tropical sweetness with a tangy edge, making every sip bright and refreshing.", applications:"Great for Cocktails, Mocktails, Lemonades and Spritzers" },
  { name:"Grenadine", sizeMl:1000,
    img:"images/grenadine.svg" ,desc:" Our Grenadine Syrup delivers a rich, sweet-tart profile—perfect for classic cocktails, mocktails, and vibrant drink presentations.", applications:"Ideal for Cocktails, Mocktails, Lemonades, and Desserts" },
  { name:"Butterscotch", sizeMl:1000, 
    img:"images/butterscotch.svg" , desc:" Our Butterscotch Syrup delivers deep caramel warmth with a buttery finish—perfect for shakes and desserts.", applications:"Perfect for Milkshakes, Desserts, and Pancakes" },
  { name:"Roasted Hazelnut", sizeMl:1000, 
    img:"images/hazelnut.svg" , desc:" Our Hazelnut Syrup gives a smooth, nutty aroma and rich flavour, ideal for café-style drinks and sweet applications.", applications:"Great for Coffee, Milkshakes, and Desserts" },
  { name:"Salted Caramel", sizeMl:1000, 
    img:"images/caramel.svg" , desc:" Our Caramel Syrup offers a classic, buttery sweetness that elevates coffees, frappes, and dessert plates.", applications:"Ideal for Coffee, Milkshakes, Desserts, and Pancakes" },
  { name:"Pineapple", sizeMl:1000, 
    img:"images/pineapple.svg" ,desc:" Our Pineapple Syrup brings a tropical sweetness that instantly brightens drinks and desserts.", applications:"Great for Cocktails, Mocktails, Sodas, and Desserts" },
  { name:"Pina Colada", sizeMl:1000, 
    img:"images/pinacolada.svg" ,desc:"Our Pina Colada Syrup captures the tropical cocktail vibe—creamy, fruity, and refreshing.", applications:"Perfect for Cocktails, Mocktails, Milkshakes, and Desserts" },
  { name:"Blue Berry", sizeMl:1000, 
    img:"images/blueberry.svg" ,desc:" Our Blue Berry Syrup offers a sweet berry profile that pairs well across beverages and desserts.", applications:"Ideal for Cocktails, Mocktails, Sodas, and Desserts" },
  { name:"Cold Coffee", sizeMl:1000, 
    img:"images/coldcoffeen.svg" , desc:" Our Coffee Syrup adds café depth and roasted notes—perfect for beverage menus and dessert builds.", applications:"Perfect for Coffee, Milkshakes, Desserts" },
  { name:"Irish Cream", sizeMl:1000, 
    img:"images/irish.svg" , desc:" Our Irish Syrup gives a smooth, rich profile inspired by classic Irish-style café flavours.", applications:"Ideal for Coffee, Milkshakes, Desserts" },
  { name:"Cookies & Cream", sizeMl:1000, 
    img:"images/cookiecream.svg" , desc:" This syrup is crafted to deliver the comforting taste of cookies blended into creamy sweetness—perfect for indulgent menus.", applications:"Perfect for  Milkshakes,and Desserts" },
  { name:"French Vanilla", sizeMl:1000, 
    img:"images/french.svg" , desc:" Handcrafted from the finest vanilla flavour profile, our Vanilla Syrup adds smooth sweetness across café and dessert creations.", applications:"Ideal for Coffee, Milkshakes, Desserts" },
  { name:"Cinnamon", sizeMl:1000, 
    img:"images/cinnamon.svg" , desc:" Our Cinnamon Syrup provides warm spice notes—ideal for specialty coffees, shakes, and dessert toppings.", applications:"Great for Coffee, Milkshakes, Desserts" },
  { name:"Malt Whiskey", sizeMl:1000, 
    img:"images/malt whisky.svg" ,desc:" Our Malt Whiskey Flavor Syrup is an innovation that captures the taste of single malt whiskey but with zero alcohol. ", applications:"Great for Mocktails." },
  { name:"Triple Sec", sizeMl:1000,
    img:"images/triplesec.svg" , desc:" Whether you're mixing up margaritas, cosmopolitans, or lemonades, this syrup adds a bright and flavorful punch to any cocktail or mocktail creation giving out citrusy zest with the perfect blend of oranges and spices.", applications:"Great for Cocktails, Mocktails, Lemonades and Spritzers" },
  { name:"Watermelon", sizeMl:1000, 
    img:"images/watermelon.svg" ,desc:"  Our Watermelon Syrup captures the light, refreshing essence of ripe watermelon. It adds a crisp, juicy taste to your drinks, making them a perfect refreshment for any occasion.", applications:"Ideal for Cocktails, Mocktails, Sodas, and Spa Water" },
  { name:"Black Widow", sizeMl:1000, 
    img:"images/blackwidow.svg" ,desc:" Our Black Widow syrup, a unique, black-colored creation designed to deliver the energizing taste of Red Bull with zero caffeine or any cough syrup aftertaste. Our Black Widow syrup offers a safe and enjoyable beverage experience for all ages.", applications:"Ideal for Cocktails, Mocktails, Sodas, Energy Drinks" },
  { name:"Rose", sizeMl:1000, 
    img:"images/rose.svg" ,desc:" Our Rose Syrup captures the delicate essence of fresh roses. Each batch is crafted with care to add a romantic touch to your drinks, imparting a subtle sweetness and enchanting aroma.", applications:"Ideal for Mocktails, Cocktails, Desserts, and Tea Flavoring." },
  { name:"Cucumber", sizeMl:1000,
    img:"images/cucumbar.svg", desc:"  Our Cucumber Syrup captures the cool, refreshing essence of fresh cucumbers. It adds a crisp, clean taste to your drinks, making them a perfect refreshment for any occasion.", applications:"Ideal for Cocktails, Mocktails, Sodas, and Spa Water" },
  { name:"Lemon Tea", sizeMl:1000, 
    img:"images/lemontea.svg" ,desc:" Our Lemon Tea Syrup blends citrus with spice for a bold, refreshing twist.", applications:"Perfect for Lemonades, Sodas, Mocktails" },
  { name:"Blood Orange", sizeMl:1000, 
    img:"images/blood orange.svg" ,desc:" Our Blood Orange Syrup embodies the revitalizing essence of Sicilian blood oranges. Crafted with meticulous attention to detail, it delivers the invigorating zest and tantalizing tanginess of fresh blood oranges.", applications:"Perfect for Cocktails, Mocktails, Desserts, and Salad Dressings" },
  { name:"Bubblegum", sizeMl:1000, 
    img:"images/bubble.svg" , desc:" Unleashing a burst of nostalgic sweetness, our Bubblegum Syrup is crafted to perfection. Drawing on our vast industry knowledge, this syrup delivers the classic bubblegum flavor, adding a playful and vibrant twist to your drinks", applications:"Great for Milkshakes, Sodas, and Desserts." },
  { name:"Shahi Kulfi", sizeMl:1000, 
    img:"images/shahi.svg" , desc:" Made with 100% natural cane sugar (no invert syrup), Our Shahi Kulfi Syrup brings the rich, creamy flavor of traditional Indian kulfi to your beverages. Infused with hints of cardamom and pistachio, this syrup transforms your drinks into a luxurious, aromatic delight.", applications:"Ideal for Milkshakes, Desserts, Cocktails" },
  { name:"Saffron Cream", sizeMl:1000, 
    img:"images/saffron.svg" , desc:" Indulge in the luxurious essence of saffron-infused cream with our Saffron Cream Syrup. Crafted with premium saffron threads and rich cream, this syrup offers a delicate balance of floral notes and creamy richness.", applications:"Great for Milkshakes, amd Desserts Flavoring. " },
  { name:"Rose", sizeMl:1000, 
    img:"images/rose.svg" ,desc:" Our Rose Syrup captures the delicate essence of fresh roses. Each batch is crafted with care to add a romantic touch to your drinks, imparting a subtle sweetness and enchanting aroma.", applications:"Ideal for Milkshakes, Desserts, and Tea Flavoring." },
  { name:"Cold Coffee", sizeMl:1000, 
    img:"images/coldcoffee.svg" , desc:" Our Syrup adds café depth and roasted notes—perfect for beverage menus and dessert builds.", applications:"Perfect for  Milkshakes, and Desserts" },
  { name:"Red Velvet", sizeMl:1000,  
    img:"images/redvelvet.svg" ,desc:" Our Red Velvet Syrup captures the smooth, indulgent essence of red velvet. It adds a rich, creamy taste to your drinks, making them ideal for indulgent beverage creations.", applications:"Ideal for Milkshakes, Desserts, Cocktails" },
].map(p => ({
  ...p,
  useCases: normalizeUseCases(p.applications),
  category: categorize(p.applications)
}));

const ADDITIONAL_FLAVOURS = [
  "Peach Tea","Kiwi","Cold Coffee","Raspberry","Paan","Grapes","Green Mint","Malt",
  "Energy Drink","French Vanilla","Tiramisu","Red Velvet","Nimbu Shikanji",
  "Guava Masala","Bar Lemonade","Rose Kulfi"
];

const grids = {
  mocktail: document.getElementById("grid-mocktail"),
  coffee: document.getElementById("grid-coffee"),
  shake: document.getElementById("grid-shake"),
  soda: document.getElementById("grid-soda"),
};

const yearEl = document.getElementById("year");
const searchEl = document.getElementById("search");
const moreFlavoursEl = document.getElementById("moreFlavours");
const chips = Array.from(document.querySelectorAll(".chip"));

const modal = document.getElementById("modal");
const backdrop = document.getElementById("backdrop");
const closeModalBtn = document.getElementById("closeModal");
const closeModalBtn2 = document.getElementById("closeModal2");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDesc = document.getElementById("modalDesc");
const modalApps = document.getElementById("modalApps");
const modalCat = document.getElementById("modalCat");
const addToCartBtn = document.getElementById("addToCart");

const cartBtn = document.getElementById("cartBtn");
const drawer = document.getElementById("drawer");
const closeDrawerBtn = document.getElementById("closeDrawer");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");

let activeChip = "all";
let activeProduct = null;
let cart = new Map(); 

function productCard(p) {
  const imgUrl = p.img ? `style="background-image:url('${p.img}')" ` : "";

  return `
    <article class="product">
      <div class="product__img" ${imgUrl} aria-hidden="true"></div>

      <div class="product__body">
        <div class="product__top">
          <div>
            <h4 class="product__name">${escapeHtml(p.name)}</h4>
            <div class="product__meta">${p.sizeMl || 1000} ml</div>
          </div>
          <div class="product__pill">${escapeHtml(labelForCategory(p.category))}</div>
        </div>

        <p class="product__desc">${escapeHtml(p.desc)}</p>

        <div class="product__actions">
          <button class="smallBtn" type="button" data-action="details" data-name="${escapeHtml(p.name)}">Details</button>
          <button class="smallBtn smallBtn--primary" type="button" data-action="add" data-name="${escapeHtml(p.name)}">Add</button>
        </div>
      </div>
    </article>
  `;
}


function clearGrids() {
  Object.values(grids).forEach(g => g && (g.innerHTML = ""));
}

function matchesFilters(p, q) {
  const query = q.trim().toLowerCase();
  const hay = (p.name + " " + p.desc + " " + p.applications).toLowerCase();

  const chipOk = (activeChip === "all") ? true : p.category === activeChip;
  const searchOk = query ? hay.includes(query) : true;

  return chipOk && searchOk;
}

function renderAll() {
  const q = searchEl.value || "";
  const list = PRODUCTS.filter(p => matchesFilters(p, q));

  const grouped = { mocktail: [], coffee: [], shake: [], soda: [] };
  list.forEach(p => grouped[p.category]?.push(p));
  Object.keys(grouped).forEach(k => grouped[k].sort((a,b)=>a.name.localeCompare(b.name)));

  clearGrids();

  Object.entries(grouped).forEach(([cat, items]) => {
    const grid = grids[cat];
    if (!grid) return;
    grid.innerHTML = items.map(productCard).join("") || `<div class="muted">No items found.</div>`;
  });
}

function renderAdditionalFlavours() {
  moreFlavoursEl.innerHTML = ADDITIONAL_FLAVOURS.map(f => `<li>${escapeHtml(f)}</li>`).join("");
}

// ===== Modal =====
function openModal(p) {
  activeProduct = p;

  modalTitle.textContent = p.name;
  modalMeta.textContent = `${p.sizeMl || 1000} ml bottle`;
  modalDesc.textContent = p.desc;
  modalApps.textContent = p.applications;
  modalCat.textContent = labelForCategory(p.category);

  // ✅ Set image in modal (with fallback)
  const modalImg = document.querySelector(".modal__img");

  if (p.img) {
    modalImg.style.background =
      `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,0)),
       url('${p.img}') center / cover no-repeat`;
  } else {
    modalImg.style.background =
      `radial-gradient(320px 160px at 20% 40%, rgba(28,124,106,.16), transparent 60%),
       radial-gradient(320px 160px at 70% 70%, rgba(215,181,109,.16), transparent 60%),
       linear-gradient(180deg, #f2f4f6, #fff)`;
  }

  backdrop.hidden = false;
  modal.showModal();
}

function closeModal() {
  if (modal.open) modal.close();
  backdrop.hidden = true;
  activeProduct = null;
}

// ===== Cart (Inquiry drawer) =====
function updateCartCount() {
  let count = 0;
  for (const qty of cart.values()) count += qty;
  cartCountEl.textContent = String(count);
}

function renderCart() {
  if (cart.size === 0) {
    cartItemsEl.innerHTML = `<p class="muted">No items added yet.</p>`;
    return;
  }

  const rows = [];
  for (const [name, qty] of cart.entries()) {
    rows.push(`
      <div class="drawerItem">
        <div class="drawerItem__top">
          <div>
            <div class="drawerItem__name">${escapeHtml(name)}</div>
            <div class="drawerItem__meta">1000 ml • Inquiry quantity</div>
          </div>
          <button class="smallBtn" type="button" data-cart="removeAll" data-name="${escapeHtml(name)}">Remove</button>
        </div>
        <div class="drawerItem__actions">
          <div class="qty">
            <button type="button" data-cart="dec" data-name="${escapeHtml(name)}">−</button>
            <strong>${qty}</strong>
            <button type="button" data-cart="inc" data-name="${escapeHtml(name)}">+</button>
          </div>
          <span class="muted small">${labelForCategory(PRODUCTS.find(p=>p.name===name)?.category || "all")}</span>
        </div>
      </div>
    `);
  }
  cartItemsEl.innerHTML = rows.join("");
}

function addToCart(name) {
  cart.set(name, (cart.get(name) || 0) + 1);
  updateCartCount();
  renderCart();
}

function openDrawer() {
  drawer.classList.add("isOpen");
  drawer.setAttribute("aria-hidden", "false");
  renderCart();
}

function closeDrawer() {
  drawer.classList.remove("isOpen");
  drawer.setAttribute("aria-hidden", "true");
}

// ===== Events =====
document.addEventListener("click", (e) => {
  const detailsBtn = e.target.closest("[data-action='details']");
  const addBtn = e.target.closest("[data-action='add']");
  const chipBtn = e.target.closest(".chip");
  const cartAction = e.target.closest("[data-cart]");

  if (detailsBtn) {
    const name = detailsBtn.getAttribute("data-name");
    const p = PRODUCTS.find(x => x.name === name);
    if (p) openModal(p);
  }

  if (addBtn) {
    const name = addBtn.getAttribute("data-name");
    addToCart(name);
    openDrawer();
  }

  if (chipBtn) {
    chips.forEach(c => c.classList.remove("isActive"));
    chipBtn.classList.add("isActive");
    activeChip = chipBtn.getAttribute("data-chip");
    renderAll();
  }

  if (cartAction) {
    const name = cartAction.getAttribute("data-name");
    const type = cartAction.getAttribute("data-cart");
    if (!name) return;

    const cur = cart.get(name) || 0;
    if (type === "inc") cart.set(name, cur + 1);
    if (type === "dec") {
      const next = Math.max(0, cur - 1);
      if (next === 0) cart.delete(name);
      else cart.set(name, next);
    }
    if (type === "removeAll") cart.delete(name);

    updateCartCount();
    renderCart();
  }
});

searchEl.addEventListener("input", renderAll);

cartBtn.addEventListener("click", openDrawer);
closeDrawerBtn.addEventListener("click", closeDrawer);

closeModalBtn.addEventListener("click", closeModal);
closeModalBtn2.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

addToCartBtn.addEventListener("click", () => {
  if (!activeProduct) return;
  addToCart(activeProduct.name);
  openDrawer();
  closeModal();
});

// Init
yearEl.textContent = String(new Date().getFullYear());
renderAll();
renderAdditionalFlavours();
updateCartCount();


