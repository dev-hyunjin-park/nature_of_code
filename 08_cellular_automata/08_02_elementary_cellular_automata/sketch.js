let cells = [];
// let ruleset = [1, 0, 1, 1, 0, 1, 1, 0];
// let ruleset = [0, 0, 0, 0, 0, 0, 0, 1];
let ruleValue = 110; // 십진수 -> 이진수
let ruleSet;
let w = 4;
let y = 0;

function setup() {
  createCanvas(600, 1800);
  // 이진수로 변환한 후, 길이가 8이 되도록 왼쪽에 0을 채워넣는다
  ruleSet = ruleValue.toString(2).padStart(8, "0");

  let total = width / w;
  for (let i = 0; i < total; i++) {
    cells[i] = 0;
  }
  // 정중앙에 있는 셀만 검정색으로 시작한다
  cells[floor(total / 2)] = 1;
  background(255);
}

function draw() {
  for (let i = 1; i < cells.length; i++) {
    let x = i * w;
    noStroke();
    fill(255 - cells[i] * 255);
    // cell이 1이면 검정, 0이면 흰색
    square(x, y, w);
  }

  y += w;

  let nextCells = [];
  // nextCells[0] = cells[0];
  // nextCells[cells.length - 1] = cells[cells.length - 1];

  let len = cells.length;

  // Caculate next generation
  for (let i = 0; i < cells.length; i++) {
    let left = cells[(i - 1 + len) % len];
    let right = cells[(i + 1 + len) % len];
    let state = cells[i];
    let newState = calculateState(left, state, right);
    nextCells[i] = newState;
  }
  cells = nextCells;
}

function calculateState(a, b, c) {
  // 이진수 -> 십진수
  let neighborhood = "" + a + b + c;
  let value = 7 - parseInt(neighborhood, 2);
  return parseInt(ruleSet[value]);

  // if (a == 1 && b == 1 && c == 1) return 1;
  // if (a == 1 && b == 1 && c == 0) return 0;
  // if (a == 1 && b == 0 && c == 1) return 1;
  // if (a == 1 && b == 0 && c == 0) return 1;
  // if (a == 0 && b == 1 && c == 1) return 0;
  // if (a == 0 && b == 1 && c == 0) return 1;
  // if (a == 0 && b == 0 && c == 1) return 1;
  // if (a == 0 && b == 0 && c == 0) return 0;
}
