let weavingDraft;
const canvasSize = 700;
const cellSize = 10; // 정사각형 유지
const nbThreads = 48; // 적절히 작게 해서 패턴이 선명하게 보이도록
const nbTieups = 4;
const nbOfShafts = 4;
const nbTreadling = 48;

function setup() {
  const canvas = createCanvas(canvasSize, canvasSize);
  canvas.parent('canvas-container');
  weavingDraft = new WeavingDraft(nbThreads, nbTieups, nbTreadling, cellSize);

  const gps = [37.5665, 126.9780]; // 서울
  loadCoordinates(gps);
  weavingDraft.draw();
  initMap();
}

function mousePressed() {
  weavingDraft.mousePressed(mouseX, mouseY);
  weavingDraft.draw();
}

function loadCoordinates(gps) {
  const lat = removeDecimals(fixlat(gps[0]));
  const lon = removeDecimals(fixlong(gps[1]));
  const latBase = toBaseN(lat, nbOfShafts);
  const lonBase = toBaseN(lon, nbOfShafts);

  latitude2Thread(latBase);
  longitude2Tread(lonBase);
  straightTieUp();
  weavingDraft.updateDrawdown();
}

function latitude2Thread(baseArr) {
  const mirror = [...baseArr].reverse();
  const full = [...baseArr, ...mirror];
  for (let j = 0; j < nbThreads; j++) {
    const d = full[j % full.length];
    for (let i = 0; i < nbOfShafts; i++) {
      weavingDraft.threading.cells[j][i] = (i === d);
    }
  }
}

function longitude2Tread(baseArr) {
  const mirror = [...baseArr].reverse();
  const full = [...baseArr, ...mirror];
  for (let j = 0; j < nbTreadling; j++) {
    const d = full[j % full.length];
    for (let i = 0; i < nbTieups; i++) {
      weavingDraft.treadling.cells[i][j] = (i === d);
    }
  }
}

function straightTieUp() {
  for (let i = 0; i < nbTieups; i++) {
    for (let j = 0; j < nbTieups; j++) {
      weavingDraft.tieup.cells[i][j] = (i === j);
    }
  }
}

function fixlat(lat) {
  return map(lat, -90, 90, 0, 180);
}

function fixlong(lon) {
  return map(lon, -180, 180, 0, 360);
}

function removeDecimals(coord) {
  return round(coord * 1000000);
}

function toBaseN(number, base) {
  return number.toString(base).split('').map(d => parseInt(d, base));
}

function initMap() {
  const map = L.map('map').setView([37.5665, 126.9780], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  map.on('click', e => {
    const gps = [e.latlng.lat, e.latlng.lng];
    loadCoordinates(gps);
    weavingDraft.draw();
  });
}

// ----------- WeavingDraft 클래스 정의는 따로 아래 붙여야 함

