function make2DArray(cols, rows) {
  // grid[x index][y index]
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
  createCanvas(600, 400);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
      // random 0, 1로 채워진 2차원 배열을 만든다
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution, resolution);
        // ellipse(x, y, resolution, resolution);
      }
    }
  }

  let next = make2DArray(cols, rows);

  // Compute next based on grid
  for (let i = 1; i < cols; i++) {
    for (let j = 1; j < rows; j++) {
      let state = grid[i][j];

      // Count live neighbors
      let neighbors = countNeighbors(grid, i, j);

      // rules
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  // 자기 자신을 제외한 이웃 숫자들을 더한다
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}
