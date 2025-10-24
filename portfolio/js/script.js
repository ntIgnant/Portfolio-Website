const glider = document.getElementById('glider');
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const firstLinkSelector = '.glider_link';
let lastFocused = null;

// open/close helpers
function openGlider(){
  lastFocused = document.activeElement;
  glider.hidden = false;
  // use <aside open> for animation state
  glider.setAttribute('open', '');
  menuToggle.setAttribute('aria-expanded', 'true');

  // focus first menu item
  const first = glider.querySelector(firstLinkSelector) || glider.querySelector('button, a, [tabindex]');
  (first || glider).focus();
  // lock scroll
  document.documentElement.style.overflow = 'hidden';
}

function closeGlider(){
  glider.removeAttribute('open');
  menuToggle.setAttribute('aria-expanded', 'false');

  // let CSS transition finish, then hide
  setTimeout(() => { glider.hidden = true; }, 300);
  document.documentElement.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

// open/close events
menuToggle.addEventListener('click', openGlider);
menuClose.addEventListener('click', closeGlider);

// click outside closes (optional)
glider.addEventListener('click', (e) => {
  if (e.target === glider) closeGlider();
});

// ESC to close
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !glider.hidden) closeGlider();
});

// close glider when navigating within the page
glider.querySelectorAll('.glider_link').forEach(a => {
  a.addEventListener('click', () => {
    // small delay for click feedback
    setTimeout(closeGlider, 80);
  });
});

