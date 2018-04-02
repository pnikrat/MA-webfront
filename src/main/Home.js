// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListsContainer from '../lists/ListsContainer';
import LandingContainer from '../landing/LandingContainer';

type Props = {
  currentUser: Object,
}

class Home extends Component<Props> {
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        { !currentUser.isSignedIn && <LandingContainer /> }
        { currentUser.isSignedIn && <ListsContainer />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.reduxTokenAuth.currentUser
});

export default connect(mapStateToProps, null)(Home);
