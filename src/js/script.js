import { darkMode } from "./darkmode.js";
import { changeLanguage } from "./language.js";
import { animPresentationText } from "./animPresentationText.js";
import { displayProject } from "./displayProjects.js";
import { submitBtnAnim, formAnim } from "./formAnim.js";
import { cleanURL } from "./cleanUrl.js";
import { formManageMail } from "./formManageMail.js";

function init() {
  cleanURL();
  animPresentationText();
  darkMode();
  changeLanguage();
  displayProject();
  submitBtnAnim();
  formAnim();
  formManageMail();
}

init();
