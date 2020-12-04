const compose = require('./compose');

function applyMiddleware(...middlewares) {
  // middlewares = [logger1, logger2, logger] arraylike

  return createStore => (reducer, preloadedState) => {
    // reducer function combination(state, action){...}
    // preloadedState ["..."]

    const store = createStore(reducer, preloadedState);
    let dispatch;

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    // chain = [

    // next => action => {
    //     const returnValue = next(action);
    //     console.log('1111111111', getState());
    //     return returnValue;
    // },

    // next => action => {
    //    const returnValue = next(action);
    //    console.log('2222222', getState());
    //    return returnValue;
    // },

    // next => action => {
    //   const returnValue = next(action);
    //   console.log('333333', getState());
    //   return returnValue;
    // }

    // ]

    dispatch = compose(...chain)(store.dispatch);

    // 得到的 dispatch
    // dispatch = action => {
    //   const returnValue = (action => {
    //     const returnValue = (action => {
    //       const returnValue = store.dispatch(action);
    //       console.log('333333', getState());
    //       return returnValue;
    //     })(action);

    //     console.log('2222222', getState());
    //     return returnValue;
    //   })(action);

    //   console.log('1111111111', getState());
    //   return returnValue;
    // };

    return {
      ...store,
      dispatch
    };
  };
}

module.exports = applyMiddleware;
