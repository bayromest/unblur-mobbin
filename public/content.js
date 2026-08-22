// Mobbin's free-tier lock (as of Aug 2026) is a full-card veil stacked over a
// sharp image:
//   <div class="pointer-events-none relative mobile-screen-border-radius ... overflow-hidden">
//     <img src="...?enc=1..." />  <- sharp, watermarked, 720px
//     <div class="absolute inset-0 bg-[hsl(var(--neutral-0)/40%)] backdrop-blur-[10px]" />
//   </div>
// Image URLs are AES-encrypted Bytescale links (?enc=1...), so no client-side
// resolution upgrade is possible — the old w=15 -> w=1920 rewrite is dead.
// This script only lifts the veil and restores clickability.

const BLUR_OVERLAY_SELECTOR = ".backdrop-blur-\\[10px\\]";

function handleModifications() {
  // Remove promotional banners
  removePromoBanners();

  // Unblur every locked card (screens grid, flow cells, previews)
  unblurCards();
}

function removePromoBanners() {
  // Remove sticky "Get Pro" promotional banners
  const promoBanners = document.querySelectorAll("aside.sticky.z-10.my-32");
  promoBanners.forEach((banner) => {
    banner.remove();
  });
}

function unblurCards() {
  // The lock veil is the overlay with backdrop-blur-[10px]; it covers the
  // whole card, and its pointer-events-none container swallows clicks.
  const overlays = document.querySelectorAll(BLUR_OVERLAY_SELECTOR);
  overlays.forEach((overlay) => {
    const card = overlay.closest(".pointer-events-none");
    if (card) {
      card.classList.remove("pointer-events-none");
    }
    overlay.remove();
  });
}

// Add event listeners for scroll and DOMContentLoaded
window.addEventListener("scroll", handleModifications);
document.addEventListener("DOMContentLoaded", handleModifications);

// Also run on mutation to catch dynamically loaded content (the grid is virtualized)
const observer = new MutationObserver(() => {
  handleModifications();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Optionally, remove the event listener when the page is unloaded
window.addEventListener("unload", () => {
  window.removeEventListener("scroll", handleModifications);
  observer.disconnect();
});
