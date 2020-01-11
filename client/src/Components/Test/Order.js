import React from 'react';
import Itemselection from '../Order/ItemSelection';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { connect } from 'react-redux';
const client = new W3CWebSocket('ws://192.168.1.3:8080');

class Order extends React.Component {
  state = {
    isAuth: false,
    redirect: '',
    name: '',
    orderID: '',
    orderFrom: '',
    tableNum: '',
    notes: '',
    orderIn: '',
    orderOut: ''
  };

  componentDidMount() {
    // client.onopen = socket => {
    //   console.log('WebSocket Client Connected', socket.id);
    // };
    // client.onmessage = message => {
    //   console.log(message);
    // };
  }

  onInputChange = e => {
    const { id, value } = e.target;

    this.setState(prevState => ({ ...prevState, [id]: value }));
  };

  sendMessage = e => {
    e.preventDefault();
    client.send(JSON.stringify(this.state));
  };

  render() {
    return (
      <div>
        <div>
          <Itemselection></Itemselection>
        </div>
      </div>
    );
  }
}

export default Order;
