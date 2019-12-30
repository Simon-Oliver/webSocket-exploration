import React from 'react';
import { Table } from 'semantic-ui-react';

export default function Item(props) {
  return (
    <tr id={props.item._id} className="item" onClick={e => props.handleSelect(e.currentTarget.id)}>
      <td className="number">{props.item.qnt}</td>
      <td>{props.item.item}</td>
      <td className="number">{props.item.price}</td>
    </tr>
  );
}
