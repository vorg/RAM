import { Component, DOM } from 'react';
import { connect } from 'react-redux';
import { selectNext, selectPrev } from '../actions';

class List extends Component {
  componentDidMount() {
    var dispatch = this.props.dispatch;
    window.addEventListener('keydown', (e) => {
        if (e.keyIdentifier == 'Down') { dispatch(selectNext())};
        if (e.keyIdentifier == 'Up') { dispatch(selectPrev())};
    })
  }
  render() {
    return DOM.ul(null, this.props.items.map(
        (item) => {
            return DOM.li({
                key: item.id,
                className: item.selected ? 'selected' : ''
            }, item.id + ' : ' + item.text)
        }
    ));
  }
}

function select(state) {
  return {
    items: state.items
  };
}

export default connect(select)(List);
