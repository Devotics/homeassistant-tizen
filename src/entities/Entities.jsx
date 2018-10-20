import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { doRefreshAuthentication } from '../auth/refreshAuthentication';
import { doGetStates } from '../ws/actions';
import styles from './Entities.module.scss';
import { Entity } from './Entity';
import { selectVisibleEntities } from './selectors';

const EntitiesBase = ({ entities }) => (
  <div className={styles.Entities}>
    <h1>Entities</h1>
    {entities && entities.map(entity => <Entity key={entity.entity_id} entity={entity} />)}
  </div>
);

export const Entities = compose(
  connect(
    state => ({
      entities: selectVisibleEntities(state),
    }),
    {
      refreshAuthentication: doRefreshAuthentication,
      getStates: doGetStates,
    },
  ),
  lifecycle({
    componentDidMount() {
      const { refreshAuthentication, getStates } = this.props;
      refreshAuthentication();
      getStates();
    },
  }),
)(EntitiesBase);
