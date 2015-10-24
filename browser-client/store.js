import { createStore } from 'redux';
import ramApp from './reducers';

let store = createStore(ramApp);

import { addItem, completeItem, selectNext, selectPrev } from './actions';

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
  console.log('State', store.getState())
);

// Dispatch some actions
store.dispatch(addItem('Learn about actions'));
store.dispatch(addItem('Learn about reducers'));
store.dispatch(addItem('Learn about store'));
//store.dispatch(completeItem(0));
//store.dispatch(completeItem(1));
store.dispatch(selectNext());
//store.dispatch(selectNext());
//store.dispatch(selectNext());
//store.dispatch(selectNext());

// Stop listening to state updates
unsubscribe();

export default store;
