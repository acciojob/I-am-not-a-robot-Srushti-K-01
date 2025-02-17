//your code here
document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg"
  ];

  let duplicateImage = images[Math.floor(Math.random() * images.length)];
  let imageSet = [...images, duplicateImage];

  imageSet = imageSet.sort(() => Math.random() - 0.5);

  const main = document.querySelector("main");
  const message = document.createElement("h3");
  message.id = "h";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  main.appendChild(message);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("flex");
  main.appendChild(imgContainer);

  let selectedImages = [];

  imageSet.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img));
    imgContainer.appendChild(img);
  });

  const resultMessage = document.createElement("p");
  resultMessage.id = "para";
  main.appendChild(resultMessage);

  const resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.textContent = "Reset";
  resetButton.style.display = "none";
  resetButton.addEventListener("click", resetGame);
  main.appendChild(resetButton);

  const verifyButton = document.createElement("button");
  verifyButton.id = "verify";
  verifyButton.textContent = "Verify";
  verifyButton.style.display = "none";
  verifyButton.addEventListener("click", verifySelection);
  main.appendChild(verifyButton);

  function handleImageClick(img) {
    if (selectedImages.length >= 2) return;

    if (!img.classList.contains("selected")) {
      img.classList.add("selected");
      selectedImages.push(img);
    }

    resetButton.style.display = "block";

    if (selectedImages.length === 2) {
      verifyButton.style.display = "block";
    }
  }

  function resetGame() {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    resultMessage.textContent = "";
  }

  function verifySelection() {
    if (selectedImages.length !== 2) return;

    if (selectedImages[0].src === selectedImages[1].src) {
      resultMessage.textContent = "You are a human. Congratulations!";
    } else {
      resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = "none";
  }
});
