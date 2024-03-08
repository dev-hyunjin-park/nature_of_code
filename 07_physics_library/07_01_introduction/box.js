function Circle(x, y, r) {
  var options = {
    friction: 0.1,
    restitution: 0.6,
  };
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;

  Composite.add(engine.world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(radians(angle));
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(126);
    ellipse(0, 0, this.r * 2);
    pop();
  };
}
