function showImagePreview(imgElement) {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.right = "0";
  modal.style.bottom = "0";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "1000";

  const previewImg = document.createElement("img");
  previewImg.src = imgElement.src;
  previewImg.alt = imgElement.alt;
  previewImg.style.maxWidth = "83%";
  previewImg.style.maxHeight = "83%";
  previewImg.style.objectFit = "contain";

  modal.appendChild(previewImg);
  document.body.appendChild(modal);

  modal.addEventListener("click", () => {
    document.body.removeChild(modal);
  });
  previewImg.addEventListener("click", (e) => {
    e.stopPropagation();
    document.body.removeChild(modal);
  });
}

document.addEventListener("click", (e) => {
  const clickedElement = e.target;
  if (clickedElement.tagName !== "IMG") return;
  if (clickedElement.classList.contains("no-preview")) return;

  e.preventDefault();

  // Delay to check if the image is moving (for mobile devices)
  const initialRect = clickedElement.getBoundingClientRect();
  setTimeout(() => {
    const newRect = clickedElement.getBoundingClientRect();
    if (initialRect.left !== newRect.left || initialRect.top !== newRect.top) {
      return;
    }
    showImagePreview(clickedElement);
  }, 50);
});

// Event listener for 'Escape' key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
      document.body.removeChild(modal);
      e.preventDefault();
    }
  }
});
