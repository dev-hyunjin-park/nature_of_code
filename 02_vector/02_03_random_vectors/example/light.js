class Light {
  constructor(red, green, blue, opacity, backgroundOpacity) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;
    this.backgroundOpacity = backgroundOpacity;

    this.minRadius = 100;
    this.maxRadius = 200;
    // this.vector = createVector(random(0, 170));
    // (0, 0)에서부터의 반지름 길이는 0~170 사이의 랜덤값을 가진다
  }

  drawLine() {
    strokeWeight(2);
    stroke(this.red, this.green, this, blue, this.opacity);

    // 무작위 방향의 길이 1인 벡터를 생성
    this.vector = p5.Vector.random2D();
    // 벡터 크기를 랜덤 사이즈로 늘린다
    this.vector.mult(random(0, this.minRadius + 20));

    line(0, 0, this.vector.x, this.vector.y);
  }

  drawLines() {
    translate(width / 2, height / 2); // 중앙으로 이동
    for (let i = 0; i < 20; i++) {
      this.drawLine();
    }
    this.drawCircle();
    this.drawInnerCircle();
    this.drawOuterCircle();
    background(0, this.backgroundOpacity);
  }

  drawCircle() {
    fill(this.red, this.green, this, blue, this.opacity);
    let radius = random(0, this.maxRadius);
    ellipse(0, 0, radius, radius);
  }

  drawInnerCircle() {
    fill(this.red, this.green, this, blue, this.opacity);
    let radius = random(0, this.minRadius);
    ellipse(0, 0, radius, radius);
  }

  drawOuterCircle() {
    fill(this.red, this.green, this.blue, this.opacity);
    let radius = random(0, this.maxRadius + 120);
    ellipse(0, 0, radius, radius);
  }
}
