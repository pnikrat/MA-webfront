// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import ListsContainer from '../lists/ListsContainer';

type Props = {
  currentUser: Object,
}

class Home extends Component<Props> {
  props: Props

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Navbar />
        { !currentUser.isSignedIn &&
          <ul>
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/signin">Sign in</Link></li>
          </ul>
        }
        { currentUser.isSignedIn && <ListsContainer />}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    currentUser: state.reduxTokenAuth.currentUser,
  }
);

export default connect(mapStateToProps, null)(Home);
