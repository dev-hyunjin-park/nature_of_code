// to do : refactoring
// 1.일관된 방향성
// 2. path의 둘레 안에서 edges();

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

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(random(2), random(2));
    this.maxSpeed = 2;
    this.maxForce = 0.1;
    this.radius = 10;
    this.color = [random(100, 200), random(50, 100), 100];
  }

  follow(path) {
    // 1. path의 모든 선에 법선점을 찾는다
    // 현재 future position, startLine, endLine
    let predict = this.velocity.copy();
    predict.normalize();
    predict.mult(25);
    let predictPos = p5.Vector.add(this.position, predict);

    const points = path.points;
    let targetPos = createVector(0, 0);
    let worldRecord = 100000;

    for (let i = 0; i < points.length; i++) {
      let startPoint = points[i];
      let endPoint = points[i + 1];
      if (i == 0) {
        fill(255, 0, 0);
      } else if (i == 1) {
        fill(0, 255, 0);
      } else if (i == 2) {
        fill(0, 0, 255);
      } else if (i == 3) {
        fill(0);
      } else if (i == 4) {
        endPoint = points[0];
        fill(100, 100, 0);
      }
      let normalPoint = findProjection(startPoint, predictPos, endPoint);
      let direction = p5.Vector.sub(startPoint, endPoint);
      // 법선 점이 path 바깥에 그려진다면 일단 endPoint로 고정시킨다
      if (
        normalPoint.x < min(startPoint.x, endPoint.x) ||
        normalPoint.x > max(startPoint.x, endPoint.x) ||
        normalPoint.y < min(startPoint.y, endPoint.y) ||
        normalPoint.y > max(startPoint.y, endPoint.y)
      ) {
        normalPoint = endPoint.copy();
      }

      // predictPos가 endPoint에 가까워지면 (dist)
      const newStartPoint = points[(i + 1) % points.length];
      const newEndPoint = points[(i + 2) % points.length];
      const distance = p5.Vector.dist(newEndPoint, predictPos);
      if (distance < path.radius) {
        direction = p5.Vector.sub(endPoint, newStartPoint);
      }
      // 법선점과 파티클이 같은 선 상에 있을 때, 더이상 path를 따라 이동하지 못하고 정체됨
      // 같은 선상에 오면, 법선점의 위치를 direction 방향으로 이동시킨다?
      const d = p5.Vector.dist(this.position, normalPoint);
      if (d < this.radius) {
        normalPoint.add(direction);
      }

      // 모든 법선점 시각화
      //   ellipse(normalPoint.x, normalPoint.y, 10);

      // 2. 가장 가까운 법선점을 찾아서 target에 저장한다
      direction.normalize();
      this.acceleration.mult(direction);

      const dist = p5.Vector.dist(predictPos, normalPoint);
      if (worldRecord > dist) {
        worldRecord = dist;
        targetPos = normalPoint;
      }
    }
    // 타겟 위치 시각화
    // noFill();
    // stroke(200, 200, 0);
    // strokeWeight(3);
    // ellipse(targetPos.x, targetPos.y, 30);
    // 타겟의 위치를 향해 이동한다
    return this.seek(targetPos);
  }

  seek(target) {
    // particle과 target 사이의 거리를 벡터로 계산
    let force = p5.Vector.sub(target, this.position);

    force.setMag(this.maxSpeed);
    force.sub(this.velocity);
    // 벡터의 크기를 매개변수 max의 값으로 제한한다
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.set(random(2), random(2));
  }

  show() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  edges() {
    if (this.position.x > width + this.radius) {
      this.position.x = -this.radius;
    } else if (this.position.x < -this.radius) {
      this.position.x = width + this.radius;
    }
    if (this.position.y > height + this.radius) {
      this.position.y = -this.radius;
    } else if (this.position.y < -this.radius) {
      this.position.y = height + this.radius;
    }
  }
}
