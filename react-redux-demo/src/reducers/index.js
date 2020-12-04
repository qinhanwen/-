import { combineReducers } from '../my-redux';
// import { combineReducers } from 'redux';

const todos = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

export default combineReducers({
  todos
});
