import React, { Component } from 'react';
import '../Modals/Modal/Modal.css';

import Modal from '../Modals/Modal';
import { toggleState, updateObjById } from '../../helper';

export default class Test extends Component {
  state = {
    showModal: true
  };

  updateOrder = updateObjById('order');

  componentDidMount() {
    this.setState(this.updateOrder(12, 'test'));
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
