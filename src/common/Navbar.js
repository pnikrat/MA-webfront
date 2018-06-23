// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { signOutUser } from '../auth-config';
import MenuItem from './MenuItem';

type Props = {
  currentUser: Object,
  sendLogoutRequest: () => Promise<void>,
}

class Navbar extends Component<Props> {
  handleSignOut = () => this.props.sendLogoutRequest();

  render() {
    const { currentUser } = this.props;
    return (
      <Menu stackable className="custom-menu">
        <MenuItem path="/" iconName="home" text="Home" />
        { currentUser.isSignedIn &&
          <MenuItem
            path="/groups"
            iconName="group"
            text="My groups"
          />
        }
        { currentUser.isSignedIn &&
          <MenuItem
            position="right"
            path="/"
            iconName="sign out"
            text="Sign out"
            clickCallback={this.handleSignOut}
          />
        }
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser
});

const mapDispatchToProps = dispatch => ({
  sendLogoutRequest: () => dispatch(signOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
