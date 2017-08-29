var gameFive = {
  panel: $('#gamePanel'),
  grid: 19,
  player1: true,
  addCell: function (pstClass, i, j) {
    //return `<b id="cid_${i}_${j}" class="cell ${pstClass}"></b>`;
    return '<b id="cid_' + i + '_' + j + '" class="cell ' + pstClass + '"></b>';
  },
  drawPanel: function () {
    var html = '';
    for (var i = 0; i < this.grid; i++) {
      for (var j = 0; j < this.grid; j++) {
        if (i == 0) {
          if (j == 0) {
            html += this.addCell('top left', i, j);

          } else if (j == this.grid - 1) {
            html += this.addCell('top right', i, j);
          } else {
            html += this.addCell('top', i, j);
          }
        } else if (i == this.grid - 1) {
          if (j == 0) {
            html += this.addCell('bottom left', i, j);

          } else if (j == this.grid - 1) {
            html += this.addCell('bottom right', i, j);
          } else {
            html += this.addCell('bottom', i, j);
          }
        } else if (j == 0) {
          html += this.addCell(' left', i, j);

        } else if (j == this.grid - 1) {
          html += this.addCell(' right', i, j);
        } else {
          html += this.addCell('', i, j);
        }
      }
    }
    this.panel.html(html);
  },
  chess: function () {
    this.panel.on('click', '.cell', function (e) {
      var me = $(e.target);
      var isEmpty = !me.hasClass('active');
      // 如果为空（不含active类） 可以下子
      if (isEmpty) {
        if (this.player1) {
          me.addClass('black active');
          me.html('+').siblings().html('');
          this.player1 = false;
        } else {
          me.addClass('white active');
          me.html('+').siblings().html('');
          this.player1 = true;
        }
      }
      this.isWin(e);
    }.bind(this));
  },
  addBtnEvents: function () {
    var btnReset = $('#btnReset');
    btnReset.on('click', function (e) {
      this.drawPanel();
    }.bind(this));
    var btnAgain = $('#btnAgain');

    btnAgain.on('click', function (e) {
      $('.modal').removeClass('active');
      this.drawPanel();
    }.bind(this));
  },
  isWin: function (e) {
    var me = $(e.target),
      str = me.attr('id').split('_'),
      row = parseInt(str[1]), //当前单元格所在行号
      col = parseInt(str[2]); //当前单元格所在列号
    // 水平方向判断
    function horizontalJudge() {
      var i, //循环变量
        left = col - 4,
        len = left + 9,
        list = [], // 当前点击格的左右各加4格及本身
        flag = 0, // 已连接的棋子数量。
        currentColor = 'black';//当前棋子颜色
      for (i = left; i < len; i++) {
        list.push($('#cid_' + row + '_' + i));
      }
      if (me.hasClass('white')) {
        currentColor = 'white';
      }
      judge(list, currentColor, flag);
    }
    // 垂直方向判断
    function verticalJudge() {
      var up = row - 4,
        len = up + 9,
        list = [],
        flag = 0,
        currentColor = 'black';
      for (var i = up; i < len; i++) {
        list.push($('#cid_' + i + '_' + col));
      }
      if (me.hasClass('white')) {
        currentColor = 'white';
      }
      judge(list, currentColor, flag);
    }
    // 对角线 左上-右下\\
    function leftTopToRightBottomJudge() {
      var cell = {
          x: row - 4,
          y: col - 4
        },
        list = [],
        flag = 0,
        i = 0,
        currentColor = 'black';

      while (i++ < 9) {
        list.push($('#cid_' + cell.x + '_' + cell.y));
        cell.x++;
        cell.y++;
      }
      if (me.hasClass('white')) {
        currentColor = 'white';
      }

      judge(list, currentColor, flag);
    }
    // 对角线 左下-右上 //
    function leftBottomToRightTopJudge() {
      var cell = {
          x: row + 4,
          y: col - 4
        },
        list = [],
        flag = 0,
        i = 0,
        currentColor = 'black';
      while (i++ < 9) {
        list.push($('#cid_' + cell.x + '_' + cell.y));
        cell.x--;
        cell.y++;
      }
      if (me.hasClass('white')) {
        currentColor = 'white';
      }

      judge(list, currentColor, flag);
    }
    horizontalJudge();
    verticalJudge();
    leftTopToRightBottomJudge();
    leftBottomToRightTopJudge();
    // 判断是否连成5子
    function judge(list, currentColor, flag) {
      for (var i = 0; i < list.length; i++) {
        var tmp = list[i];
        if (tmp.hasClass(currentColor)) {
          flag++;
          //console.log(tmp,flag);
          if (flag >= 5) {
            showWinner(currentColor);
          }
        } else {
          flag = 0;
        }
      }
    }
    // 显示赢家
    function showWinner(winColor) {
      $('.modal').addClass('active');
      if (winColor === 'white') {
        winColor = '白棋';
      } else {
        winColor = '黑棋';
      }
      var msg = '恭喜 ' + winColor + ' 获胜 ';
      $('.modal-content-body').html(msg);
    }
  },
  init: function () {
    this.drawPanel();
    this.chess();
    this.addBtnEvents();
  }
};

gameFive.init();




