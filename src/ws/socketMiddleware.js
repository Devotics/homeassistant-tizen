import Sockette from 'sockette';
import { selectAccessToken } from '../auth/selectors';
import { AUTHENTICATION_SUCCESS } from '../auth/types';
import { selectCommandById } from './selectors';
import {
  AUTH_INVALID, AUTH_OK, AUTH_REQUIRED, COMMAND_REQUEST,
} from './types';

const send = socket => request => socket.send(JSON.stringify(request));

const formatResultType = (command, message) => {
  const baseType = command.type.toUpperCase();
  return `@ws/result/${baseType}_${message.success ? 'SUCCESS' : 'FAILURE'}`;
};

const formatEventType = (message) => {
  const baseType = message.type.toUpperCase();
  return `@ws/event/${baseType}`;
};

export const socketMiddleware = ({ dispatch, getState }) => (next) => {
  let socket = null;
  let resolveSocket;
  let rejectSocket;
  let socketPromise = new Promise((resolve, reject) => {
    resolveSocket = resolve;
    rejectSocket = reject;
  });
  const handleOpen = () => {
    // Authenticate to hass websocket once socket is open
    const accessToken = selectAccessToken(getState());
    send(socket)({
      type: 'auth',
      access_token: accessToken,
    });
  };
  const handleMessage = (event) => {
    // Unpack socket message and dispatch it
    const message = JSON.parse(event.data);
    switch (message.type) {
      case 'auth_ok':
        // Socket is now open for business
        resolveSocket();
        return dispatch({ type: AUTH_OK });
      case 'auth_required':
        return dispatch({ type: AUTH_REQUIRED });
      case 'auth_invalid':
        socket.close();
        rejectSocket();
        return dispatch({ type: AUTH_INVALID, payload: message.message });
      case 'result': {
        const command = selectCommandById(message.id)(getState());
        return dispatch({ type: formatResultType(command, message), payload: message.result });
      }
      case 'event': {
        return dispatch({ type: formatEventType(message), payload: message.event.data });
      }
      default:
        return null;
    }
  };
  return (action) => {
    if (action.type === AUTHENTICATION_SUCCESS) {
      // Authentication is complete, open socket
      socket = new Sockette(process.env.REACT_APP_HASS_WEBSOCKET_URL, {
        onopen: handleOpen,
        onmessage: handleMessage,
      });
      return next(action);
    }
    if (action.type === COMMAND_REQUEST) {
      // Request to send a command
      socketPromise = socketPromise.then(() => {
        send(socket)(action.payload);
      });
      return next(action);
    }
    return next(action);
  };
};
