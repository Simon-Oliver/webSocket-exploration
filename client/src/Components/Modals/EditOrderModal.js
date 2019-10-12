import React, { Component } from 'react';
import './EditOrder.css';

export default class EditOrderModal extends Component {
  render() {
    const { isOpen, children } = this.props;
    console.log('Modal', this.props);
    return (
      <div
        className={isOpen ? 'edit-order-modal' : 'edit-order-modal modal-close'}
        onClick={() => this.props.handleHide()}
      >
        <div className="edit-order-modal-container">{children}</div>
      </div>
    );
  }
}
