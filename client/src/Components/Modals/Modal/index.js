import React from 'react';
import '../Modal/Modal.css';

export default class Modal extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  toggleModal = e => {
    if (e.target.id === 'modalBG') {
      this.props.toggle();
    }
  };

  render() {
    if (!this.props.modalIsOpen) {
      return null;
    }
    return (
      <div id="modalBG" className="modal-background" onClick={e => this.toggleModal(e)}>
        <div className="modal-container">{this.props.children}</div>
      </div>
    );
  }
}
