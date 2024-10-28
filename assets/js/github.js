const username = "Phelete";

async function loadProjects() {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const projects = await response.json();
  const projectsContainer = document.getElementById("projects");

  projectsContainer.innerHTML = projects.map(project => `
    <div class="project-card">
      <h3><a href="${project.html_url}" target="_blank">${project.name}</a></h3>
      <p>${project.description || "No description"}</p>
    </div>
  `).join('');
}

loadProjects();
