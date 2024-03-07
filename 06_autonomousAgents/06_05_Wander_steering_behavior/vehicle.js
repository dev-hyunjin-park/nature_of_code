class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.2;
    this.r = 16;
    this.wanderTheta = PI / 2;
    this.currentPath = [];
    this.paths = [this.currentPath];
  }

  wander() {
    // 현재 속도와 위치를 이용해 100만큼 떨어진 곳에 원을 그린다
    let wanderPoint = this.vel.copy();
    wanderPoint.setMag(100);
    wanderPoint.add(this.pos);
    // fill(255, 0, 0);
    // circle(wanderPoint.x, wanderPoint.y, 16);

    let wanderRadius = 50;
    // noFill();
    // circle(wanderPoint.x, wanderPoint.y, wanderRadius * 2);
    // line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y);

    // 원주상의 각도(theta)를 이용하여 원의 반지름(wanderRadius)만큼 떨어진 점의 좌표를 계산한다
    let theta = this.wanderTheta + this.vel.heading();
    // vehicle의 각도가 틀어지면 각도를 제시하는 원의 위치도 같이 변해야하므로 +this.vel.heading();
    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    // fill(0, 255, 0);
    // noStroke();
    wanderPoint.add(x, y);
    // circle(wanderPoint.x, wanderPoint.y, 8);
    // stroke(255);
    // line(this.pos.x, this.pos.y, wanderPoint.x, wanderPoint.y);

    let steer = wanderPoint.sub(this.pos);
    steer.setMag(this.maxForce);
    this.applyForce(steer);
    // wanderPoint에 현재 위치를 빼줌으로써, 원점에서의 상대적인 위치로 변환하여 최종적인 스티어링 힘(steer)을 구할 수 있다
    // wanderPoint는 현재 위치(this.pos)에서부터 계산되었기 때문

    let displaceRange = 0.3;
    this.wanderTheta += random(-displaceRange, displaceRange);
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

  arrive(target) {
    // 2nd argument true enables the arrival behavior
    return this.seek(target, true);
  }

  flee(target) {
    return this.seek(target).mult(-1);
  }

  seek(target, arrival = false) {
    // vehicle과 target 사이의 거리를 벡터로 계산
    let force = p5.Vector.sub(target, this.pos);
    let desireSpeed = this.maxSpeed;

    if (arrival) {
      // 임계점
      let slowRadius = 100;
      let distance = force.mag(); // target <-> vehicle distance
      if (distance < slowRadius) {
        // distance가 0 ~ r(임계점 반지름)일 때 -> 0 ~ maxSpeed로 매핑한다
        desireSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
      }
    }
    force.setMag(desireSpeed);
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

    if (frameCount % 5 == 0) {
      this.currentPath.push(this.pos.copy());
    }
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

    // vehicle이 지나간 경로를 선으로 보여준다
    for (let path of this.paths) {
      beginShape();
      noFill();
      for (let v of path) {
        vertex(v.x, v.y);
      }
      endShape();
    }
  }

  edges() {
    let hitEdge = false;
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
      hitEdge = true;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
      hitEdge = true;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
      hitEdge = true;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
      hitEdge = true;
    }

    if (hitEdge) {
      this.currentPath = [];
      this.paths.push(this.currentPath);
    }
  }
}
