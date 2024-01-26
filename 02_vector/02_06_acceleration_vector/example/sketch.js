let balls = [];
const ballCount = 41;

function getRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return color(r, g, b);
}

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < ballCount; i++) {
    ball = new Ball(random(width), random(height), getRandomRGB());
    balls.push(ball);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < ballCount; i++) {
    balls[i].update();
    balls[i].show();
    balls[i].bounce();
  }
}
