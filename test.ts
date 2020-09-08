function test(key) {
  const cbId = 'pp' + key + 'pp';

  window[cbId] = function() {};
}
