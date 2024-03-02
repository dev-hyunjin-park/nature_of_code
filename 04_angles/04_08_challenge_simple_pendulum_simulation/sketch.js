let angle;

let angleV = 0; // velocity
let angleA = 0; // acceleration

let bob;
let len;
let origin;

let gravity = 1;

function setup() {
  createCanvas(600, 800);
  origin = createVector(300, 0);
  angle = PI / 4;
  bob = createVector();
  len = 300;
}

function draw() {
  background(0);

  let force = gravity * sin(angle);
  angleA = (-1 * force) / len;

  angleV += angleA;
  angle += angleV;

  angleV *= 0.99; // damping 추가. 매 프레임마다 속도를 1%씩 줄인다 --> 서서히 느려지다가 멈춤

  bob.x = len * sin(angle) + origin.x;
  bob.y = len * cos(angle) + origin.y;

  stroke(255);
  strokeWeight(8);
  fill(125);
  line(origin.x, origin.y, bob.x, bob.y);
  circle(bob.x, bob.y, 64);
}
