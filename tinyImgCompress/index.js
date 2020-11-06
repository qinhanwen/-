const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');
const exts = ['.jpg', '.png'];
const max = 5200000;
const excludes = ['node_modules', 'dist'];
const options = {
  method: 'POST',
  hostname: 'tinypng.com',
  path: '/web/shrink',
  headers: {
    rejectUnauthorized: false,
    'Postman-Token': Date.now(),
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
  }
};

// 图片资源路径
const assetsPath = path.resolve(__dirname);

// 记录存在图片的路径 map 对象
const hasImgPathMap = new Map();

function mapDir(dir) {
  const files = fs.readdirSync(dir);
  for (let index = 0; index < files.length; index++) {
    const dirname = dir;
    let pathname = path.join(dir, files[index]);
    const stats = fs.statSync(pathname);
    if (stats.isDirectory()) {
      mapDir(pathname);
    } else if (stats.isFile()) {
      if (exts.includes(path.extname(pathname))) {
        if (
          !hasImgPathMap.has(dirname) &&
          excludes.every(excludePath => {
            return !~dirname.indexOf(excludePath);
          })
        ) {
          hasImgPathMap.set(dirname, dirname);
        }
      }
    }
  }
  return hasImgPathMap;
}

async function beginWork() {
  mapDir(assetsPath);
  console.log(mapDir(assetsPath).values());
  // 简单处理限制并发
  for (let [path, value] of hasImgPathMap) {
    await new Promise(resolve => {
      compressImg(path);
      setTimeout(resolve, 10000);
    });
  }
}

// cp -r test/ test2

function compressImg(root) {
  fileList(root);

  // 生成随机IP， 赋值给 X-Forwarded-For
  function getRandomIP() {
    return Array.from(Array(4))
      .map(() => parseInt(Math.random() * 255))
      .join('.');
  }

  // 获取文件列表
  function fileList(folder) {
    fs.readdir(folder, (err, files) => {
      if (err) console.error(err);
      files.forEach(file => {
        fileFilter(path.join(folder, file));
      });
    });
  }

  // 过滤文件格式，返回所有jpg,png图片
  function fileFilter(file) {
    fs.stat(file, (err, stats) => {
      if (err) return console.error(err);
      if (
        // 必须是文件，小于5MB，后缀 jpg||png
        stats.size <= max &&
        stats.isFile() &&
        exts.includes(path.extname(file))
      ) {
        // 通过 X-Forwarded-For 头部伪造客户端IP
        options.headers['X-Forwarded-For'] = getRandomIP();

        fileUpload(file); // console.log('可以压缩：' + file);
      }
      // if (stats.isDirectory()) fileList(file + '/');
    });
  }

  // 异步API,压缩图片
  // {"error":"Bad request","message":"Request is invalid"}
  // {"input": { "size": 887, "type": "image/png" },"output": { "size": 785, "type": "image/png", "width": 81, "height": 81, "ratio": 0.885, "url": "https://tinypng.com/web/output/7aztz90nq5p9545zch8gjzqg5ubdatd6" }}
  function fileUpload(img) {
    var req = https.request(options, function(res) {
      res.on('data', buf => {
        let obj = JSON.parse(buf.toString());
        if (obj.error) {
          console.log(`[${img}]：压缩失败！报错：${obj.message}`);
        } else {
          fileUpdate(img, obj);
        }
      });
    });

    req.write(fs.readFileSync(img), 'binary');
    req.on('error', e => {
      console.error(e);
    });
    req.end();
  }
  // 该方法被循环调用,请求图片数据
  function fileUpdate(imgpath, obj) {
    const outputDir = path.join(root, '');
    imgpath = path.join(root, '', imgpath.replace(root, ''));

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    let options = new URL(obj.output.url);
    let req = https.request(options, res => {
      let body = '';
      res.setEncoding('binary');
      res.on('data', function(data) {
        body += data;
      });

      res.on('end', function() {
        fs.writeFile(imgpath, body, 'binary', err => {
          if (err) return console.error(err);
          console.log(
            `[${imgpath}] \n 压缩成功，压缩前大小: ${obj.input.size}，压缩后大小: ${obj.output.size}，优化比例: ${obj.output.ratio}`
          );
        });
      });
    });
    req.on('error', e => {
      console.error(e);
    });
    req.end();
  }
}
beginWork();
