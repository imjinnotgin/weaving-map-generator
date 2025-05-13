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
  drawGridOverlay(gridCount, cellSize);

  initMap();
}

function draw() {}

function drawGridOverlay(gridCount, cellSize) {
  stroke(0);
  strokeWeight(1);
  for (let i = 0; i <= gridCount; i++) {
    line(i * cellSize, 0, i * cellSize, canvasSize);
    line(0, i * cellSize, canvasSize, i * cellSize);
  }
}

function initMap() {
  const map = L.map('map').setView([37.5665, 126.9780], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    weavingDraft.generate(lat, lng);
    redraw();
    weavingDraft.draw();
    drawGridOverlay(gridCount, cellSize);
  });
}

class WeavingDraft {
  constructor(gridCount, cellSize) {
    this.gridCount = gridCount;
    this.cellSize = cellSize;
    this.grid = [];
  }

  generate(latSeed, lngSeed) {
    noiseSeed(latSeed + lngSeed);
    this.grid = [];
    for (let y = 0; y < this.gridCount; y++) {
      let row = [];
      for (let x = 0; x < this.gridCount; x++) {
        row.push(noise(x * 0.3, y * 0.3) > 0.5 ? 1 : 0);
      }
      this.grid.push(row);
    }
  }

  draw() {
    for (let y = 0; y < this.gridCount; y++) {
      for (let x = 0; x < this.gridCount; x++) {
        if (this.grid[y][x] === 1) {
          fill(0);
        } else {
          fill(255);
        }
        noStroke();
        rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
      }
    }
  }
}
