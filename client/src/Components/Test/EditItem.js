import React, { Component } from 'react';
import Modal from '../Modals/Modal';
import AdddItem from './AddItem';

export default class EditItem extends Component {
  render() {
    return (
      <div>
        <h3>Edit Form</h3>
        <Modal modalIsOpen={this.props.modalIsOpen} toggle={this.props.toggle}>
          <AdddItem
            updateState={this.props.updateState}
            isEdit={true}
            item={this.props.item}
            toggle={this.props.toggle}
          ></AdddItem>
        </Modal>
      </div>
    );
  }
}
