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
