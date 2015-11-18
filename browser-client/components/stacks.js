import React, { Component, DOM } from 'react';
import { connect } from 'react-redux';
import { selectNext, selectPrev, addNewItem, completeItem, startEditingItem, endEditingItem } from '../actions';
const ListItemInput = React.createFactory(require('./list-item-input'))

class Stacks extends Component {
  render() {
    return DOM.div({className: 'stacks', style: { width: 315 * this.props.items.length}},
        this.props.items.map(function(item) {
            var items = [
                DOM.li({
                    className: 'header',
                    key: item.id
                }, item.text)
            ];

            if (item.children) {
                items = items.concat(item.children.map(function(item) {
                    return DOM.li({
                        key: item.id
                    }, item.text)
                }));
            }
            return DOM.ul({ className: 'list', style: { height: window.innerHeight - 200} }, items);
        })
    );
  }
}

function select(state) {
  return {
    items: state.app.items,
    selectedIndex: state.app.selectedIndex
  };
}

export default connect(select)(Stacks);
