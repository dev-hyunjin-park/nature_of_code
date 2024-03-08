var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();
var render = Render.create({
  element: document.body,
  engine,
});

var world;
var circles = [];
var boundaries = [];

function setup() {
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  Runner.run(engine);

  boundaries.push(new Boundary(0, height - 50, width * 0.6, 50, 0.3));
  boundaries.push(new Boundary(200, height / 2, width * 0.5, 50, -0.3));
}

function mouseDragged() {
  circles.push(new Circle(mouseX, mouseY, random(5, 10)));
}

function draw() {
  background(51);
  Engine.update(engine);
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
  }
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}
