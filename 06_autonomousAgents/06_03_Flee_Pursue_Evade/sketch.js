let vehicle;
let target;

function setup() {
  createCanvas(400, 400);
  vehicle = new Vehicle(100, 100);
}

function draw() {
  background(0);

  target = createVector(mouseX, mouseY);
  fill(255, 0, 0);
  noStroke();
  circle(target.x, target.y, 32);

  let steering = vehicle.flee(target);
  vehicle.applyForce(steering);

  vehicle.seek(target);
  vehicle.show();
  vehicle.update();
}
