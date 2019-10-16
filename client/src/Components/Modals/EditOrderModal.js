import React, { Component } from 'react';
import './EditOrder.css';

export default class EditOrderModal extends Component {
  state = {
    id: '',
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
    const { isOpen, children, updateOrder, toggleModal } = this.props;
    return (
      <div
        id="modalBg"
        className={isOpen ? 'edit-order-modal' : 'edit-order-modal modal-close'}
        onClick={e => {
          // updateOrder(null, '____Test Modal____');
          if (e.target.id == 'modalBg') {
            toggleModal();
            updateOrder(this.state.id, this.state.qnt);
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
                <input id="qnt" type="number" className="validate" value={this.state.qnt} />
                <label className="active" htmlFor="orderCount">
                  Amount
                </label>
              </div>
              <div className="input-field col s9">
                <input
                  id="item"
                  type="text"
                  className="validate"
                  value={this.state.item}
                  readonly="readonly"
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
