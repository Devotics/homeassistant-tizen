import { createReducer } from '../createReducer';
import {
  EVENT_STATE_CHANGED,
  RESULT_GET_STATES_SUCCESS,
  RESULT_MEDIA_PLAYER_THUMBNAIL_SUCCESS,
} from './types';

export const reducer = createReducer({
  entities: {},
  thumbnails: {},
})({
  [RESULT_GET_STATES_SUCCESS]: (state, action) => ({
    ...state,
    entities: action.payload.result.reduce(
      (entities, entity) => ({
        ...entities,
        [entity.entity_id]: entity,
      }),
      {},
    ),
  }),
  [EVENT_STATE_CHANGED]: (state, action) => ({
    ...state,
    entities: {
      ...state.entities,
      [action.payload.entity_id]: action.payload.new_state,
    },
  }),
  [RESULT_MEDIA_PLAYER_THUMBNAIL_SUCCESS]: (state, action) => ({
    ...state,
    thumbnails: {
      ...state.thumbnails,
      [action.payload.entity_id]: action.payload.result,
    },
  }),
});
