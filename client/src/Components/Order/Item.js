import React from 'react';

export default function Item(props) {
  return (
    <tr className="item">
      <td className="number">{props.item.qnt}</td>
      <td>{props.item.item}</td>
      <td className="number">{props.item.price}</td>
    </tr>
  );
}
