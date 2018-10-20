export const auth = accessToken => ({
  type: 'auth',
  access_token: accessToken,
});

export const getStates = () => ({
  type: 'get_states',
});

export const callService = (domain, service, serviceData) => ({
  type: 'call_service',
  domain,
  service,
  service_data: serviceData,
});

export const subscribeEvents = eventType => ({
  type: 'subscribe_events',
  event_type: eventType,
});
