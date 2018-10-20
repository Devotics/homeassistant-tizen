import React from 'react';
import styles from './App.module.scss';
import { refreshAuthentication } from './auth/refreshAuthentication';
import { Entity } from './Entity';
import { getStates, subscribeEvents } from './ws/commands';
import { connect } from './ws/connect';

export class App extends React.Component {
  state = {
    entities: undefined,
  };

  async componentDidMount() {
    const { accessToken } = await refreshAuthentication({
      url: `http://${process.env.REACT_APP_HASS_HOST}`,
      refreshToken: process.env.REACT_APP_HASS_REFRESH_TOKEN,
      clientId: process.env.REACT_APP_HASS_CLIENT_ID,
    });
    const store = await connect({
      url: `ws://${process.env.REACT_APP_HASS_HOST}`,
      accessToken,
    });
    store.subscribe(state => this.setState(state));
    store.dispatch(getStates());
    store.dispatch(subscribeEvents('state_changed'));
  }

  render() {
    const { entities } = this.state;
    return (
      <div className={styles.App}>
        <h1>Home</h1>
        {entities && entities.map(entity => <Entity key={entity.entity_id} entity={entity} />)}
      </div>
    );
  }
}
