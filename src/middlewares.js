import thunk from 'redux-thunk';
import { socketMiddleware } from './ws/socketMiddleware';

export default [thunk, socketMiddleware];
