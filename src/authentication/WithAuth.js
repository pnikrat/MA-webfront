// @flow
import * as React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

type P = {}

function withAuth(WrappedForm: React.ComponentType<P>) {
  type Props = {
    headerText: string,
    path: string,
    linkName: string,
    errorCode: number,
    tokenParam?: Object,
    redirect: () => void,
    sendAuthRequest: (Object) => Promise<void>
  }

  return class extends React.Component<Props> {
    handleAuth = (data: Object) => {
      const { redirect, sendAuthRequest } = this.props;
      return sendAuthRequest(data)
        .then(() => redirect()).catch(e => this.handleInvalidAuth(e));
    };

    handleInvalidAuth = (error: Object) => {
      const { errorCode } = this.props;
      const { response: { status, data: { errors } = {} } = {}, response } = error;
      if (response && status === errorCode) {
        if (errors.full_messages) {
          throw new SubmissionError(errors);
        } else {
          throw new SubmissionError({
            _error: 'Logowanie nieudane!'
          });
        }
      } else {
        throw new SubmissionError({
          _error: 'Błąd serwera, proszę spróbować później.'
        });
      }
    }

    render() {
      const {
        headerText, path, linkName, tokenParam,
      } = this.props;
      return (
        <Container>
          <Segment>
            <Header as="h3" className="with-divider">
              {headerText}
            </Header>
            <WrappedForm onSubmit={this.handleAuth} initialValues={tokenParam} />
            <div className="larger-top-margin">
              <Link to={path}>{linkName}</Link>
            </div>
          </Segment>
        </Container>
      );
    }
  };
}

export default withAuth;
