let bob;
let anchor;

let spring;
let restLength = 200;
let k = 0.01;
let gravity;

function setup() {
  createCanvas(400, 800);
  bob = new Particle(350, 300);
  anchor = new Particle(300, 0);
  spring = new Spring(0.01, 200, bob, anchor);
  velocity = createVector(0, 0);
  gravity = createVector(0, 0.1);
}

function draw() {
  background(112, 50, 125);
  spring.show();
  spring.update();
  bob.show();
  bob.update();
  anchor.show();
  anchor.update();

  if (mouseIsPressed) {
    bob.position.set(mouseX, mouseY);
    bob.velocity.set(0, 0);
  }
}
