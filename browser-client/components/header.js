import React, { Component, DOM } from 'react';
import { connect } from 'react-redux';
import { setLayout, replaceItems } from '../actions';


class Header extends Component {
    onLayoutClick(layout, maxLevel) {
        var dispatch = this.props.dispatch;
        dispatch(setLayout(layout, maxLevel));
        dispatch(replaceItems(this.props.all)); //FIXME: re-render
    }
    render() {
        return React.DOM.h1({ className: 'header'},
            React.DOM.span({ className: 'title'}, 'RAM'),
            React.DOM.ul({ className: 'button-list' },
                React.DOM.li({}, React.DOM.a({ onClick: this.onLayoutClick.bind(this, 'stacks', 1)}, 'Stacks')),
                React.DOM.li({}, React.DOM.a({ onClick: this.onLayoutClick.bind(this, 'stream', 2)}, 'Stream')),
                React.DOM.li({}, React.DOM.a({ onClick: this.onLayoutClick.bind(this, 'list', 2)}, 'L3')),
                React.DOM.li({}, React.DOM.a({ onClick: this.onLayoutClick.bind(this, 'list', 1)}, 'L2')),
                React.DOM.li({}, React.DOM.a({ onClick: this.onLayoutClick.bind(this, 'list', 0)}, 'L1'))

            )
        )
    }
}

function select(state) {
  return {
    all: state.app.all
  }
}

export default connect(select)(Header);
