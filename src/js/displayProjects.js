async function fetchProjects() {
  const response = await fetch("/data/projects.json");
  const data = await response.json();
  return data;
}

export async function displayProject() {
  const projects = await fetchProjects();
  const projectsContainer = document.getElementById("projet-container");

  const isEnglish = localStorage.getItem("language") === "ENGLISH";

  projects.projets.forEach((project) => {
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.href = project.url;
    link.classList.add("projet-lien");

    const divInfos = document.createElement("div");
    divInfos.classList.add("projet-infos");

    const spanDateFr = document.createElement("span");
    spanDateFr.classList.add("projet-date", "fr");
    spanDateFr.textContent = project.dateFr;

    const spanDateEn = document.createElement("span");
    spanDateEn.classList.add("projet-date", "en");
    spanDateEn.textContent = project.dateEn;

    const h2Titre = document.createElement("h2");
    h2Titre.classList.add("projet-titre");
    h2Titre.textContent = project.title;

    divInfos.appendChild(spanDateFr);
    divInfos.appendChild(spanDateEn);
    divInfos.appendChild(h2Titre);
    link.appendChild(divInfos);

    const divTechs = document.createElement("div");
    divTechs.classList.add("projet-techs");

    project.technologiesFr.forEach((tech) => {
      const spanTechFr = document.createElement("span");
      spanTechFr.classList.add("tech-tag", "fr");
      spanTechFr.textContent = tech;
      divTechs.appendChild(spanTechFr);
    });

    project.technologiesEn.forEach((tech) => {
      const spanTechEn = document.createElement("span");
      spanTechEn.classList.add("tech-tag", "en");
      spanTechEn.textContent = tech;
      divTechs.appendChild(spanTechEn);
    });

    link.appendChild(divTechs);

    const spanDescriptionFr = document.createElement("span");
    spanDescriptionFr.classList.add("projet-description", "fr");
    spanDescriptionFr.textContent = project.descriptionFr;
    link.appendChild(spanDescriptionFr);

    const spanDescriptionEn = document.createElement("span");
    spanDescriptionEn.classList.add("projet-description", "en");
    spanDescriptionEn.textContent = project.descriptionEn;
    link.appendChild(spanDescriptionEn);

    spanDateFr.style.display = isEnglish ? "none" : "block";
    spanDateEn.style.display = isEnglish ? "block" : "none";
    spanDescriptionFr.style.display = isEnglish ? "none" : "block";
    spanDescriptionEn.style.display = isEnglish ? "block" : "none";
    divTechs.querySelectorAll(".fr").forEach((tech) => {
      tech.style.display = isEnglish ? "none" : "inline";
    });
    divTechs.querySelectorAll(".en").forEach((tech) => {
      tech.style.display = isEnglish ? "inline" : "none";
    });

    projectsContainer.appendChild(link);
  });
}
