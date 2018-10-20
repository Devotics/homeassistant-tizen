import { createReducer } from '../utils/createReducer';
import { EVENT_STATE_CHANGED, RESULT_GET_STATES_SUCCESS } from './types';

export const reducer = createReducer({})({
  [RESULT_GET_STATES_SUCCESS]: (state, action) => action.payload.reduce(
    (entities, entity) => ({
      ...entities,
      [entity.entity_id]: entity,
    }),
    {},
  ),
  [EVENT_STATE_CHANGED]: (state, action) => ({
    ...state.entities,
    [action.entity_id]: action.new_state,
  }),
});