
let weavingDraft;
const canvasSize = 700;
const gridCount = 48;
const cellSize = canvasSize / gridCount;

function setup() {
  const canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('canvas-container');
  noLoop();

  weavingDraft = new WeavingDraft(gridCount, cellSize);
  weavingDraft.generate(random(1000), random(1000));
  weavingDraft.draw();

  initMap();
}

function draw() {}

function initMap() {
  const map = L.map('map').setView([37.5665, 126.9780], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    weavingDraft.generate(lat, lng);
    weavingDraft.draw();
  });
}
