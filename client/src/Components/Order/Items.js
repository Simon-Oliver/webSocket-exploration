import React from 'react';
import Item from './Item';

export default function Items(props) {
  return (
    <div className="order-items-container">
      <div className="order-items-1 header number">QTY</div>
      <div className="order-items-2 header">ITEM</div>
      <div className="order-items-3 header number">PRICE</div>
      {props.order.map((e, i) => (
        <Item key={i} item={e}></Item>
      ))}
    </div>
  );
}
