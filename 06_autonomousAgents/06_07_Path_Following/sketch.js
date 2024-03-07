let vehicle;
let path;

function setup() {
  createCanvas(800, 400);
  vehicle = new Vehicle(100, 100);
  path = new Path(0, height / 2, width, height / 2);

  vehicle.vel.x = 2;
}

function draw() {
  background(0);

  path.end.y = mouseY;

  let force = vehicle.follow(path);
  vehicle.applyForce(force);

  vehicle.edges();
  vehicle.update();
  vehicle.show();

  path.show();
}
