// Mobbin free-tier lock killer — pure CSS injection (no DOM mutation).
//
// The lock is a full-card veil stacked over a sharp image:
//   <div class="absolute inset-0 bg-[hsl(var(--neutral-0)/40%)] backdrop-blur-[10px]" />
// inside a pointer-events-none card container. Some card types use other
// blur utilities (backdrop-blur-md, after:backdrop-blur-*) — the selectors
// below match them all.
//
// Earlier versions removed veil nodes via MutationObserver. That lost races
// against React's virtualized grid: cards re-rendered on scroll got their
// veil back, and removing React-managed nodes could break reconciliation
// for cards rendered later, leaving random cards blurred. CSS overrides
// can't lose that race — they apply to every element React ever renders,
// without touching its tree. Image URLs are AES-encrypted Bytescale links
// (?enc=1...), so no resolution upgrade is possible; this only lifts the
// veil to reveal the sharp 720px watermarked image the page already loads.

const STYLE_ID = "unblur-mobbin-style";

const CSS = `
  /* Lock veil: full-card overlay (inset-0 + any backdrop-blur-* utility).
     Transparent + unblurred + click-through, whatever utility variant is used. */
  [class*="inset-0"][class*="backdrop-blur"] {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: transparent !important;
    pointer-events: none !important;
  }

  /* Pseudo-element veils (after:backdrop-blur-*) */
  [class*="after:backdrop-blur"]::after {
    content: none !important;
  }

  /* Sticky "Get Pro" promo banner */
  aside.sticky.z-10.my-32 {
    display: none !important;
  }
`;

function injectStyle() {
  if (!document.head || document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
  console.log("[unblur-mobbin] veil CSS injected");
}

injectStyle();
document.addEventListener("DOMContentLoaded", injectStyle);

// SPA navigation can replace <head> children; re-inject if our style vanished.
new MutationObserver(injectStyle).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
