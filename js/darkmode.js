const darkModeButton = document.querySelector(".dark-mode-button");

export function darkMode() {
  // Appliquer le thème au chargement de la page
  const isDark = localStorage.getItem("theme") === "dark";
  isDark && document.documentElement.classList.add("dark-mode");
  darkModeButton.innerHTML = isDark ? "LIGHT" : "DARK";

  // Ajouter un écouteur d'événement pour basculer entre les thèmes
  darkModeButton.addEventListener("click", () => {
    const isDarkMode = document.documentElement.classList.toggle("dark-mode"); // Bascule la classe
    localStorage.setItem("theme", isDarkMode ? "dark" : "light"); // Enregistrer en mode sombre
    darkModeButton.innerHTML = isDarkMode ? "LIGHT" : "DARK"; // Mettre à jour le texte du bouton
  });
}
