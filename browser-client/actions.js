/*
 * action types
 */

export const ADD_ITEM = 'ADD_ITEM';
export const COMPLETE_ITEM = 'COMPLETE_ITEM';
export const SELECT_NEXT = 'SELECT_NEXT';
export const SELECT_PREV = 'SELECT_PREV';


export function addItem(text) {
  return { type: ADD_ITEM, text };
}

export function completeItem(index) {
  return { type: COMPLETE_ITEM, index };
}

export function selectNext() {
return { type: SELECT_NEXT };
}

export function selectPrev() {
  return { type: SELECT_PREV };
}
