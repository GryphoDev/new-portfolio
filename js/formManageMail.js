import { submitBtnAnim } from "./formAnim.js";

const inputNameEn = document.querySelector(".name.input.en");
const inputNameFr = document.querySelector(".name.input.fr");

export function formManageMail() {
  const lang = localStorage.getItem("language");
  if (lang === "ENGLISH") {
    inputNameFr.removeAttribute("required");
    inputNameEn.setAttribute("required", "true");
  } else {
    inputNameEn.removeAttribute("required");
    inputNameFr.setAttribute("required", "true");
  }

  document
    .querySelector(".form")
    .addEventListener("submit", async function (e) {
      e.preventDefault(); // Empêche la redirection

      const form = e.target;
      const formData = new FormData(form);

      const response = await fetch("https://formspree.io/f/xnnjdkbb", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert("Message envoyé");
        form.reset();
        document.querySelectorAll(".underline").forEach((underline) => {
          underline.style.width = "0px"; // Remet toutes les underlines à zéro
        });
        submitBtnAnim();
      } else {
        alert("Une erreur s'est produite. Veuillez réessayer.");
      }
    });
}
