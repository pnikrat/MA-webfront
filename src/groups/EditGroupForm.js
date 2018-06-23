// @flow
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import type { FormProps } from 'redux-form';
import { connect } from 'react-redux';
import { validateGroupForm } from './NewGroupForm';
import GroupsFormCore from './GroupsFormCore';

type Props = {
  onSubmit: (data: Object) => void,
} & FormProps

class EditGroupForm extends Component<Props> {
  props: Props

  render() {
    return (
      <GroupsFormCore
        submitText="Edit"
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.groupsReducer.currentGroup,
});

const DecoratedEditGroupForm = reduxForm({ form: 'editGroup', validateGroupForm })(EditGroupForm);

export default connect(mapStateToProps, null)(DecoratedEditGroupForm);
