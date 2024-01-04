let noiseMax = 4;
let slider;
let phase = 0;
let zoff = 0;

function setup() {
  createCanvas(600, 600);
  slider = createSlider(0.1, 10, 0, 0.1);
}

function draw() {
  // noiseSeed(99); // 시작할 때마다 같은 모양을 얻게됨
  background(0);
  translate(width / 2, height / 2);
  // 좌표 시스템을 캔버스 중심으로 옮긴다

  stroke(255);
  // 선의 색상을 흰색(255)으로 설정합니다.
  //   noFill();
  fill(255);
  beginShape();
  noiseMax = slider.value();

  // 원 그리기
  for (let a = 0; a < TWO_PI; a += 0.1) {
    // let r = random(50, 100);
    // 반지름 r이 그냥 100이라면 동그란 원이 그려짐
    let xoff = map(cos(a), -1, 1, 0, noiseMax);
    let yoff = map(sin(a), -1, 1, 0, noiseMax);

    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, 200);
    // noise t 값은 항상 0~1 사이 값임
    // 0~1사이의 값을 100~200으로 매핑한다
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y); // 계산된 x, y 좌표를 이용하여 다각형의 각 꼭지점을 추가
  }
  endShape(CLOSE);
  zoff += 0.01;
  //   phase += 0.05;
}
