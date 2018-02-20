// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react';
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
        { !currentUser.isSignedIn &&
          <Container>
            <Button as={Link} to="/signup">Sign up</Button>
            <Button as={Link} to="/signin">Sign in</Button>
          </Container>
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
