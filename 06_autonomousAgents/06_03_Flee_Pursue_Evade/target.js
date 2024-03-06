class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vel = createVector(5, 2);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 244, 0);
    push();
    // translate(this.pos.x, this.pos.y);
    // rotate(this.vel.heading()); // 속도 벡터와 관련된 각도만큼 회전시킨다
    circle(this.pos.x, this.pos.y, this.r * 2);
    pop();
  }
}
