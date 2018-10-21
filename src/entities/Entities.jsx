import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { doGetStates, doSubscribeToStateChange } from '../ws/actions';
import styles from './Entities.module.scss';
import { FocusableEntity } from './Entity';
import { selectVisibleEntities } from './selectors';

const EntitiesBase = ({ entities }) => (
  <div className={styles.Entities}>
    <h1>Entities</h1>
    {entities && entities.map(entity => <FocusableEntity key={entity.entity_id} entity={entity} />)}
  </div>
);

export const Entities = compose(
  connect(
    state => ({
      entities: selectVisibleEntities(state),
    }),
    {
      getStates: doGetStates,
      subscribeToStateChange: doSubscribeToStateChange,
    },
  ),
  lifecycle({
    componentDidMount() {
      const { getStates, subscribeToStateChange } = this.props;
      getStates();
      subscribeToStateChange();
    },
  }),
)(EntitiesBase);
