import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Section } from '../ui/Section';
import { doGetStates, doSubscribeToStateChange } from '../ws/actions';
import styles from './Entities.module.scss';
import { FocusableEntity } from './Entity';
import { FocusableLight } from './Light';
import { selectLights, selectMediaPlayers } from './selectors';

const EntitiesBase = ({ lights, mediaPlayers }) => (
  <div className={styles.Entities}>
    <h1>
      Welcome home,
      {' '}
      <em>Antoine.</em>
    </h1>
    {lights && (
      <Section>
        <Section.Title>Lights</Section.Title>
        {lights.map(light => (
          <FocusableLight key={light.entity_id} light={light} />
        ))}
      </Section>
    )}
    {mediaPlayers && (
      <Section>
        <Section.Title>Media Players</Section.Title>
        {mediaPlayers.map(entity => (
          <FocusableEntity key={entity.entity_id} entity={entity} />
        ))}
      </Section>
    )}
  </div>
);

export const Entities = compose(
  connect(
    state => ({
      lights: selectLights(state),
      mediaPlayers: selectMediaPlayers(state),
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
