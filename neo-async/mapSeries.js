const mapSeries = require('neo-async/mapSeries');

var order = [];
var array = [1, 3, 2];
var iterator = function (num, index, done) {
  // 当 done 函数被调用，才会进入下一次的 iterator 函数调用，保证调用顺序
  setTimeout(function () {
    order.push([num, index]);
    done(null, num);
  }, num * 1000);
};

mapSeries(array, iterator, function (err, res) {
  // 当所有函数被调用完，才调用回调
  console.log(res); // [1, 3, 2]
  console.log(order); // [[1, 0], [3, 1], [2, 2]]
});
