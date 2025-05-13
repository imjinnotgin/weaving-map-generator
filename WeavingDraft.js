
class WeavingDraft {
  constructor(gridCount, cellSize) {
    this.gridCount = gridCount;
    this.cellSize = cellSize;
    this.grid = [];
  }

  generate(lat, lng) {
    noiseSeed(floor(lat * 1000));
    randomSeed(floor(lng * 1000));

    this.grid = [];
    for (let y = 0; y < this.gridCount; y++) {
      let row = [];
      for (let x = 0; x < this.gridCount; x++) {
        let n = noise(x * 0.1, y * 0.1);
        row.push(n > 0.5);
      }
      this.grid.push(row);
    }
  }

function draw() {
  background(255);
  stroke(0, 30); // 살짝 연한 검은 선 (30은 투명도)
  strokeWeight(0.5); // 얇고 날카로운 선

  for (let y = 0; y < this.gridCount; y++) {
    for (let x = 0; x < this.gridCount; x++) {
      const val = this.grid[y][x];

      if (val) {
        fill(val); // 컬러 셀은 색 채움
      } else {
        noFill(); // 흰 셀은 비움
      }

      rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
  }
}

}
