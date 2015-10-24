import { Component, DOM } from 'react';
import { connect } from 'react-redux';
import { selectNext, selectPrev, addNewItem, completeItem } from '../actions';

class List extends Component {
  componentDidMount() {
    var dispatch = this.props.dispatch;
    window.addEventListener('keydown', (e) => {
        if (e.keyIdentifier == 'Down') { dispatch(selectNext())};
        if (e.keyIdentifier == 'Up') { dispatch(selectPrev())};
        if (e.keyIdentifier == 'Enter') { dispatch(addNewItem())};
        if (e.keyCode == 32) { dispatch(completeItem())};
    })
  }
  render() {
    return DOM.ul(null, this.props.items.map(
        (item, index) => {
            let className = '';
            if (index == this.props.selectedIndex) className += ' selected';
            if (item.completed) className += ' completed';
            return DOM.li({
                key: item.id,
                className: className
            }, item.id + ' : ' + item.text)
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
