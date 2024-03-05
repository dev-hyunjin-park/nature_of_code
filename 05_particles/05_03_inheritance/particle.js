class Particle extends p5.Vector {
  constructor(x, y) {
    // this.pos = createVector(x, y);
    super(x, y);
    // p5.Vector를 상속하기때문에 particle 객체 자체가 vector가 된다
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 5));
    this.acc = createVector(0, 0);
    this.r = 8;
    this.lifetime = 255;
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    // this.pos.add(this.vel);
    this.add(this.vel);
    this.acc.set(0, 0);
    this.lifetime -= 5;
  }

  show() {
    stroke(255, this.lifetime);
    strokeWeight(2);
    fill(255, this.lifetime);
    ellipse(this.x, this.y, this.r * 2);
  }
}
