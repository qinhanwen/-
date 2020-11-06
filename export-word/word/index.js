const { generateWord } = require('./generate-word');
const { inputPath, outputPath, data } = require('./data');
const async = require('neo-async');
const path = require('path');

const limit = 20;

const iterator = function(item, done) {
  const outputPath = path.resolve(
    __dirname,
    'output/' + item.custName + '.docx'
  );
  generateWord(inputPath, outputPath, item)
    .then(done)
    .catch(e => {
      done();
      console.log('发生异常', e);
    });
};
console.log(Date.now());
async.eachLimit(data, limit, iterator, function(err, res) {
  //   console.log(res); // undefined
  console.log(Date.now());
});
