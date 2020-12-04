let cb = require('./test1');
let cbCopy = cb;
cb = function() {
  console.log(2);
  cbCopy();
};

require('./test2');
