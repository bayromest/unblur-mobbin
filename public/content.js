function handleModifications() {
  // Unblur screen cells (grid view)
  unblurScreenCells();

  // Unblur flow cells (flow view)
  unblurFlowCells();
}

function unblurScreenCells() {
  // Find blurred screen containers - they have pointer-events-none and the blur overlay
  const blurredContainers = document.querySelectorAll(
    ".mobile-screen-border-radius-container.pointer-events-none"
  );

  blurredContainers.forEach((container) => {
    // Remove pointer-events-none to make it interactive
    container.classList.remove("pointer-events-none");

    // Find and remove the blur overlay div
    const blurOverlay = container.querySelector(
      'div[class*="backdrop-blur"]'
    );
    if (blurOverlay) {
      blurOverlay.remove();
      console.log("Removed blur overlay");
    }

    // Update image to high quality
    const img = container.querySelector("img");
    if (img) {
      img.src = upgradeImageUrl(img.src);
      console.log("Upgraded image quality");
    }
  });

  // Also handle the wrapper div structure for screens
  const screenWrappers = document.querySelectorAll(".flex.flex-col.gap-y-16");
  screenWrappers.forEach((wrapper) => {
    const blurredInner = wrapper.querySelector(
      ".pointer-events-none.mobile-screen-border-radius-container"
    );
    if (blurredInner) {
      blurredInner.classList.remove("pointer-events-none");

      const blurOverlay = blurredInner.querySelector(
        'div[class*="backdrop-blur"]'
      );
      if (blurOverlay) {
        blurOverlay.remove();
      }

      const img = blurredInner.querySelector("img");
      if (img) {
        img.src = upgradeImageUrl(img.src);
      }
    }
  });
}

function unblurFlowCells() {
  // Find flow cell screens with pointer-events-none (blurred ones)
  const blurredFlows = document.querySelectorAll(
    'a[data-sentry-component="FlowCellScreen"].pointer-events-none'
  );

  blurredFlows.forEach((link) => {
    // Remove pointer-events-none
    link.classList.remove("pointer-events-none");

    // Fix tabindex
    link.setAttribute("tabindex", "0");

    // Find and remove the blur overlay
    const blurOverlay = link.querySelector('div[class*="backdrop-blur"]');
    if (blurOverlay) {
      blurOverlay.remove();
      console.log("Removed flow blur overlay");
    }

    // Update image to high quality
    const img = link.querySelector("img");
    if (img) {
      img.src = upgradeImageUrl(img.src);
      console.log("Upgraded flow image quality");
    }
  });

  // Also catch any remaining blur overlays in flow containers
  const flowContainers = document.querySelectorAll('.w-\\[--screen-width\\]');
  flowContainers.forEach((container) => {
    const blurOverlay = container.querySelector(
      'div.absolute[class*="backdrop-blur"]'
    );
    if (blurOverlay) {
      blurOverlay.remove();
    }

    const link = container.querySelector("a");
    if (link && link.classList.contains("pointer-events-none")) {
      link.classList.remove("pointer-events-none");
      link.setAttribute("tabindex", "0");
    }

    const img = container.querySelector("img");
    if (img && img.src.includes("w=15")) {
      img.src = upgradeImageUrl(img.src);
    }
  });
}

function upgradeImageUrl(src) {
  try {
    const url = new URL(src);

    // Upgrade width from 15 to 1920
    if (url.searchParams.get("w") === "15") {
      url.searchParams.set("w", "1920");
    }

    // Fix watermark path - remove the /15 suffix if present
    const imageParam = url.searchParams.get("image");
    if (imageParam && imageParam.endsWith("/15")) {
      url.searchParams.set("image", imageParam.slice(0, -3));
    }

    return url.toString();
  } catch (error) {
    console.error("Failed to upgrade image URL:", error);
    return src;
  }
}
// Add event listeners for scroll and DOMContentLoaded
window.addEventListener("scroll", handleModifications);
document.addEventListener("DOMContentLoaded", handleModifications);

// Also run on mutation to catch dynamically loaded content
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
