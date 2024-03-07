function findProjection(pos, a, b) {
  // 점 a와 pos 사이의 벡터
  let v1 = p5.Vector.sub(a, pos);
  // 점 b와 pos 사이의 벡터
  let v2 = p5.Vector.sub(b, pos);
  v2.normalize(); // 벡터 길이를 1로 정규화
  let sp = v1.dot(v2); // 내적(dot product) 계산
  // 내적은 한 벡터가 다른 벡터에 얼마나 "가까운지"를 나타내는 값으로, 두 벡터가 평행할수록 내적 값이 크다
  v2.mult(sp); // v2 벡터가 v1과 같은 방향을 가리키게 됩니다.
  v2.add(pos); // 절대 좌표를 얻는다
  return v2;
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.1;
    this.r = 16;
    this.wanderTheta = PI / 2;
  }

  follow(path) {
    // path following algorithm
    // Step 1 caculate future position
    let future = this.vel.copy();
    future.mult(20);
    future.add(this.pos);
    fill(255, 0, 0);
    noStroke();
    circle(future.x, future.y, 16);

    let worldRecord = 1000000;
    let target;

    // Step 2. 법선점이 실제 선분 위에 있는지 확인한다
    for (let i = 0; i < path.points.length - 1; i++) {
      // 각 선분에 대한 법선점을 구한다
      let lineStart = path.points[i]; // 시작점
      let lineEnd = path.points[i + 1]; // 끝점
      let normalPoint = findProjection(lineStart, future, lineEnd);
      noStroke();
      if (i == 0) {
        fill(255, 0, 0);
      } else if (i == 1) {
        fill(0, 255, 0);
      } else if (i == 2) {
        fill(0, 0, 255);
      }
      // 법선점이 선분 내부에 있지 않은 경우
      if (normalPoint.x < lineStart.x) {
        // 법선점을 선분의 시작 지점에서 초기화
        normalPoint = lineStart;
      } else if (normalPoint.x > lineEnd.x) {
        // 법선점이 선분을 빠져나가는 경우 선분의 종료 지점을 법선 점으로 한다
        normalPoint = lineEnd;
      }
      // 모든 법선점 위치 시각화
      circle(normalPoint.x, normalPoint.y, 20);

      // 가장 가까운 거리에 있는 법선점을 구한다
      let dist = p5.Vector.dist(future, normalPoint);
      if (dist < worldRecord) {
        worldRecord = dist;
        target = normalPoint;
      }
    }
    // 현재 target(가장 가까운 법선점) 위치 시각화
    stroke(255, 200, 0);
    strokeWeight(4);
    noFill();
    circle(target.x, target.y, 30);

    // 타겟을 향해 차량을 움직인다
    return this.seek(target);
  }

  wander() {
    // 현재 속도와 위치를 이용해 100만큼 떨어진 곳에 원을 그린다
    let wanderPoint = this.vel.copy();
    wanderPoint.setMag(100);
    wanderPoint.add(this.pos);

    let wanderRadius = 50;

    // 원주상의 각도(theta)를 이용하여 원의 반지름(wanderRadius)만큼 떨어진 점의 좌표를 계산한다
    let theta = this.wanderTheta + this.vel.heading();
    // vehicle의 각도가 틀어지면 각도를 제시하는 원의 위치도 같이 변해야하므로 +this.vel.heading();
    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    wanderPoint.add(x, y);

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
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(200, 100, 100);
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
