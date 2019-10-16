import React from 'react';
import Item from './Item';

export default function Items(props) {
  return (
    <table>
      <tr className="header">
        <th className="number">QTY</th>
        <th>ITEM</th>
        <th className="number">PRICE</th>
      </tr>
      {props.order.map((e, i) => (
        <Item handleSelect={props.handleSelect} key={i} item={e}></Item>
      ))}
    </table>
  );
}
