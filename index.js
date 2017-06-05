var panel = $('#gamePanel');
var html = '';
var row = 19;//行
var col = 19;//列
var cellList = [];
for (var i = 0; i < row; i++) {
  for (var j = 0; j < col; j++) {

      if(i==0) {
        if (j == 0) {
          html += addCell('top left', i, j);

        } else if (j == col - 1) {
          html += addCell('top right', i, j);
        } else {
          html += addCell('top', i, j);
        }
      }else if(i==row-1){
        if (j == 0) {
          html += addCell('bottom left', i, j);

        } else if (j == col - 1) {
          html += addCell('bottom right', i, j);
        } else {
          html += addCell('bottom', i, j);
        }
      } else  if (j == 0) {
          html += addCell(' left', i, j);

        } else if (j == col - 1) {
          html += addCell(' right', i, j);
        } else {
          html += addCell('', i, j);
        }



  }
}
function addCell(addCell, i, j) {
  //return '<b id="cid_'+i+'_'+j+'" class="cell '+addCell+'"></b>';
  return `<b id="cid_${i}_${j}" class="cell ${addCell}"></b>`;
}

var cellWidth=parseFloat($('.cell').css('width'));
console.log(cellWidth);
panel.html(html);
panel.css({
  width:cellWidth*row,
  height:cellWidth*col
});








