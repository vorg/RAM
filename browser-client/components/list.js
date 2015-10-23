import { Component, DOM } from 'react';

export default class List extends Component {
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
