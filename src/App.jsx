import React from 'react';
import { Provider } from 'react-redux';
import styles from './App.module.scss';
import { AuthGate } from './auth/AuthGate';
import configureStore from './configureStore';
import { Entities } from './entities/Entities';
import { Header } from './Header';

const store = configureStore();

export const App = () => (
  <div className={styles.App}>
    <Provider store={store}>
      <AuthGate>
        <Header />
        <Entities />
      </AuthGate>
    </Provider>
  </div>
);
