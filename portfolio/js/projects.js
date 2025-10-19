// js/projects.js

// Build a URL relative to THIS JS file (not the HTML page)
const DATA_URL = new URL('/data/projects.json', import.meta.url);

async function fetchProjects() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '<p>Loading projects…</p>';

  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const projects = await res.json();

    if (!Array.isArray(projects) || projects.length === 0) {
      grid.innerHTML = '<p>No projects found.</p>';
      return;
    }

    render(projects);
    setupFilters(projects);
  } catch (err) {
    console.error('Failed to load projects:', err);
    grid.innerHTML = '<p style="color:#c00">Failed to load projects. Check console.</p>';
  }
}

function projectCard(p) {
  const tagsAttr = (p.tags || []).join(',');
  const badges = (p.tags || []).map(t => `<span class="badge">${t}</span>`).join('');

  return `
    <article class="card" data-tags="${tagsAttr}">
      <img class="card_media" src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="card_body">
        <h3 class="card_title">${p.title}</h3>
        <div class="card_meta">${p.role} • ${p.year}</div>
        <p>${p.blurb}</p>
        <div class="badges">${badges}</div>
        <div class="card_actions">
          <a class="btn btn--primary" href="${p.demo}" target="_blank" rel="noopener">Live</a>
          <a class="btn" href="${p.source}" target="_blank" rel="noopener">Code</a>
        </div>
      </div>
    </article>`;
}

function render(projects) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = projects.map(projectCard).join('');
}

function setupFilters(projects) {
  const bar = document.querySelector('.filter_bar');
  if (!bar) return;

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;

    bar.querySelectorAll('.chip').forEach(c => c.classList.remove('chip--active'));
    btn.classList.add('chip--active');

    const key = btn.dataset.filter;
    const list = key === 'all' ? projects : projects.filter(p => (p.tags || []).includes(key));
    render(list);
  });
}

// kick it off
fetchProjects();
