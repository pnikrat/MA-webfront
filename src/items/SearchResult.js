// @flow
import React from 'react';

type Props = {
  id: number,
  name: String,
  price: Number,
  quantity: Number,
  unit: String,
}

function SearchResult({
  id, name, price, quantity, unit
}: Props) {
  return (
    <div key={id} className="content">
      {price && <div className="price">{price}$</div>}
      {name && <div className="title">{name}</div>}
      {unit && <div className="description">{quantity} {unit}</div>}
    </div>
  );
}

export default SearchResult;
