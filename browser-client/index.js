//TODO: finish the app from http://rackt.org/redux/docs/basics/ExampleTodoList.html

import * as store  from './store.js';

import { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

const Provider = React.createFactory(require('react-redux').Provider);
const ListContainer = React.createFactory(require('./components/list-container'));

const appNode = document.querySelector('#app');

class App extends Component {
  render() {
    return React.DOM.div({},
        'Hello World 2',
        Provider({ store: store },
            ListContainer({ items: [{text:'bla', id:'dsfs'}]})
        )
    )
  }
}



ReactDOM.render(React.createFactory(App)(), appNode);
