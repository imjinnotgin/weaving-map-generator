
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
  stroke(0);         // 검은색 테두리
  strokeWeight(0.25); // 매우 얇은 선

  for (let y = 0; y < this.gridCount; y++) {
    for (let x = 0; x < this.gridCount; x++) {
      const val = this.grid[y][x];

      // 셀이 채워져 있으면 색을 채우고, 아니면 비움
      if (val) {
        fill(val);
      } else {
        noFill();
      }

      // 항상 테두리를 그림
      rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
  }
}

}
