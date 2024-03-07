let vehicle;
let path;

function setup() {
  createCanvas(800, 400);
  path = new Path();
  path.addPoint(0, height / 2 - 40);
  path.addPoint(100, height / 2 + 100);
  path.addPoint(300, height / 2);
  path.addPoint(width - 20, height / 2);
  vehicle = new Vehicle(300, 300);

  vehicle.vel.x = 2;
}

function draw() {
  background(0);
  path.display();

  let force = vehicle.follow(path);
  vehicle.applyForce(force);

  vehicle.edges();
  vehicle.update();
  vehicle.show();
}
