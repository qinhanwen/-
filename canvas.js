class PipeLine {
  constructor(ops) {
    this.canvas = document.getElementById(ops.id);
    if (!this.canvas) throw new Error('canvasELement is not defined');
    this.ctx = canvas.getContext('2d');
    this.init();
  }

  renderBtnWithLineArrow(x, y, r, fill = '#000') {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.strokeStyle = fill;
    this.ctx.stroke();
    this.ctx.fillStyle = fill;
    this.ctx.fill();
    this.ctx.closePath();

    this.drawLineArrow(x, y - 0.5 * r, x, y + 0.5 * r);
  }

  drawLineArrow(fromX, fromY, toX, toY, color = '#fff') {
    this.ctx.save();
    var headlen = 10; //自定义箭头线的长度
    var theta = 45; //自定义箭头线与直线的夹角，个人觉得45°刚刚好
    var arrowX, arrowY; //箭头线终点坐标
    // 计算各角度和对应的箭头终点坐标
    var angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI;
    var angle1 = ((angle + theta) * Math.PI) / 180;
    var angle2 = ((angle - theta) * Math.PI) / 180;
    var topX = headlen * Math.cos(angle1);
    var topY = headlen * Math.sin(angle1);
    var botX = headlen * Math.cos(angle2);
    var botY = headlen * Math.sin(angle2);
    this.ctx.beginPath();
    //画直线
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);

    arrowX = toX + topX;
    arrowY = toY + topY;
    //画上边箭头线
    this.ctx.moveTo(arrowX, arrowY);
    this.ctx.lineTo(toX, toY);

    arrowX = toX + botX;
    arrowY = toY + botY;
    //画下边箭头线
    this.ctx.lineTo(arrowX, arrowY);
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }

  renderSingleIcon(x, y, r, fill = '#D3D3D3') {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.strokeStyle = fill;
    this.ctx.stroke();
    this.ctx.fillStyle = fill;
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.font = '20px Verdana';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('单', x - 0.5 * r, y + 0.4 * r, 30);
    this.ctx.restore();
  }

  renderDoubleIcon(x, y, r, fill = '#D3D3D3') {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.strokeStyle = fill;
    this.ctx.stroke();
    this.ctx.fillStyle = fill;
    this.ctx.fill();

    this.ctx.font = '20px Verdana';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('双', x - 0.5 * r, y + 0.4 * r, 30);
    this.ctx.closePath();
    this.ctx.restore();
  }

  renderCloseIcon(x, y, r) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.strokeStyle = '#D3D3D3';
    this.ctx.stroke();
    this.ctx.fillStyle = '#D3D3D3';
    this.ctx.fill();
    this.ctx.closePath();
    // 计算 x 的坐标
    const x1 = x - 0.3 * r;
    const y1 = y - 0.3 * r;
    const x2 = x + 0.3 * r;
    const y2 = y + 0.3 * r;
    // 画 x
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = '#A9A9A9';
    this.ctx.lineWidth = 4;
    this.ctx.moveTo(x1, y2);
    this.ctx.lineTo(x2, y1);
    this.ctx.strokeStyle = '#A9A9A9';
    this.ctx.lineWidth = 4;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }

  renderBg() {
    this.ctx.save();
    this.ctx.beginPath();
    // 竖线 1
    this.ctx.moveTo(40, 50);
    this.ctx.lineTo(40, 160);

    this.ctx.strokeStyle = '#D3D3D3';
    this.ctx.lineWidth = 12;

    // 竖线 2
    this.ctx.moveTo(260, 50);
    this.ctx.lineTo(260, 160);

    this.ctx.strokeStyle = '#D3D3D3';
    this.ctx.lineWidth = 12;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }

  renderX(x, y, finishX) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (x == finishX) {
          clearInterval(interval);
          resolve();
        }
        this.ctx.lineTo(x > finishX ? x-- : x++, y);
        // this.ctx.lineJoin = "round";

        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 12;
        this.ctx.stroke();
      });
    });
  }

  renderY(x, y, finishY) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (y == finishY) {
          clearInterval(interval);
          resolve();
        }
        this.ctx.lineTo(x, y > finishY ? y-- : y++);
        // this.ctx.lineJoin = "round";

        this.ctx.strokeStyle = '#000';

        this.ctx.lineWidth = 12;
        this.ctx.stroke();
      });
    });
  }

  init() {
    // 开始绘制楼梯背景， 绘制4个默认按钮
    this.renderBg(this.ctx);
    this.renderCloseIcon(40, 20, 20);
    this.renderCloseIcon(260, 20, 20);
    this.renderSingleIcon(40, 190, 20);
    this.renderDoubleIcon(260, 190, 20);
  }

  clear() {
    const that = this;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    that.init();
  }

  // 左到双
  fromLeftCloseIconToDoubleIcon() {
    this.clear();
    // 画横线
    this.ctx.save();
    this.ctx.beginPath();
    // 横线 1
    this.ctx.moveTo(40, 77);
    this.ctx.lineTo(260, 77);

    // 横线 2
    this.ctx.moveTo(40, 104);
    this.ctx.lineTo(260, 104);

    // 横线 3
    this.ctx.moveTo(40, 131);
    this.ctx.lineTo(260, 131);

    this.ctx.strokeStyle = '#D3D3D3';
    this.ctx.lineWidth = 12;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    // 横线结束

    this.renderBtnWithLineArrow(40, 20, 20);

    this.ctx.moveTo(40, 80);
    this.ctx.beginPath();
    this.ctx.save();
    this.renderY(40, 50, 77).then(res => {
      this.renderX(40, 77, 260).then(res => {
        this.renderY(260, 77, 104).then(res => {
          this.renderX(260, 104, 40).then(res => {
            this.renderY(40, 104, 131).then(res => {
              this.renderX(40, 131, 260).then(res => {
                this.renderY(260, 131, 160).then(res => {
                  this.ctx.closePath();
                  this.ctx.restore();
                  this.renderDoubleIcon(260, 190, 20, '#ec4b4b');
                });
              });
            });
          });
        });
      });
    });
  }

  // 从左到单
  fromLeftCloseIconToSingleIcon() {
    this.clear();

    // 画横线
    this.ctx.save();
    this.ctx.beginPath();
    // 横线 1
    this.ctx.moveTo(40, 72);
    this.ctx.lineTo(260, 72);

    // 横线 2
    this.ctx.moveTo(40, 94);
    this.ctx.lineTo(260, 94);

    // 横线 3
    this.ctx.moveTo(40, 116);
    this.ctx.lineTo(260, 116);

    // 横线 4
    this.ctx.moveTo(40, 138);
    this.ctx.lineTo(260, 138);

    this.ctx.strokeStyle = '#D3D3D3';
    this.ctx.lineWidth = 12;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    // 横线结束

    this.renderBtnWithLineArrow(40, 20, 20);

    this.ctx.moveTo(40, 80);
    this.ctx.beginPath();
    this.ctx.save();
    this.renderY(40, 50, 72).then(res => {
      this.renderX(40, 72, 260).then(res => {
        this.renderY(260, 72, 94).then(res => {
          this.renderX(260, 94, 40).then(res => {
            this.renderY(40, 94, 116).then(res => {
              this.renderX(40, 116, 260).then(res => {
                this.renderY(260, 116, 138).then(res => {
                  this.renderX(260, 138, 40).then(res => {
                    this.renderY(40, 138, 160).then(res => {
                      this.ctx.closePath();
                      this.ctx.restore();
                      this.renderSingleIcon(40, 190, 20, '#0033FF');
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  // 右到单
  fromRightCloseIconToSingleIcon() {
    this.clear();

    // 画横线
    this.ctx.save();
    this.ctx.beginPath();
    // 横线 1
    this.ctx.moveTo(40, 77);
    this.ctx.lineTo(260, 77);

    // 横线 2
    this.ctx.moveTo(40, 104);
    this.ctx.lineTo(260, 104);

    // 横线 3
    this.ctx.moveTo(40, 131);
    this.ctx.lineTo(260, 131);

    this.ctx.strokeStyle = '#D3D3D3';
    this.ctx.lineWidth = 12;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    // 横线结束

    this.renderBtnWithLineArrow(260, 20, 20);

    this.ctx.moveTo(40, 80);
    this.ctx.beginPath();
    this.ctx.save();
    this.renderY(260, 50, 77).then(res => {
      this.renderX(260, 77, 40).then(res => {
        this.renderY(40, 77, 104).then(res => {
          this.renderX(40, 104, 260).then(res => {
            this.renderY(260, 104, 131).then(res => {
              this.renderX(260, 131, 40).then(res => {
                this.renderY(40, 131, 160).then(res => {
                  this.ctx.closePath();
                  this.ctx.restore();
                  this.renderSingleIcon(40, 190, 20, '#0033FF');
                });
              });
            });
          });
        });
      });
    });
  }

  // 右到双
  fromRightCloseIconToDoubleIcon() {
    this.clear();

    // 画横线
    this.ctx.save();
    this.ctx.beginPath();
    // 横线 1
    this.ctx.moveTo(40, 72);
    this.ctx.lineTo(260, 72);

    // 横线 2
    this.ctx.moveTo(40, 94);
    this.ctx.lineTo(260, 94);

    // 横线 3
    this.ctx.moveTo(40, 116);
    this.ctx.lineTo(260, 116);

    // 横线 4
    this.ctx.moveTo(40, 138);
    this.ctx.lineTo(260, 138);

    this.ctx.strokeStyle = '#D3D3D3';
    this.ctx.lineWidth = 12;
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    // 横线结束

    this.renderBtnWithLineArrow(260, 20, 20);

    this.ctx.moveTo(40, 80);
    this.ctx.beginPath();
    this.ctx.save();
    this.renderY(260, 50, 72).then(res => {
      this.renderX(260, 72, 40).then(res => {
        this.renderY(40, 72, 94).then(res => {
          this.renderX(40, 94, 260).then(res => {
            this.renderY(260, 94, 116).then(res => {
              this.renderX(260, 116, 40).then(res => {
                this.renderY(40, 116, 138).then(res => {
                  this.renderX(40, 138, 260).then(res => {
                    this.renderY(260, 138, 160).then(res => {
                      this.ctx.closePath();
                      this.ctx.restore();
                      this.renderDoubleIcon(260, 190, 20, '#ec4b4b');
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
}
