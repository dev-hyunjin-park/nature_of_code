let dot;

function setup() {
  createCanvas(400, 400);
  dot = new Point();
  dot.start();
}

function draw() {
  frameRate(40); // 프레임 속도를 초당 n프레임으로 설정
  dot.update();
}
