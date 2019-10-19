import React from 'react';
import Modal from './Components/Modals/Modal';

export default function TestModal() {
  return (
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
        <button className="btn waves-effect red darken-3 waves-light" name="action">
          Delete
        </button>
      </form>
    </Modal>
  );
}
