import { applyMiddleware, compose, createStore } from 'redux';
import middlewares from './middlewares';
import rootReducer from './rootReducer';

const enhancers = [applyMiddleware(...middlewares)];

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, compose(...enhancers));
  return store;
}
