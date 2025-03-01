import { darkMode } from "./darkmode.js";
import { changeLanguage } from "./language.js";
import { animPresentationText } from "./animPresentationText.js";
import { displayProject } from "./displayProjects.js";
import { submitBtnAnim, formAnim } from "./formAnim.js";

function init() {
  darkMode();
  changeLanguage();
  animPresentationText();
  displayProject();
  submitBtnAnim();
  formAnim();
}

init();
