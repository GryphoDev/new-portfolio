import { darkMode } from "./darkmode.js";
import { changeLanguage } from "./language.js";
import { animPresentationText } from "./animPresentationText.js";

function init() {
  darkMode();
  changeLanguage();
  animPresentationText();
}

init();
