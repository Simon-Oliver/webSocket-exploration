import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.11:8000');

class AddOrder extends React.Component {
  state = {
    orders: []
  };

  render() {
    return (
      <div>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input placeholder="Placeholder" id="first_name" type="text" class="validate" />
                <label for="first_name">First Name</label>
              </div>
              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate" />
                <label for="last_name">Last Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="password" type="password" class="validate" />
                <label for="password">Password</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="email" type="email" class="validate" />
                <label for="email">Email</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddOrder;
