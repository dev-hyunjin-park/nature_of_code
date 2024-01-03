// 03. Perlin Noise in p5.js

let xoff = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);
  //   let x = random(width);
  //   let x = map(noise(xoff), 0, 1, 0, width);
  // noise fn은 항상 0~1 사이 값을 반환한다
  // map으로 0~1 사이의 값을 0과 width 값으로 매핑한다
  let x = noise(xoff) * width;
  // 위와 같은 동작

  // noise 함수는 random함수와 다르게 스케치를 다시 실행시키기 전까지 같은 값만 유지한다
  xoff += 0.01;

  ellipse(x, 200, 24, 24);
}
