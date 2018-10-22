import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { doGetUser } from './user/actions';
import { selectUsername } from './user/selectors';

const HeaderBase = ({ username }) => (
  <header>
    <h1>
      {'Welcome home, '}
      <em>
        {username}
        {'.'}
      </em>
    </h1>
  </header>
);

export const Header = compose(
  connect(
    state => ({
      username: selectUsername(state),
    }),
    { getUser: doGetUser },
  ),
  lifecycle({
    componentDidMount() {
      const { getUser } = this.props;
      getUser();
    },
  }),
)(HeaderBase);
