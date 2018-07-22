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
        <MenuItem path="/" iconName="home" text="Strona główna" dataCy="lists-button" />
        { currentUser.isSignedIn &&
          <MenuItem
            path="/groups"
            dataCy="groups-button"
            iconName="group"
            text="Grupy"
          />
        }
        { currentUser.isSignedIn &&
          <Menu.Menu position="right">
            <MenuItem
              position="right"
              path="/"
              iconName="user"
              text={`${currentUser.attributes.firstName} ${currentUser.attributes.lastName || ''}`}
            />
            <MenuItem
              position="right"
              path="/"
              dataCy="logout-button"
              iconName="sign out"
              text="Wylogowanie"
              clickCallback={this.handleSignOut}
            />
          </Menu.Menu>
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
