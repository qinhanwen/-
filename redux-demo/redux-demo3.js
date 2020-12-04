// const { createStore, combineReducers, applyMiddleware } = require('redux');

const {
  createStore,
  combineReducers,
  applyMiddleware
} = require('../my-redux');
const createThunkMiddleware = require('./createThunkMiddleware');
const axios = require('axios');

const REQUEST_POSTS = 'REQUEST_POSTS';
const RECEIVE_POSTS = 'RECEIVE_POSTS';
// action 函数
function requestPosts(isFetching) {
  return {
    type: REQUEST_POSTS,
    isFetching
  };
}

function receivePosts(isFetching, data) {
  return {
    type: RECEIVE_POSTS,
    isFetching,
    data
  };
}

function getList() {
  return dispatch => {
    dispatch(requestPosts(true));
    return axios.get(`http://localhost:3002/list`).then(response => {
      // console.log(response);
    });
    // .then(json => dispatch(receivePosts(false, json)))
  };
}

// reducer 函数
function posts(
  state = {
    isFetching: false,
    data: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return { ...state, data: action.data, isFetching: action.isFetching };

    case RECEIVE_POSTS:
      return { ...state, isFetching: action.isFetching };

    default:
      return state;
  }
}

const reducers = combineReducers({ posts });

const store = createStore(
  reducers,
  ['Use Redux'],
  applyMiddleware(createThunkMiddleware)
);

debugger;
store.dispatch(getList()).then(() => {
  console.log(222);
});
