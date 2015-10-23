import { Component, DOM } from 'react';

export default class List extends Component {
  render() {
    return DOM.ul(null, this.props.items.map(
        (item) => DOM.li({ key: item.id }, item.text)
    ));
  }
}
