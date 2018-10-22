import { combineReducers } from 'redux';
import { reducer as auth } from './auth/reducer';
import { reducer as entities } from './entities/reducer';
import { reducer as user } from './user/reducer';
import { reducer as ws } from './ws/reducer';

export default combineReducers({
  auth,
  ws,
  entities,
  user,
});
