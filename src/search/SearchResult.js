// @flow
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

type Props = {
  result: Object,
  onResultSelect: (data: Object) => void,
  onItemDelete: (id: number) => void,
  title?: string,
  description?: string,
}

function SearchResult({
  result, onResultSelect, onItemDelete, title, description
}: Props) {
  const {
    id, name, price, unit, quantity
  } = result;
  return (
    <div
      className="flexed search-result unblurrable"
      role="menuitem"
      tabIndex="0"
      onClick={() => onResultSelect(result)}
      onKeyDown={e => (e.keyCode === 13 ? onResultSelect(result) : undefined)}
    >
      <div className="content">
        {name && <div className="title">{name}</div>}
        {title && <div className="title">{title}</div>}
        {price && <div className="price">{price}$</div>}
        {unit && <div className="description">{quantity} {unit}</div>}
        {description && <div className="description">{description}</div>}
      </div>
      <div className="vertically-spaced">
        { !title &&
          <Button
            circular
            tabIndex="-1"
            type="button"
            className="unblurrable"
            icon
            color="google plus"
            size="tiny"
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onItemDelete(id);
            }}
          >
            <Icon name="trash" />
          </Button>
        }
      </div>
    </div>
  );
}

export default SearchResult;
