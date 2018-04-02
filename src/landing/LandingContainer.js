// @flow
import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function LandingContainer() {
  return (
    <Container>
      <Button primary as={Link} to="/signup">Sign up</Button>
      <Button primary as={Link} to="/signin">Sign in</Button>
    </Container>
  );
}

export default LandingContainer;
