var canvas = document.getElementById('renderer-port');
var ctx = canvas.getContext('2d');

var block = '<div xmlns="http://www.w3.org/1999/xhtml">' +
    '<span style="font-size: 55px;">"&nbsp;</span>' +
    '<span style="font-size: 30px;">' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec purus in ante pretium blandit. Aliquam erat volutpat. Nulla libero lectus.' +
    '</span>' +
    '<div style="font-size: 55px; padding-left: 480px;">"</div>' +
    '<div style="float: right;">Усы Пескова</div>' +
    '<div>@Sandy_mustache</div>' +
    '</div>';

var html = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300">' +
    '<foreignObject width="100%" height="100%">' + block +
    '</foreignObject>' +
    '</svg>';

var DOMURL = window.URL || window.webkitURL || window;

console.log(html);
var img = new Image();
var svg = new Blob([html], {type: 'image/svg+xml;charset=utf-8'});
var url = DOMURL.createObjectURL(svg);

img.onload = function() {
  ctx.drawImage(img, 0, 0);
  DOMURL.revokeObjectURL(url);
}

img.src = url;