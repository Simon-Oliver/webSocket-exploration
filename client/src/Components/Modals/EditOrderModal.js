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

  handleChange = e => {
    const key = e.target.id;
    const data = e.target.value;
    this.setState(prevState => ({ ...prevState.newOrder, [key]: data }));
  };

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
            updateOrder(this.state.id, { ...this.state });
          }
        }}
      >
        <div className="edit-order-modal-container">
          <form
            className="col s12"
            onChange={e => {
              this.handleChange(e);
            }}
            //onSubmit={e => this.handleOnSubmit(e)}
          >
            <div className="row modal-row">
              <div className="input-field col s3">
                <input
                  id="orderCount"
                  type="number"
                  className="validate"
                  value={this.state.orderCount}
                />
                <label className="active" htmlFor="orderCount">
                  Amount
                </label>
              </div>
              <div className="input-field col s9">
                <input
                  id="orderItem"
                  type="text"
                  className="validate"
                  value={this.state.orderItem}
                />
                <label className="active" htmlFor="orderItem">
                  Order Title
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
