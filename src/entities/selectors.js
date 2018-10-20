import { createSelector } from 'reselect';

const isVisible = entity => !entity.attributes.hidden;
export const selectState = state => state.entities;
// eslint-disable-next-line max-len
export const selectEntities = createSelector(selectState, entities => Object.values(entities).sort((a, b) => a.entity_id.localeCompare(b.entity_id)));
// eslint-disable-next-line max-len
export const selectVisibleEntities = createSelector(selectEntities, entities => entities.filter(isVisible));
