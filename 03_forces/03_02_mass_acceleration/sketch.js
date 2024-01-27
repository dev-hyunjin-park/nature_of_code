// 중력과 바람

let moverA;
let moverB;

function setup() {
  createCanvas(400, 400);
  // 질량을 서로 다르게 준다
  moverA = new Mover(300, 200, 2);
  moverB = new Mover(100, 200, 4);
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    moverA.applyForce(wind);
    moverB.applyForce(wind);
  }

  // 가짜 중력 만들기
  let gravity = createVector(0, 0.2);

  // 무게 적용하기 weight = gravity * mass
  let weightA = p5.Vector.mult(gravity, moverA.mass);
  let weightB = p5.Vector.mult(gravity, moverB.mass);

  moverA.applyForce(weightA);
  moverB.applyForce(weightB);

  moverA.update();
  moverA.edges(gravity);
  moverA.show();

  moverB.update();
  moverB.edges(gravity);
  moverB.show();
  fill(255);
  textSize(20);
}
