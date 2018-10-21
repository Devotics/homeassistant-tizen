import cx from 'classnames';
import React from 'react';
import styles from './Section.module.scss';

export const Section = ({ className, children, ...props }) => (
  <section className={cx(styles.Section, className)} {...props}>
    {children}
  </section>
);

export const SectionTitle = ({ className, children, ...props }) => (
  <h2 className={cx(styles.SectionTitle, className)} {...props}>
    {children}
  </h2>
);
Section.Title = SectionTitle;
