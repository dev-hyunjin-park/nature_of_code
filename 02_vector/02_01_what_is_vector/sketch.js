// 벡터란 무엇인가
// Random walker

// let pos;
let walker;

function setup() {
  createCanvas(400, 400);
  //   pos = createVector(width / 2, height / 2);
  walker = new Walker(200, 200);
  background(0);
}

function draw() {
  //   stroke(255, 100);
  //   strokeWeight(2);
  //   point(pos.x, pos.y);
  //   pos.x = pos.x + random(-1, 1);
  //   pos.y = pos.y + random(-1, 1);

  walker.update();
  walker.show();
}
