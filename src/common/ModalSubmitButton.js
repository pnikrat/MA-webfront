// @flow
import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { Button } from 'semantic-ui-react';
import type { FormProps } from 'redux-form';

const ModalSubmitButton = ({
  submitting, dispatch
}: FormProps) => (
  <Button
    positive
    type="submit"
    disabled={submitting}
    onClick={() => dispatch(submit('editItem'))}
  >
    { submitting ? 'Submitting...' : 'Edit' }
  </Button>
);

export default connect()(ModalSubmitButton);
