var lineNums = 30,
colorLineNums = 30,
color = [
    [255, 69, 69],
    [255, 120, 46],
    [255, 120, 46]
],
opacity = 0.6,
gradientColorArr = (function () {
    var colorArr = [],
        colorObj1 = getRGBDiff(color[0], color[2]),
        colorObj2 = getRGBDiff(color[1], color[2])
    for (var i = 0; i < colorLineNums; i++) {
        //计算每一步的hex值
        var [sR, sG, sB, startR, startG, startB, hex] = [colorObj1.sR, colorObj1.sG, colorObj1.sB,
        colorObj1.startR, colorObj1.startG, colorObj1.startB, ''
        ]
        if (i > colorLineNums / 2) {
            [sR, sG, sB, startR, startG, startB] = [colorObj2.sR, colorObj2.sG, colorObj2.sB, colorObj2
                .startR, colorObj2.startG, colorObj2.startB
            ]
        }
        hex = colorToHex('rgba(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i +
            startG)) + ',' + parseInt((sB * i + startB)) + ',' + opacity + ')');

        colorArr.push(hex);
    }
    return colorArr;
})(),deg1 = (Math.PI * 10) / (9 * lineNums);


function setColorTick() {
this.draw = function (ctx) {
    ctx.save();
    for (var i = 0; i <= this.index; i++) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = gradientColorArr[i];
        ctx.moveTo(113, 0);
        ctx.lineTo(92, 0);
        ctx.stroke();
        ctx.rotate(deg1);
    }
    ctx.restore();
}
}

function getRGBDiff(r1, r2) {
let obj = {
    sR: (r2[0] - r1[0]) / 25,
    //总差值
    sG: (r2[1] - r1[1]) / 25,
    sB: (r2[2] - r1[2]) / 25,
    startR: r1[0],
    startG: r1[1],
    startB: r1[2]
}
return obj
}

function colorToHex(rgb) {
var _this = rgb;
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
        var hex = Number(aColor[i]).toString(16);
        hex = +hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
        if (hex === "0") {
            hex += hex;
        }
        strHex += hex;
    }
    if (strHex.length !== 7) {
        strHex = _this;
    }
    return strHex;
} else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
        return _this;
    } else if (aNum.length === 3) {
        var numHex = "#";
        for (var i = 0; i < aNum.length; i += 1) {
            numHex += (aNum[i] + aNum[i]);
        }
        return numHex;
    }
} else {
    return _this;
}
};

function drawText(ctx, process, totalScore,canvas) {
ctx.save();
ctx.rotate(210 * Math.PI / 197);
ctx.fillStyle = '#000';
ctx.font = '44px Microsoft yahei';
ctx.textAlign = 'center';
ctx.textBaseLine = 'top';

//分手颜色渐变色
var gradient = ctx.createLinearGradient(0, 0, canvas['width'], 0);
gradient.addColorStop("0", "#ff4545");
gradient.addColorStop("0.5", "#ff782e");
gradient.addColorStop("1", "#ff782e");
ctx.fillStyle = gradient;
ctx.fillText(process, 0, -20);

ctx.fillStyle = '#87939d';
ctx.font = '20px Microsoft yahei';
ctx.fillText('目标值:' + totalScore, 0, 20);

ctx.restore();
}

function initGauge(canvas, score, totalScore) {
var ctx = canvas.getContext('2d'),
    cWidth = canvas.width,
    cHeight = canvas.height,
    score = score,
    $this = this;

var dotSpeed = 0.04,
    //数字增加速度
    textSpeed = Math.round(dotSpeed * 2 / deg1),
    //数字增加的值 : deg1:每旋转一个线的弧度,共50根线,数值为100,所以数字速度等于 旋转角度 * 2
    angle = 0,
    //内环动点旋转角度
    credit = 0,
    //起始分数,数字递增用
    colorTick = new setColorTick(),
    colorIndex = 0,
    colorSpeed = dotSpeed / deg1; //彩色刻度速度: 动点旋转速度 / 弧度 

(function drawFrame() {

    ctx.save();
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.translate(cWidth / 2, cHeight / 2);

    //因圆本身缺口为120°,为了让缺口朝正下方,所以旋转角度为150°
    ctx.rotate(150 * Math.PI / 160);

    var aim = score * deg1 / 2;

    if (credit < score - textSpeed) {
        credit += textSpeed;
    } else if (credit >= score - textSpeed && credit < score) {
        credit += 1;
    }

    drawText(ctx, credit, totalScore,canvas);
    ctx.save();
    //外环灰色线				  
    for (var i = 0; i <= lineNums; i++) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(242,246,249,1)'; //外环背景色
        ctx.moveTo(113, 0);
        ctx.lineTo(94, 0);
        ctx.stroke();
        ctx.rotate(deg1);
    }
    ctx.restore();
    if (colorIndex < score / totalScore * 30) { //这里计算比例
        colorIndex += colorSpeed
    }
    colorTick.gradientColorArr = gradientColorArr;
    colorTick.deg1 = deg1;
    colorTick.index = colorIndex;
    colorTick.draw(ctx);
    window.requestAnimationFrame(drawFrame);
    ctx.restore();
})();
}