const canvas = document.getElementById("canvas");
const wrap = document.getElementById("canvasWrap");
const zoomReadout = document.getElementById("zoomReadout");
const layersEl = document.getElementById("layers");
const inspectEl = document.getElementById("inspect");

let scale = 0.32;
let x = 48;
let y = 48;
let page = "cover";
let selected = null;
let panning = false;
let panStart = { x: 0, y: 0, cx: 0, cy: 0 };

function applyTransform() {
  canvas.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  zoomReadout.textContent = `${Math.round(scale * 100)}%`;
}

function showPage(id) {
  page = id;
  document.querySelectorAll(".canvas-page").forEach((p) => {
    p.hidden = p.dataset.page !== id;
  });
  document.querySelectorAll(".page-item").forEach((b) => {
    b.classList.toggle("active", b.dataset.page === id);
  });
  const frames = [...document.querySelectorAll(`.canvas-page[data-page="${id}"] .frame-wrap`)];
  layersEl.innerHTML = frames
    .map(
      (f) =>
        `<div class="layer${f.dataset.frame === selected ? " active" : ""}" data-frame="${f.dataset.frame}">${f.querySelector(".frame-label").textContent}</div>`
    )
    .join("");
  selected = frames[0]?.dataset.frame || null;
  highlight();
  fit();
}

function highlight() {
  document.querySelectorAll(".frame-wrap").forEach((f) => {
    f.classList.toggle("selected", f.dataset.frame === selected);
  });
  document.querySelectorAll(".layer").forEach((l) => {
    l.classList.toggle("active", l.dataset.frame === selected);
  });
  const frame = document.querySelector(`.frame-wrap[data-frame="${selected}"]`);
  if (!frame) return;
  const theme = frame.querySelector(".theme-product")
    ? "Product dark"
    : frame.querySelector(".theme-agency")
      ? "Agency light"
      : "File";
  inspectEl.innerHTML = `
    <h3>Inspect</h3>
    <div class="row"><span>Frame</span><b>${frame.querySelector(".frame-label").textContent}</b></div>
    <div class="row"><span>Theme</span><b>${theme}</b></div>
    <div class="row"><span>Width</span><b>${frame.querySelector(".artboard").classList.contains("mobile") ? "390" : "1440"}</b></div>
    <div class="row"><span>Primary</span><span><i class="swatch" style="background:#7A50DC"></i><span class="token">#7A50DC</span></span></div>
    <div class="row"><span>Gold</span><span><i class="swatch" style="background:#E2B85A"></i><span class="token">#E2B85A</span></span></div>
    <div class="row"><span>Cream</span><span><i class="swatch" style="background:#FAF8F5"></i><span class="token">#FAF8F5</span></span></div>
    <div class="row"><span>Deep</span><span><i class="swatch" style="background:#050505"></i><span class="token">#050505</span></span></div>
    <div class="row"><span>Display</span><b>Poppins 700</b></div>
    <div class="row"><span>Body</span><b>Inter 400 / 16</b></div>
    <div class="row"><span>Radius</span><b>12 / 20 / pill</b></div>
    <div class="row"><span>CTA</span><b>44px min tap</b></div>
  `;
}

function fit() {
  const pageEl = document.querySelector(`.canvas-page[data-page="${page}"]`);
  if (!pageEl) return;
  const frames = [...pageEl.querySelectorAll(".frame-wrap")];
  if (!frames.length) return;
  let maxX = 0;
  let maxY = 0;
  frames.forEach((f) => {
    const board = f.querySelector(".artboard");
    const left = parseFloat(f.style.left);
    const top = parseFloat(f.style.top);
    maxX = Math.max(maxX, left + board.offsetWidth);
    maxY = Math.max(maxY, top + Math.min(board.offsetHeight, 1100));
  });
  const pad = 80;
  const sx = (wrap.clientWidth - pad) / maxX;
  const sy = (wrap.clientHeight - pad) / Math.max(maxY, 900);
  scale = Math.max(0.12, Math.min(0.5, Math.min(sx, sy)));
  x = 40;
  y = 40;
  applyTransform();
}

document.querySelectorAll(".page-item").forEach((btn) => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});

document.querySelectorAll("[data-mode]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-mode]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document.body.classList.remove("design-mode", "prototype-mode", "inspect-mode");
    document.body.classList.add(`${btn.dataset.mode}-mode`);
  });
});

document.getElementById("zoomIn").onclick = () => {
  scale = Math.min(1.4, scale * 1.15);
  applyTransform();
};
document.getElementById("zoomOut").onclick = () => {
  scale = Math.max(0.1, scale / 1.15);
  applyTransform();
};
document.getElementById("zoomFit").onclick = fit;

wrap.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    scale = Math.min(1.5, Math.max(0.1, scale * delta));
    applyTransform();
  },
  { passive: false }
);

wrap.addEventListener("pointerdown", (e) => {
  if (e.button === 1 || e.spaceKey || e.target === wrap || e.target === canvas || e.altKey) {
    panning = true;
    wrap.classList.add("panning");
    panStart = { x: e.clientX, y: e.clientY, cx: x, cy: y };
  }
});
window.addEventListener("pointermove", (e) => {
  if (!panning) return;
  x = panStart.cx + (e.clientX - panStart.x);
  y = panStart.cy + (e.clientY - panStart.y);
  applyTransform();
});
window.addEventListener("pointerup", () => {
  panning = false;
  wrap.classList.remove("panning");
});

let space = false;
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    space = true;
    wrap.style.cursor = "grab";
    e.preventDefault();
  }
});
window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    space = false;
    wrap.style.cursor = "";
  }
});
wrap.addEventListener("pointerdown", (e) => {
  if (!space) return;
  panning = true;
  wrap.classList.add("panning");
  panStart = { x: e.clientX, y: e.clientY, cx: x, cy: y };
});

document.addEventListener("click", (e) => {
  const layer = e.target.closest(".layer");
  if (layer) {
    selected = layer.dataset.frame;
    highlight();
    return;
  }
  const frame = e.target.closest(".frame-wrap");
  if (frame && !e.target.closest(".hotspot")) {
    selected = frame.dataset.frame;
    highlight();
  }
  const hot = e.target.closest(".hotspot");
  if (hot && document.body.classList.contains("prototype-mode")) {
    const go = hot.dataset.go;
    const alias = { menu: "menu", blog: "compare" };
    if (go) showPage(alias[go] || go);
  }
});

showPage("cover");
window.addEventListener("resize", fit);
