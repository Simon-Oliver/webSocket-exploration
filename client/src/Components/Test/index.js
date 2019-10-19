import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default class Test extends Component {
  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = message => {
      console.log(message);
    };
  }

  render() {
    return (
      <div class="row">
        <div class="input-field col s6">
          <input value="Alvin" id="first_name2" type="text" class="validate" />
          <label class="active" for="first_name2">
            First Name
          </label>
        </div>
        <button class="btn waves-effect waves-light">Click Me</button>
      </div>
    );
  }
}
