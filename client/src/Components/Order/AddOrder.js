import React from 'react';
import './AddOrder.css';
import EditOrderModal from '../Modals/EditOrderModal';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.114:8080');
const uuidv1 = require('uuid/v1');

class AddOrder extends React.Component {
  state = {
    orders: [],
    newOrder: { orderItem: '', orderCount: '', id: '' },
    modalIsOpen: false,
    selectedItem: {}
  };

  handleOnChange = e => {
    const key = e.target.id;
    const data = e.target.value;
    this.setState(prevState => ({ newOrder: { ...prevState.newOrder, [key]: data } }));
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.setState(
      prevState => ({ newOrder: { ...prevState.newOrder, id: uuidv1() } }),
      () => {
        this.setState(
          prevState => ({ orders: [...prevState.orders, this.state.newOrder] }),
          () => this.setState({ newOrder: { id: '', orderCount: '', orderItem: '' } })
        );
      }
    );
  };

  handleSelect = selected => {
    const itemId = selected.target.dataset.key;
    const selectedItem = this.state.orders.filter(e => e.id === itemId)[0];
    console.log(selectedItem);
    this.setState({ selectedItem }, () => {
      this.toggleModal();
    });
  };

  renderList = () => {
    const item = this.state.orders.map(item => (
      <li
        className="collection-item display-order"
        key={item.id}
        data-key={item.id}
        onClick={e => {
          this.handleSelect(e);
        }}
      >
        <div className="row">
          <div className="col s3 display-order-count ">
            <span>{item.orderCount}x</span>
          </div>
          <div className="col s8 display-order-item">{item.orderItem}</div>
        </div>
      </li>
    ));
    return item;
  };

  toggleModal = e => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  };

  updateOrder = (id, data) => {
    console.log(data);
    const oldData = this.state.orders.filter(e => e.id !== id);
    this.setState({ orders: [...oldData, data] });
  };

  render() {
    return (
      <div>
        {this.state.modalIsOpen ? (
          <EditOrderModal
            selectedItem={this.state.selectedItem}
            updateOrder={this.updateOrder}
            isOpen={this.state.modalIsOpen}
            toggleModal={this.toggleModal}
          ></EditOrderModal>
        ) : null}

        <ul className="collection">
          {this.state.orders.length > 0 ? (
            this.renderList()
          ) : (
            <p className="orderItem">Enter Order</p>
          )}
        </ul>

        <div className="row">
          <form
            className="col s12"
            onChange={e => this.handleOnChange(e)}
            onSubmit={e => this.handleOnSubmit(e)}
          >
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="orderCount"
                  type="number"
                  className="validate"
                  value={this.state.newOrder.orderCount}
                />
                <label htmlFor="orderCount">Amount</label>
              </div>
              <div className="input-field col s9">
                <input
                  id="orderItem"
                  type="text"
                  className="validate"
                  value={this.state.newOrder.orderItem}
                />
                <label htmlFor="orderItem">Order Title</label>
              </div>
              <button className="btn">Add Order</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddOrder;
