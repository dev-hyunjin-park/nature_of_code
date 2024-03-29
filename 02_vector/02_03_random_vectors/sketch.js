function setup() {
  createCanvas(400, 400);
  background(0);
}

function draw() {
  translate(width / 2, height / 2);

  // let v = createVector(-100, 50);

  // Create Random vector
  // let v = createVector(random(-100, 100), random(-100, 100));
  let v = p5.Vector.random2D(); // will return a random unit vector
  v.mult(random(50, 100));

  strokeWeight(4);
  stroke(255, 50);
  line(0, 0, v.x, v.y);
}
