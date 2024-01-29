class Attractor {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
  }

  show() {
    noStroke();
    fill(255, 0, 100);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000); // 거리의 제곱을 제한하여 힘의 강도 계산
    // magSq(): magnitude square 벡터(규모)의 제곱

    let G = 5;
    let strenth = (G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strenth);

    mover.applyForce(force);
  }
}
