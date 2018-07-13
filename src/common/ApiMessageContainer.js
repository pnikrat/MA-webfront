// @flow
import React from 'react';
import { Container, Message } from 'semantic-ui-react';

type Props = {
  apiMessage: Array<string>,
  positive: boolean,
}

function ApiMessageContainer({ apiMessage, positive }: Props) {
  const header = positive ? 'Success' : 'Something went wrong';
  return (
    <div className="larger-bottom-margin">
      { apiMessage &&
      <Container>
        <Message negative={!positive} positive={positive}>
          <Message.Header>{header}</Message.Header>
          { apiMessage.map((message, i) => (
            // rule disabled - this is just breaking array of strings into chunks
            <p key={i}>{message}</p> // eslint-disable-line react/no-array-index-key
          ))}
        </Message>
      </Container>
      }
    </div>
  );
}

export default ApiMessageContainer;
