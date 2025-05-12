class WeavingDraft {
  constructor(gridCount, cellSize) {
    this.gridCount = gridCount;
    this.cellSize = cellSize;
    this.grid = [];
  }

  generate(lat, lon) {
    noiseSeed(lat + lon);
    this.grid = [];
    for (let y = 0; y < this.gridCount; y++) {
      const row = [];
      for (let x = 0; x < this.gridCount; x++) {
        const n = noise(x * 0.1, y * 0.1);
        row.push(n > 0.5 ? 1 : 0);
      }
      this.grid.push(row);
    }
  }

  draw() {
    background(255);
    noStroke();
    for (let y = 0; y < this.gridCount; y++) {
      for (let x = 0; x < this.gridCount; x++) {
        if (this.grid[y][x]) {
          fill(0);
          rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }
}