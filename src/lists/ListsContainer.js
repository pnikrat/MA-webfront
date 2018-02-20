// @flow
import React, { Component } from 'react';
import connect from 'react-redux';
import { Container } from 'semantic-ui-react';

class ListsContainer extends Component<Props> {

  componentDidMount = () => {
    // fetch all user lists
  }

  render() {
    return (
      <Container>
        <h1>Hello! These are your shopping lists:</h1>
      </Container>
    );
  }
}

const mapStateToProps = state => (
  {
    lists: state.myReducer.lists,
  }
);

export default connect(mapStateToProps, null)(ListsContainer);
