class Mover {
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.vel = createVector(1, -1);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(3));
  }

  update() {
    // 마우스위치와 mover의 위치에 따라서 가속도를 주는 방법
    let mouse = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouse, this.pos);
    this.acc.setMag(1);

    this.vel.add(this.acc);
    this.vel.limit(5); // 속도 제한 - random walker와 비슷한 움직임

    this.pos.add(this.vel);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, 22);
  }
}
