// Acceleration vector - 무작위 속도
let mover;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(200, 200);
}

function draw() {
  background(0);
  mover.update();
  mover.show();
}
