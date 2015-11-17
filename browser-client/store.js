import { createStore } from 'redux';
import ramApp from './reducers';

let store = createStore(ramApp);

import { addItem, completeItem, selectNext, selectPrev, startEditingItem, replaceItems } from './actions';

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
//store.dispatch(selectNext());
//store.dispatch(startEditingItem());
//store.dispatch(selectNext());
//store.dispatch(selectNext());
//store.dispatch(selectNext());

// Stop listening to state updates
unsubscribe();

export default store;


function loadTextBrowser(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onreadystatechange = function (e) {
    if (request.readyState == 4) {
      if (request.status == 200) {
        if (callback) {
          callback(null, request.responseText);
        }
      }
      else {
        callback('WebIO.loadTextFile error : ' + request.statusText, null);
      }
    }
  };
  request.send(null);
}

console.log('loadTextBrowser')
loadTextBrowser('data/workflowy/2014-10-01.json', function(err, dataStr) {
    var data = JSON.parse(dataStr);

    function gatherChildren(pid, children, list) {
        return children.reduce(function(list, item) {
            list.push({
                id: item.id,
                pid: pid,
                text: item.nm
            });
            if (item.ch) {
                gatherChildren(item.id, item.ch, list);
            }
            return list;
        }, list);
    }

    var items = gatherChildren(null, data, []);

    console.log('workflowy.items', items.length);

    store.dispatch(replaceItems(items));
})
