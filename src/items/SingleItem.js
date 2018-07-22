// @flow
import React from 'react';
import { Dropdown, List } from 'semantic-ui-react';
import ItemActionButton from './ItemActionButton';

type Props = {
  item: Object,
  onItemStateChange: (Object, string) => void,
  openEditModal: (Object) => void,
}

function SingleItem({ item, onItemStateChange, openEditModal }: Props) {
  return (
    <List.Item className={item.aasm_state}>
      { item.aasm_state === 'to_buy' &&
        <ItemActionButton
          color="olive"
          iconName="checkmark"
          onClick={() => onItemStateChange(item, 'bought')}
          dataCy="mark-bought"
        />
      }
      { item.aasm_state === 'to_buy' &&
        <ItemActionButton
          iconName="close"
          onClick={() => onItemStateChange(item, 'missing')}
          dataCy="mark-missing"
        />
      }
      { (item.aasm_state === 'bought' || item.aasm_state === 'missing') &&
        <ItemActionButton
          color="grey"
          iconName="undo"
          onClick={() => onItemStateChange(item, 'to_buy')}
          dataCy="mark-undo"
        />
      }
      <List.Content className="full-width">
        <List.Header className="flexed">
          <div>{item.name}</div>
          <Dropdown text="">
            <Dropdown.Menu>
              <Dropdown.Item
                icon="edit"
                text="Edytuj"
                onClick={() => openEditModal(item)}
              />
              <Dropdown.Item
                data-cy="delete-item"
                icon="trash outline"
                text="Usuń"
                onClick={() => onItemStateChange(item, 'deleted')}
              />
            </Dropdown.Menu>
          </Dropdown>
        </List.Header>
        <List.Description className="flexed">
          <div>{item.quantity && `Ilość: ${Number(item.quantity).toLocaleString('pl', { maximumFractionDigits: 2 })} ${item.unit || ''}`}</div>
          <div>{item.price && `${Number(item.price).toLocaleString('pl', { style: 'currency', currency: 'PLN' })}`}</div>
        </List.Description>
      </List.Content>
    </List.Item>
  );
}

export default SingleItem;
