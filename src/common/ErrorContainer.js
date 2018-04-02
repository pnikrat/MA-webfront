// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Container, Message } from 'semantic-ui-react';

type Props = {
  apiError: string,
}

function ErrorContainer({ apiError }: Props) {
  return (
    <div className="larger-bottom-margin">
      { apiError &&
      <Container>
        <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          <p>Service is currently unavailable...</p>
        </Message>
      </Container>
      }
    </div>
  );
}

const mapStateToProps = state => ({
  apiError: state.apiErrorReducer.apiError,
});

export default connect(mapStateToProps, null)(ErrorContainer);
