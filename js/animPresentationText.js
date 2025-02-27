const allnormalText = document.querySelectorAll(".normal");

const languageButton = document.querySelectorAll(".language-button");
languageButton.forEach((button) => {
  button.addEventListener("click", () => {
    allnormalText.forEach((text) => {
      text.style.opacity = "0";
    });
    setTimeout(() => {
      animPresentationText();
    }, 100);
  });
});

export function animPresentationText() {
  const language = localStorage.getItem("language") || "FRANÇAIS";
  console.log(language);

  let normalText;
  let importantText;
  if (language === "FRANÇAIS") {
    normalText = document.querySelectorAll(".fr.presentationText .normal");
    importantText = document.querySelectorAll(
      ".fr.presentationText .important"
    );
  }
  if (language === "ENGLISH") {
    normalText = document.querySelectorAll(".en.presentationText .normal");
    importantText = document.querySelectorAll(
      ".en.presentationText .important"
    );
    console.log(normalText);
    console.log(importantText);
  }
  normalText.forEach((text) => {
    text.style.opacity = "0";
  });
  importantText.forEach((text) => {
    text.classList.remove("importantWordsAnimation");
  });
  document.documentElement.classList.add("no-smooth-scroll");
  importantText.forEach((text, index) => {
    setTimeout(() => {
      text.classList.add("importantWordsAnimation");
      // Si c'est le dernier élément important, afficher les normaux après un délai
      if (index === importantText.length - 1) {
        setTimeout(() => {
          normalText.forEach((text) => {
            text.style.opacity = "1";
          });
          document.documentElement.classList.remove("no-smooth-scroll");
        }, 700); // Délai après l'affichage du dernier "important"
      }
    }, index * 600); // Chaque mot apparaît avec un délai progressif
  });
}
