// Fetch and render the projects data from projects.json
async function fetchProjects() {
  try {
    const res = await fetch("../data/projects.json"); // Path from root
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const projects = await res.json();
    render(projects);
    setupFilters(projects);
  } catch (err) {
    console.error("Failed to load projects:", err);
  }
}

// Represent the fetched projects-data as HTML code
function projectCard(p) {
  return `
  <article class="card" data-tags="${p.tags.join(",")}">
    <img class="card_media" src="${p.image}" alt="${p.title}" loading="lazy">
    <div class="card_body">
      <h3 class="card_title">${p.title}</h3>
      <div class="card_meta">${p.role} • ${p.year}</div>
      <p>${p.blurb}</p>
      <div class="badges">
        ${p.tags.map(t => `<span class="badge">${t}</span>`).join("")}
      </div>
      <div class="card_actions">
        <a class="btn btn--primary" href="${p.demo}" target="_blank" rel="noopener">Live</a>
        <a class="btn" href="${p.source}" target="_blank" rel="noopener">Code</a>
      </div>
    </div>
  </article>`;
}

function render(projects) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = projects.map(projectCard).join("");
}

function setupFilters(projects) {
  const bar = document.querySelector(".filter_bar");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    bar.querySelectorAll(".chip").forEach(c => c.classList.remove("chip--active"));
    btn.classList.add("chip--active");

    const key = btn.dataset.filter;
    if (key === "all") return render(projects);
    render(projects.filter(p => p.tags.includes(key)));
  });
}

// Initialize
fetchProjects();
