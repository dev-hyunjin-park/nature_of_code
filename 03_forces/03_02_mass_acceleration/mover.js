class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 10;
    // Math.sqrt(): Square root. 숫자의 제곱근을 계산한다
  }

  applyForce(force) {
    // Force = Mass * Acceleration
    // Acceleration = Force / Mass

    // force.div(this.mass); // 이렇게 하면 force 값을 변형시키기때문에 moverA와 moverB의 질량이 달라짐
    let f = p5.Vector.div(force, this.mass); // static function을 사용한다
    this.acc.add(f);
  }

  edges() {
    // 공이 바닥에 닿는다면 반대방향으로 튕기게 만든다
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= 0 - this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    // 마우스위치와 mover의 위치에 따라서 가속도를 주는 방법
    // let mouse = createVector(mouseX, mouseY);
    // this.acc = p5.Vector.sub(mouse, this.pos);
    // this.acc.setMag(0.1);

    this.vel.add(this.acc);
    // this.vel.limit(5); // 속도 제한 - random walker와 비슷한 움직임
    this.pos.add(this.vel);
    this.acc.set(0, 0); // 매 애니메이션이 끝날 때마다 가속도 값을 0으로 초기화시킨다
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
