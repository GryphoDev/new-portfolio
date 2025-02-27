export function changeLanguage() {
  const languageButton = document.querySelector(".language-button");
  languageButton.addEventListener("click", () => {
    if (languageButton.innerHTML === "ENGLISH") {
      const elements = document.querySelectorAll(".fr");
      elements.forEach((element) => {
        element.style.display = "none";
      });
      const elements2 = document.querySelectorAll(".en");
      elements2.forEach((element) => {
        element.style.display = "block";
      });
      languageButton.innerHTML = "FRANÇAIS";
    } else if (languageButton.innerHTML === "FRANÇAIS") {
      const elements = document.querySelectorAll(".en");
      elements.forEach((element) => {
        element.style.display = "none";
      });
      const elements2 = document.querySelectorAll(".fr");
      elements2.forEach((element) => {
        element.style.display = "block";
      });
      languageButton.innerHTML = "ENGLISH";
    }
  });
}
