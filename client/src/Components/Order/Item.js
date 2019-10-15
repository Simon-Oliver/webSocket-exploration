import React from 'react';

export default function Item(props) {
  return (
    <tr id={props.item.id} className="item" onClick={e => console.log(e.currentTarget.id)}>
      <td className="number">{props.item.qnt}</td>
      <td>{props.item.item}</td>
      <td className="number">{props.item.price}</td>
    </tr>
  );
}
