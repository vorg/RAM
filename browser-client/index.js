//TODO: finish the app from http://rackt.org/redux/docs/basics/ExampleTodoList.html

import * as store  from './store.js';

import { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { setLayout } from './actions';

const Provider = React.createFactory(require('react-redux').Provider);
const List = React.createFactory(require('./components/list'));
const Header = React.createFactory(require('./components/header'));
const Container = React.createFactory(require('./components/container'));

const appNode = document.querySelector('#app');

class App extends Component {
  render() {
    var dispatch = store.disptach;
    return React.DOM.div({},
        Provider({ store: store },
            React.DOM.div(null,
                Header(),
                Container()
            )
        )
    )
  }
}

ReactDOM.render(React.createFactory(App)(), appNode);
