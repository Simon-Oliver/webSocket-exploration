import React from 'react';
import Item from './Item';
import { Table, Label } from 'semantic-ui-react';

export default function Items(props) {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>QTY</Table.HeaderCell>
          <Table.HeaderCell>ITEM</Table.HeaderCell>
          <Table.HeaderCell>PRICE</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.order.map((e, i) => (
          <Item handleSelect={props.handleSelect} key={i} item={e}></Item>
        ))}
        {props.order.length ? (
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>{props.orderTotal}</Table.Cell>
          </Table.Row>
        ) : null}
      </Table.Body>
    </Table>
  );
}
