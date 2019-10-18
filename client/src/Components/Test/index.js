import React, { Component } from 'react';
import '../Modals/Modal/Modal.css';

import Modal from '../Modals/Modal';
import { toggleState, updateObjById } from '../../helper';

export default class Test extends Component {
  state = {
    showModal: false,
    item: [
      { id: 1, name: 'Replace Me', job: 'Nothing' },
      { id: 2, name: 'Dont touch me', job: 'VIP' },
      { id: 3, name: 'Mr. Important', job: 'CEO' }
    ],
    selected: {}
  };

  //Pass id of item and new data as object
  updateOrder = updateObjById('item');

  componentDidMount() {
    this.setState(this.updateOrder(1, { id: 1, name: 'test' }));
  }

  toggle = () => {
    this.setState(toggleState('showModal'));
    this.setState(this.updateOrder(this.state.selected.id, this.state.selected));
  };

  selectItem(id) {
    const item = this.state.item.filter(e => e.id === Number(id));
    console.log(item);
    this.setState({ selected: item[0] });
    this.toggle();
  }

  handleOnChange(e) {
    const { id, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      selected: { ...prevState.selected, [id]: value }
    }));
  }

  onModalClose(id, update) {
    this.setState(this.updateOrder(id, update));
    this.toggle();
  }

  renderList(arr) {
    return arr.map(e => (
      <div id={e.id} className="input" onClick={e => this.selectItem(e.target.id)}>
        <p>{e.name}</p>
        <p>{e.job}</p>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <h1>Test Component</h1>
        {this.renderList(this.state.item)}
        <p>This component is for testing.</p>
        <Modal toggle={this.toggle} show={this.state.showModal}>
          <p>Modal</p>
          <form
            className="col s12"
            onChange={e => {
              this.handleOnChange(e);
            }}
            //onSubmit={e => this.handleOnSubmit(e)}
          >
            <div className="row modal-row">
              <div className="input-field col s3">
                <input id="job" type="text" className="validate" value={this.state.selected.job} />
                <label className="active" htmlFor="orderCount">
                  Amount
                </label>
              </div>
              <div className="input-field col s9">
                <input
                  id="name"
                  type="text"
                  className="validate"
                  value={this.state.selected.name}
                  readonly="readonly"
                />
                <label className="active" htmlFor="orderItem">
                  Order Title
                </label>
              </div>
            </div>
            <button class="btn waves-effect red darken-3 waves-light" name="action">
              Delete
            </button>
          </form>
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
