import { submitBtnAnim } from "./formAnim.js";
import { formManageMail } from "./formManageMail.js";
const htmlLang = document.querySelector("html");

export function changeLanguage() {
  const languageButton = document.querySelector(".language-button");

  function applyLanguage(language) {
    language === "ENGLISH"
      ? htmlLang.setAttribute("lang", "en")
      : htmlLang.setAttribute("lang", "fr");

    if (language === "ENGLISH") {
      document
        .querySelectorAll(".fr")
        .forEach((el) => (el.style.display = "none"));
      document
        .querySelectorAll(".en")
        .forEach((el) => (el.style.display = "block"));
      languageButton.innerHTML = "FRANÇAIS";
    } else {
      document
        .querySelectorAll(".en")
        .forEach((el) => (el.style.display = "none"));
      document
        .querySelectorAll(".fr")
        .forEach((el) => (el.style.display = "block"));
      languageButton.innerHTML = "ENGLISH";
    }
  }

  // Vérifie la langue sauvegardée et l'applique
  const savedLanguage = localStorage.getItem("language") || "FRANÇAIS";

  applyLanguage(savedLanguage);

  languageButton.addEventListener("click", () => {
    const newLanguage = languageButton.innerHTML; // Prochaine langue après le clic
    localStorage.setItem("language", newLanguage);
    applyLanguage(newLanguage);
    submitBtnAnim();
    formManageMail();
  });
}
