import { submitBtnAnim } from "./formAnim.js";

const inputNameEn = document.querySelector(".name.input.en");
const inputNameFr = document.querySelector(".name.input.fr");

export function formManageMail() {
  const lang = localStorage.getItem("language") || "FRENCH";
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
        form.reset();
        document.querySelectorAll(".underline").forEach((underline) => {
          underline.style.width = "0px"; // Remet toutes les underlines à zéro
        });
        submitBtnAnim();
        showMessage(lang);
      } else {
        alert("Une erreur s'est produite. Veuillez réessayer.");
      }
    });
}

function showMessage(lang) {
  console.log(lang);

  const form = document.querySelector(".form");
  const spanConfirmationMessage = document.querySelector(
    ".submitMessageConfirmation"
  );
  const message = {
    messageEn: "Boom! Your message is on its way. \nI’ll get back to you soon!",
    messageFr: "Boum! Votre message est en route. \nJe vous réponds bientôt !",
  };

  form.style.opacity = "0";
  if (lang === "ENGLISH") {
    spanConfirmationMessage.textContent = message.messageEn;
  } else {
    spanConfirmationMessage.textContent = message.messageFr;
  }
  spanConfirmationMessage.style.zIndex = "1";
  spanConfirmationMessage.style.opacity = "1";

  setTimeout(() => {
    form.style.opacity = "1";
    spanConfirmationMessage.style.zIndex = "-1";
    spanConfirmationMessage.style.opacity = "0";
  }, 5000);
  setTimeout(() => {
    spanConfirmationMessage.textContent = "";
  }, 6000);
}
