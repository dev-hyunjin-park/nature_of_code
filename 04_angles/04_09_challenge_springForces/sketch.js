let particles = [];
let springs = [];
let spacing = 20;
let k = 0.1;

let gravity;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < 20; i++) {
    particles[i] = new Particle(width / 2, i * spacing);
    if (i !== 0) {
      let a = particles[i];
      let b = particles[i - 1];
      let spring = new Spring(k, spacing, a, b);
      springs.push(spring);
    }
  }

  particles[0].locked = true;

  gravity = createVector(0, 0.1);
}

function draw() {
  background(112, 50, 125);

  for (let s of springs) {
    s.update();
    // s.show();
  }

  noFill();
  stroke(255);
  strokeWeight(8);
  beginShape();
  let head = particles[0];
  curveVertex(head.position.x, head.position.y);
  for (let p of particles) {
    p.applyForce(gravity);
    p.update();
    curveVertex(p.position.x, p.position.y);
    // p.show();
  }
  endShape();

  let tail = particles[particles.length - 1];
  curveVertex(tail.position.x, tail.position.y);

  if (mouseIsPressed) {
    tail.position.set(mouseX, mouseY);
    tail.velocity.set(0, 0);
  }
}
