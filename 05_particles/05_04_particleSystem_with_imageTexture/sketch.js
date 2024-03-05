let emitter;
let img;

function preload() {
  img = loadImage("texture(1).png");
}

function setup() {
  createCanvas(400, 400);
  emitter = new Emitter(200, 375);
}

function draw() {
  clear();
  background(0);
  blendMode(ADD);
  let force = createVector(0, -0.1);
  emitter.applyForce(force);

  let dir = map(mouseX, 0, width, -0.1, 0.1);
  let wind = createVector(dir, 0);
  emitter.applyForce(wind);

  emitter.emit(2);
  emitter.show();
  emitter.update();
}
