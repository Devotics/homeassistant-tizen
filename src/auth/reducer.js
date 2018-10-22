import { createReducer } from '../createReducer';
import { AUTHENTICATION_SUCCESS } from './types';

export const reducer = createReducer(null)({
  [AUTHENTICATION_SUCCESS]: (_, action) => action.payload,
});
