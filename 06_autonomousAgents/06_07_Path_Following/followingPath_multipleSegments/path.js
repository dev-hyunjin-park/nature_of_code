class Path {
  constructor() {
    this.points = [];
    this.radius = 20;
  }
  addPoint(x, y) {
    let p = createVector(x, y);
    this.points.push(p);
    noStroke();
    fill(255, 0, 0);
    ellipse(p.x, p.y, 5);
  }

  display() {
    stroke(255);
    noFill();
    beginShape();
    strokeWeight(this.radius * 2);
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape();
  }
}
