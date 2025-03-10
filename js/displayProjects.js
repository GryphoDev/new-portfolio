async function fetchProjects() {
  const response = await fetch("/data/projects.json");
  const data = await response.json();
  return data;
}

export async function displayProject() {
  const projects = await fetchProjects();
  const projectsContainer = document.getElementById("projet-container");

  const isEnglish = localStorage.getItem("language") === "ENGLISH"; // Récupère la langue du localStorage

  projects.projets.forEach((project) => {
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.href = project.url;
    link.classList.add("projet-lien");

    const divInfos = document.createElement("div");
    divInfos.classList.add("projet-infos");

    const spanDate = document.createElement("span");
    spanDate.classList.add("projet-date");
    spanDate.textContent = project.date;

    const h2Titre = document.createElement("h2");
    h2Titre.classList.add("projet-titre");
    h2Titre.textContent = project.title;

    divInfos.appendChild(spanDate);
    divInfos.appendChild(h2Titre);
    link.appendChild(divInfos);

    // Créer et ajouter les technologies en fonction de la langue
    const divTechs = document.createElement("div");
    divTechs.classList.add("projet-techs");

    // Technologies en français
    project.technologiesFr.forEach((tech) => {
      const spanTechFr = document.createElement("span");
      spanTechFr.classList.add("tech-tag", "fr");
      spanTechFr.textContent = tech;
      divTechs.appendChild(spanTechFr);
    });

    // Technologies en anglais
    project.technologiesEn.forEach((tech) => {
      const spanTechEn = document.createElement("span");
      spanTechEn.classList.add("tech-tag", "en");
      spanTechEn.textContent = tech;
      divTechs.appendChild(spanTechEn);
    });

    link.appendChild(divTechs);

    // Créer la description en français et en anglais, puis afficher en fonction de la langue
    const spanDescriptionFr = document.createElement("span");
    spanDescriptionFr.classList.add("projet-description", "fr");
    spanDescriptionFr.textContent = project.descriptionFr;
    link.appendChild(spanDescriptionFr);

    const spanDescriptionEn = document.createElement("span");
    spanDescriptionEn.classList.add("projet-description", "en");
    spanDescriptionEn.textContent = project.descriptionEn;
    link.appendChild(spanDescriptionEn);

    // Masquer ou afficher la description en fonction de la langue

    spanDescriptionFr.style.display = isEnglish ? "none" : "block";
    spanDescriptionEn.style.display = isEnglish ? "block" : "none";
    divTechs.querySelectorAll(".fr").forEach((tech) => {
      tech.style.display = isEnglish ? "none" : "inline"; // Masque les technologies françaises
    });
    divTechs.querySelectorAll(".en").forEach((tech) => {
      tech.style.display = isEnglish ? "inline" : "none"; // Affiche les technologies anglaises
    });

    // Ajouter le projet au container
    projectsContainer.appendChild(link);
  });
}
