import React from 'react';

export default function Item(props) {
  return (
    <>
      <div className="order-items-1">{props.item.qnt}</div>
      <div className="order-items-2">{props.item.item}</div>
      <div className="order-items-3">{props.item.price}</div>
    </>
  );
}
