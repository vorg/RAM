import { combineReducers } from 'redux';
import { ADD_ITEM, ADD_NEW_ITEM, COMPLETE_ITEM, SELECT_NEXT, SELECT_PREV } from './actions';

var nextId = 0;

var initialState = {
    selectedIndex: 0,
    items: []
}

function app(state = initialState, action) {
    let index = state.selectedIndex;
    console.log(action, index);
  switch (action.type) {
  case SELECT_PREV:
      if (index > 0) {
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
    else if (index < state.items.length-1) {
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
        if (index != -1) {
            return Object.assign({}, state, {
                items: [
                  ...state.items.slice(0, index),
                  Object.assign({}, state[index], {
                    completed: !state[index].completed
                  }),
                  ...state.items.slice(index + 1)
                ]
            });
        }
        return state;
  default:
    return state;
  }
}

const ramApp = combineReducers({
  app
});

export default ramApp;
