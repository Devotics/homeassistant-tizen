import { selectCommandId } from './selectors';
import { COMMAND_REQUEST } from './types';

export const doExecuteCommand = payload => (dispatch, getState) => dispatch({
  type: COMMAND_REQUEST,
  payload: {
    ...payload,
    id: selectCommandId(getState()),
  },
});

export const doSubscribeEvents = eventType => doExecuteCommand({
  type: 'subscribe_events',
  event_type: eventType,
});

export const doCallService = ({ domain, service, serviceData }) => doExecuteCommand({
  type: 'call_service',
  domain,
  service,
  service_data: serviceData,
});
