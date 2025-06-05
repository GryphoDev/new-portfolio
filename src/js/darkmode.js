const darkModeButton = document.querySelector(".dark-mode-button");

export function darkMode() {
  const isDark = localStorage.getItem("theme") === "dark";
  isDark && document.documentElement.classList.add("dark-mode");
  darkModeButton.innerHTML = isDark ? "LIGHT" : "DARK";

  darkModeButton.addEventListener("click", () => {
    const isDarkMode = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    darkModeButton.innerHTML = isDarkMode ? "LIGHT" : "DARK";
  });
}
