import { createSelector } from 'reselect';

export const createMetadataSelectors = baseSelector => ({
  selectIsFetching: createSelector(baseSelector, state => state.isFetching),
  selectData: createSelector(baseSelector, state => state.data),
  selectLastFetch: createSelector(baseSelector, state => state.lastFetch),
  selectError: createSelector(baseSelector, state => state.error),
  selectLastError: createSelector(baseSelector, state => state.lastError),
});
