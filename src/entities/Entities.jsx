import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Section } from '../ui/Section';
import { doGetStates, doSubscribeToStateChange } from '../ws/actions';
import styles from './Entities.module.scss';
import { FocusableEntity } from './Entity';
import { selectLights, selectMediaPlayers, selectSensors } from './selectors';

const EntitiesBase = ({ lights, sensors, mediaPlayers }) => (
  <div className={styles.Entities}>
    {lights && (
      <Section>
        <Section.Title>Lights</Section.Title>
        {lights.map(entity => (
          <FocusableEntity key={entity.entity_id} entity={entity} />
        ))}
      </Section>
    )}
    {sensors && (
      <Section>
        <Section.Title>Sensors</Section.Title>
        {sensors.map(entity => (
          <FocusableEntity key={entity.entity_id} entity={entity} />
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
      sensors: selectSensors(state),
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
