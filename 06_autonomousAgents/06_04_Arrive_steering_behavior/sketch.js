let pursuer;

function setup() {
  createCanvas(800, 800);
  pursuer = new Vehicle(100, 100);
}

function draw() {
  background(0);

  let target = createVector(mouseX, mouseY);
  fill(255, 0, 0);
  noStroke();
  ellipse(target.x, target.y, 20);

  let steering = pursuer.arrive(target);
  pursuer.applyForce(steering);

  pursuer.update();
  pursuer.show();
}
