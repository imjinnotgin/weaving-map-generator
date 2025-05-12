
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

 draw() {
  background(255);
  for (let y = 0; y < this.gridCount; y++) {
    for (let x = 0; x < this.gridCount; x++) {
      const val = this.grid[y][x];
      if (val) {
        fill(val); // 랜덤 컬러
      } else {
        noFill();
      }

      stroke(0, 20); // 아주 연한 검은색 (20/255 불투명도)
      strokeWeight(0.5); // 아주 얇은 선
      rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
  }
}

