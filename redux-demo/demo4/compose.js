function compose(middlewares) {
  let i = 0;
  function dispatch() {
    if (i >= middlewares.length) return;
    middlewares[i++](dispatch);
  }
  dispatch();
}

module.exports = compose;
