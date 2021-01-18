const fs = require('fs');

const writePipe = fs.createWriteStream(null, { fd: 3 });
const readPipe = fs.createReadStream(null, { fd: 4 });

// 写数据，让父进程监听到
writePipe.write('hello, ');

// 父进程写数据子进程监听到
readPipe.on('data', function (arg) {
  console.log('data', arg.toString());
});
