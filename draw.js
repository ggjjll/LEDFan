
let ctx = canvas.getContext('2d');
let ch = 0;
let cw = 0;
let r = 0;
let tm = null;

let text = '';
let color = '#ff0000';
let dr = 0.02;
let isClear = false;
let scale = 1;

function init() {
  let canvas = document.getElementById('canvas');
  canvas.setAttribute('height', ch = canvas.offsetHeight);
  canvas.setAttribute('width', cw = canvas.offsetWidth);
}

function start() {
  tm = setInterval(() => {
    r += 0.01;
    if (r >= 1) {
       r -= 2;
    } else if (r < -1) {
      r += 2;
    }
    draw(r);
  }, 15);
}

function stop() {
  clearInterval(tm);
  tm = null;
  ctx.clearRect(0, 0, cw, ch);
  draw(r);
}

function draw(r) {
  let height = 140;
  let width = 10;
  if (isClear) {
    ctx.clearRect(0, 0, cw, ch);
  }
  ctx.save();
  ctx.translate(cw / 2, ch / 2);
  ctx.rotate(Math.PI + r * Math.PI);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.rect(- width / 2, 20, width, height);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = color;
  let size = width;
  let d = width;
  let led = getLEDNum();  // digit[7];
  let length = led[0].length;
  let center = parseInt(length / 2);
  let j = Math.round(r / dr);
  for (let i = 0; i < 10; i ++) {
    if (j >= - center && j < length - center && led[i][center + j]) {
      ctx.beginPath();
      ctx.rect(- size / 2, height - d * (i + 1), size, size);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.restore();
}

function getLEDNum() {
  let dateString = text || (new Date()).toTimeString().substr(0,5);
  let length = dateString.length;
  let led = [];
  for (let i = 0; i < 10; i ++) {
    let line = [];
    for (let j = 0; j < length; j ++) {
      let num = dateString[j];
      // num = num === ':' ? 10 : num;
      line = line.concat(digit[num][i]);
      if (j < length - 1) {
        line = line.concat([0,0,0]);
      }
    }
    led.push(line);
  }
  return led;
}

window.onresize = () => {
  init();
};

init();
draw(r);

// API
function setText(txt) {
  text = txt.substr(0, 6);
  draw(r);
}

function setColor(col) {
  color = col;
  draw(r);
}

function setDr(num) {
  dr = num;
  draw(r);
}

function setClear(bool) {
  isClear = bool;
  draw(r);
}

function setScale(s) {
  ctx.clearRect(0, 0, cw, ch);
  scale = s;
  draw(r);
}