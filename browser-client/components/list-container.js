import { Component } from 'react';
import { connect } from 'react-redux';

import List from '../components/list';
//import { increment } from '../actionsCreators';

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    value: state.counter
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(increment())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
