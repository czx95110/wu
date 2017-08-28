
var gameFive = {
  panel:$('#gamePanel'),
  line:19,
  tmpHtml:'',
  player1:true,
  addCell: function (pstClass,i,j) {
    return `<b id="cid_${i}_${j}" class="cell ${pstClass}"></b>`;

  },
  drawPanel: function () {
    for (var i = 0; i < this.line; i++) {
      for (var j = 0; j < this.line; j++) {
        if(i==0) {
          if (j == 0) {
            this.tmpHtml += this.addCell('top left', i, j);

          } else if (j == this.line - 1) {
            this.tmpHtml += this.addCell('top right', i, j);
          } else {
            this.tmpHtml += this.addCell('top', i, j);
          }
        }else if(i==this.line-1){
          if (j == 0) {
            this.tmpHtml += this.addCell('bottom left', i, j);

          } else if (j == this.line - 1) {
            this.tmpHtml += this.addCell('bottom right', i, j);
          } else {
            this.tmpHtml += this.addCell('bottom', i, j);
          }
        } else  if (j == 0) {
          this.tmpHtml += this.addCell(' left', i, j);

        } else if (j == this.line - 1) {
          this.tmpHtml += this.addCell(' right', i, j);
        } else {
          this.tmpHtml += this.addCell('', i, j);
        }
      }
    }
    this.panel.html(this.tmpHtml);
    this.tmpHtml='';
  },
  chess: function () {
    this.panel.on('click','.cell', function (e) {
      var me = $(e.target);
      var isEmpty = !me.hasClass('active');
      // 如果为空（不含active类） 可以下子
      if(isEmpty){
        if(this.player1){
          me.addClass('black active');
          me.html('+').siblings().html('');
          this.player1=false;
        }else{
          me.addClass('white active');
          me.html('+').siblings().html('');
          this.player1=true;
        }
      }
      this.isWin(e);
    }.bind(this));
  },
  addBtnEvents: function () {
    var btnReset = $('#resetGame');
    btnReset.on('click', function (e) {
     this.drawPanel();
    }.bind(this));
  },
  isWin: function (e) {
    var me = $(e.target),
        str = me.attr('id').split('_'),
        row = parseInt(str[1]), //当前单元格所在行号
        col = parseInt(str[2]); //当前单元格所在列号
    var rules={
      direction1:[],
      direction2:[],
      direction3:[],
      direction4:[]
    };
    // 水平方向判断
    function horizontalJudge() {

    }
    // 垂直方向判断
    function verticalJudge() {

    }
    // 对角线 左上-右下
    function leftTopToRightBottomJudge() {

    }
    // 对角线 左下-右上
    function leftBottomToRightTopJudge() {

    }

  },
  init: function () {
    this.drawPanel();
    this.chess();
    this.addBtnEvents();
  }
};

gameFive.init();





