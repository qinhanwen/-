const { exec } = require('child_process'); // 执行进程
const util = require('util');
const execAsync = util.promisify(exec); // 执行结果转promise
const http = require('http');
const fs = require('fs');

const beginWork = async () => {
  // const { stdout } = await execAsync('tar -zcvf ./cache.tar.gz ./cache');
  const { stdout } = await execAsync('tar -zxvf ./cache.tar.gz');
};

beginWork();
