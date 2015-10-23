import { combineReducers } from 'redux';
import { ADD_ITEM, COMPLETE_ITEM, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

function items(state = [], action) {
  switch (action.type) {
  case ADD_ITEM:
    return [...state, {
      id: ''+Date.now(),
      text: action.text,
      completed: false
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
  visibilityFilter,
  items
});

export default ramApp;
