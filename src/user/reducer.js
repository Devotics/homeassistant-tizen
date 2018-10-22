import { createReducer } from '../createReducer';
import { RESULT_AUTH_CURRENT_USER_SUCCESS } from './types';

export const reducer = createReducer(null)({
  [RESULT_AUTH_CURRENT_USER_SUCCESS]: (_, action) => action.payload.result,
});
