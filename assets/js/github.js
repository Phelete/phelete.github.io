const username = "Phelete";

async function loadProjects() {
  const projectsContainer = document.getElementById("projects");
  if (!projectsContainer) return; // Not on the projects page

  // Display loading if empty
  if (projectsContainer.innerHTML.trim() === "") {
    projectsContainer.innerHTML = "<h2>Loading projects...</h2>";
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const projects = await response.json();

    projectsContainer.innerHTML = projects.map(project => `
      <div class="project-card">
        <h3><a href="${project.html_url}" target="_blank">${project.name}</a></h3>
        <p>${project.description || "No description"}</p>
      </div>
    `).join('');
  } catch (e) {
    projectsContainer.innerHTML = "<h2>Failed to load projects.</h2>";
  }
}

// Ensure it loads initially if on projects page
document.addEventListener("DOMContentLoaded", loadProjects);

// Listen to our custom SPA navigation event
window.addEventListener("spa-navigate", loadProjects);
