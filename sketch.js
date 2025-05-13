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
  redraw();

  initMap();
}

function draw() {
  if (weavingDraft) {
    background(255);
    weavingDraft.draw();
  }
}

function initMap() {
  const map = L.map('map').setView([37.5665, 126.9780], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

map.on('click', function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  // 고정밀 수치를 기반으로 시드 생성
  const latSeed = Math.floor(lat * 1000000);  // 소수점 6자리 반영
  const lngSeed = Math.floor(lng * 1000000);

  weavingDraft.generate(latSeed, lngSeed);
  redraw();
});

}

class WeavingDraft {
  constructor(count, size) {
    this.count = count;
    this.size = size;
    this.grid = [];
  }

  generate(seedX, seedY) {
    noiseSeed(seedX + seedY);
    this.grid = [];
    for (let y = 0; y < this.count; y++) {
      let row = [];
      for (let x = 0; x < this.count; x++) {
        row.push(noise(x * 0.2, y * 0.2) > 0.5);
      }
      this.grid.push(row);
    }
  }

  draw() {
    stroke(0, 30); // 아주 연한 검정 실선
    strokeWeight(1);
    for (let y = 0; y < this.count; y++) {
      for (let x = 0; x < this.count; x++) {
        fill(this.grid[y][x] ? 0 : 255);
        rect(x * this.size, y * this.size, this.size, this.size);
      }
    }
  }
}
