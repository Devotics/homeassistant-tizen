import { createReducer } from './createReducer';

export const createMetadataReducer = ({ types: [requestType, successType, failureType] }) => {
  const initialState = {
    isFetching: false,
    data: null,
    lastFetch: null,
    error: null,
    lastError: null,
  };
  return createReducer(initialState)({
    [requestType]: state => ({
      ...state,
      isFetching: true,
      error: null,
    }),
    [successType]: (state, action) => ({
      ...state,
      isFetching: false,
      data: action.payload,
      lastFetch: Date.now(),
    }),
    [failureType]: (state, action) => ({
      ...state,
      isFetching: false,
      error: action.payload,
      lastError: Date.now(),
    }),
  });
};
