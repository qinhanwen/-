const compose = require('./compose');

function log1(next) {
  console.log(1);
  next();
  console.log(6);
}

function log2(next) {
  console.log(2);
  next();
  console.log(5);
}

function log3(next) {
  console.log(3);
  next();
  console.log(4);
}

compose([log1, log2, log3]); // 1 2 3 4 5 6
