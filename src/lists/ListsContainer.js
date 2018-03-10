// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import api from '../services/api';
import { setLists, addList, removeList } from './ListsActions';
import Lists from './Lists';
import ListsForm from './ListsForm';

type Props = {
  lists: Object,
  handleListsFetch: (Object) => void,
  handleListAdd: (Object) => void,
  clearForm: () => void,
  handleListDelete: (Number) => void,
  openList: (Number) => void,
}

class ListsContainer extends Component<Props> {
  componentDidMount = () => {
    api.get('/lists').then(response =>
      this.props.handleListsFetch(response.data));
  }

  onListDelete = (id) => {
    api.delete(`/lists/${String(id)}`).then(() =>
      this.props.handleListDelete(id));
  }

  handleListAdd = (data) => {
    this.props.clearForm();
    api.post('/lists', data).then(response =>
      this.props.handleListAdd(response.data));
  }

  props: Props

  render() {
    return (
      <Container>
        <ListsForm onSubmit={this.handleListAdd} />
        <Lists
          lists={this.props.lists}
          onListDelete={this.onListDelete}
          onListClick={this.props.openList}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => (
  {
    lists: state.listsReducer.lists,
  }
);

const mapDispatchToProps = dispatch => (
  {
    handleListsFetch: lists => dispatch(setLists(lists)),
    handleListAdd: list => dispatch(addList(list)),
    clearForm: () => dispatch(reset('lists')),
    handleListDelete: id => dispatch(removeList(id)),
    openList: id => dispatch(push(`/list/${id}/items`)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ListsContainer);
