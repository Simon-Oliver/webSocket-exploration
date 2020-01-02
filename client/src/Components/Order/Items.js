import React from 'react';
import Item from './Item';
import { Table, Label, Header } from 'semantic-ui-react';

export default function Items(props) {
  return (
    <Table columns={3}>
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
      </Table.Body>
      <Table.Footer>
        {props.order.length ? (
          <Table.Row>
            <Table.HeaderCell>
              {' '}
              <Header as="h4">Total</Header>
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
              {' '}
              <Header as="h4">{props.orderTotal}</Header>
            </Table.HeaderCell>
          </Table.Row>
        ) : null}
      </Table.Footer>
    </Table>
  );
}
