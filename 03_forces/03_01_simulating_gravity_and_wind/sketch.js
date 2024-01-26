// 중력과 바람

let mover;
let isClicked = false;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(200, 200);
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    mover.applyFoce(wind);
    isClicked = true;
  } else {
    isClicked = false;
  }
  console.log(isClicked);
  // 가짜 중력 만들기
  let gravity = createVector(0, 0.2);

  mover.applyFoce(gravity);

  mover.update();
  mover.edges(gravity);
  mover.show();
  fill(255);
  textSize(20);

  if (isClicked) {
    text("Clicked. apply wind => =>", 100, 100);
  } else {
    text("", 100, 100);
  }
}
