import { selectCommandId } from './selectors';
import { COMMAND_REQUEST } from './types';

export const doGetStates = () => (dispatch, getState) => dispatch({
  type: COMMAND_REQUEST,
  payload: {
    id: selectCommandId(getState()),
    type: 'get_states',
  },
});

export const doSubscribeEvents = eventType => (dispatch, getState) => dispatch({
  type: COMMAND_REQUEST,
  payload: {
    id: selectCommandId(getState()),
    type: 'subscribe_events',
    event_type: eventType,
  },
});
