import React, { Component, DOM } from 'react';
import { connect } from 'react-redux';
import { selectNext, selectPrev, addNewItem, completeItem, startEditingItem, endEditingItem } from '../actions';
const ListItemInput = React.createFactory(require('./list-item-input'))

class Stream extends Component {
gatherItems (children, list) {
    return children.reduce(function(list, item) {
        list.push(item);
        if (item.children) {
            this.gatherItems(item.children, list);
        }
        return list;
    }.bind(this), list);
}
render() {

    var items = this.gatherItems(this.props.items, [])

    var numColumns = 5;
    var columns = [];
    items.forEach(function(item, idx) {
        var columnIdx = idx % numColumns;
        if (!columns[columnIdx]) columns[columnIdx] = [];
        columns[columnIdx].push(item);
    })

    return DOM.div({className: 'stream'},
        columns.map(function(items) {
            return DOM.ul({ className: 'list' }, items.map(function(item) {
                return DOM.li({
                    key: item.id
                }, item.text)
            }));
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

export default connect(select)(Stream);
