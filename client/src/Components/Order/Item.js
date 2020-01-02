import React from 'react';
import { Table } from 'semantic-ui-react';

export default function Item(props) {
  return (
    <Table.Row
      id={props.item._id}
      className="item"
      onClick={e => props.handleSelect(e.currentTarget.id)}
    >
      <Table.Cell className="number">{props.item.qnt}</Table.Cell>
      <Table.Cell>{props.item.item}</Table.Cell>
      <Table.Cell>{props.item.price}</Table.Cell>
    </Table.Row>

    // <tr id={props.item._id} className="item" onClick={e => props.handleSelect(e.currentTarget.id)}>
    //   <td className="number">{props.item.qnt}</td>
    //   <td>{props.item.item}</td>
    //   <td className="number">{props.item.price}</td>
    // </tr>
  );
}
