class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
    // particle의 모든 것을 상속하는 새로운 종류의 클래스를 생성한다
    // particle은 p5.Vector를 상속하므로 confetti로 만들어진 객체는 벡터이다
    this.angle = random(TWO_PI);
  }

  show() {
    noStroke();
    fill(255, this.lifetime);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    square(0, 0, this.r * 2);
    pop();
  }
}
