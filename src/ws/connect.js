import Sockette from 'sockette';
import { auth } from './commands';
import { send } from './send';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'get_states':
      return {
        ...state,
        entities: payload,
      };
    case 'state_changed':
      return {
        ...state,
        entities: state.entities.map(
          entity => (entity.entity_id === payload.entity_id ? payload.new_state : entity),
        ),
      };
    default:
      return state;
  }
};

export const connect = async ({ url, accessToken }) => new Promise((resolve, reject) => {
  let ws;
  let state = {};
  let listeners = [];
  let commandId = 1;
  const commands = {};
  const store = {
    dispatch: (command) => {
      commands[commandId] = {
        ...command,
        id: commandId,
      };
      send(ws)(commands[commandId]);
      commandId += 1;
    },
    getState: () => state,
    subscribe: (listener) => {
      listeners = [...listeners, listener];
    },
  };

  const notifyListeners = () => {
    listeners.forEach((listener) => {
      listener(state);
    });
  };

  const handleOpen = () => send(ws)(auth(accessToken));

  const handleMessage = (event) => {
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'auth_invalid':
        // Auth is invalid, close web socket and reject promise
        ws.close();
        reject(new Error('Invalid authentication'));
        break;
      case 'auth_ok':
        // Auth is valid, resolve with store
        resolve(store);
        break;
      case 'result': {
        // we must retrieve the original command and forward command type to reducer
        const command = commands[message.id];
        state = reducer(state, { type: command.type, payload: message.result });
        notifyListeners();
        break;
      }
      case 'event': {
        state = reducer(state, {
          type: message.event.event_type,
          payload: message.event.data,
        });
        notifyListeners();
        break;
      }
      default:
    }
  };

  ws = new Sockette(`${url}/api/websocket`, {
    onopen: handleOpen,
    onmessage: handleMessage,
  });
});
