// const { createStore, combineReducers } = require('redux');
const { createStore, combineReducers } = require('../my-redux');

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

const store = createStore(reducers, ['Use Redux']);

store.subscribe(() => {
  console.log('subsribe');
});

store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
});
