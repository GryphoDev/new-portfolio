export function formAnim() {
  const inputs = document.querySelectorAll(".input");
  const underlines = document.querySelectorAll(".underline");

  // Créer un conteneur pour le span hors du flux principal
  const hiddenContainer = document.createElement("div");
  hiddenContainer.style.position = "absolute";
  hiddenContainer.style.top = "0";
  hiddenContainer.style.overflow = "hidden";
  hiddenContainer.style.height = "0"; // Ne prend pas d'espace
  document.body.appendChild(hiddenContainer);

  const span = document.createElement("span");
  span.style.display = "inline-block"; // Évite les sauts de ligne
  span.classList.add("span");
  hiddenContainer.appendChild(span);

  function updateUnderline(input, index) {
    requestAnimationFrame(() => {
      span.textContent = input.value;
      const textWidth = span.getBoundingClientRect().width;

      // Récupérer la largeur actuelle de l'input
      const inputWidth = input.clientWidth;

      // Assurer que l'underline ne dépasse pas l'input
      underlines[index].style.width = input.value.trim()
        ? `${Math.min(textWidth, inputWidth)}px`
        : "0px";
    });
  }

  // Mise à jour au chargement initial
  inputs.forEach((input, index) => {
    updateUnderline(input, index);
  });

  // Mise à jour à chaque input
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => updateUnderline(input, index));
  });

  // Mise à jour au resize
  window.addEventListener("resize", () => {
    inputs.forEach((input, index) => updateUnderline(input, index));
  });
}

/**
 * Ajuste la position du bouton de soumission en fonction de la hauteur du contenu du textarea
 */
export function submitBtnAnim() {
  const textarea = document.querySelector("textarea");
  const submitBtn = document.querySelector(".submitForm");
  const span = document.createElement("span");

  // Configuration du span invisible pour mesurer le texte
  span.classList.add("measure-span");
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.style.top = "0";
  span.style.whiteSpace = "pre-wrap";
  span.style.wordBreak = "break-word";
  span.style.font = window.getComputedStyle(textarea).font; // Même police que le textarea
  document.body.appendChild(span);

  function updateSpanWidth() {
    span.style.width = window.innerWidth <= 768 ? "200px" : "250px";
  }

  // Fonction pour mettre à jour la position du bouton
  function updateButtonPosition() {
    // Met à jour la largeur du span
    updateSpanWidth();

    // Copie le texte du textarea dans le span invisible
    span.textContent = textarea.value;

    // Calcule la hauteur du texte
    const textHeight = span.offsetHeight;

    // Nombre de lignes approximatif (en supposant que chaque ligne fait 19px)
    const lineHeight = 19;
    const numberOfLines = Math.ceil(textHeight / lineHeight);

    // Ajuste la position du bouton en fonction du nombre de lignes
    if (numberOfLines > 5) {
      submitBtn.style.transform = `translateY(${80}px)`;
    } else if (numberOfLines > 4) {
      submitBtn.style.transform = `translateY(${76}px)`;
    } else if (numberOfLines > 3) {
      submitBtn.style.transform = `translateY(${57}px)`;
    } else if (numberOfLines > 2) {
      submitBtn.style.transform = `translateY(${38}px)`;
    } else if (numberOfLines > 1) {
      submitBtn.style.transform = `translateY(${19}px)`;
    } else {
      submitBtn.style.transform = "translateY(0px)";
    }
  }

  // Met à jour la largeur au chargement et au resize
  updateSpanWidth();
  window.addEventListener("resize", updateSpanWidth);

  // Attache l'événement input au textarea
  textarea.addEventListener("input", updateButtonPosition);

  // Exécute une fois au chargement pour initialiser
  updateButtonPosition();
}
