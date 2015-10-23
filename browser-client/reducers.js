import { combineReducers } from 'redux';
import { ADD_ITEM, COMPLETE_ITEM, SELECT_NEXT, SELECT_PREV } from './actions';

var nextId = 0;

function items(state = [], action) {
  switch (action.type) {
  case SELECT_PREV:
      var index = state.reduce((selectedIndex, item, itemIndex) => { return item.selected ? itemIndex : selectedIndex }, -1);
      if (index > 0) {
          return [
              ...state.slice(0, index-1),
              Object.assign({}, state[index-1], {
                  selected: true
              }),
              Object.assign({}, state[index], {
                  selected: false
              }),
              ...state.slice(index + 1)
          ];
      }
      return state;
  case SELECT_NEXT:
    var index = state.reduce((selectedIndex, item, itemIndex) => { return item.selected ? itemIndex : selectedIndex }, -1);
    if (index == -1) {
        return [
            Object.assign({}, state[0], {
                selected: true
            }),
            ...state.slice(1)
        ];
    }
    else if (index < state.length-1) {
        return [
            ...state.slice(0, index),
            Object.assign({}, state[index], {
                selected: false
            }),
            Object.assign({}, state[index+1], {
                selected: true
            }),
            ...state.slice(index + 2)
        ];
    }
    return state;
  case ADD_ITEM:
    return [...state, {
      id: '' + Date.now() + '' + nextId++,
      text: action.text,
      completed: false,
      selected: false
    }];
  case COMPLETE_ITEM:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

const ramApp = combineReducers({
  items
});

export default ramApp;
