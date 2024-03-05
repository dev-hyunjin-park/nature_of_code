class Point {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.distance = 10;
    this.angle = radians(30);
    this.pointsArr = [];
    this.isEnded = false;
  }

  start() {
    this.drawDots();
    this.pointsArr.push(this.pos.x, this.pos.y);
  }

  update() {
    background(255);

    this.getEndPoint();
    this.drawPolygons();
    this.drawDots();

    if (this.isEnded) {
      return;
    }

    this.pos.x += cos(this.angle) * this.distance;
    this.pos.y += sin(this.angle) * this.distance;
    this.pointsArr.push(this.pos.x, this.pos.y);
    if (this.distance < 30) {
      this.angle += radians(random(70, 75));
      this.distance += 2;
    } else {
      this.angle += radians(67);
      this.distance += 4;
    }
  }

  getEndPoint() {
    let boundary = 30;
    if (
      (this.pos.x < -boundary && this.pos.y < -boundary) ||
      (this.pos.x < -boundary && this.pos.y > height + boundary) ||
      (this.pos.x > width + boundary && this.pos.y < -boundary) ||
      (this.pos.x > width + boundary && this.pos.y > height + boundary)
    ) {
      this.isEnded = true;
    }
  }

  drawDots() {
    for (let i = 0; i < this.pointsArr.length; i += 2) {
      stroke(0);
      strokeWeight(5);
      point(this.pointsArr[i], this.pointsArr[i + 1]);
    }
  }

  drawPolygons() {
    let delaunay = new d3.Delaunay(this.pointsArr);

    let voronoi = delaunay.voronoi([0, 0, width, height]);
    let polygons = voronoi.cellPolygons();
    for (let poly of polygons) {
      stroke(0);
      strokeWeight(1);
      noFill();
      if (this.isEnded) {
        // isEnded가 true인 경우에 랜덤한 색상 채우기
      }
      beginShape();
      for (let i = 0; i < poly.length; i++) {
        vertex(poly[i][0], poly[i][1]);
      }
      endShape();
    }
  }
}
