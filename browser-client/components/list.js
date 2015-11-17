import React, { Component, DOM } from 'react';
import { connect } from 'react-redux';
import { selectNext, selectPrev, addNewItem, completeItem, startEditingItem, endEditingItem } from '../actions';
const ListItemInput = React.createFactory(require('./list-item-input'))

class List extends Component {
  componentDidMount() {
    var dispatch = this.props.dispatch;
    window.addEventListener('keydown', (e) => {
        console.log(e)
        if (e.keyIdentifier == 'Down') { dispatch(selectNext())};
        if (e.keyIdentifier == 'Up') { dispatch(selectPrev())};
        if (e.keyIdentifier == 'Enter') {
            dispatch(addNewItem())
            dispatch(startEditingItem())
        };
        if (e.keyIdentifier == 'F2') { dispatch(startEditingItem())};
        if (e.keyCode == 32) { dispatch(completeItem())};
    })
  }
  onSave (text) {
      var dispatch = this.props.dispatch;
      console.log('onSave', text);
      dispatch(endEditingItem(text))
  }
  onChange (e) {
    console.log(e)
  }
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

    return DOM.ul(null, items.map(
        (item, index) => {
            let className = '';
            if (index == this.props.selectedIndex) className += ' selected';
            if (item.completed) className += ' completed';
            if (item.editing) {
                return DOM.li({
                    key: item.id,
                    className: className,
                },
                '- ',
                ListItemInput({ text: item.text, onSave: this.onSave.bind(this) })
                //return DOM.input({
                //    type: 'text',
                //    autoFocus: 'true',
                //    value: item.text,
                //    onChange: this.onChange
                //})
            )
            }
            else return DOM.li({
                key: item.id,
                className: className,
                style: { paddingLeft: (item.level + 1) * 20 }
            }, '- ' + item.text)
        }
    ));
  }
}

function select(state) {
  return {
    items: state.app.items,
    selectedIndex: state.app.selectedIndex
  };
}

export default connect(select)(List);
