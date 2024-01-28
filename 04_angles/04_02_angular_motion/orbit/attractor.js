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
    // let distanceSq = force.magSq();
    let distanceSq = constrain(force.magSq(), 100, 100);

    let G = 5;

    let strenth = (G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strenth);

    mover.applyForce(force);
  }
}
