// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Container, Message } from 'semantic-ui-react';

type Props = {
  apiError: Array<string>,
}

function ErrorContainer({ apiError }: Props) {
  return (
    <div className="larger-bottom-margin">
      { apiError &&
      <Container>
        <Message negative>
          <Message.Header>Something went wrong</Message.Header>
          { apiError.map((error, i) => (
            // rule disabled - this is just breaking array of strings into chunks
            <p key={i}>{error}</p> // eslint-disable-line react/no-array-index-key
          ))}
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
