import { createSelector } from 'reselect';

const isVisible = entity => !entity.attributes.hidden;
export const selectState = state => state.entities;
export const selectEntities = createSelector(selectState, entities => Object.values(entities));
// eslint-disable-next-line max-len
export const selectVisibleEntities = createSelector(selectEntities, entities => entities.filter(isVisible));
