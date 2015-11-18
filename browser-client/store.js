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
//loadTextBrowser('data/workflowy/2014-10-01.json', function(err, dataStr) {
loadTextBrowser('temp/tmp.json', function(err, dataStr) {
    var data = JSON.parse(dataStr);

    function gatherChildren(pid, children, list) {
        return children.reduce(function(list, item) {
            if (item.id == 'bda94c64-2bf1-0a31-c9d0-fd31aee03a7c') console.log('item',item);
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

    console.log('item', items.filter(function(item) {
        return item.pid == 'bda94c64-2bf1-0a31-c9d0-fd31aee03a7c';
    }))

    console.log('workflowy.items', items.length);

    store.dispatch(replaceItems(items));
})
