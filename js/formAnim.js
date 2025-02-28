export function formAnim() {
  const inputs = document.querySelectorAll(".input");
  const underlines = document.querySelectorAll(".underline");

  // Créer un conteneur pour le span hors du flux principal
  const hiddenContainer = document.createElement("div");
  hiddenContainer.style.position = "absolute";
  hiddenContainer.style.overflow = "hidden";
  hiddenContainer.style.height = "0"; // Ne prend pas d'espace
  document.body.appendChild(hiddenContainer);

  const span = document.createElement("span");
  span.style.display = "inline-block"; // Évite les sauts de ligne
  span.classList.add("span");
  hiddenContainer.appendChild(span);

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      span.textContent = input.value; // Mettre à jour le texte du span

      const textWidth = span.getBoundingClientRect().width;

      if (textWidth <= 255) {
        underlines[index].style.width = `${textWidth}px`;
      }
    });
  });
}

let lines = 0;

export function submitBtnAnim() {
  const textarea = document.querySelector("textarea");
  const submitBtn = document.querySelector(".submitForm");
  const span = document.querySelector(".span");

  textarea.addEventListener("input", () => {
    let spanWords = span.textContent.split(" ");
    console.log(spanWords);
    if (lines > 0) {
      console.log("lines");
      lines = 0;
    }

    span.textContent = textarea.value; // Mettre à jour le texte du span
    let textWidth = span.getBoundingClientRect().width;

    console.log(textWidth);
    if (textWidth >= 1231) {
      console.log("cinquieme ligne");

      submitBtn.style = "transform: translateY(80px)";
    } else if (textWidth >= 989) {
      console.log("quatrieme ligne");

      submitBtn.style = "transform: translateY(76px)";
    } else if (textWidth >= 737) {
      console.log("troisieme ligne");

      submitBtn.style = "transform: translateY(57px)";
    } else if (textWidth >= 500) {
      console.log("dexieme ligne");

      submitBtn.style = "transform: translateY(38px)";
    } else if (textWidth >= 250) {
      console.log("premiere ligne");
      submitBtn.style = "transform: translateY(19px)";
      lines++;
    } else if (textWidth <= 250) {
      submitBtn.style = "transform: translateY(0px)";
    }
  });
}
