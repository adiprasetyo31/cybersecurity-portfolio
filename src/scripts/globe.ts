import * as THREE from 'three';

/* Titik di globe: [lat, lon]. Titik pertama (Yogyakarta) jadi pusat garis. */
const NODES: Array<[number, number]> = [
  [-7.8, 110.4], // Yogyakarta
  [1.35, 103.8], // Singapore
  [35.7, 139.7], // Tokyo
  [51.5, -0.1], // London
  [40.7, -74.0], // New York
  [-33.9, 151.2], // Sydney
  [52.4, 4.9], // Amsterdam
  [37.8, -122.4], // San Francisco
];
const ARC_TARGETS = [1, 2, 3, 4, 5];
const RADIUS = 1.6;

function toVector(lat: number, lon: number, r = RADIUS) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function ring(points: THREE.Vector3[], material: THREE.Material) {
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
}

export function initGlobe(container: HTMLElement) {
  const canvas = container.querySelector('canvas');
  if (!canvas) return;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    container.classList.add('globe--fallback');
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const css = getComputedStyle(document.documentElement);
  const accent = new THREE.Color(css.getPropertyValue('--accent').trim() || '#c2f25e');
  const lineColor = new THREE.Color('#2e353c');
  const nodeColor = new THREE.Color('#e6e8ea');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.z = 6.4;

  const globe = new THREE.Group();
  scene.add(globe);

  // Garis lintang dan bujur
  const gridMat = new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.9 });
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts: THREE.Vector3[] = [];
    for (let lon = -180; lon <= 180; lon += 4) pts.push(toVector(lat, lon));
    globe.add(ring(pts, gridMat));
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const pts: THREE.Vector3[] = [];
    for (let lat = -90; lat <= 90; lat += 4) pts.push(toVector(lat, lon));
    globe.add(ring(pts, gridMat));
  }

  // Titik node
  const nodeGeo = new THREE.SphereGeometry(0.028, 12, 12);
  NODES.forEach(([lat, lon], i) => {
    const mesh = new THREE.Mesh(
      nodeGeo,
      new THREE.MeshBasicMaterial({ color: i === 0 ? accent : nodeColor }),
    );
    mesh.position.copy(toVector(lat, lon));
    if (i === 0) mesh.scale.setScalar(1.6);
    globe.add(mesh);
  });

  // Garis lengkung putus-putus dari Yogyakarta
  const arcMats: THREE.LineDashedMaterial[] = [];
  const origin = toVector(...NODES[0]);
  ARC_TARGETS.forEach((idx) => {
    const end = toVector(...NODES[idx]);
    const mid = origin.clone().add(end).normalize().multiplyScalar(RADIUS * 1.38);
    const curve = new THREE.QuadraticBezierCurve3(origin, mid, end);
    const mat = new THREE.LineDashedMaterial({ color: accent, dashSize: 0.05, gapSize: 0.07 });
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)), mat);
    line.computeLineDistances();
    arcMats.push(mat);
    globe.add(line);
  });

  // Hadapkan Indonesia ke kamera, sedikit miring
  globe.rotation.y = -Math.atan2(origin.x, origin.z);
  globe.rotation.x = 0.3;

  // Drag untuk memutar
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let velocity = 0;
  canvas.addEventListener('pointerdown', (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    velocity = dx * 0.005;
    globe.rotation.y += velocity;
    globe.rotation.x = THREE.MathUtils.clamp(globe.rotation.x + dy * 0.004, -0.8, 0.8);
    if (!running) render();
  });
  const stopDrag = () => (dragging = false);
  canvas.addEventListener('pointerup', stopDrag);
  canvas.addEventListener('pointercancel', stopDrag);

  // Ukuran mengikuti container
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  };
  new ResizeObserver(resize).observe(container);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let running = false;
  let visible = true;

  function render() {
    renderer.render(scene, camera);
  }

  function tick() {
    if (!running) return;
    if (!dragging) {
      velocity *= 0.95;
      globe.rotation.y += 0.0015 + velocity;
    }
    arcMats.forEach((m) => ((m as unknown as { dashOffset: number }).dashOffset -= 0.004));
    render();
    requestAnimationFrame(tick);
  }

  function start() {
    if (running || reduceMotion || !visible) return;
    running = true;
    requestAnimationFrame(tick);
  }

  // Hemat baterai: berhenti saat globe tidak terlihat
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else running = false;
  }).observe(container);

  resize();
  start();
}
