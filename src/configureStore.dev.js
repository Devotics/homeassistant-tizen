import { applyMiddleware, compose, createStore } from 'redux';
import middlewares from './middlewares';
import rootReducer from './rootReducer';

const enhancers = [applyMiddleware(...middlewares)];

// eslint-disable-next-line no-underscore-dangle, no-undef
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  // eslint-disable-next-line no-underscore-dangle, no-undef
  enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, compose(...enhancers));
  return store;
}
