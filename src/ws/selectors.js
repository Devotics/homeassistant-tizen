import { createSelector } from 'reselect';

export const selectState = state => state.ws;
export const selectCommands = createSelector(selectState, state => state.commands);
export const selectCommandById = id => createSelector(selectCommands, commands => commands[id]);
export const selectCommandId = createSelector(selectState, state => state.commandId);
