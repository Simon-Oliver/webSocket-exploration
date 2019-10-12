import React, { Component } from 'react';
import './EditOrder.css';

export default class EditOrderModal extends Component {
  state = {
    orderItem: '',
    orderCount: '',
    id: ''
  };

  componentDidMount() {
    console.log('props Modal', this.props.selectedItem);
    this.setState({ ...this.props.selectedItem });
  }

  render() {
    const { isOpen, children, updateOrder, toggleModal } = this.props;
    return (
      <div
        id="modalBg"
        className={isOpen ? 'edit-order-modal' : 'edit-order-modal modal-close'}
        onClick={e => {
          // updateOrder(null, '____Test Modal____');
          if (e.target.id == 'modalBg') {
            toggleModal();
          }
        }}
      >
        <div className="edit-order-modal-container">
          <form
            className="col s12"
            onChange={e => updateOrder(e)}
            //onSubmit={e => this.handleOnSubmit(e)}
          >
            <div className="row">
              <div className="input-field col s3">
                <input
                  id="orderCount"
                  type="number"
                  className="validate"
                  value={this.state.orderCount}
                />
                <label htmlFor="orderCount">Amount</label>
              </div>
              <div className="input-field col s9">
                <input
                  id="orderItem"
                  type="text"
                  className="validate"
                  value={this.state.orderItem}
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
