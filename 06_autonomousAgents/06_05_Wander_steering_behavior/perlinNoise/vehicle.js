class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.maxForce = 0.2;
    this.r = 16;
    this.wanderTheta = PI / 2;
    this.currentPath = [];
    this.paths = [this.currentPath];
  }

  wander() {
    let angleX = noise(this.pos.x) * TWO_PI * 2;
    let angleY = noise(this.pos.y) * TWO_PI * 2;

    let steerX = p5.Vector.fromAngle(angleX);
    let steerY = p5.Vector.fromAngle(angleY);
    steerX.setMag(this.maxForce);
    steerY.setMag(this.maxForce);

    let steer = p5.Vector.add(steerX, steerY);
    this.applyForce(steer);

    this.pos.x += 0.08;
    this.pos.y += 0.08;
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
