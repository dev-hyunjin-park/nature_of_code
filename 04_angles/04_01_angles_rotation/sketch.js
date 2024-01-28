let angle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
}

function draw() {
  background(145, 83, 151);
  noStroke();
  fill(240, 99, 159);
  rectMode(CENTER);
  translate(200, 200);
  rotate(angle);
  rect(0, 0, 125, 81);
  angle += 0.05;
}
