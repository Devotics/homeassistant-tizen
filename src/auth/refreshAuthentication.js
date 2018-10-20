import fetch from 'unfetch';

const encode = payload => Object.entries(payload)
  .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join('&');

export const refreshAuthentication = async ({ url, refreshToken, clientId }) => {
  const payload = encode({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
  });
  const response = await fetch(`${url}/auth/token`, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const json = await response.json();
  if (!response.ok || response.status !== 200) {
    throw new Error(`Failed to refresh authentication: ${json.error}`);
  }
  return {
    accessToken: json.access_token,
    expiresIn: json.expires_in,
    expiresAt: Date.now() + json.expires_in * 1000,
    tokenType: json.token_type,
  };
};
