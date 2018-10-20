import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { Entities } from './entities/Entities';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <Entities />
  </Provider>
);
