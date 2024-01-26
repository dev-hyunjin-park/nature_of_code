class Ball {
  constructor(x, y, color) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(10));
    this.color = color;
  }

  bounce() {
    // 마우스 위치와 공의 위치 사이의 절대값이 5 이하라면 공을 튕긴다
    const mouse = createVector(mouseX, mouseY);
    const absoluteDifference = p5.Vector.sub(this.pos, mouse).mag();
    if (absoluteDifference < 10) {
      this.vel.x *= -1; // x 방향으로 반전
      this.vel.y *= -1; // y 방향으로 반전
      this.acc.setMag(10);
      this.vel.add(this.acc);
    }
  }

  update() {
    this.acc = p5.Vector.random2D();
    this.pos.add(this.vel);

    // 캔버스를 벗어나면 튕겨 나오도록 처리
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x *= -1; // x 방향으로 반전
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y *= -1; // y 방향으로 반전
    }
  }

  show() {
    fill(this.color, 100);
    ellipse(this.pos.x, this.pos.y, 22);
  }
}
