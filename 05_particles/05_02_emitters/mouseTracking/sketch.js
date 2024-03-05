let emitters = [];

function play() {
  emitters.push(new Emitter());
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.mouseMoved(play);
}

function draw() {
  background(0);
  for (let emitter of emitters) {
    emitter.emit();
    emitter.show();
    emitter.update();
  }
}
