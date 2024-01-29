let mover;

function setup() {
  createCanvas(800, 800);

  mover = new Mover(0, 0, 500);
  background(0);
}

function draw() {
  background(0);
  translate(340, height / 2);
  textSize(40);
  fill(255);

  if (keyIsDown(LEFT_ARROW)) {
    mover.angle -= 0.1;
    text("<- key is down", 0, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    mover.angle += 0.1;
    text("-> key is down", 0, 0);
  }

  mover.show();
  mover.update();
}
