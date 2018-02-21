// @flow
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import api from '../services/api';
import { setCurrentList, setItems } from './ItemsActions';
import Items from './Items';

type Props = {
  match: Object,
  currentList: Object,
  items: Object,
  handleSetCurrentList: (Object) => void,
  handleItemsFetch: (Object) => void,
}

class ItemsContainer extends Component<Props> {
  componentDidMount = () => {
    const listId = this.props.match.params.id;
    api.get(`/lists/${listId}`).then((response) => {
      this.props.handleSetCurrentList(response.data);
      return api.get(`/lists/${listId}/items`).then(resp =>
        this.props.handleItemsFetch(resp.data));
    });
  }

  props: Props

  render() {
    return (
      <Container>
        <h3>{this.props.currentList && this.props.currentList.name}</h3>
        <Items
          items={this.props.items}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => (
  {
    items: state.itemsReducer.items,
    currentList: state.itemsReducer.currentList,
  }
);

const mapDispatchToProps = dispatch => (
  {
    handleSetCurrentList: list => dispatch(setCurrentList(list)),
    handleItemsFetch: items => dispatch(setItems(items)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
