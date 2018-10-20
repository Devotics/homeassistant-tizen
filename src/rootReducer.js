import { combineReducers } from 'redux';
import { reducer as auth } from './auth/reducer';
import { reducer as ws } from './ws/reducer';
import { reducer as entities } from './entities/reducer';

export default combineReducers({
  auth,
  ws,
  entities,
});
