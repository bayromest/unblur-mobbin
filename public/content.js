function handleModifications() {
  console.log("Handling modifications");

  // Remove button and aside elements
  const button = document.querySelector(
    'button[data-cre-user-type="free_user"]'
  );
  if (button) {
    button.remove();
    console.log("Button element removed");
  } else {
    console.log("Button element not found");
  }

  const asideElement = document.querySelector("aside.sticky.z-10.my-32");
  if (asideElement) {
    asideElement.remove();
    console.log("Aside element removed");
  } else {
    console.log("Aside element not found");
  }

  // Modify each relevant element
  const screensElements = document.querySelectorAll(".group.relative");
  screensElements.forEach((element) => {
    const innerDiv = element.querySelector(
      ".relative.overflow-hidden.bg-bg-secondary"
    );
    const imgElement = element.querySelector("img");

    if (innerDiv) {
      innerDiv.classList.remove(
        "bg-bg-secondary",
        "after:absolute",
        "after:inset-0",
        "after:rounded-[--border-radius]",
        "after:shadow-image-inset",
        "blur-0",
        "after:bg-neutral-white/40",
        "after:backdrop-blur-[10px]"
      );
      innerDiv.style.backdropFilter = "none";
      innerDiv.style.filter = "none";
      console.log("Modified inner div styles");
    }

    if (imgElement) {
      try {
        const url = new URL(imgElement.src);
        if (url.pathname.endsWith(".png")) {
          const updatedSrc = `${url.origin}${url.pathname}`;
          imgElement.src = updatedSrc;
          console.log("Updated image src to:", updatedSrc);
        }
      } catch (error) {
        console.log("Failed to update image URL:", error);
      }
    }
  });

  const flowElements = document.querySelectorAll(
    "div[data-radix-aspect-ratio-wrapper]"
  );

  flowElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      const innerDiv = element.querySelector("a > div.grow");
      const imgElement = element.querySelector("a > div.grow > img");

      if (innerDiv) {
        innerDiv.classList.remove(
          "bg-bg-secondary",
          "after:absolute",
          "after:inset-0",
          "after:rounded-[--border-radius]",
          "after:shadow-image-inset",
          "blur-0",
          "after:bg-neutral-white/40",
          "after:backdrop-blur-[10px]"
        );
        innerDiv.style.backdropFilter = "none";
        innerDiv.style.filter = "none";
        console.log("Modified inner div styles");
      }

      if (imgElement) {
        try {
          const url = new URL(imgElement.src);
          if (url.pathname.endsWith(".png")) {
            const updatedSrc = `${url.origin}${url.pathname}`;
            imgElement.src = updatedSrc;
            console.log("Updated image src to:", updatedSrc);
          }
        } catch (error) {
          console.log("Failed to update image URL:", error);
        }
      }
    }
  });
  const videoWrappers = document.querySelectorAll(
    "div[data-radix-aspect-ratio-wrapper]"
  );

  videoWrappers.forEach((wrapper) => {
    const innerDiv = wrapper.querySelector("div.relative.grow");
    const videoElement = wrapper.querySelector("video");

    if (innerDiv) {
      // Remove any backdrop blur styles
      innerDiv.style.backdropFilter = "none";
      innerDiv.style.filter = "none";
      innerDiv.classList.remove("after:backdrop-blur");
      console.log("Removed backdrop blur styles");
    }

    if (videoElement) {
      // Remove pointer-events-none to make the video clickable
      videoElement.classList.remove("pointer-events-none");

      // Update the poster and src attributes
      const posterUrl = videoElement.getAttribute("poster");
      const updatedPosterUrl = updatePosterUrl(posterUrl);
      if (updatedPosterUrl) {
        videoElement.setAttribute("poster", updatedPosterUrl);
        console.log("Updated video poster to:", updatedPosterUrl);
      }

      const currentSrc = videoElement.getAttribute("src");
      const updatedSrc = updateVideoUrl(currentSrc);
      if (updatedSrc) {
        videoElement.setAttribute("src", updatedSrc);
        console.log("Updated video src to:", updatedSrc);
      }

      // Ensure playsinline is correctly set
      videoElement.setAttribute("playsinline", "");
    }

    // Optionally remove overlays or play icons
    const playIcon = wrapper.querySelector("div.absolute");
    if (playIcon) {
      playIcon.style.display = "none"; // Hide the play icon
      console.log("Removed play icon overlay");
    }
  });

  // Function to update the poster URL
  function updatePosterUrl(posterUrl) {
    try {
      const url = new URL(posterUrl);
      url.searchParams.set("w", "1920");
      return url.toString();
    } catch (error) {
      console.error("Failed to update poster URL:", error);
    }
    return posterUrl;
  }

  // Function to update the video URL
  function updateVideoUrl(videoUrl) {
    try {
      // Create a URL object from the provided URL
      const url = new URL(videoUrl);

      // Replace 'image' with 'video' in the pathname
      const newPathname = url.pathname.replace("/image/", "/video/");
      url.pathname = newPathname;

      // Remove existing query parameters
      url.search = "";

      // Append the new query parameters
      const newParams = new URLSearchParams({
        f: "mp4-h264",
        w: "1920",
        hp: "1920",
        sh: "100",
        mute: "true",
        p: "mhq",
        q: "100",
        gop: "300",
        sd: "false",
        rf: "6",
        bf: "7",
        qz: "-1",
        if: "0",
        bo: "-1",
        a: "%2Fvideo.mp4",
      });
      url.search = newParams.toString();

      console.log("Updated video URL:", url.toString());
      return url.toString();
    } catch (error) {
      console.error("Failed to update video URL:", error);
      return videoUrl; // Return the original URL in case of an error
    }
  }
}
// Add event listeners for scroll and DOMContentLoaded
window.addEventListener("scroll", handleModifications);
document.addEventListener("DOMContentLoaded", handleModifications);

// Optionally, remove the event listener when the page is unloaded
window.addEventListener("unload", () => {
  window.removeEventListener("scroll", handleModifications);
});
