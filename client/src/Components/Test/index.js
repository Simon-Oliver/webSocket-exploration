import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default class Test extends Component {
  state = {};

  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = message => {
      console.log(message);
    };
  }

  sendMessage = () => {
    const data = JSON.stringify({ message: 'TestClient1234' });
    client.send(data);
    console.log(this.state);
  };

  render() {
    return (
      <div className="row">
        <div className="input-field col s6">
          <input value="Alvin" id="first_name2" type="text" className="validate" />
          <label className="active" htmlFor="first_name2">
            First Name
          </label>
        </div>
        <button onClick={this.sendMessage} className="btn waves-effect waves-light">
          Click Me
        </button>
      </div>
    );
  }
}
