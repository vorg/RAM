//TODO: finish the app from http://rackt.org/redux/docs/basics/ExampleTodoList.html

import * as store  from './store.js';

import { Component } from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

const ListContainer = React.createFactory(require('./components/list-container'));
const List = React.createFactory(require('./components/list'));

const appNode = document.querySelector('#app');

class App extends Component {
  render() {
    return React.DOM.div({}, 'Hello World 2', List({ items: [{text:'bla', id:'dsfs'}]}));
  }
}



ReactDOM.render(React.createFactory(App)(), appNode);
