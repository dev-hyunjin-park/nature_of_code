// 04. Noise vs Random in p5.js

// 두 개의 서로 다른 노이즈 값을 생성한다
// let xoff1 = 0;
// let xoff2 = 1000;
let inc = 0.01;
let start = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);

  // 노이즈 선으로 표현하기
  stroke(255);
  noFill();
  beginShape();

  let xoff = start;
  for (let x = 0; x < width; x++) {
    stroke(255);

    // random noise
    // let y = random(height);

    // perlin noise
    // let y = noise(xoff) * height;

    // sin wave
    // let y = height / 2 + (sin(xoff) * height) / 2;

    // 결과적으로 sin함수의 파동 + 약간의 노이즈 효과를 가진 웨이브를 형성한다
    let n = map(noise(xoff), 0, 1, -50, 50);
    let s = map(sin(xoff), -1, 1, 0, height);
    let y = s + n;
    vertex(x, y);

    xoff += inc;
  }
  endShape();
  // noLoop();

  start += inc;

  // let x = noise(xoff1) * width;
  // let y = noise(xoff2) * height;

  // noise 함수는 random함수와 다르게 스케치를 다시 실행시키기 전까지 같은 값을 유지한다
  // xoff1 += 0.02;
  // xoff2 += 0.02;

  // 랜덤하게 x, y 축으로 움직이는 원 그리기
  // ellipse(x, y, 24, 24);
}
