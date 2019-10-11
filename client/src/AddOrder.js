import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.11:8000');

class AddOrder extends React.Component {
  state = {
    orders: [],
    newOrder: {}
  };

  handleOnChange = e => {
    const key = e.target.id;
    const data = e.target.value;
    this.setState(prevState => ({ newOrder: { ...prevState.newOrder, [key]: data } }));
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.setState(
      prevState => ({ orders: [...prevState.orders, this.state.newOrder] }),
      () => this.setState({ newOrder: { orderCount: '', orderItem: '' } })
    );
  };

  renderList = () => {
    const item = this.state.orders.map(item => (
      <li className="collection-item display-order" key={item.orderItem}>
        <div className="display-order-count">
          <span>{item.orderCount}x</span>
        </div>
        <div className="display-order-item">{item.orderItem}</div>
      </li>
    ));
    return item;
  };

  render() {
    return (
      <div>
        <ul class="collection">
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
