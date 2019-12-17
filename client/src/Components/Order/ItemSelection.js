import React, { Component } from 'react';
import './ItemSelection.css';
import Items from './Items';
import OrderItems from './OrderItems';
import EditOrderModal from '../Modals/EditOrderModal';

export default class ItemSelection extends Component {
  state = {
    items: [],
    order: [],
    selected: {},
    modalIsOpen: false,
    orderTotal: 0
  };

  componentDidMount() {
    fetch('/items', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.items);
        const newItems = data.items.map(e => ({ ...e, qnt: 0 }));
        console.log('newItem', newItems);
        this.setState({ items: newItems });
      });
    this.calculateTotal(this.state.order);
  }

  handleItemClick = e => {
    console.log('items', this.state.items);
    console.log('target id', e.target.id);
    console.log('order', this.state.order);

    //searching for id in order array. If found in array retrun first item (because it is the match)
    const newItem = this.state.items.filter(item => item._id === e.target.id)[0];
    const itemInOrder = this.state.order.filter(item => item._id === e.target.id).length
      ? true
      : false;

    console.log('------- In Order', itemInOrder);

    if (itemInOrder) {
      const order = this.state.order;
      const indexOfUpdate = this.state.order.findIndex(item => item._id === e.target.id);
      console.log(indexOfUpdate);
      order[indexOfUpdate].qnt += 1;
      this.setState({ order: [...order] }, () => this.calculateTotal(this.state.order));
    } else {
      newItem.qnt = 1;
      this.setState(
        prevState => ({ order: [...prevState.order, newItem] }),
        () => this.calculateTotal(this.state.order)
      );
    }
  };

  calculateTotal = items => {
    const init = 0;
    const total = items.reduce(
      (prevVal, currentVal) => prevVal + Number(currentVal.price) * Number(currentVal.qnt),
      init
    );
    //Math.round to avoid crazy long floating point number
    this.setState({ orderTotal: Math.round(total * 100) / 100 });
  };

  handelSelect = id => {
    const selected = this.state.order.find(e => e.id === id);
    this.setState({ selected });
    this.toggleModal();
    console.log(selected);
  };

  toggleModal = e => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  };

  updateOrder = (id, update) => {
    const order = this.state.order;
    const indexOfUpdate = this.state.order.findIndex(item => item._id === id);

    order[indexOfUpdate].qnt = Number(update);
    this.setState({ order: [...order] }, () => this.calculateTotal(this.state.order));
    console.log(id, update);
  };

  deletedOrder = id => {
    const order = this.state.order.filter(e => e._id !== id);
    this.setState({ order: [...order] }, () => this.calculateTotal(this.state.order));
  };

  render() {
    return (
      <div className="select-order-container-grid">
        {this.state.modalIsOpen ? (
          <EditOrderModal
            selectedItem={this.state.selected}
            updateOrder={this.updateOrder}
            isOpen={this.state.modalIsOpen}
            toggleModal={this.toggleModal}
            deletedOrder={this.deletedOrder}
          ></EditOrderModal>
        ) : null}
        <div className="select-order-left">
          <div className="order-container">
            <Items
              handleSelect={this.handelSelect}
              order={this.state.order}
              orderTotal={this.state.orderTotal}
            ></Items>
          </div>
        </div>
        <div className="select-order-right">
          <OrderItems
            handleItemClick={this.handleItemClick}
            OrderItems={this.state.items}
          ></OrderItems>
        </div>
      </div>
    );
  }
}
