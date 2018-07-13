// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import ApiMessageContainer from './ApiMessageContainer';

type Props = {
  apiSuccess: Array<string>,
  apiError: Array<string>,
}

class FlashContainer extends React.Component<Props> {
  render() {
    const { apiSuccess, apiError } = this.props;
    return (
      <React.Fragment>
        { apiSuccess &&
          <ApiMessageContainer positive apiMessage={apiSuccess} />
        }
        { apiError &&
          <ApiMessageContainer positive={false} apiMessage={apiError} />
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  apiSuccess: state.apiMessagesReducer.apiSuccess,
  apiError: state.apiMessagesReducer.apiError,
});

export default connect(mapStateToProps, null)(FlashContainer);
