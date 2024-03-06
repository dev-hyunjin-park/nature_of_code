class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 10;
    this.maxForce = 1;
    this.r = 16;
  }

  evade(vehicle) {
    let pursuit = this.pursue(vehicle);
    return pursuit.mult(-1);
  }

  pursue(vehicle) {
    let target = vehicle.pos.copy();
    let prediction = vehicle.vel.copy();
    prediction.mult(10);
    target.add(prediction);
    return this.seek(target);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  seek(target) {
    // vehicle과 target 사이의 거리를 벡터로 계산
    let force = p5.Vector.sub(target, this.pos);
    // force (desired) 벡터의 크기를 maxSpeed 값으로 제한한다
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    // 벡터의 크기를 매개변수 max의 값으로 제한한다
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading()); // 속도 벡터와 관련된 각도만큼 회전시킨다
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}
