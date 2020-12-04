const ActionTypes = {
  INIT: `@@redux/INIT`
};

function createStore(reducer, preloadedState, enhancer) {
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState); // 如果 enhancer 满足条件，后面就不执行了
  }

  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];
  let nextListeners = currentListeners;
  let isDispatching = false;

  /**
   * 获取当前 state
   */
  function getState() {
    return currentState;
  }

  /**
   * 监听变化事件
   * @param {*} listener
   */
  function subscribe(listener) {
    nextListeners.push(listener);

    return function unsubscribe() {
      const index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }

  /**
   * 发送事件
   * @param {*} action
   */
  function dispatch(action) {
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = (currentListeners = nextListeners);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  }

  dispatch({ type: ActionTypes.INIT });

  return {
    subscribe,
    dispatch,
    getState
  };
}

module.exports = createStore;
