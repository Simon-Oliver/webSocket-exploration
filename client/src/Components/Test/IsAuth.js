import React from 'react';
import { Redirect } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.11:8080');
import jwt from 'jsonwebtoken';

class IsAuth extends React.Component {
  state = {
    isAuth: false,
    redirect: ''
  };

  componentDidMount() {
    fetch('/auth', {
      method: 'POST',
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(data => this.setState(prevState => ({ ...prevState, ...data })))
      .then(() => client.send(JSON.stringify({ test: 'Test' })));

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = message => {
      console.log(message);
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return <div> {this.state.isAuth ? <p>Is Authenticated</p> : <p>Not logged in</p>}</div>;
  }
}

export default IsAuth;
