let $text = document.getElementById('text');
$text.oninput = function() {
  setText($text.value);
};

let $color = document.getElementById('color');
$color.onchange = function() {
  setColor($color.value);
};

let $dr = document.getElementById('dr');
$dr.onchange = function() {
  setDr($dr.value);
};

let $show = document.getElementsByName('show');
$show[0].onchange = function() {
  setClear($show[1].checked);
};
$show[1].onchange = function() {
  setClear($show[1].checked);
};

let $scale = document.getElementById('scale');
$scale.onchange = function() {
  setScale($scale.value);
};

let $play = document.getElementById('play');
$play.onclick = function() {
  let value = $play.value;
  if (value === '开始') {
    $play.value = '暂停';
    start();
  } else {
    $play.value = '开始';
    stop();
  }
};