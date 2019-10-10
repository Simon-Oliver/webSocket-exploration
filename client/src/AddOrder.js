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
              <div className="input-field col s12">
                <input id="orderTitle" type="text" className="validate" />
                <label htmlFor="orderTitle">Order Title</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddOrder;
