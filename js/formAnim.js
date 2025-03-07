export function formAnim() {
  const inputs = document.querySelectorAll(".input");
  const underlines = document.querySelectorAll(".underline");

  // Créer un conteneur pour le span hors du flux principal
  const hiddenContainer = document.createElement("div");
  hiddenContainer.style.position = "absolute";
  hiddenContainer.style.top = "0";
  hiddenContainer.style.overflow = "hidden";
  hiddenContainer.style.lineHeight = "normal";
  hiddenContainer.style.letterSpacing = "0";
  hiddenContainer.style.padding = "0";
  hiddenContainer.style.margin = "0";
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

export function submitBtnAnim() {
  const textarea = document.querySelector("textarea");
  let submitBtn = "";
  const lang = localStorage.getItem("language");

  if (lang === "ENGLISH") {
    submitBtn = document.querySelector(".submitForm.en");
  } else {
    submitBtn = document.querySelector(".submitForm.fr");
  }

  // Suppression de l'élément span existant s'il existe déjà
  let existingSpan = document.querySelector(".measure-span");
  if (existingSpan) {
    existingSpan.remove();
  }

  // Création du span de mesure
  const span = document.createElement("span");
  span.classList.add("measure-span");

  // Configuration du span pour mesurer le texte correctement
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.style.top = "0";
  span.style.lineHeight = "normal";
  span.style.letterSpacing = "0px";
  span.style.padding = "0px";
  span.style.margin = "0px";
  span.style.whiteSpace = "pre-wrap";
  span.style.wordBreak = "break-word";

  // Récupération du style de police du textarea
  const textareaStyles = window.getComputedStyle(textarea);
  span.style.fontFamily = '"Poiret One", sans-serif';
  span.style.fontSize = textareaStyles.fontSize;
  span.style.fontWeight = textareaStyles.fontWeight;
  span.style.fontStyle = textareaStyles.fontStyle;

  // Ajout à la page
  document.body.appendChild(span);

  // Fonction pour mettre à jour la largeur du span en fonction de la taille d'écran
  function updateSpanWidth() {
    const isMobile = window.innerWidth <= 768;
    span.style.width = isMobile ? "200px" : "250px";
  }

  // Fonction pour calculer la hauteur réelle d'une ligne
  function calculateLineHeight() {
    // On crée un span temporaire avec une seule ligne
    const tempSpan = document.createElement("span");
    tempSpan.style.opacity = "0";
    tempSpan.style.pointerEvents = "none";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "nowrap";
    tempSpan.style.fontFamily = '"Poiret One", sans-serif';
    tempSpan.style.fontSize = textareaStyles.fontSize;
    tempSpan.style.fontWeight = textareaStyles.fontWeight;
    tempSpan.style.fontStyle = textareaStyles.fontStyle;
    tempSpan.textContent = "Test";
    document.body.appendChild(tempSpan);

    // Mesure de la hauteur d'une ligne
    const singleLineHeight = tempSpan.offsetHeight;
    document.body.removeChild(tempSpan);

    return singleLineHeight || 19; // Fallback à 19px si échec
  }

  // Obtenir la hauteur réelle d'une ligne
  let lineHeight = calculateLineHeight();

  // Fonction pour mettre à jour la position du bouton
  function updateButtonPosition() {
    textarea.style.display = "none"; // Cache temporairement
    textarea.offsetHeight; // Force un reflow (ne rien assigner mais lire une propriété)
    textarea.style.display = "block";

    // Si le textarea est vide, reset la position du bouton
    if (!textarea.value.trim()) {
      submitBtn.style.transform = "translateY(0px)";
      return;
    }

    // Mise à jour de la largeur du span
    updateSpanWidth();

    // Copie du texte dans le span
    span.textContent = textarea.value;

    // Calcul de la hauteur du texte
    const textHeight = span.offsetHeight;

    // Calcul du nombre de lignes
    const numberOfLines = Math.max(1, Math.round(textHeight / lineHeight));

    // Mise à jour de la position du bouton en fonction du nombre de lignes
    if (textarea.value.length < 5 && numberOfLines <= 1) {
      submitBtn.style.transform = "translateY(0px)";
    } else if (numberOfLines > 5) {
      submitBtn.style.transform = `translateY(${lineHeight * 4.3}px)`;
    } else if (numberOfLines > 4) {
      submitBtn.style.transform = `translateY(${lineHeight * 4}px)`;
    } else if (numberOfLines > 3) {
      submitBtn.style.transform = `translateY(${lineHeight * 3}px)`;
    } else if (numberOfLines > 2) {
      submitBtn.style.transform = `translateY(${lineHeight * 2}px)`; // Augmenté
    } else if (numberOfLines > 1) {
      submitBtn.style.transform = `translateY(${lineHeight}px)`; // Augmenté
    } else {
      submitBtn.style.transform = "translateY(0px)";
    }
  }

  // Vérifier que la police est bien chargée avant de lancer les calculs
  document.fonts.ready.then(() => {
    lineHeight = calculateLineHeight(); // Recalculer la hauteur de ligne avec la bonne police
    updateButtonPosition();
  });

  // Écouteurs d'événements
  window.addEventListener("resize", () => {
    updateSpanWidth();
    updateButtonPosition();
  });

  textarea.addEventListener("input", () => {
    updateButtonPosition();
  });

  // Initialisation avec un léger délai pour s'assurer que la police est bien chargée
  setTimeout(() => {
    updateSpanWidth();
    updateButtonPosition();
  }, 100);
}
