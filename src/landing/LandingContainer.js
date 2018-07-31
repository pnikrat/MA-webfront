// @flow
import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

function LandingContainer() {
  return (
    <div>
      <div className="jumbo">
        <div className="jumbo-content">
          <div className="jumbo-header">
            <h1>
              Grupowa lista zakupów
            </h1>
          </div>
          <div className="jumbo-buttons-container">
            <Button
              primary
              as={Link}
              to="/signup"
              data-cy="to-register-form-button"
              className="jumbo-button"
            >
              Rejestracja
            </Button>
            <Button
              primary
              as={Link}
              to="/signin"
              data-cy="to-login-form-button"
              className="jumbo-button"
            >
              Logowanie
            </Button>
          </div>
        </div>
      </div>
      <Container>
        <div className="feature-segment">
          <Header>
            Lorem Ipsum
          </Header>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in rep
          rehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
          </p>
        </div>

        <div className="feature-segment">
          <Header>
            Lorem Ipsum
          </Header>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in rep
          rehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
          </p>
        </div>

        <div className="feature-segment">
          <Header>
            Lorem Ipsum
          </Header>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in rep
          rehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
          </p>
        </div>
      </Container>
    </div>
  );
}

export default LandingContainer;
