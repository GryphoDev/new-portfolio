const darkModeButton = document.querySelector(".dark-mode-button");

export function darkMode() {
  // Appliquer le thème au chargement de la page
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
    darkModeButton.innerHTML = "LIGHT"; // Mettre à jour le texte du bouton
  } else {
    darkModeButton.innerHTML = "DARK"; // Par défaut, mode clair
  }

  // Ajouter un écouteur d'événement pour basculer entre les thèmes
  darkModeButton.addEventListener("click", () => {
    const isDarkMode = document.documentElement.classList.toggle("dark-mode"); // Bascule la classe

    if (isDarkMode) {
      localStorage.setItem("theme", "dark"); // Enregistrer en mode sombre
      darkModeButton.innerHTML = "LIGHT"; // Mettre à jour le texte du bouton
    } else {
      localStorage.setItem("theme", "light"); // Enregistrer en mode clair
      darkModeButton.innerHTML = "DARK"; // Mettre à jour le texte du bouton
    }
  });
}
