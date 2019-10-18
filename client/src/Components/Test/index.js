import React, { Component } from 'react';
import '../Modals/Modal/Modal.css';

import Modal from '../Modals/Modal';
import { toggleState, updateObjById } from '../../helper';

export default class Test extends Component {
  state = {
    showModal: true,
    item: [
      { id: 1, name: 'Replace Me', job: 'Nothing' },
      { id: 2, name: 'Dont touch me', job: 'VIP' },
      { id: 3, name: 'Mr. Important', job: 'CEO' }
    ]
  };

  //Pass id of item and new data as object
  updateOrder = updateObjById('item');

  componentDidMount() {
    this.setState(this.updateOrder(1, { id: 1, name: 'test' }));
  }

  toggle = () => {
    this.setState(toggleState('showModal'));
  };

  render() {
    return (
      <div>
        <h1>Test Component</h1>
        <p onClick={this.toggle}>This component is for testing.</p>
        <Modal toggle={this.toggle} show={this.state.showModal}>
          <p>Modal</p>
        </Modal>
      </div>
    );
  }
}

// const incrementCounter = key => {
//   return function(state) {
//     return { [key]: state[key] };
//   };
// };
