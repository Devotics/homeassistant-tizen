import cx from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { focusable } from '../navigation/focusable';
import { Card } from '../ui/Card';
import { doToggleLight } from './actions';
import styles from './Light.module.scss';

export const LightBase = React.forwardRef(({ light, toggleLight, ...props }, ref) => (
  <Card
    ref={ref}
    className={cx(styles.Light, styles[`Light__${light.state}`])}
    onClick={() => toggleLight(light.entity_id)}
    {...props}
  >
    <Card.Title>{light.attributes.friendly_name}</Card.Title>
  </Card>
));

export const Light = compose(
  connect(
    null,
    { toggleLight: doToggleLight },
  ),
  focusable,
)(LightBase);
