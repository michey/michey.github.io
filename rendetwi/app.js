var canvas = document.getElementById('renderer-port');
var ctx = canvas.getContext('2d');

var html = '<div>' +
    '<span style=" font-size: 55px;">"&nbsp;</span>' +
    '<span style=" font-size: 30px;">' +
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec purus in ante pretium blandit. Aliquam erat volutpat. Nulla libero lectus.' +
    '</span>' +
    '<div style="font-size: 55px; padding-left: 480px;">"</div>' +
    '<div style="float: right;">Усы Пескова</div>' +
    '<div>@Sandy_mustache</div>' +
    '</div>';

var doc = document.implementation.createHTMLDocument("");
doc.write(html);
doc.documentElement.setAttribute("xmlns", doc.documentElement.namespaceURI);
html = (new XMLSerializer).serializeToString(doc);

var DOMURL = window.URL || window.webkitURL || window;

var img = new Image();
var svg = new Blob([html], {type: 'image/svg+xml;charset=utf-8'});
var url = DOMURL.createObjectURL(svg);

console.log(html);
console.log(img);
console.log(svg);

img.onload = function() {
  ctx.drawImage(img, 0, 0);
  DOMURL.revokeObjectURL(url);
}

img.src = url;