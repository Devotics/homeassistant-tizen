export const createReducer = initialState => actionHandlers => (state = initialState, action) => {
  const actionHandler = actionHandlers[action.type];
  return actionHandler ? actionHandler(state, action) : state;
};
