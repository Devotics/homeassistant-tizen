import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { focusable } from '../navigation/focusable';
import { Card } from '../ui/Card';
import { doGetMediaPlayerThumbnail, doToggleMediaPlayer } from './actions';
import styles from './MediaPlayer.module.scss';
import { selectThumbnailContentById } from './selectors';

const hasMedia = mediaPlayer => mediaPlayer.state === 'playing' || mediaPlayer.state === 'paused';

export const MediaPlayerBase = React.forwardRef(
  ({
    mediaPlayer, thumbnail, getMediaPlayerThumbnail, toggleMediaPlayer, ...props
  }, ref) => (
    <Card
      ref={ref}
      className={cx(styles.MediaPlayer, styles[`MediaPlayer__${mediaPlayer.state}`])}
      style={
        hasMedia(mediaPlayer) && thumbnail
          ? { backgroundImage: thumbnail, backgroundSize: 'cover' }
          : {}
      }
      onClick={() => toggleMediaPlayer(mediaPlayer.entity_id)}
      {...props}
    >
      <Card.Title>{mediaPlayer.attributes.friendly_name}</Card.Title>
      {hasMedia(mediaPlayer) && (
      <Card.Description>
        {mediaPlayer.attributes.media_artist}
        {' - '}
        {mediaPlayer.attributes.media_title}
      </Card.Description>
      )}
    </Card>
  ),
);

export const MediaPlayer = compose(
  connect(
    (state, ownProps) => ({
      thumbnail: selectThumbnailContentById(ownProps.mediaPlayer.entity_id)(state),
    }),
    {
      getMediaPlayerThumbnail: doGetMediaPlayerThumbnail,
      toggleMediaPlayer: doToggleMediaPlayer,
    },
  ),
  lifecycle({
    componentDidMount() {
      const { getMediaPlayerThumbnail, mediaPlayer } = this.props;
      if (hasMedia(mediaPlayer)) {
        getMediaPlayerThumbnail(mediaPlayer.entity_id);
      }
    },
    componentDidUpdate() {
      const { getMediaPlayerThumbnail, mediaPlayer } = this.props;
      if (hasMedia(mediaPlayer)) {
        getMediaPlayerThumbnail(mediaPlayer.entity_id);
      }
    },
  }),
  focusable,
)(MediaPlayerBase);
