var Engine = Matter.Engine, // 물리 시뮬레이션을 관리
  Render = Matter.Render, // 물리 시뮬레이션 렌더 -> p5.js 사용할 것임
  Runner = Matter.Runner, // 물리 시뮬레이션 실행, 주기 제어
  Bodies = Matter.Bodies, // 물리 객체 생성
  Composite = Matter.Composite; // 물리 객체 그룹화, 관리

// create an engine
var engine = Engine.create();
var render = Render.create({
  element: document.body,
  engine,
});
var runner = Runner.create();

var world;
var circles = [];
var boundaries = [];

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;

  Runner.run(runner, engine);

  boundaries.push(new Boundary(0, height - 50, width * 0.6, 50, 0.3));
  boundaries.push(new Boundary(200, height / 2, width * 0.5, 50, -0.3));
}

function draw() {
  background(51);
  circles.push(new Circle(200, 50, random(5, 10)));
  Engine.update(engine);
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
    if (circles[i].isOffScreen()) {
      circles[i].removeFromWorld(circles[i]);
      circles.splice(i, 1);
      i--;
    }
  }
  console.log(circles.length, world.bodies.length);
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}
