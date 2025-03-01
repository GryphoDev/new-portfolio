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
  const submitBtn = document.querySelector(".submitForm");

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
  span.style.font = textareaStyles.font;

  // Ajout à la page
  document.body.appendChild(span);

  // Fonction pour mettre à jour la largeur du span en fonction de la taille d'écran
  function updateSpanWidth() {
    const isMobile = window.innerWidth <= 768;
    span.style.width = isMobile ? "200px" : "250px";
    console.log(
      "Span width updated:",
      span.style.width,
      "Screen width:",
      window.innerWidth
    );
  }

  // Fonction pour calculer la hauteur réelle d'une ligne
  function calculateLineHeight() {
    // On crée un span temporaire avec une seule ligne
    const tempSpan = document.createElement("span");
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    tempSpan.style.whiteSpace = "nowrap";
    tempSpan.style.font = textareaStyles.font;
    tempSpan.textContent = "Test";
    document.body.appendChild(tempSpan);

    // Mesure de la hauteur d'une ligne
    const singleLineHeight = tempSpan.offsetHeight;
    document.body.removeChild(tempSpan);

    return singleLineHeight || 19; // Fallback à 19px si échec
  }

  // Obtenir la hauteur réelle d'une ligne
  const lineHeight = calculateLineHeight();
  console.log("Calculated line height:", lineHeight);

  // Fonction pour mettre à jour la position du bouton
  function updateButtonPosition() {
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

    // Debug info
    console.log({
      text:
        textarea.value.substring(0, 20) +
        (textarea.value.length > 20 ? "..." : ""),
      textHeight,
      lineHeight,
      numberOfLines,
      spanWidth: span.offsetWidth,
    });

    // Mise à jour de la position du bouton en fonction du nombre de lignes
    // Avec une condition supplémentaire pour éviter le déplacement pour les entrées courtes
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

  // Ajouter un élément de débogage visible sur mobile
  function addDebugElement() {
    let debugEl = document.getElementById("debug-info");
    if (!debugEl) {
      debugEl = document.createElement("div");
      debugEl.id = "debug-info";
      debugEl.style.position = "fixed";
      debugEl.style.bottom = "0";
      debugEl.style.left = "0";
      debugEl.style.backgroundColor = "rgba(0,0,0,0.7)";
      debugEl.style.color = "white";
      debugEl.style.padding = "5px";
      debugEl.style.fontSize = "12px";
      debugEl.style.zIndex = "9999";
      document.body.appendChild(debugEl);
    }

    return debugEl;
  }

  // Mise à jour des informations de débogage
  function updateDebugInfo() {
    const debugEl = addDebugElement();
    debugEl.innerHTML = `
      Lines: ${Math.round(span.offsetHeight / lineHeight)}<br>
      Text H: ${span.offsetHeight}px<br>
      Line H: ${lineHeight}px<br>
      Span W: ${span.offsetWidth}px<br>
      Chars: ${textarea.value.length}
    `;
  }

  // Écouteurs d'événements
  window.addEventListener("resize", () => {
    updateSpanWidth();
    updateButtonPosition();
  });

  textarea.addEventListener("input", () => {
    updateButtonPosition();
    updateDebugInfo();
  });

  // Initialisation
  updateSpanWidth();
  updateButtonPosition();
  updateDebugInfo();
}
