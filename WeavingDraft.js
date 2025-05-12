
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
  stroke(0);         // 검정색 선
  strokeWeight(1); // 가는 실선

  for (let y = 0; y < this.gridCount; y++) {
    for (let x = 0; x < this.gridCount; x++) {
      const val = this.grid[y][x];
      
      if (val) {
        fill(val);   // 셀이 채워진 경우: 색상 채우기
      } else {
        noFill();    // 비어있는 경우: 투명하게
      }

      rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }
  }
}


