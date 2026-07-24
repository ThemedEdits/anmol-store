# Anmol Islamic General Store — Website

A bilingual (English / Urdu), luxurious, fully responsive online store for
Islamic products — tasbeeh, caps, prayer mats, attar, rumaal, Quran Pak, pure
honey, and general Islamic accessories — with WhatsApp-based order placement.

## How to open it

This is a plain HTML/CSS/JS site — no build tools, no server required.

1. Unzip the folder.
2. Double-click **index.html** to open it in your browser, OR
3. For the best experience (and to test on your phone easily), upload the
   whole `anmol-store` folder to any web host (Hostinger, GitHub Pages,
   Netlify, cPanel, etc.) and open the site's URL.

## Adding the Urdu font (Jameel Noori Nastaleeq)

Read `assets/fonts/PUT_FONT_FILES_HERE.txt` — in short, drop your font file(s)
into `assets/fonts/` using these exact names:

```
assets/fonts/JameelNooriNastaleeq.woff2
assets/fonts/JameelNooriNastaleeq.ttf
assets/fonts/JameelNooriNastaleeq.otf
```

You only need one of these formats. The site already looks for these file
names — nothing else needs to change. Until you add them, Urdu text uses a
Google Fonts fallback (Noto Nastaliq Urdu) so the site works perfectly either
way.

## Pages

- **index.html** — Landing page: hero, category showcase, bestsellers, brand
  story, testimonials, footer with contact details.
- **shop.html** — Full catalog with category filters, price filter, search,
  and sorting.
- **checkout.html** — Cart review + delivery details form. Submitting opens
  WhatsApp (to either of the two shop numbers) with the full order — items,
  quantities, prices, total, and customer details — already typed into the
  message box. The customer just taps "Send".
- **Cart sidebar** — available on every page (cart icon, top right).

## Editing products

Everything about the products lives in one file:
`assets/js/products.js`

Each product looks like this:

```js
{
  id: "tsb-001", category: "tasbeeh",
  name_en: "Sandalwood Tasbeeh - 99 Beads", name_ur: "صندل تسبیح - 99 دانے",
  desc_en: "Hand-rolled sandalwood beads with a rich natural fragrance.",
  desc_ur: "ہاتھ سے بنے صندل کے دانے، قدرتی خوشبو کے ساتھ۔",
  price: 950, oldPrice: 1200, badge: "bestseller", unit: "piece"
}
```

- `price` / `oldPrice` are in **PKR** (plain numbers, no commas).
- `badge` can be `"bestseller"`, `"new"`, `"premium"`, or left empty `""`.
- To add a brand-new product, just copy a block and change the values — it
  will automatically show up on the shop page and (if `badge: "bestseller"`)
  on the homepage.
- To add or rename a category, edit the `CATEGORIES` array at the top of the
  same file. Each category needs an `icon` name that matches one defined in
  `assets/js/icons.js`.

## Changing the WhatsApp numbers

Open `assets/js/checkout.js` and edit the `WHATSAPP_NUMBERS` list near the
top (these are shown as two "Send Order" buttons at checkout). Also update
the phone numbers/links in the footers of `index.html`, `shop.html`, and
`checkout.html`, and the "Chat on WhatsApp" button in `index.html`, if you
change a number.

Numbers must be in international format without `+` or spaces for the
WhatsApp links to work, e.g. `923113788002` for `0311-3788002`.

## Notes

- Cart data is saved in the visitor's browser (localStorage), so it stays
  filled in if they move between Home → Shop → Checkout, and even if they
  close the tab and come back later.
- Shipping is free for orders of Rs 3,000 or more, otherwise a flat Rs 200
  is added — edit this logic in `assets/js/checkout.js` if you want to
  change it.
- All product visuals are clean line-icons (no stock photos), so the store
  looks consistent even before you have professional product photography.
  If you'd like to swap in real product photos later, replace the icon
  in `.product-media` inside `assets/js/home.js` with an `<img>` tag.
