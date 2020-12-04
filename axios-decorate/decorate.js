module.exports = function CancelRequest(url) {
  return function(target, key, descriptor) {
    var originMethod = descriptor.value;
    descriptor.value = function(...args) {
      const index = global.__axiosPromiseArr.findIndex(ele => {
        return ele && ele.url === url;
      });
      if (~index) {
        global.__axiosPromiseArr[index].cancel('主动取消请求');
        delete global.__axiosPromiseArr[index];
      }
      var result = originMethod.apply(this, args);
      return result;
    };
    return descriptor;
  };
};
