import { submitBtnAnim } from "./formAnim.js";
import { formManageMail } from "./formManageMail.js";
const htmlLang = document.querySelector("html");
const languageButton = document.querySelector(".language-button");

export function changeLanguage() {
  function applyLanguage(language) {
    const isEnglish = language === "ENGLISH";

    htmlLang.setAttribute("lang", isEnglish ? "en" : "fr");
    document
      .querySelectorAll(".fr")
      .forEach(
        (textFr) => (textFr.style.display = isEnglish ? "none" : "block")
      );
    document
      .querySelectorAll(".en")
      .forEach(
        (textEn) => (textEn.style.display = isEnglish ? "block" : "none")
      );
    languageButton.innerHTML = isEnglish ? "FRANÇAIS" : "ENGLISH";
  }

  const savedLanguage = localStorage.getItem("language") || "FRANÇAIS";
  applyLanguage(savedLanguage);

  languageButton.addEventListener("click", () => {
    const newLanguage = languageButton.innerHTML;
    localStorage.setItem("language", newLanguage);
    applyLanguage(newLanguage);
    submitBtnAnim();
    formManageMail();
  });
}
