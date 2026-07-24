/* =========================================================================
   Anmol Islamic General Store — Inline SVG icon set
   Kept as line-art so every category "photo" feels intentional & consistent
   even without product photography.
   ========================================================================= */

const ICONS = {
  tasbeeh: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="32" cy="14" r="4.2"/><circle cx="45" cy="19" r="3.6"/><circle cx="52" cy="30" r="3.6"/><circle cx="52" cy="43" r="3.6"/><circle cx="45" cy="53" r="3.6"/><circle cx="32" cy="58" r="3.6"/><circle cx="19" cy="53" r="3.6"/><circle cx="12" cy="43" r="3.6"/><circle cx="12" cy="30" r="3.6"/><circle cx="19" cy="19" r="3.6"/><path d="M32 18v10" stroke-dasharray="1 5"/><path d="M32 4v6" /><rect x="29" y="1" width="6" height="5" rx="1.4"/></svg>`,

  cap: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 40c0-14 9.8-26 22-26s22 12 22 26"/><path d="M6 40h52"/><path d="M6 40c0 4 3 7 7 7h38c4 0 7-3 7-7"/><path d="M32 14v-4"/></svg>`,

  mat: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="8" width="44" height="48" rx="3"/><path d="M32 8v14a10 10 0 0 1-10 10"/><path d="M32 8v14a10 10 0 0 0 10 10"/><path d="M17 40h30"/><path d="M17 47h30"/></svg>`,

  attar: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M26 10h12"/><path d="M29 10v6l-7 6c-3 3-4 6-4 11v17a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V33c0-5-1-8-4-11l-7-6v-6"/><path d="M22 40h20"/><circle cx="32" cy="47" r="3.4"/></svg>`,

  rumaal: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14h48v20c0 12-10 20-24 24-14-4-24-12-24-24V14z"/><path d="M8 24h48"/><path d="M16 14v10"/><path d="M32 14v34"/><path d="M48 14v10"/></svg>`,

  quran: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M32 14c-5-4-13-6-22-6v40c9 0 17 2 22 6"/><path d="M32 14c5-4 13-6 22-6v40c-9 0-17 2-22 6"/><path d="M32 14v40"/><circle cx="49" cy="17" r="3.6" stroke-width="2"/></svg>`,

  honey: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h20l4 8v34a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V20l4-8z"/><path d="M18 26h28"/><path d="M18 36h28"/><path d="M28 8h8v4h-8z"/><path d="M32 44c3 3 3 5 0 8-3-3-3-5 0-8z"/></svg>`,

  star: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M32 6l6.5 17.5L56 26l-13 12 4 18-15-9-15 9 4-18-13-12 17.5-2.5z"/></svg>`,

  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>`,

  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.4"/><circle cx="19" cy="21" r="1.4"/><path d="M2.5 2.5h3l3 13h11l2.5-9h-15"/></svg>`,

  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 2.6 4.2 5.6 4.2 9s-1.4 6.4-4.2 9c-2.8-2.6-4.2-5.6-4.2-9s1.4-6.4 4.2-9z"/></svg>`,

  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,

  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,

  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M5 12h14"/></svg>`,

  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></svg>`,

emptyCart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="21" r="1.2"/><circle cx="18" cy="21" r="1.2"/><path d="M3 3h2.6l2.2 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6.2"/></svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,

  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l2.6 2.6L16 9.5"/></svg>`,

  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.7-.85-2-.95-.27-.1-.46-.15-.66.15-.2.3-.76.95-.93 1.14-.17.2-.34.22-.63.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.5.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.7-.7 1.94-1.37.24-.68.24-1.26.17-1.37-.07-.12-.27-.2-.57-.35z"/><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.18-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z"/></svg>`,

  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h11v9H2z"/><path d="M13 10h4l4 3.5V16h-8z"/><circle cx="6" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>`,

  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 3v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5z"/><path d="M9 12l2.2 2.2L15 10"/></svg>`,

  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4C10 4 4 10 4 19c9 0 15-6 16-15z"/><path d="M5 19c4-4 8-7 11-11"/></svg>`,

  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1.4 1.4 0 0 1 1.4-.34c1.1.36 2.3.56 3.5.56.8 0 1.4.63 1.4 1.4V21c0 .8-.63 1.4-1.4 1.4C10.6 22.4 1.6 13.4 1.6 2.7 1.6 1.9 2.2 1.3 3 1.3h3.4c.8 0 1.4.6 1.4 1.4 0 1.2.2 2.4.56 3.5.13.45.02.95-.34 1.34L6.6 10.8z"/></svg>`,

  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05v2.35H7.7V13h2.7v8h3.1z"/></svg>`,

  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg>`,

  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 2h3.1c.2 1.6 1.3 3 3.4 3.3v3.1c-1.3 0-2.6-.4-3.6-1.1v6.4c0 3.5-2.8 6.3-6.3 6.3S4.8 16.7 4.8 13.2c0-3.4 2.6-6.1 5.9-6.3v3.2c-1.6.2-2.8 1.5-2.8 3.1 0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1V2z"/></svg>`,

  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,

  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 11v5.5M12 7.5v.01"/></svg>`,

  box: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M32 6l24 12v28L32 58 8 46V18z"/><path d="M8 18l24 12 24-12"/><path d="M32 30v28"/></svg>`
};

function icon(name){ return ICONS[name] || ""; }
function categoryIcon(catId){
  const cat = (typeof CATEGORIES !== "undefined") ? CATEGORIES.find(c => c.id === catId) : null;
  return icon(cat ? cat.icon : "star");
}
