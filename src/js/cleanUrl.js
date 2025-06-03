export function cleanURL() {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      window.history.replaceState(null, null, window.location.pathname);
    }, 10);
  });
}
