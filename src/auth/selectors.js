import { createSelector } from 'reselect';

export const selectState = state => state.auth;
export const selectAccessToken = createSelector(selectState, state => state.accessToken);
