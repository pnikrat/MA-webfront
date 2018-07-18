// @flow
import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function LandingContainer() {
  return (
    <Container>
      <Button primary as={Link} to="/signup">Rejestracja</Button>
      <Button primary as={Link} to="/signin">Logowanie</Button>
    </Container>
  );
}

export default LandingContainer;
