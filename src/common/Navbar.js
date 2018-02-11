// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUser } from '../auth-config';

type Props = {
  currentUser: Object,
  sendLogoutRequest: () => Promise<void>,
}

class Navbar extends Component<Props> {
  props: Props

  handleSignOut = () => {
    const { sendLogoutRequest } = this.props;
    sendLogoutRequest();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <nav>
        <Link to="/">Shopping App</Link>
        { currentUser.isSignedIn &&
          <button onClick={this.handleSignOut}>
            <Link to="/">Sign out</Link>
          </button>
        }
      </nav>
    );
  }
}

const mapStateToProps = state => (
  {
    currentUser: state.reduxTokenAuth.currentUser
  }
);

const mapDispatchToProps = dispatch => (
  {
    sendLogoutRequest: () => dispatch(signOutUser())
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
