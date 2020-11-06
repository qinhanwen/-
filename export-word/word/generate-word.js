const Pizzip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');

function generateWord(inputPath, outputPath, data) {
  return new Promise((resolve, reject) => {
    fs.readFile(inputPath, 'binary', (err, content) => {
      if (!err) {
        const zip = new Pizzip(content);
        const doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData(data);
        try {
          doc.render();
        } catch {
          reject('render 错误');
        }
        const buf = doc.getZip().generate({ type: 'nodebuffer' });
        fs.writeFile(outputPath, buf, err => {
          if (!err) {
            resolve();
          } else {
            reject('写文件出错');
          }
        });
      } else {
        reject('模板文件读取错误');
      }
    });
  });
}

module.exports = { generateWord };
