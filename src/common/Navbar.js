// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
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
      <Menu>
        <Menu.Item as={Link} to="/">Home</Menu.Item>
        { currentUser.isSignedIn &&
          <Menu.Item position="right" as={Link} to="/" onClick={this.handleSignOut}>
            Sign out
          </Menu.Item>
        }
      </Menu>
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
