import { createMetadataReducer } from '../utils/createMetadataReducer';
import { AUTHENTICATION_FAILURE, AUTHENTICATION_REQUEST, AUTHENTICATION_SUCCESS } from './types';

export const reducer = createMetadataReducer({
  types: [AUTHENTICATION_REQUEST, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE],
});
