import { darkMode } from "./darkmode.js";
import { changeLanguage } from "./language.js";
import { animPresentationText } from "./animPresentationText.js";
import { displayProject } from "./displayProjects.js";
import { submitBtnAnim } from "./formAnim.js";

function init() {
  darkMode();
  changeLanguage();
  animPresentationText();
  displayProject();
  submitBtnAnim();
}

init();
