// 벡터 수학 - 속도와 움직임

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, -1);
  }

  update() {
    // this.pos.x = this.pos.x + random(-1, 1);
    // this.pos.y = this.pos.y + random(-1, 1);

    // this.pos.x = this.pos.x + this.vel.x;
    // this.pos.y = this.pos.y + this.vel.y;

    // this.pos + this.vel; // --> 자바스크립트가 알아듣지 못함
    this.pos.add(this.vel);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, 22);
  }
}
