import React, { Component } from 'react';
import { Form, Button, Container, Segment } from 'semantic-ui-react';
import './EditOrder.css';

export default class EditOrderModal extends Component {
  state = {
    _id: '',
    qnt: '',
    item: ''
  };

  componentDidMount() {
    console.log('props Modal', this.props.selectedItem);
    this.setState({ ...this.props.selectedItem });
  }

  handleChange = e => {
    const key = e.target.id;
    const data = e.target.value;
    this.setState(prevState => ({ ...prevState, [key]: data }));
  };

  render() {
    //children
    const { isOpen, updateOrder, toggleModal } = this.props;
    return (
      <div
        id="modalBg"
        className={isOpen ? 'edit-order-modal' : 'edit-order-modal modal-close'}
        onClick={e => {
          // updateOrder(null, '____Test Modal____');
          if (e.target.id === 'modalBg') {
            toggleModal();
            updateOrder(this.state._id, this.state.qnt);
          }
        }}
      >
        <Segment>
          <Form onChange={this.handleChange}>
            <Form.Group>
              <Form.Input
                label="Order Item"
                placeholder="Order Name"
                width={6}
                id="item"
                type="text"
                value={this.state.item}
                width={12}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Input label="Order Amount" id="qnt" type="number" value={this.state.qnt} />
            </Form.Group>
            <Button
              onClick={e => {
                e.preventDefault();
                toggleModal();
                this.props.deletedOrder(this.state.id);
              }}
            >
              Delete
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}
