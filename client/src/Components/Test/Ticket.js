import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.3:8080');

export default class Ticket extends React.Component {
  state = {
    userName: '',
    userID: '',
    order: []
  };

  componentDidMount() {
    client.onopen = socket => {
      console.log('WebSocket Client Connected', socket.id);
    };
    client.onmessage = message => {
      const json = JSON.parse(message.data);
      this.addOrder(json.data);
      //console.log(JSON.parse(message.data));
    };

    fetch('/order', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ order: data.items });
      });
  }

  addOrder(order) {
    console.log(order);
    this.setState({ order });
  }

  renderList(array) {
    return array.map(e => <li>{e.name}</li>);
  }

  render() {
    return (
      <div>
        <ul>{this.renderList(this.state.order)}</ul>
      </div>
    );
  }
}
