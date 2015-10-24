//TODO: finish the app from http://rackt.org/redux/docs/basics/ExampleTodoList.html

import * as store  from './store.js';

import { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

const Provider = React.createFactory(require('react-redux').Provider);
const List = React.createFactory(require('./components/list'));

const appNode = document.querySelector('#app');

class App extends Component {
  render() {
    return React.DOM.div({},
        React.DOM.h1({}, 'RAM'),
        Provider({ store: store },
            List()
        )
    )
  }
}



ReactDOM.render(React.createFactory(App)(), appNode);
