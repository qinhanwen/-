// [fn, fn1, fn2];

function compose(...funcs) {
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
  // a = fn  b = fn1  (...args1) => { return fn(fn1(...args1)) }

  // a = (...args1) => { return fn(fn1(...args1)) } b = fn2

  //  (...args2) => {
  //     return ((...args1) => {
  //       return fn(fn1(...args1))
  //     })(fn2(...args2))
  //  }
}

module.exports = compose;
