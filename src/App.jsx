import { createConnection, getAuth, subscribeEntities } from 'home-assistant-js-websocket';
import React from 'react';
import styles from './App.module.scss';
import { Entity } from './Entity';

export class App extends React.Component {
  state = {
    entities: undefined,
  };

  componentDidMount() {
    this.connect();
  }

  connect = async () => {
    const auth = await getAuth({
      hassUrl: 'http://192.168.0.5:8123',
      saveTokens: data => localStorage.setItem('tokens', JSON.stringify(data)),
      loadTokens: () => Promise.resolve(JSON.parse(localStorage.getItem('tokens'))),
    });
    const connection = await createConnection({ auth });
    subscribeEntities(connection, (entities) => {
      this.setState({ entities: Object.values(entities) });
    });
  };

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
