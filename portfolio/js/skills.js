// ---- skills ----
const skills = [
  { src: "assets/img/icon/python-icon.svg",  alt: "Python" },
  { src: "assets/img/icon/git-scm-ar21.svg",  alt: "GitHub" },
  { src: "assets/img/icon/javascript-icon.svg",      alt: "JavaScript" },
  { src: "assets/img/icon/mysql-ar21.svg",     alt: "SQL" },
  { src: "assets/img/icon/nodejs-ar21.svg",    alt: "Node.js" },
  { src: "assets/img/icon/expressjs-icon.svg", alt: "Express" },
  { src: "assets/img/icon/w3_html5-icon.svg",    alt: "HTML" },
  { src: "assets/img/icon/w3_css-official.svg",     alt: "CSS" },
  { src: "assets/img/icon/visualstudio_code-ar21.svg",   alt: "Visual Studio Code" },
  { src: "assets/img/icon/neovimio-ar21.svg",   alt: "Neovim" },
  { src: "assets/img/icon/archlinux-icon.svg", alt: "Arch Linux" },
  { src: "assets/img/icon/linux-icon.svg",     alt: "Linux" },
  { src: "assets/img/icon/java-vertical.svg", alt: "Java" },
  { src: "assets/img/icon/vercel-ar21.svg", alt: "Vercel" },
  { src: "assets/img/icon/google_ads-ar21.svg",    alt: "Google Ads" },
  { src: "assets/img/icon/wireshark-ar21.svg",   alt: "Wireshark" },
];

// ---- floating icons config ----
const MIN_SIZE = 100;     // px
const MAX_SIZE = 150;    // px
const PADDING  = 70;     // distance from the edges
const MAX_TRIES = 250;
const DENSITY  = 0.90;   // icon overlap rate

// icon collision detection function (responsive for phone screens)
function responsiveConfig(W) {
  const s = Math.max(0.55, Math.min(1, (W - 480) / (1200 - 480)));
  return {
    MIN_SIZE: Math.round(MIN_SIZE * s),
    MAX_SIZE: Math.round(MAX_SIZE * s),
    PADDING : Math.round(PADDING  * s),
    MAX_TRIES,
    DENSITY,
    LIMIT: W < 520 ? 7 : W < 768 ? 10 : skills.length
  };
}

// icon collision detection function
function overlaps(a, b, density) {
  const shrink = (box) => {
    const w = box.w * density, h = box.h * density;
    const cx = box.x + (box.w - w) / 2;
    const cy = box.y + (box.h - h) / 2;
    return { x: cx, y: cy, w, h };
  };
  const A = shrink(a), B = shrink(b);
  return !(
    A.x + A.w < B.x ||
    A.x > B.x + B.w ||
    A.y + A.h < B.y ||
    A.y > B.y + B.h
  );
}

function layoutFloating(layer, items) {
  layer.innerHTML = "";
  const { width: W, height: H } = layer.getBoundingClientRect();
  const cfg = responsiveConfig(W);
  const placed = [];


  const list = items.slice(0, cfg.LIMIT);

  list.forEach((item) => {
    let size = Math.floor(Math.random() * (cfg.MAX_SIZE - cfg.MIN_SIZE + 1)) + cfg.MIN_SIZE;
    let tries = 0, ok = false, x, y, box;

    while (tries < cfg.MAX_TRIES) {
      x = Math.floor(Math.random() * Math.max(1, (W - size - cfg.PADDING * 2))) + cfg.PADDING;
      y = Math.floor(Math.random() * Math.max(1, (H - size - cfg.PADDING * 2))) + cfg.PADDING;
      box = { x, y, w: size, h: size };

      if (!placed.some(p => overlaps(p, box, cfg.DENSITY))) { ok = true; break; }
      tries++;

      if (tries % 60 === 0 && size > cfg.MIN_SIZE * 0.7) {
        size = Math.round(size * 0.9);
      }
    }

    if (!ok) return;

    placed.push(box);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "";
    img.className = "skill_item";
    img.style.width = size + "px";
    img.style.left = x + "px";
    img.style.top  = y + "px";

    // random gentle float
    const dx = (Math.random() * 16 - 8) + "px";
    const dy = (Math.random() * 10 - 5) + "px";
    img.style.setProperty("--tx", dx);
    img.style.setProperty("--ty", dy);
    img.style.animation = `float ${6 + Math.random() * 5}s ease-in-out ${Math.random()*2}s infinite`;

    layer.appendChild(img);
  });
}

// function init
const layer = document.getElementById("floatLayer");
function relayout() { layoutFloating(layer, skills); }
let t = null;
window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(relayout, 180); });
document.addEventListener("DOMContentLoaded", relayout);