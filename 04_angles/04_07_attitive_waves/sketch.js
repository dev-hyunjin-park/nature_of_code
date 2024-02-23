let waves = [];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 5; i++) {
    waves[i] = new Wave(random(20, 80), random(100, 600), random(TWO_PI));
  }
}

function draw() {
  background(0);

  for (let x = 0; x < width; x += 10) {
    let y = 0;
    for (let wave of waves) {
      y += wave.evaluate(x);
    }
    noStroke();
    ellipse(x, y + height / 2, 16);

    for (let wave of waves) {
      wave.update();
    }
  }
}
