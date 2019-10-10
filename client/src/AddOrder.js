import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.11:8000');

class AddOrder extends React.Component {
  state = {
    newOrder: {}
  };

  handleOnChange = e => {
    const key = e.target.id;
    const data = e.target.value;
    this.setState({ newOrder: { [key]: data } });
  };

  render() {
    return (
      <div>
        <div className="row">
          <form className="col s12" onChange={e => this.handleOnChange(e)}>
            <div className="row">
              <div className="input-field col s6">
                <input id="orderItem" type="text" className="validate" />
                <label htmlFor="orderItem">Order Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input id="orderCount" type="number" className="validate" />
                <label htmlFor="orderCount">Amount</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddOrder;
