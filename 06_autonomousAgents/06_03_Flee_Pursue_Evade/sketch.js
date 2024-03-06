let pursuer;
let target;

function setup() {
  createCanvas(400, 400);
  pursuer = new Vehicle(100, 100);
  target = new Target(200, 100);
}

function draw() {
  background(0);

  let steering = pursuer.pursue(target);
  pursuer.applyForce(steering);

  pursuer.update();
  pursuer.show();

  target.update();
  target.show();
  target.edges();
}
