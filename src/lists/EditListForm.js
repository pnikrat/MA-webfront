// @flow
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { connect } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import ListsFormCore from './ListsFormCore';
import { validateListForm } from './NewListForm';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class EditListForm extends Component<Props> {
  props: Props

  render() {
    const { error, handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        { error && <Message negative>{error}</Message> }
        <ListsFormCore />
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.modalsReducer.editList.list,
});

const DecoratedEditListForm = reduxForm({ form: 'editList', validateListForm })(EditListForm);

export default connect(mapStateToProps, null)(DecoratedEditListForm);
