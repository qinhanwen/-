const { spawn } = require('child_process');

const workerPath = require.resolve('./child_program');

// 开启子进程
const worker = spawn(
  '/Users/qinhanwen/.nvm/versions/node/v10.15.0/bin/node', // 要运行的命令
  [].concat(workerPath, 20), // args 参数
  {
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe', 'pipe', 'pipe'],
  }
);

// 父子进程读写通信
const [, , , readPipe, writePipe] = worker.stdio;

// 监听子进程写数据
readPipe.on('data', function (arg) {
  console.log('readPipe on data', arg.toString());
});

const messageBuffer = Buffer.from(JSON.stringify({ name: 'qhw' }), 'utf-8');
// 通知子进程写数据
writePipe.write(messageBuffer);

// 禁止子进程关闭前，父进程被关闭
worker.unref();
