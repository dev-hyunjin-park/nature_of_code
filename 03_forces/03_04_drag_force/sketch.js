// 공기 및 유체 저항

let movers = [];
let mu = 0.1;
let dragCoefficient = 0.3;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    movers[i] = new Mover(random(width), 0, random(1, 8));
  }
}

function draw() {
  background(0);

  fill(255, 125);
  noStroke();
  rect(0, height / 2, width, height / 2);

  for (let mover of movers) {
    if (mouseIsPressed) {
      let wind = createVector(0.1, 0);
      mover.applyForce(wind);
    }

    // 가짜 중력 만들기
    let gravity = createVector(0, 0.2);

    // 무게 적용하기 weight = gravity * mass
    let weightA = p5.Vector.mult(gravity, mover.mass);

    mover.applyForce(weightA);

    if (mover.pos.y > height / 2) {
      mover.drag(dragCoefficient);
    }

    mover.update();
    mover.edges(gravity);
    mover.show();
  }

  fill(255);
  textSize(20);
}
