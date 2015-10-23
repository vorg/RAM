import { createStore } from 'redux';
import ramApp from './reducers';

let store = createStore(ramApp);

import { addItem, completeItem, setVisibilityFilter, VisibilityFilters } from './actions';

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// Dispatch some actions
store.dispatch(addItem('Learn about actions'));
store.dispatch(addItem('Learn about reducers'));
store.dispatch(addItem('Learn about store'));
store.dispatch(completeItem(0));
store.dispatch(completeItem(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// Stop listening to state updates
unsubscribe();
