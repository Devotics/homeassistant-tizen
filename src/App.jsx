import React from 'react';
import { Provider } from 'react-redux';
import { AuthGate } from './auth/AuthGate';
import configureStore from './configureStore';
import { Entities } from './entities/Entities';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <AuthGate>
      <Entities />
    </AuthGate>
  </Provider>
);
