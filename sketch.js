var cols;
var rows;
var scl = 10;
var w = 1000;
var h = 700;
var terrain;
let slider;
//var offIncr; //Intensity
var offIncr;
var move = 0;

function setup() {
  let cnv = createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;
  terrain = gen2DArr(cols, rows);
  cnv.style('border', '6px solid black');
  cnv.style('border-radius', '25px');

  // Slider
  slider = createSlider(0, 10, 5).size(this.width >> 1, AUTO);
  windowResized();
}

function windowResized() {
  this._renderer.position(50 >> 1,
    this.height >> 1);
  const sliderX = (this.width - slider.width >> 1) + this._renderer.x,
    sliderY = (slider.height >> 1) + this._renderer.y;

  slider.position(sliderX, sliderY);
}

function draw() {
  background(135, 180, 210);
  fill(0);
  offIncr = slider.value() * 0.01;

  
  fillArr();
  stroke(0, 50, 0);
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);

  for (j = 0; j < rows - 1; j++) {
    beginShape(TRIANGLE_STRIP);
    for (i = 0; i < cols; i++) {
      let x = terrain[i][j];
      let y = terrain[i][j + 1];
      setColor(x);
      vertex(i * scl, j * scl, x);
      setColor(y);
      vertex(i * scl, (j + 1) * scl, y);
    }
    endShape();
  }
  
}

function fillArr() {
  joff = move;
  for (j = 0; j < rows; j++) {
    ioff = 0;
    for (i = 0; i < cols; i++) {
      terrain[i][j] = map(noise(ioff, joff), 0, 1, -100, 100);
      if (terrain[i][j] <= -50) terrain[i][j] = -50;
      ioff += offIncr;
    }
    joff += offIncr;
  }
  move -= 0.05;
}


function setColor(idx) {
  if (idx <= -50) {
    fill(0, 25, 150);
  } else if (idx <= -40) {
    fill(0, 50, 0);
  } else if (idx <= -25) {
    fill(0, 60, 0);
  } else if (idx <= -10) {
    fill(0, 70, 0);
  } else if (idx <= 10) {
    fill(0, 90, 0);
  } else if (idx <= 30) {
    fill(0, 120, 0);
  } else {
    fill(0, 150, 0);
  }
}

function gen2DArr(cols, rows) {
  arr = new Array(cols);
  for (i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}