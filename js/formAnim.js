export function formAnim() {
  const inputs = document.querySelectorAll(".input");
  const underlines = document.querySelectorAll(".underline");

  inputs.forEach((input) => console.log(input));
  underlines.forEach((underline) => console.log(underline));
  // Créer un span caché pour mesurer la largeur du texte en temps réel
  const span = document.createElement("span");
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  span.style.whiteSpace = "nowrap"; // Empêche le texte de passer à la ligne
  span.classList.add("span");
  document.body.appendChild(span);

  inputs.forEach((input, index) =>
    input.addEventListener("input", () => {
      // Mettre à jour le texte du span avec la valeur de l'input
      console.log(index);

      span.textContent = input.value;
      // Calculer la largeur du texte
      const textWidth = span.getBoundingClientRect().width;
      if (textWidth <= 255) {
        // Mettre à jour la largeur de l'élément de soulignement (underline)
        underlines[index].style.width = `${textWidth}px`;
      }
    })
  );
}
