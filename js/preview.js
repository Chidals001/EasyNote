 // js/preview.js

window.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container2");
  const downloadBtn = document.querySelector(".button1");

  // Get flashcards from localStorage
  const flashcards = localStorage.getItem("flashcards");

  if (!flashcards) {
    container.innerHTML = "<p>No flashcards found. Please upload notes first.</p>";
    return;
  }

  // Split flashcards by line breaks for readability
  const flashcardItems = flashcards.split("\n").filter(line => line.trim() !== "");

  flashcardItems.forEach(card => {
    const p = document.createElement("p");
    p.textContent = card;
    container.appendChild(p);
  });

  // Download flashcards as .txt
  downloadBtn.addEventListener("click", () => {
    const blob = new Blob([flashcards], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "flashcards.txt";
    link.click();
  });
});
