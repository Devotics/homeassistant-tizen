import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Section } from '../ui/Section';
import { doGetStates, doSubscribeToStateChange } from './actions';
import { Light } from './Light';
import { MediaPlayer } from './MediaPlayer';
import { selectLights, selectMediaPlayers } from './selectors';

const EntitiesBase = ({ lights, mediaPlayers }) => (
  <main>
    {lights && (
      <Section>
        <Section.Title>Lights</Section.Title>
        {lights.map(light => (
          <Light key={light.entity_id} light={light} />
        ))}
      </Section>
    )}
    {mediaPlayers && (
      <Section>
        <Section.Title>Media Players</Section.Title>
        {mediaPlayers.map(mediaPlayer => (
          <MediaPlayer key={mediaPlayer.entity_id} mediaPlayer={mediaPlayer} />
        ))}
      </Section>
    )}
  </main>
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
