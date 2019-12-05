import React, { Component } from 'react';
import { toggleState } from '../../helper';
import './Items.css';
import EditItem from './EditItem';
import { Button, Container, Icon, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Items extends Component {
  state = {
    items: [],
    modalIsOpen: false,
    selectedItem: {}
  };

  componentDidMount() {
    fetch('/items')
      .then(res => res.json())
      .then(data => this.setState({ items: data.items }));
  }

  updateState = () => {
    fetch('/items')
      .then(res => res.json())
      .then(data => this.setState({ items: data.items }));
  };

  handleDelete(e) {
    const data = JSON.stringify({ id: e.currentTarget.parentElement.parentElement.id });
    fetch('/items', {
      method: 'DELETE',
      body: data,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => this.updateState());
  }

  toggle = e => {
    if (!e) {
      this.setState(toggleState('modalIsOpen'));
    } else {
      const selected = this.state.items.filter(
        item => item._id === e.currentTarget.parentElement.parentElement.id
      )[0];
      console.log(selected);
      this.setState({ selectedItem: selected }, () => {
        this.setState(toggleState('modalIsOpen'));
      });
    }
  };

  renderList() {
    const { items } = this.state;
    return items.map(e => (
      <Table.Row key={e.item} id={e._id}>
        <Table.Cell>
          <span className="title bold">{e.item}</span>
        </Table.Cell>
        <Table.Cell>
          <span className="price">${e.price}</span>
        </Table.Cell>
        <Table.Cell>
          <span className="options">
            {e.options.map(option => (
              <span key={option} className="option">
                {`${option}, `}
              </span>
            ))}
          </span>
        </Table.Cell>
        <Table.Cell collapsing>
          <Button size="mini" onClick={this.toggle}>
            Edit
          </Button>
          <Button
            icon
            color="red"
            size="mini"
            data-badge-caption="Delete"
            onClick={e => this.handleDelete(e)}
          >
            <Icon name="trash" />
          </Button>
        </Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    return (
      <Container>
        {this.state.modalIsOpen ? (
          <EditItem
            item={this.state.selectedItem}
            modalIsOpen={this.state.modalIsOpen}
            toggle={this.toggle}
            updateState={this.updateState}
          ></EditItem>
        ) : null}
        <h4>Menu Items:</h4>
        <Table celled singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>Item Name</Table.HeaderCell>
              <Table.HeaderCell collapsing>Price</Table.HeaderCell>
              <Table.HeaderCell>Options</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderList()}</Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Link to="/items/add">
                  <Button primary floated="right">
                    Add Item
                  </Button>
                </Link>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    );
  }
}
