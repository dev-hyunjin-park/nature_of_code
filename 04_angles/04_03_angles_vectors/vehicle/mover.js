class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;

    this.angle = PI / 4;
  }

  // applyForce(force) {
  //   let f = p5.Vector.div(force, this.mass);
  //   this.acc.add(f);
  // }

  update() {
    // this.vel.add(this.acc);

    // this.angle += 0.1;
    // this.vel = createVector(1, 1); // 1, 1 방향으로 움직임
    this.vel = p5.Vector.fromAngle(this.angle); // vel의 움직임이 아니라 angle로 제어한다
    // this.vel.mult(15);

    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    push();
    translate(this.pos.x, this.pos.y);
    // this.angle = this.vel.heading(); // velocity벡터의 회전 각도를 계산
    rotate(this.angle);
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }
}
