var Engine = Matter.Engine, // 물리 시뮬레이션을 관리
  Render = Matter.Render, // 물리 시뮬레이션 렌더 -> p5.js 사용할 것임
  Runner = Matter.Runner, // 물리 시뮬레이션 실행, 주기 제어
  Bodies = Matter.Bodies, // 물리 객체 생성
  Composite = Matter.Composite; // 물리 객체 그룹화, 관리

var Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

// create an engine
var engine = Engine.create();
var render = Render.create({
  element: document.body,
  engine,
});
var runner = Runner.create();

var world;
var particles = [];
var boundaries = [];
var boundary;

var mConstraint;

function setup() {
  var canvas = createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;

  Runner.run(runner, engine);

  var prev = null;
  for (var x = 200; x < 400; x += 20) {
    var fixed = false;
    if (!prev) {
      fixed = true;
    }

    var p = new Particle(x, 100, 10, fixed);
    particles.push(p);

    if (prev) {
      var options = {
        bodyA: p.body,
        bodyB: prev.body,
        length: 20,
        stiffness: 0.4,
      };
      var constraint = Constraint.create(options);
      Composite.add(world, constraint);
    }
    prev = p;
  }

  boundary = new Boundary(200, height - 20, width, 20, 0);
  boundaries.push(boundary);

  var canvasmouse = Mouse.create(canvas.elt);
  canvasmouse.pixelRatio = pixelDensity();
  var options = {
    mouse: canvasmouse,
  };

  mConstraint = MouseConstraint.create(engine, options);
  Composite.add(world, mConstraint);
}

function draw() {
  background(51);
  Engine.update(engine);
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
  }

  if (mConstraint.body) {
    var pos = mConstraint.body.position;
    var offset = mConstraint.constraint.pointB;
    var m = mConstraint.mouse.position;

    stroke(0, 255, 0);
    line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
  }
  // line(
  //   particles[0].body.position.x,
  //   particles[0].body.position.y,
  //   particles[1].body.position.x,
  //   particles[1].body.position.y
  // );
}
