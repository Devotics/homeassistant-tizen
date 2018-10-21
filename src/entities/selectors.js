import { createSelector } from 'reselect';

const isVisible = entity => !entity.attributes.hidden;
const isType = type => (entity) => {
  const [entityType] = entity.entity_id.split('.');
  return entityType === type;
};

export const selectState = state => state.entities;

export const selectEntities = createSelector(selectState, state => state.entities);

export const selectEntityList = createSelector(selectEntities, (entities) => {
  const entityList = Object.values(entities).filter(Boolean);
  entityList.sort((a, b) => a.entity_id.localeCompare(b.entity_id));
  return entityList;
});

export const selectVisibleEntities = createSelector(selectEntityList, (entities) => {
  const visibleEntities = entities.filter(isVisible);
  return visibleEntities;
});

export const selectEntitiesOfType = type => createSelector(selectVisibleEntities, (entities) => {
  const entitiesOfType = entities.filter(isType(type));
  return entitiesOfType;
});

export const selectLights = selectEntitiesOfType('light');
export const selectMediaPlayers = selectEntitiesOfType('media_player');

export const selectThumbnails = createSelector(selectState, state => state.thumbnails);
export const selectThumbnailById = id => createSelector(selectThumbnails, (thumbnails) => {
  const thumbnail = thumbnails[id];
  return thumbnail;
});
// eslint-disable-next-line max-len
export const selectThumbnailContentById = id => createSelector(selectThumbnailById(id), (thumbnail) => {
  if (!thumbnail) {
    return null;
  }
  return `url(data:${thumbnail.content_type};base64,${thumbnail.content})`;
});
