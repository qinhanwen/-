// const { createStore, combineReducers, applyMiddleware } = require('redux');
const {
  createStore,
  combineReducers,
  applyMiddleware
} = require('../my-redux');

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
}

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const reducers = combineReducers({
  todos,
  counter
});

function logger3({ getState }) {
  return next => action => {
    const returnValue = next(action);

    console.log('3333333', getState());
    return returnValue;
  };
}

function logger2({ getState }) {
  return next => action => {
    const returnValue = next(action);

    console.log('222222222', getState());
    return returnValue;
  };
}

function logger1({ getState }) {
  return next => action => {
    const returnValue = next(action);

    console.log('1111111111', getState());
    return returnValue;
  };
}

const store = createStore(
  reducers,
  ['Use Redux'],
  applyMiddleware(logger1, logger2, logger3)
);
store.subscribe(() => {
  console.log('subsribe');
});
debugger;
store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
});
