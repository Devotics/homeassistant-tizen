import cx from 'classnames';
import React from 'react';
import { focusable } from '../navigation/focusable';
import { Card } from '../ui/Card';
import styles from './Light.module.scss';

export const Light = React.forwardRef(({ light, ...props }, ref) => (
  <Card ref={ref} className={cx(styles.Light, styles[`Light__${light.state}`])} {...props}>
    <Card.Title>{light.attributes.friendly_name}</Card.Title>
  </Card>
));

export const FocusableLight = focusable(Light);
