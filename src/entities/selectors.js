import { createSelector } from 'reselect';

const isVisible = entity => !entity.attributes.hidden;
const isType = type => (entity) => {
  const [entityType] = entity.entity_id.split('.');
  return entityType === type;
};

export const selectState = state => state.entities;

export const selectEntities = createSelector(selectState, (entities) => {
  const entityList = Object.values(entities);
  entityList.sort((a, b) => a.entity_id.localeCompare(b.entity_id));
  return entityList;
});

export const selectVisibleEntities = createSelector(selectEntities, (entities) => {
  const visibleEntities = entities.filter(isVisible);
  return visibleEntities;
});

export const selectEntitiesOfType = type => createSelector(selectVisibleEntities, (entities) => {
  const entitiesOfType = entities.filter(isType(type));
  return entitiesOfType;
});

export const selectLights = selectEntitiesOfType('light');
export const selectSensors = selectEntitiesOfType('sensor');
export const selectMediaPlayers = selectEntitiesOfType('media_player');
