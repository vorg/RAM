import React, { Component, DOM } from 'react';
import { connect } from 'react-redux';
import { setLayout, replaceItems } from '../actions';

import List from './list';
import Stacks from './stacks';
import Stream from './stream';

class Container extends Component {
    render() {
        if (this.props.layout == 'list') return React.createElement(List);
        if (this.props.layout == 'stacks') return React.createElement(Stacks);
        if (this.props.layout == 'stream') return React.createElement(Stream);
        return null;
    }
}

function select(state) {
  return {
    layout: state.app.layout
  }
}

export default connect(select)(Container);
