async function fetchProjects() {
  const response = await fetch("./data/projects.json");
  const data = await response.json();
  return data;
}

export async function displayProject() {
  const projects = await fetchProjects();
  const projectsContainer = document.getElementById("projet-container");
  console.log(projectsContainer);

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
    const divTechs = document.createElement("div");
    divTechs.classList.add("projet-techs");
    project.technologiesFr.forEach((tech) => {
      const spanTech = document.createElement("span");
      spanTech.classList.add("tech-tag", "fr");
      spanTech.textContent = tech;
      divTechs.appendChild(spanTech);
    });
    link.appendChild(divTechs);
    project.technologiesEn.forEach((tech) => {
      const spanTech = document.createElement("span");
      spanTech.classList.add("tech-tag", "en");
      spanTech.textContent = tech;
      divTechs.appendChild(spanTech);
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
    projectsContainer.appendChild(link);
  });
}

{
  /* <a href="/projets/ohmyfood" class="projet-lien">
  <div class="projet-infos">
    <span class="projet-date">Oct 2024</span>
    <h2 class="projet-titre">ohmyfood</h2>
  </div>
  <div class="projet-techs">
    <span class="tech-tag">Mobile-first</span>
    <span class="tech-tag">Animations CSS</span>
    <span class="tech-tag">Sass</span>
    <span class="tech-tag">Git</span>
  </div>
</a>; */
}
