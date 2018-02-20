// @flow
import React from 'react';
import { Container } from 'semantic-ui-react';

type Props = {
  match: Object,
}

const ItemsContainer = ({ match }: Props) => (
  <Container>
    <h3>This is list with id: {match.params.id}</h3>
  </Container>
);

export default ItemsContainer;
