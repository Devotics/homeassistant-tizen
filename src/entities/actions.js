import { doCallService, doExecuteCommand, doSubscribeEvents } from '../ws/actions';

export const doGetStates = () => doExecuteCommand({ type: 'get_states' });
export const doSubscribeToStateChange = () => doSubscribeEvents('state_changed');
export const doToggleLight = entityId => doCallService({
  domain: 'light',
  service: 'toggle',
  serviceData: {
    entity_id: entityId,
  },
});
export const doGetMediaPlayerThumbnail = entityId => doExecuteCommand({ type: 'media_player_thumbnail', entity_id: entityId });
