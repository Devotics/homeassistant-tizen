import { createReducer } from '../createReducer';
import { COMMAND_REQUEST } from './types';

export const reducer = createReducer({
  commands: {},
  commandId: 1,
})({
  [COMMAND_REQUEST]: (state, action) => ({
    ...state,
    commands: {
      ...state.commands,
      [state.commandId]: action.payload,
    },
    commandId: state.commandId + 1,
  }),
});
