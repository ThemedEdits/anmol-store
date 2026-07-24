const CATEGORIES = [
  { id: "caps", en: "Caps & Topi", ur: "ٹوپیاں", icon: "cap" },
  { id: "mats", en: "Prayer Mats", ur: "جائے نماز", icon: "mat" },
  { id: "rumaal", en: "Rumaal", ur: "رومال", icon: "rumaal" },
  { id: "attar", en: "Attar & Perfume", ur: "عطر", icon: "attar" },
  { id: "quran", en: "Quran Pak", ur: "قرآن پاک", icon: "quran" },
  { id: "books", en: "Islamic Books", ur: "اسلامی کتابیں", icon: "quran" },
  { id: "hijama", en: "Hijama Products", ur: "حجامہ کا سامان", icon: "star" },
  { id: "honey", en: "Pure Honey", ur: "خالص شہد", icon: "honey" },
  { id: "ghee", en: "Desi Ghee", ur: "دیسی گھی", icon: "honey" },
  { id: "stationery", en: "Stationery", ur: "اسٹیشنری", icon: "star" }
];

const PRODUCTS = [
  {
    id: "cap-001", category: "caps",
    name_en: "White Crochet Prayer Cap", name_ur: "سفید کروشیہ ٹوپی",
    desc_en: "Breathable hand-crochet cotton cap for daily salah.",
    desc_ur: "روزانہ نماز کے لیے ہاتھ سے بنی سوتی کروشیہ ٹوپی۔",
    price: 550, badge: "bestseller", unit: "piece",
    image: "assets/images/caps001.jpeg"
  },
  {
    id: "cap-002", category: "caps",
    name_en: "Embroidered Sindhi Topi", name_ur: "کڑھائی والی سندھی ٹوپی",
    desc_en: "Traditional hand-embroidered Sindhi cap with mirror work.",
    desc_ur: "روایتی ہاتھ کی کڑھائی اور شیشوں والی سندھی ٹوپی۔",
    price: 1400, badge: "premium", unit: "piece",
    image: "assets/images/caps002.jpeg"
  },

  {
    id: "mat-001", category: "mats",
    name_en: "Velvet Jaanamaz - Kaaba Design", name_ur: "مخملی جائے نماز - خانہ کعبہ ڈیزائن",
    desc_en: "Plush velvet prayer mat with woven Kaaba motif and soft padding.",
    desc_ur: "نرم مخمل جائے نماز، خانہ کعبہ کی بنائی اور گدے دار استر کے ساتھ۔",
    price: 2200, oldPrice: 2800, badge: "bestseller", unit: "piece",
    image: "assets/images/prayer-mat001.jpeg"
  },
  {
    id: "mat-002", category: "mats",
    name_en: "Foldable Travel Prayer Mat", name_ur: "فولڈ ایبل سفری جائے نماز",
    desc_en: "Lightweight mat with carry pouch, perfect for travel and office.",
    desc_ur: "ہلکی پھلکی جائے نماز، بیگ کے ساتھ، سفر اور دفتر کے لیے موزوں۔",
    price: 1100, badge: "new", unit: "piece",
    image: "assets/images/prayer-mat002.jpeg"
  },

  {
    id: "rum-001", category: "rumaal",
    name_en: "Embroidered Cotton Rumaal", name_ur: "کڑھائی والا سوتی رومال",
    desc_en: "Soft cotton rumaal with fine border embroidery.",
    desc_ur: "نرم سوتی رومال، باریک کناروں کی کڑھائی کے ساتھ۔",
    price: 250, badge: "", unit: "piece",
    image: "assets/images/rumal001.jpg"
  },
  {
    id: "rum-002", category: "rumaal",
    name_en: "Checkered Shemagh Scarf", name_ur: "چیک دار شماغ",
    desc_en: "Classic black and white checkered shemagh, soft cotton blend.",
    desc_ur: "روایتی سیاہ و سفید چیک دار شماغ، نرم سوتی ملاپ۔",
    price: 750, badge: "bestseller", unit: "piece",
    image: "assets/images/rumal002.jpg"
  },

  {
    id: "att-001", category: "attar",
    name_en: "Al Oud Musk Attar - 12ml", name_ur: "العود مشک عطر - 12ملی",
    desc_en: "Deep woody oud blended with soft musk, long-lasting alcohol-free attar.",
    desc_ur: "گہرے عود اور نرم مشک کا امتزاج، دیرپا اور الکحل سے پاک عطر۔",
    price: 1300, badge: "bestseller", unit: "12ml",
    image: "assets/images/attar001.jpg"
  },
  {
    id: "att-002", category: "attar",
    name_en: "Rose (Gulab) Attar - 12ml", name_ur: "گلاب عطر - 12ملی",
    desc_en: "Pure rose essence, soft floral fragrance suitable for daily use.",
    desc_ur: "خالص گلاب کا جوہر، نرم اور پھولوں والی خوشبو، روزمرہ استعمال کے لیے۔",
    price: 950, badge: "", unit: "12ml",
    image: "assets/images/attar002.jpg"
  },

  {
    id: "qur-001", category: "quran",
    name_en: "Quran Pak - Large Size (Arabic Only)", name_ur: "قرآن پاک - بڑا سائز (صرف عربی)",
    desc_en: "Clear Uthmani script, large font, durable hardbound cover.",
    desc_ur: "واضح عثمانی رسم الخط، بڑا فونٹ، مضبوط ہارڈ بائنڈنگ جلد۔",
    price: 1200, badge: "bestseller", unit: "piece",
    image: "assets/images/quraan001.jpg"
  },
  {
    id: "qur-002", category: "quran",
    name_en: "Quran Pak with Urdu Translation", name_ur: "قرآن پاک مع اردو ترجمہ",
    desc_en: "Word-friendly layout with easy-to-read Urdu translation alongside.",
    desc_ur: "آسان تفہیم کے لیے سادہ ترتیب اور اردو ترجمہ ساتھ ساتھ۔",
    price: 1650, badge: "", unit: "piece",
    image: "assets/images/quraan002.jpg"
  },

  {
    id: "book-001", category: "books",
    name_en: "Riyad-us-Saliheen (Urdu Translation)", name_ur: "ریاض الصالحین (اردو ترجمہ)",
    desc_en: "Classic hadith compilation with clear Urdu translation and explanation.",
    desc_ur: "احادیث کا مشہور مجموعہ، واضح اردو ترجمہ اور تشریح کے ساتھ۔",
    price: 950, badge: "bestseller", unit: "piece",
    image: "assets/images/quraan001.jpg"
  },
  {
    id: "book-002", category: "books",
    name_en: "Seerat-un-Nabi (Life of the Prophet ﷺ)", name_ur: "سیرت النبی ﷺ",
    desc_en: "Detailed biography of the Prophet Muhammad ﷺ in accessible Urdu.",
    desc_ur: "نبی کریم ﷺ کی مفصل سیرت، آسان اردو زبان میں۔",
    price: 850, badge: "new", unit: "piece",
    image: "assets/images/quraan002.jpg"
  },

  {
    id: "hij-001", category: "hijama",
    name_en: "Hijama Cupping Set (12 Cups)", name_ur: "حجامہ کپنگ سیٹ (12 کپ)",
    desc_en: "Complete cupping therapy set with pump handle and 12 assorted cups.",
    desc_ur: "مکمل کپنگ تھراپی سیٹ، پمپ ہینڈل اور 12 مختلف سائز کے کپ۔",
    price: 2800, badge: "bestseller", unit: "set",
    image: "assets/images/hijama001.webp"
  },
  {
    id: "hij-002", category: "hijama",
    name_en: "Disposable Hijama Blades (Pack of 50)", name_ur: "ڈسپوزایبل حجامہ بلیڈز (50 عدد)",
    desc_en: "Sterile single-use blades for safe and hygienic hijama sessions.",
    desc_ur: "محفوظ اور صاف ستھرے حجامہ کے لیے جراثیم سے پاک ڈسپوزایبل بلیڈز۔",
    price: 600, badge: "", unit: "pack of 50",
    image: "assets/images/hijama002.jpg"
  },

  {
    id: "hon-001", category: "honey",
    name_en: "Pure Sidr (Beri) Honey - 500g", name_ur: "خالص بیری شہد - 500 گرام",
    desc_en: "Raw, unprocessed Sidr honey sourced from mountain apiaries.",
    desc_ur: "پہاڑی علاقوں سے حاصل کردہ خالص اور غیر مصنوعی بیری شہد۔",
    price: 2400, oldPrice: 2800, badge: "bestseller", unit: "500g",
    image: "assets/images/honey001.jpg"
  },
  {
    id: "hon-002", category: "honey",
    name_en: "Pure Multi-Flower Honey - 1kg", name_ur: "خالص ملٹی فلاور شہد - 1 کلو",
    desc_en: "Everyday raw honey collected from mixed wildflower fields.",
    desc_ur: "مختلف جنگلی پھولوں سے حاصل کردہ خالص روزمرہ شہد۔",
    price: 2200, badge: "", unit: "1kg",
    image: "assets/images/honey002.jpg"
  },


  {
    id: "ghee-002", category: "ghee",
    name_en: "Pure Desi Buffalo Ghee - 1kg", name_ur: "خالص دیسی بھینس کا گھی - 1 کلو",
    desc_en: "Thick, aromatic buffalo ghee made using traditional methods.",
    desc_ur: "گاڑھا اور خوشبودار بھینس کا گھی، روایتی طریقے سے تیار۔",
    price: 3000, badge: "", unit: "1kg",
    image: "assets/images/desi-ghee002.webp"
  },

  {
    id: "sta-001", category: "stationery",
    name_en: "Islamic Calligraphy Notebook", name_ur: "اسلامی خطاطی نوٹ بک",
    desc_en: "A5 hardbound notebook with elegant Islamic calligraphy cover art.",
    desc_ur: "خوبصورت اسلامی خطاطی کے سرورق کے ساتھ A5 ہارڈ بائنڈ نوٹ بک۔",
    price: 350, badge: "new", unit: "piece",
    image: "assets/images/stationery001.jpeg"
  },
  {
    id: "sta-002", category: "stationery",
    name_en: "99 Names of Allah Desk Calendar", name_ur: "اسمائے حسنیٰ ڈیسک کیلنڈر",
    desc_en: "Elegant standing desk calendar featuring the 99 Names of Allah.",
    desc_ur: "اسمائے حسنیٰ پر مشتمل خوبصورت ڈیسک کیلنڈر۔",
    price: 500, badge: "", unit: "piece",
    image: "assets/images/stationery002.jpeg"
  }
];

/* =========================================================================
   MANUAL CAROUSEL SELECTIONS
   Control exactly which products show in each homepage carousel, and order,
   by listing their ids here.
   ========================================================================= */
const CAROUSEL_SELECTIONS = {
  carouselBestsellers: ["cap-001", "mat-001", "rum-002", "att-001", "qur-001", "hij-001", "hon-001"],
  carouselNewArrivals: ["mat-002", "book-002", "sta-001"],
  carouselBudget: ["rum-001", "sta-001", "sta-002", "hij-002", "book-002"]
};

function getProductsById(ids) {
  return ids
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean); // silently skip typos/missing ids instead of crashing
}