import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { doRefreshAuthentication } from './refreshAuthentication';

const AuthGateBase = ({ children }) => children;

export const AuthGate = compose(
  connect(
    null,
    { refreshAuthentication: doRefreshAuthentication },
  ),
  lifecycle({
    componentDidMount() {
      const { refreshAuthentication } = this.props;
      refreshAuthentication();
    },
  }),
)(AuthGateBase);
