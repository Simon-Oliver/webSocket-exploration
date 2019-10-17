import React from 'react';
import '../Modal/Modal.css';

export default class Modal extends React.Component {
  toggleModal = e => {
    if (e.target.id === 'modalBG') {
      this.props.toggle();
    }
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div id="modalBG" className="modal-background" onClick={e => this.toggleModal(e)}>
        <div className="modal-container">{this.props.children}</div>
      </div>
    );
  }
}
