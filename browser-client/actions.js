/*
 * action types
 */

export const ADD_ITEM = 'ADD_ITEM';
export const COMPLETE_ITEM = 'COMPLETE_ITEM';
export const SELECT_NEXT = 'SELECT_NEXT';
export const SELECT_PREV = 'SELECT_PREV';
export const ADD_NEW_ITEM = 'ADD_NEW_ITEM';
export const START_EDITING_ITEM = 'START_EDITING_ITEM';
export const END_EDITING_ITEM = 'END_EDITING_ITEM';

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

export function addNewItem() {
    return { type: ADD_NEW_ITEM };
}

export function startEditingItem() {
    return { type: START_EDITING_ITEM };
}

export function endEditingItem(text) {
    return { type: END_EDITING_ITEM, text: text };
}
