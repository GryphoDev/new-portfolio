export function animPresentationText() {
  const presentationTexts = document.querySelectorAll(".presentationText");

  presentationTexts.forEach((text) => {
    let opacity = 0;
    let interval = setInterval(() => {
      opacity += 0.01; // Apparition plus lente
      if (opacity >= 1) {
        clearInterval(interval);
        startGlitchEffect(text); // Déclenche l'effet de baisse de tension après apparition
      } else {
        text.style.opacity = opacity.toFixed(2);
      }

      // Effet glitch plus fréquent et avec une plage d'opacité plus large
      if (Math.random() > 0.75) {
        // Augmenter la probabilité de glitch
        text.style.opacity = (Math.random() * 0.7 + opacity).toFixed(2); // Oscille plus largement
      }
    }, 200); // Intervalle pour une apparition plus lente
  });
}

// Effet de "baisses de tension" amplifié après apparition complète du texte
function startGlitchEffect(text) {
  setInterval(() => {
    if (Math.random() > 0.6) {
      // Augmenter la probabilité de glitch
      text.style.opacity = Math.random() * 0.7 + 0.3; // Plage entre 0.3 et 1 (plus de variations)
      setTimeout(() => {
        text.style.opacity = Math.random() * 0.3 + 0.7; // Retour à une opacité plus lumineuse
      }, Math.random() * 200); // Réduire le délai pour un retour plus rapide à la normale
    }
  }, 250); // Intervalle plus court pour plus de glitchs
}
