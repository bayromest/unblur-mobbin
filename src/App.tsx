function App() {
  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        // Remove the aside element
        const asideElement = document.querySelector("aside.sticky.z-10.my-32");
        if (asideElement) {
          asideElement.remove();
          console.log("Aside element removed");
        } else {
          console.error("Aside element not found");
        }

        // Modify each relevant element
        const screensElements = document.querySelectorAll(".group.relative");
        screensElements.forEach((element) => {
          // Cast the element to HTMLElement to access style property
          const innerDiv = element.querySelector(
            ".relative.overflow-hidden.bg-bg-secondary"
          ) as HTMLElement;
          const imgElement = element.querySelector("img");

          if (innerDiv) {
            // Remove specific classes from the div
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

            // Remove inline styles related to blur and backdrop filter
            innerDiv.style.backdropFilter = "none";
            innerDiv.style.filter = "none";

            console.log("Modified inner div styles");
          }

          if (imgElement) {
            // Update the img src to remove query parameters after ".png"
            try {
              const url = new URL(imgElement.src);
              if (url.pathname.endsWith(".png")) {
                const updatedSrc = `${url.origin}${url.pathname}`;
                imgElement.src = updatedSrc;
                console.log("Updated image src to:", updatedSrc);
              }
            } catch (error) {
              console.error("Failed to update image URL:", error);
            }
          }
        });

        // Handle elements with a specific width style
        const flowElements = document.querySelectorAll(
          "div[data-radix-aspect-ratio-wrapper]"
        );

        flowElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            // Target the <div> inside the <a> element
            const innerDiv = element.querySelector(
              "a > div.grow"
            ) as HTMLElement;
            const imgElement = element.querySelector(
              "a > div.grow > img"
            ) as HTMLImageElement;

            if (innerDiv) {
              // Remove specific classes from the div
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

              // Remove inline styles related to blur and backdrop filter
              innerDiv.style.backdropFilter = "none";
              innerDiv.style.filter = "none";

              console.log("Modified inner div styles");
            }

            if (imgElement) {
              // Update the img src to remove query parameters after ".png"
              try {
                const url = new URL(imgElement.src);
                if (url.pathname.endsWith(".png")) {
                  const updatedSrc = `${url.origin}${url.pathname}`;
                  imgElement.src = updatedSrc;
                  console.log("Updated image src to:", updatedSrc);
                }
              } catch (error) {
                console.error("Failed to update image URL:", error);
              }
            }
          }
        });
      },
    });
  };

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white p-4 rounded-md w-full h-full"
      >
        Free mobbin :D
      </button>
    </div>
  );
}

export default App;
