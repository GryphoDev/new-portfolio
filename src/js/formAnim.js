export function formAnim() {
  const inputs = document.querySelectorAll(".input");
  const underlines = document.querySelectorAll(".underline");

  const hiddenContainer = document.createElement("div");
  hiddenContainer.style.position = "absolute";
  hiddenContainer.style.top = "0";
  hiddenContainer.style.overflow = "hidden";
  hiddenContainer.style.lineHeight = "normal";
  hiddenContainer.style.letterSpacing = "0";
  hiddenContainer.style.padding = "0";
  hiddenContainer.style.margin = "0";
  hiddenContainer.style.height = "0";
  document.body.appendChild(hiddenContainer);

  const span = document.createElement("span");
  span.style.display = "inline-block";
  span.classList.add("span");
  hiddenContainer.appendChild(span);

  function updateUnderline(input, index) {
    requestAnimationFrame(() => {
      span.textContent = input.value;
      const textWidth = span.getBoundingClientRect().width;

      const inputWidth = input.clientWidth;

      underlines[index].style.width = input.value.trim()
        ? `${Math.min(textWidth, inputWidth)}px`
        : "0px";
    });
  }

  inputs.forEach((input, index) => {
    updateUnderline(input, index);
  });

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => updateUnderline(input, index));
  });

  window.addEventListener("resize", () => {
    inputs.forEach((input, index) => updateUnderline(input, index));
  });
}

export function submitBtnAnim() {
  const textarea = document.querySelector("textarea");
  let submitBtn = "";
  const lang = localStorage.getItem("language");
  let lineHeight = 19;

  if (lang === "ENGLISH") {
    submitBtn = document.querySelector(".submitForm.en");
  } else {
    submitBtn = document.querySelector(".submitForm.fr");
  }

  let existingSpan = document.querySelector(".measure-span");
  if (existingSpan) existingSpan.remove();

  const span = document.createElement("span");
  span.classList.add("measure-span");

  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.style.top = "0";
  span.style.whiteSpace = "pre-wrap";
  span.style.wordBreak = "break-word";

  document.body.appendChild(span);

  function updateSpanWidth() {
    span.style.width = window.innerWidth <= 768 ? "200px" : "250px";
  }

  function getComputedFontStyles() {
    const textareaStyles = window.getComputedStyle(textarea);
    return {
      fontFamily: textareaStyles.fontFamily || '"Poiret One", sans-serif',
      fontSize: textareaStyles.fontSize || "16px",
      fontWeight: textareaStyles.fontWeight || "400",
      fontStyle: textareaStyles.fontStyle || "normal",
    };
  }

  function applyFontStyles(element, styles) {
    element.style.fontFamily = styles.fontFamily;
    element.style.fontSize = styles.fontSize;
    element.style.fontWeight = styles.fontWeight;
    element.style.fontStyle = styles.fontStyle;
  }

  function calculateLineHeight() {
    const tempSpan = document.createElement("span");
    tempSpan.textContent = "Test";
    tempSpan.style.visibility = "hidden";
    tempSpan.style.position = "absolute";
    document.body.appendChild(tempSpan);

    const styles = getComputedFontStyles();
    applyFontStyles(tempSpan, styles);

    const singleLineHeight = tempSpan.offsetHeight;
    document.body.removeChild(tempSpan);

    return singleLineHeight || 19;
  }

  function updateButtonPosition() {
    textarea.style.display = "none";
    textarea.offsetHeight;
    textarea.style.display = "block";
    if (!textarea.value.trim()) {
      submitBtn.style.transform = "translateY(0px)";
      return;
    }

    updateSpanWidth();
    span.textContent = textarea.value;
    const textHeight = span.offsetHeight;
    const numberOfLines = Math.max(1, Math.round(textHeight / lineHeight));

    let translateY = 0;
    if (numberOfLines > 5) {
      translateY = lineHeight * 4.3;
    } else if (numberOfLines > 4) {
      translateY = lineHeight * 4;
    } else if (numberOfLines > 3) {
      translateY = lineHeight * 3;
    } else if (numberOfLines > 2) {
      translateY = lineHeight * 2;
    } else if (numberOfLines > 1) {
      translateY = lineHeight;
    }
    submitBtn.style.transform = `translateY(${translateY}px)`;
  }

  function initialize() {
    document.fonts.ready.then(() => {
      const styles = getComputedFontStyles();
      applyFontStyles(span, styles);
      lineHeight = calculateLineHeight();
      updateButtonPosition();
    });
  }

  window.addEventListener("resize", () => {
    updateSpanWidth();
    updateButtonPosition();
  });

  textarea.addEventListener("input", () => {
    updateButtonPosition();
  });

  setTimeout(() => {
    initialize();
  }, 100);
}
