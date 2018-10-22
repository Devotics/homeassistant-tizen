import { createSelector } from 'reselect';

export const selectState = state => state.user;
export const selectUsername = createSelector(selectState, state => (state ? state.name : null));
