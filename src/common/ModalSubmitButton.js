// @flow
import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { Button } from 'semantic-ui-react';
import type { FormProps } from 'redux-form';

const ModalSubmitButton = ({
  submitting, dispatch, formReduxName
}: FormProps) => (
  <Button
    positive
    type="submit"
    disabled={submitting}
    onClick={() => dispatch(submit(formReduxName))}
  >
    { submitting ? 'Submitting...' : 'Edit' }
  </Button>
);

export default connect()(ModalSubmitButton);
