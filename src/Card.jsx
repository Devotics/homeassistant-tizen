import cx from 'classnames';
import React from 'react';
import styles from './Card.module.scss';

export const Card = ({ className, children, props }) => (
  <div className={cx(styles.Card, className)} {...props}>
    {children}
  </div>
);

Card.Title = ({ className, children, props }) => (
  <h3 className={cx(styles.CardTitle, className)} {...props}>
    {children}
  </h3>
);

Card.Description = ({ className, children, props }) => (
  <p className={cx(styles.CardDescription, className)} {...props}>
    {children}
  </p>
);
