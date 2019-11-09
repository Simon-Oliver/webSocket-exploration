import React from 'react';
import { Redirect } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import jwt from 'jsonwebtoken';
const client = new W3CWebSocket('ws://192.168.1.114:8080');

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
      .then(() => client.send(JSON.stringify(this.state)))
      .catch(err => console.log('something went wrong', err));

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
    return (
      <div>
        {this.state.isAuth ? (
          <div className="container">
            <h3>Is auth</h3>
          </div>
        ) : null}
      </div>
    );
  }
}

export default IsAuth;
