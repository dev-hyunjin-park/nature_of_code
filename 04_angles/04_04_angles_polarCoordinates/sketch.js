// 벡터와 각도 값으로 x, y 구하기
// let angle = 0;
let r = 150;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  translate(200, 200);
  stroke(255);
  strokeWeight(4);
  noFill();
  // circle(0, 0, r * 2);

  // let increment =  map(mouseX, 0, width, PI, 0.01);
  let increment = 0.1;

  beginShape();
  for (let a = 0; a < TWO_PI; a += increment) {
    let r1 = r + random(-10, 10);
    let x = r1 * cos(a);
    let y = r1 * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);

  // cartesian (x, y) -> polar coordinates (r, theta)
  // let x = r * cos(angle);
  // let y = r * sin(angle);
  // point(x, y);

  // angle += 0.01;
  // r += random(-2, 2);
}
