function Particle(x, y, r, fixed) {
  var options = {
    friction: 0,
    restitution: 0.95,
    isStatic: fixed,
  };
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;

  Composite.add(engine.world, this.body);

  this.isOffScreen = function () {
    var pos = this.body.position;
    return pos.y > height + 100;
  };

  this.removeFromWorld = function () {
    Composite.remove(engine.world, this.body);
    // Composite.remove 함수는 단순히 그룹에서 객체를 제거하는 것이지, 실제로 물리 세계에서 해당 객체를 제거하는 것은 아님
  };

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
