const queue = require('neo-async/queue');

// 使用示例

// callback 就是 done 方法，调用了才说明当前任务被完成
function worker(data, callback) {
  console.log('call worker');
  setTimeout(() => {
    callback(data);
  }, 3000);
}

// 第二个参数控制并发数
const poolQueue = queue(worker, 2);
let index = 0;
while (index < 3) {
  index++;
  poolQueue.push(
    {
      name: 'qhw',
    },
    function (data) {
      console.log('data', data);
    }
  );
}
