import fetch from 'unfetch';
import { AUTHENTICATION_FAILURE, AUTHENTICATION_REQUEST, AUTHENTICATION_SUCCESS } from './types';

const encode = payload => Object.entries(payload)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('&');

export const doRefreshAuthentication = () => async (dispatch) => {
  dispatch({ type: AUTHENTICATION_REQUEST });
  const payload = encode({
    grant_type: 'refresh_token',
    refresh_token: process.env.REACT_APP_HASS_REFRESH_TOKEN,
    client_id: process.env.REACT_APP_HASS_CLIENT_ID,
  });
  const response = await fetch(process.env.REACT_APP_HASS_TOKEN_URL, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await response.json();
  if (!response.ok || response.status !== 200) {
    return dispatch({ type: AUTHENTICATION_FAILURE, payload: json, error: true });
  }
  return dispatch({
    type: AUTHENTICATION_SUCCESS,
    payload: {
      accessToken: json.access_token,
      expiresIn: json.expires_in,
      expiresAt: Date.now() + json.expires_in * 1000,
      tokenType: json.token_type,
    },
  });
};
