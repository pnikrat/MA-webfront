// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { apiCall } from '../services/apiActions';
import { GET } from '../state/constants';
import { setGroups } from './GroupsActions';
import ModuleTitle from '../common/ModuleTitle';
import Groups from './Groups';

type Props = {
  groups: Array<Object>,
  handleGroupsFetch: () => void,
}


class GroupsContainer extends Component<Props> {
  componentDidMount = () => {
    this.props.handleGroupsFetch();
  }

  render() {
    const {
      groups
    } = this.props;
    return (
      <Container>
        <ModuleTitle iconName="group">
          My groups
        </ModuleTitle>
        <Groups
          groups={groups}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groupsReducer.groups,
});

const mapDispatchToProps = dispatch => ({
  handleGroupsFetch: () => dispatch(apiCall('/groups', setGroups, GET)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);
