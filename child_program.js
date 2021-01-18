const fs = require('fs');

const writePipe = fs.createWriteStream(null, { fd: 3 });
const readPipe = fs.createReadStream(null, { fd: 4 });

writePipe.write('hello, ');
readPipe.on('data', function (arg) {
  console.log('data', arg.toString());
});
