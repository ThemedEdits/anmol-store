/* =========================================================================
   Anmol Islamic General Store — Product Catalog
   Every product carries English + Urdu text so the whole site can switch
   languages instantly without reloading anything from a server.
   ========================================================================= */

const CATEGORIES = [
  { id: "tasbeeh",     en: "Tasbeeh",              ur: "تسبیح",           icon: "tasbeeh" },
  { id: "caps",        en: "Caps & Topi",          ur: "ٹوپیاں",          icon: "cap" },
  { id: "mats",        en: "Prayer Mats",          ur: "جائے نماز",        icon: "mat" },
  { id: "attar",       en: "Attar & Perfume",      ur: "عطر",             icon: "attar" },
  { id: "rumaal",      en: "Rumaal & Scarves",     ur: "رومال",           icon: "rumaal" },
  { id: "quran",       en: "Quran Pak & Books",    ur: "قرآن پاک",         icon: "quran" },
  { id: "honey",       en: "Pure Honey",           ur: "خالص شہد",        icon: "honey" },
  { id: "accessories", en: "Islamic Accessories",  ur: "اسلامی لوازمات",   icon: "star" }
];

const PRODUCTS = [
  {
    id: "tsb-001", category: "tasbeeh",
    name_en: "Sandalwood Tasbeeh - 99 Beads", name_ur: "صندل تسبیح - 99 دانے",
    desc_en: "Hand-rolled sandalwood beads with a rich natural fragrance.",
    desc_ur: "ہاتھ سے بنے صندل کے دانے، قدرتی خوشبو کے ساتھ۔",
    price: 950, oldPrice: 1200, badge: "bestseller", unit: "piece"
  },
  {
    id: "tsb-002", category: "tasbeeh",
    name_en: "Kokka Tasbeeh - 33 Beads", name_ur: "ککا تسبیح - 33 دانے",
    desc_en: "Classic dense wooden beads, smooth finish, comfortable grip.",
    desc_ur: "خالص لکڑی کے گھنے دانے، ہموار اور آرام دہ گرفت۔",
    price: 600, badge: "", unit: "piece"
  },
  {
    id: "tsb-003", category: "tasbeeh",
    name_en: "Agate (Aqeeq) Tasbeeh - 99 Beads", name_ur: "عقیق تسبیح - 99 دانے",
    desc_en: "Natural aqeeq stone beads with a warm reddish hue, Sunnah stone.",
    desc_ur: "قدرتی عقیق پتھر کے دانے، سرخی مائل رنگت، سنتِ نبوی سے ثابت پتھر۔",
    price: 1850, badge: "premium", unit: "piece"
  },
  {
    id: "tsb-004", category: "tasbeeh",
    name_en: "Digital Counting Tasbeeh Ring", name_ur: "ڈیجیٹل کاؤنٹر تسبیح رنگ",
    desc_en: "Compact finger-ring tasbeeh with digital tally counter.",
    desc_ur: "چھوٹا اور آسان انگوٹھی نما تسبیح، ڈیجیٹل شمار کے ساتھ۔",
    price: 450, badge: "new", unit: "piece"
  },

  {
    id: "cap-001", category: "caps",
    name_en: "White Crochet Prayer Cap", name_ur: "سفید کروشیہ ٹوپی",
    desc_en: "Breathable hand-crochet cotton cap for daily salah.",
    desc_ur: "روزانہ نماز کے لیے ہاتھ سے بنی سوتی کروشیہ ٹوپی۔",
    price: 550, badge: "bestseller", unit: "piece"
  },
  {
    id: "cap-002", category: "caps",
    name_en: "Embroidered Sindhi Topi", name_ur: "کڑھائی والی سندھی ٹوپی",
    desc_en: "Traditional hand-embroidered Sindhi cap with mirror work.",
    desc_ur: "روایتی ہاتھ کی کڑھائی اور شیشوں والی سندھی ٹوپی۔",
    price: 1400, badge: "premium", unit: "piece"
  },
  {
    id: "cap-003", category: "caps",
    name_en: "Turkish Velvet Cap", name_ur: "ترکش مخملی ٹوپی",
    desc_en: "Soft velvet cap with elegant stitched border, formal look.",
    desc_ur: "نرم مخمل کی ٹوپی، خوبصورت کناروں کے ساتھ، باوقار انداز۔",
    price: 850, badge: "new", unit: "piece"
  },
  {
    id: "cap-004", category: "caps",
    name_en: "Kids Prayer Cap - Plain White", name_ur: "بچوں کی سادہ سفید ٹوپی",
    desc_en: "Soft cotton cap sized for children, comfortable all day.",
    desc_ur: "بچوں کے لیے نرم سوتی ٹوپی، دن بھر آرام دہ۔",
    price: 350, badge: "", unit: "piece"
  },

  {
    id: "mat-001", category: "mats",
    name_en: "Velvet Jaanamaz - Kaaba Design", name_ur: "مخملی جائے نماز - خانہ کعبہ ڈیزائن",
    desc_en: "Plush velvet prayer mat with woven Kaaba motif and soft padding.",
    desc_ur: "نرم مخمل جائے نماز، خانہ کعبہ کی بنائی اور گدے دار استر کے ساتھ۔",
    price: 2200, oldPrice: 2800, badge: "bestseller", unit: "piece"
  },
  {
    id: "mat-002", category: "mats",
    name_en: "Foldable Travel Prayer Mat", name_ur: "فولڈ ایبل سفری جائے نماز",
    desc_en: "Lightweight mat with carry pouch, perfect for travel and office.",
    desc_ur: "ہلکی پھلکی جائے نماز، بیگ کے ساتھ، سفر اور دفتر کے لیے موزوں۔",
    price: 1100, badge: "new", unit: "piece"
  },
  {
    id: "mat-003", category: "mats",
    name_en: "Turkish Chenille Prayer Mat", name_ur: "ترکش شینیل جائے نماز",
    desc_en: "Thick chenille weave, non-slip base, family size comfort.",
    desc_ur: "گھنی بنائی، پھسلن سے محفوظ تہہ، خاندان کے لیے آرام دہ سائز۔",
    price: 2600, badge: "premium", unit: "piece"
  },
  {
    id: "mat-004", category: "mats",
    name_en: "Kids Prayer Mat Set", name_ur: "بچوں کی جائے نماز سیٹ",
    desc_en: "Colorful small-size mat to build a love for salah early on.",
    desc_ur: "چھوٹا اور رنگین جائے نماز، بچوں میں نماز کی محبت پیدا کرنے کے لیے۔",
    price: 900, badge: "", unit: "piece"
  },

  {
    id: "att-001", category: "attar",
    name_en: "Al Oud Musk Attar - 12ml", name_ur: "العود مشک عطر - 12ملی",
    desc_en: "Deep woody oud blended with soft musk, long-lasting alcohol-free attar.",
    desc_ur: "گہرے عود اور نرم مشک کا امتزاج، دیرپا اور الکحل سے پاک عطر۔",
    price: 1300, badge: "bestseller", unit: "12ml"
  },
  {
    id: "att-002", category: "attar",
    name_en: "Rose (Gulab) Attar - 12ml", name_ur: "گلاب عطر - 12ملی",
    desc_en: "Pure rose essence, soft floral fragrance suitable for daily use.",
    desc_ur: "خالص گلاب کا جوہر، نرم اور پھولوں والی خوشبو، روزمرہ استعمال کے لیے۔",
    price: 950, badge: "", unit: "12ml"
  },
  {
    id: "att-003", category: "attar",
    name_en: "Amber Shamama Attar - 12ml", name_ur: "عنبر شمامہ عطر - 12ملی",
    desc_en: "Rich amber attar with warm spiced undertones, festive fragrance.",
    desc_ur: "گہری عنبر خوشبو مصالحہ جات کی ملی جلی مہک کے ساتھ، خاص مواقع کے لیے۔",
    price: 1450, badge: "premium", unit: "12ml"
  },
  {
    id: "att-004", category: "attar",
    name_en: "Mini Attar Gift Set (3 x 6ml)", name_ur: "عطر تحفہ سیٹ (3 x 6ملی)",
    desc_en: "Three signature scents in a gift-ready box, great for Eid gifting.",
    desc_ur: "تین منتخب خوشبوؤں کا خوبصورت تحفہ باکس، عید کے تحائف کے لیے بہترین۔",
    price: 1600, badge: "new", unit: "set"
  },

  {
    id: "rum-001", category: "rumaal",
    name_en: "Embroidered Cotton Rumaal", name_ur: "کڑھائی والا سوتی رومال",
    desc_en: "Soft cotton rumaal with fine border embroidery.",
    desc_ur: "نرم سوتی رومال، باریک کناروں کی کڑھائی کے ساتھ۔",
    price: 250, badge: "", unit: "piece"
  },
  {
    id: "rum-002", category: "rumaal",
    name_en: "Ihram Rumaal / Head Scarf", name_ur: "احرام رومال / سر کا رومال",
    desc_en: "Lightweight breathable scarf for Umrah, Hajj, and daily wear.",
    desc_ur: "عمرہ، حج اور روزمرہ استعمال کے لیے ہلکا اور آرام دہ رومال۔",
    price: 400, badge: "new", unit: "piece"
  },
  {
    id: "rum-003", category: "rumaal",
    name_en: "Checkered Shemagh Scarf", name_ur: "چیک دار شماغ",
    desc_en: "Classic black and white checkered shemagh, soft cotton blend.",
    desc_ur: "روایتی سیاہ و سفید چیک دار شماغ، نرم سوتی ملاپ۔",
    price: 750, badge: "bestseller", unit: "piece"
  },

  {
    id: "qur-001", category: "quran",
    name_en: "Quran Pak - Large Size (Arabic Only)", name_ur: "قرآن پاک - بڑا سائز (صرف عربی)",
    desc_en: "Clear Uthmani script, large font, durable hardbound cover.",
    desc_ur: "واضح عثمانی رسم الخط، بڑا فونٹ، مضبوط ہارڈ بائنڈنگ جلد۔",
    price: 1200, badge: "bestseller", unit: "piece"
  },
  {
    id: "qur-002", category: "quran",
    name_en: "Quran Pak with Urdu Translation", name_ur: "قرآن پاک مع اردو ترجمہ",
    desc_en: "Word-friendly layout with easy-to-read Urdu translation alongside.",
    desc_ur: "آسان تفہیم کے لیے سادہ ترتیب اور اردو ترجمہ ساتھ ساتھ۔",
    price: 1650, badge: "", unit: "piece"
  },
  {
    id: "qur-003", category: "quran",
    name_en: "Yaseen Sharif & Selected Surahs", name_ur: "یٰسین شریف و منتخب سورتیں",
    desc_en: "Pocket-size booklet with Surah Yaseen and daily recitations.",
    desc_ur: "جیبی سائز کتابچہ، سورہ یٰسین اور روزمرہ کی تلاوت کے ساتھ۔",
    price: 300, badge: "", unit: "piece"
  },
  {
    id: "qur-004", category: "quran",
    name_en: "Dua & Zikr Pocket Book", name_ur: "دعا و ذکر کی جیبی کتاب",
    desc_en: "Masnoon duas for everyday life with Urdu translation.",
    desc_ur: "روزمرہ زندگی کی مسنون دعائیں، اردو ترجمہ کے ساتھ۔",
    price: 280, badge: "new", unit: "piece"
  },

  {
    id: "hon-001", category: "honey",
    name_en: "Pure Sidr (Beri) Honey - 500g", name_ur: "خالص بیری شہد - 500 گرام",
    desc_en: "Raw, unprocessed Sidr honey sourced from mountain apiaries.",
    desc_ur: "پہاڑی علاقوں سے حاصل کردہ خالص اور غیر مصنوعی بیری شہد۔",
    price: 2400, oldPrice: 2800, badge: "bestseller", unit: "500g"
  },
  {
    id: "hon-002", category: "honey",
    name_en: "Pure Multi-Flower Honey - 1kg", name_ur: "خالص ملٹی فلاور شہد - 1 کلو",
    desc_en: "Everyday raw honey collected from mixed wildflower fields.",
    desc_ur: "مختلف جنگلی پھولوں سے حاصل کردہ خالص روزمرہ شہد۔",
    price: 2200, badge: "", unit: "1kg"
  },
  {
    id: "hon-003", category: "honey",
    name_en: "Ajwain (Thyme) Honey - 500g", name_ur: "اجوائن شہد - 500 گرام",
    desc_en: "Herbal-infused honey, traditionally used for cough and digestion.",
    desc_ur: "جڑی بوٹیوں والا شہد، روایتی طور پر کھانسی اور ہاضمے کے لیے مفید۔",
    price: 2600, badge: "premium", unit: "500g"
  },
  {
    id: "hon-004", category: "honey",
    name_en: "Honey Gift Jar with Wooden Dipper", name_ur: "شہد تحفہ جار مع لکڑی کا چمچہ",
    desc_en: "Elegant glass jar of pure honey with a wooden honey dipper included.",
    desc_ur: "خالص شہد کا خوبصورت شیشے کا جار، ساتھ لکڑی کا ڈپر شامل۔",
    price: 1900, badge: "new", unit: "300g"
  },

  {
    id: "acc-001", category: "accessories",
    name_en: "Natural Miswak (Peelu) - Pack of 3", name_ur: "قدرتی مسواک (پیلو) - 3 عدد پیک",
    desc_en: "Sunnah teeth-cleaning twigs, sealed fresh, pack of three.",
    desc_ur: "سنتِ نبوی دانتوں کی صفائی کی مسواک، تازہ پیک، تین عدد۔",
    price: 300, badge: "bestseller", unit: "pack of 3"
  },
  {
    id: "acc-002", category: "accessories",
    name_en: "Wooden Tasbeeh Storage Box", name_ur: "لکڑی کا تسبیح باکس",
    desc_en: "Hand-carved wooden box to store and protect your tasbeeh.",
    desc_ur: "ہاتھ سے تراشیدہ لکڑی کا باکس، تسبیح کی حفاظت کے لیے۔",
    price: 650, badge: "", unit: "piece"
  },
  {
    id: "acc-003", category: "accessories",
    name_en: "Islamic Wall Art - Ayatul Kursi", name_ur: "اسلامی وال آرٹ - آیت الکرسی",
    desc_en: "Elegant framed calligraphy piece to bring barakah into your home.",
    desc_ur: "خوبصورت فریم شدہ خطاطی، گھر میں برکت کے لیے۔",
    price: 1800, badge: "premium", unit: "piece"
  },
  {
    id: "acc-004", category: "accessories",
    name_en: "Surma (Kohl) with Applicator", name_ur: "سرمہ مع سلائی",
    desc_en: "Traditional natural surma in a decorative bottle with applicator.",
    desc_ur: "روایتی قدرتی سرمہ، خوبصورت شیشی اور سلائی کے ساتھ۔",
    price: 500, badge: "new", unit: "piece"
  },
  {
    id: "acc-005", category: "accessories",
    name_en: "Musallah Compass & Compact Set", name_ur: "قبلہ نما مع کمپیکٹ سیٹ",
    desc_en: "Compact qibla compass, handy for travel and outdoor salah.",
    desc_ur: "چھوٹا قبلہ نما، سفر اور باہر نماز کے لیے مفید۔",
    price: 550, badge: "", unit: "piece"
  }
];
