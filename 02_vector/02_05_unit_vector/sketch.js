function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  let pos = createVector(200, 200);
  let mouse = createVector(mouseX, mouseY);

  let v = p5.Vector.sub(mouse, pos);
  // let m = v.mag(); // magnitude (벡터의 크기)
  // v.div(m); // v.normalize(); 와 같은 결과 -> 벡터의 크기를 1로 정규화
  v.normalize();
  // v.mult(50);
  v.setMag(50);

  translate(width / 2, height / 2);
  strokeWeight(4);
  stroke(255);
  // line(200, 200, mouseX, mouseY);
  line(0, 0, v.x, v.y);
}
