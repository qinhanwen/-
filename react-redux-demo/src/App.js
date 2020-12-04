import './App.css';
import { connect } from './react-redux/index';
import React from 'react';

function App(props) {
  console.log(props);
  return (
    <div>
      <div>{props.number}</div>
      <button onClick={props.onIncrement}>Increment</button>
      <button onClick={props.onDecrement}>Decrement</button>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  number: state.todos
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onIncrement: () => {
    debugger;
    dispatch({ type: 'INCREMENT' });
  },
  onDecrement: () => dispatch({ type: 'DECREMENT' })
});
debugger;

export default connect(mapStateToProps, mapDispatchToProps)(App);
