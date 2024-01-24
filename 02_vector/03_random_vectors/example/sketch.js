let redSlider;
let greenSlider;
let blueSlider;
let opacSlider;
let backgroundOpacitySlider;

function createSliders(label, initValue) {
  createDiv(label);
  const slider = createSlider(0, 255);
  slider.value(initValue);
  return slider;
}

function setup() {
  createCanvas(400, 400);

  redSlider = createSliders("Red", 133);
  greenSlider = createSliders("Green", 208);
  blueSlider = createSliders("Blue", 204);
  opacSlider = createSliders("Opacity", 118);
  backgroundOpacitySlider = createSliders("Background Opacity", 160);
}

function draw() {
  let red = redSlider.value();
  let green = greenSlider.value();
  let blue = blueSlider.value();
  let opacity = opacSlider.value();
  let backgroundOpacity = backgroundOpacitySlider.value();

  let light = new Light(red, green, blue, opacity, backgroundOpacity);
  light.drawLines();
}
