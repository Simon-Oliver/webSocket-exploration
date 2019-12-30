import React from 'react';
import Item from './Item';
import { Table, Label } from 'semantic-ui-react';

export default function Items(props) {
  return (
    <table>
      <tbody>
        <tr className="header">
          <th className="number">QTY</th>
          <th>ITEM</th>
          <th className="number">PRICE</th>
        </tr>
        {props.order.map((e, i) => (
          <Item handleSelect={props.handleSelect} key={i} item={e}></Item>
        ))}
        {props.order.length ? (
          <tr className="total">
            <th className="number">Total</th>
            <th></th>
            <th className="number">{props.orderTotal}</th>
          </tr>
        ) : null}
      </tbody>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>QTY</Table.HeaderCell>
            <Table.HeaderCell>ITEM</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>First</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </table>
  );
}
