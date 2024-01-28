// 상호작용하는 끌어당기는 힘

let movers = [];
let sun;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < 200; i++) {
    // let x = random(width);
    // let y = random(height);
    let pos = p5.Vector.random2D();
    let vel = pos.copy();
    vel.setMag(random(5, 15));
    pos.setMag(random(200, 300));
    // pos 벡터를 복사한 후 변경한다
    vel.rotate(PI / 2); // 90도 변경
    let m = random(5, 15);
    movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
  }
  sun = new Mover(0, 0, 0, 0, 500);
  // movers[0] = new Mover(300, 200, 0, 5, 10);
  // movers[1] = new Mover(100, 200, 0, -5, 10);
  // movers[2] = new Mover(200, 300, -5, 0, 10);
  // movers[3] = new Mover(200, 100, 5, 0, 10);
  background(0);
}

function draw() {
  background(0, 50);
  translate(width / 2, height / 2);

  // movers[0].attract(movers[1]);
  // movers[0].attract(movers[2]);
  // movers[1].attract(movers[0]);
  // movers[1].attract(movers[2]);
  // movers[2].attract(movers[0]);
  // movers[2].attract(movers[1]);

  for (let mover of movers) {
    sun.attract(mover);
    for (let other of movers) {
      if (mover !== other) {
        // 위와 똑같지만, for 중첩문이기때문에 무버가 그 자신까지 끌어당김 -> n제곱만큼의 계산 주기임 주의
        mover.attract(other);
        // stroke(255);
        // line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
      }
    }
  }

  for (let mover of movers) {
    mover.update();
    mover.show();
  }
  sun.show();
}
