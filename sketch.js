let canvasSize = 700;
let cellSize = 10;
let cols, rows;

function setup() {
  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('canvas-container');
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);
  generatePattern(random(1000), random(1000));
}

function generatePattern(lat, lon) {
  background(255);
  noStroke();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let noiseVal = noise(x * 0.1 + lat, y * 0.1 + lon);
      fill(noiseVal * 255, 100, 150);
      if (noiseVal > 0.5) {
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function updatePatternFromMap(lat, lon) {
  generatePattern(lat, lon);
}

function initMap() {
  const map = L.map('map').setView([37.5665, 126.9780], 10); // Center on Seoul
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

  map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    console.log('Clicked location:', lat, lon);
    updatePatternFromMap(lat, lon);
  });
}

window.addEventListener('load', initMap);
