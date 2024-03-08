let particles = [];
let path;

function setup() {
  createCanvas(500, 500);
  newPath();

  for (let i = 0; i < 500; i++) {
    let particle = new Particle(path);
    particles.push(particle);
  }
}

function draw() {
  background(255);
  path.display();

  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].edges();
    particles[i].update();
    particles[i].follow(path);
  }
}

function newPath() {
  path = new Path();
  let offset = 30;
  path.addPoint(offset, offset);
  path.addPoint(width - offset, offset);
  path.addPoint(width - offset, height - offset);
  path.addPoint(width / 2, height - offset * 3);
  path.addPoint(offset, height - offset);
}
