document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.querySelector(".button1");

  summarizeBtn.addEventListener("click", async () => {
    const noteText = document.querySelector("textarea").value;
    const fileInput = document.querySelector(".input");
    const lengthOption = document.querySelectorAll("select")[0].value;
    const styleOption = document.querySelectorAll("select")[1].value;
    const message = document.querySelector(".msg");

    let textContent = noteText;

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      textContent = await file.text();
    }

    if (!textContent.trim()) {
      message.innerHTML = "Please paste or upload your lecture notes first.";
      return;
    }

    summarizeBtn.disabled = true;
    summarizeBtn.textContent = "Summarizing...";

    try {
const response = await fetch("http://localhost:5500/api/summarize", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text: textContent,
    length: lengthOption,
    style: styleOption,
  }),
});


      const data = await response.json();

      if (!data.choices || !data.choices[0].message) {
        message.innerHTML = "No flashcards generated. Try again.";
        summarizeBtn.disabled = false;
        summarizeBtn.textContent = "Summarize";
        return;
      }

      const flashcards = data.choices[0].message.content;
      localStorage.setItem("flashcards", flashcards);

      window.location.href = "preview.html";
    } catch (err) {
      console.error(err);
      message.innerHTML = "Error generating flashcards. Check console.";
      summarizeBtn.disabled = false;
      summarizeBtn.textContent = "Summarize";
    }
  });
});
