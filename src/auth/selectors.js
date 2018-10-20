import { createSelector } from 'reselect';
import { createMetadataSelectors } from '../utils/createMetadataSelectors';

export const selectState = state => state.auth;
export const { selectData } = createMetadataSelectors(selectState);
export const selectAccessToken = createSelector(selectData, data => data.accessToken);
