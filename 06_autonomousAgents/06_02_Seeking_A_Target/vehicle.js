class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 15;
    this.maxForce = 1;
    this.r = 16;
  }

  seek(target) {
    // vehicle과 target 사이의 거리를 벡터로 계산
    let force = p5.Vector.sub(target, this.pos);
    // force (desired) 벡터의 크기를 maxSpeed 값으로 제한한다
    force.setMag(this.maxSpeed);
    // steering force = desired velocity(force) - current velocity
    // let steering = p5.Vector.sub(desired, this.vel);
    force.sub(this.vel);
    // 벡터의 크기를 매개변수 max의 값으로 제한한다
    // steering.limit(this.maxForce);
    force.limit(this.maxForce);
    // this.applyForce(steering);
    this.applyForce(force);

    // setMag와 limit의 차이
    // desired.setMag(): 이 함수는 벡터의 크기를 특정 값으로 설정합니다. 주어진 벡터를 지정된 길이로 설정하며, 이렇게 하면 벡터의 방향은 변하지 않고 크기만 조정됩니다. 보통 목표 지점과 현재 위치 사이의 거리를 나타내는 벡터를 설정할 때 사용됩니다.
    // steering.limit(): 이 함수는 벡터의 크기를 제한하는 데 사용됩니다. 벡터의 크기가 지정된 한계값보다 크면 벡터의 크기를 해당 한계값으로 줄입니다. 따라서 벡터의 크기를 제어하여 특정 최대값을 넘지 않도록 합니다. 이는 주로 힘 벡터를 제어하여 과도한 변화를 방지하고 균형을 유지하는 데 사용됩니다.
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
}
