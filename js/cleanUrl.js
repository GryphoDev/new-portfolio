export function cleanURL() {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      window.history.replaceState(null, null, window.location.pathname);
    }, 0);
  });
}
