async function fetchProjects() {
  const response = await fetch("/data/projects.json");
  const data = await response.json();
  return data;
}

export async function displayProject() {
  const projects = await fetchProjects();
  const projectsContainer = document.getElementById("projet-container");

  const language = localStorage.getItem("language") || "FRANÇAIS"; // Récupère la langue du localStorage

  projects.projets.forEach((project) => {
    const link = document.createElement("a");
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

    project.technologiesFr.forEach((tech) => {
      const spanTech = document.createElement("span");
      spanTech.classList.add("tech-tag", "fr");
      spanTech.textContent = tech;
      divTechs.appendChild(spanTech);
    });

    project.technologiesEn.forEach((tech) => {
      const spanTech = document.createElement("span");
      spanTech.classList.add("tech-tag", "en");
      spanTech.textContent = tech;
      divTechs.appendChild(spanTech);
    });

    link.appendChild(divTechs);

    // Créer la description en français et anglais, puis afficher en fonction de la langue
    const spanDescriptionFr = document.createElement("span");
    spanDescriptionFr.classList.add("projet-description", "fr");
    spanDescriptionFr.textContent = project.descriptionFr;
    link.appendChild(spanDescriptionFr);

    const spanDescriptionEn = document.createElement("span");
    spanDescriptionEn.classList.add("projet-description", "en");
    spanDescriptionEn.textContent = project.descriptionEn;
    link.appendChild(spanDescriptionEn);

    // Masquer ou afficher la description en fonction de la langue
    if (language === "FRANÇAIS") {
      spanDescriptionFr.style.display = "block";
      spanDescriptionEn.style.display = "none";
    } else {
      spanDescriptionFr.style.display = "none";
      spanDescriptionEn.style.display = "block";
    }

    // Ajouter le projet au container
    projectsContainer.appendChild(link);
  });
}
