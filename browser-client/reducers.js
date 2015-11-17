import { combineReducers } from 'redux';
import { ADD_ITEM, ADD_NEW_ITEM, COMPLETE_ITEM, SELECT_NEXT, SELECT_PREV, START_EDITING_ITEM, END_EDITING_ITEM, REPLACE_ITEMS } from './actions';

var R = require('ramda');

var nextId = 0;

var initialState = {
    selectedIndex: 0,
    pid: null,
    maxLevel: 1,
    items: []
}

function app(state = initialState, action) {
    let index = state.selectedIndex;
    console.log(action, index);
    switch (action.type) {

        case SELECT_PREV:
            if (index > 0 && !state.items[index].editing) {
                return Object.assign({}, state, {
                    selectedIndex: index - 1
                });
            }
            return state;

        case SELECT_NEXT:
            if (index == -1) {
                return Object.assign({}, state, {
                    selectedIndex: 0
                });
            }
            else if (index < state.items.length-1 && !state.items[index].editing) {
                return Object.assign({}, state, {
                    selectedIndex: index + 1
                });
            }
            return state;

        case ADD_ITEM:
            return Object.assign({}, state, {
                items: [
                    ...state.items, {
                    id: '' + Date.now() + '' + nextId++,
                    text: action.text,
                    completed: false
                    }
                    ]
                });

        case ADD_NEW_ITEM:
            if (state.items[index].editing) {
                return state;
            }
            if (index != -1) {
                return Object.assign({}, state, {
                    selectedIndex: index + 1,
                    items: [
                        ...state.items.slice(0, index+1),
                        {
                        id: '' + Date.now() + '' + nextId++,
                        text: 'New Item'
                        },
                    ...state.items.slice(index+1)
                    ]
                })
            }
            else return state;

        case COMPLETE_ITEM:
            if (index != -1 && !state.items[index].editing) {
                return Object.assign({}, state, {
                    items: [
                        ...state.items.slice(0, index),
                        Object.assign({}, state.items[index], {
                        completed: !state.items[index].completed
                        }),
                        ...state.items.slice(index + 1)
                    ]
                });
            }
            return state;

        case START_EDITING_ITEM:
            if (index != -1) {
                return Object.assign({}, state, {
                    items: [
                        ...state.items.slice(0, index),
                        Object.assign({}, state.items[index], {
                        editing: true
                        }),
                        ...state.items.slice(index + 1)
                    ]
                });
            }
            return state;

        case END_EDITING_ITEM:
            if (index != -1) {
                return Object.assign({}, state, {
                    items: [
                        ...state.items.slice(0, index),
                        Object.assign({}, state.items[index], {
                        text: action.text,
                        editing: false
                        }),
                        ...state.items.slice(index + 1)
                    ]
                });
            }
            return state;

        case REPLACE_ITEMS:
            var all = action.items;
            //var items = all.filter(function(item) {
            //    return item.pid == state.pid;
            //});

            var root = { text: 'Root ' + state.pid, id: state.pid, level: -1 };
            var parentsQueue = [ root ]
            var items = [];

            function fetchChildren(pid) {
                return R.filter(R.propEq('pid', pid), all)
            }

            function checkParentQueue() {
                if (parentsQueue.length > 0) {
                    var currentParent = parentsQueue.shift();
                    if (currentParent.level < state.maxLevel) {
                        var children = fetchChildren(currentParent.id);
                        children.forEach(function(item) {
                            item.level = currentParent.level + 1;
                        })
                        currentParent.children = children;
                        parentsQueue = parentsQueue.concat(children);
                    }
                    checkParentQueue();
                }
            }

            checkParentQueue();

            console.log('root.children', root.children)


            return Object.assign({}, state, {
                all: all,
                items: root.children
            });

        default:
            return state;
    }
}

const ramApp = combineReducers({
  app
});

export default ramApp;
