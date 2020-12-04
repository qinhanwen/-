// node_modules/.bin/babel-node axios-decorate/test1.js
// node_modules/.bin/babel axios-decorate/test1.js --out-file test1.js
global.__axiosPromiseArr = [];

let index = 1;
const axios = require('axios');
const CancelRequest = require('./decorate');
const url = 'http://localhost:3000/list';

const react = {
  Component: class {}
};

axios.interceptors.request.use(
  config => {
    debugger;
    config.cancelToken = new axios.CancelToken(cancel => {
      global.__axiosPromiseArr.push({
        url: config.url,
        cancel
      });
    });
    return config;
  },
  error => {
    return Promise.reject();
  }
);

axios.interceptors.response.use(
  response => {
    const index = global.__axiosPromiseArr.findIndex(ele => {
      return ele && ele.url === response.config.url;
    });
    if (~index) {
      delete global.__axiosPromiseArr[index];
    }
    return response;
  },
  error => {
    return Promise.reject();
  }
);
class Test extends react.Component {
  constructor() {
    super();
    this.state = {
      activedKey: 0,
      index: 0
    };
  }

  // 方式一，手动删除
  /**
   * 获取数据
   */
  // getData() {
  //   if (global.__axiosPromiseArr) {
  //     global.__axiosPromiseArr.forEach((ele, index) => {
  //       ele.cancel();
  //       delete global.__axiosPromiseArr[index];
  //     });
  //   }
  //   // 更新数据tab

  // }

  // 方式二，使用拦截器
  /**
   * 获取数据
   */
  @CancelRequest(url)
  getData() {
    return axios.get(url);
  }

  /**
   * tab 切换事件
   * @param {*} activedKey
   */
  tabChangeHandle(activedKey) {
    const date = Date.now();
    const i = index++;
    console.log(`第${i}次发送请求`);
    this.getData()
      .then(() => {
        console.log(
          `第${i}次发送的请求成功，更新 列表 的数据，${Date.now() - date} ms`
        );
      })
      .catch(function(e) {
        console.log(
          `第${i}次发送的请求被取消或发生异常，${Date.now() - date} ms`
        );
      });
  }
}

// 模拟用户操作
const test = new Test();
test.tabChangeHandle();

setTimeout(() => {
  test.tabChangeHandle();
}, 3000);
