// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

type Props = {
  isLoading: boolean,
};

function Loading({ isLoading }: Props) {
  return (
    <Dimmer active={isLoading} page>
      <Loader>Loading</Loader>
    </Dimmer>
  );
}

const mapStateToProps = state => ({
  isLoading: state.apiLoadingReducer.loading,
});

export default connect(mapStateToProps, null)(Loading);
