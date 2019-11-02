import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Redirect } from 'react-router-dom';
import Message from '../Banner/Message'

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default class Login extends Component {
  state = {
    userName: '',
    password: '',
    isLoggedIn: false,
    redirect: '',
    message:''
  };

  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = message => {
      const data = JSON.parse(message.data).data;
      this.setState({ arr: data });
      console.log(data);
    };
  }

  login = e => {
    e.preventDefault();
    const data = JSON.stringify({ ...this.state });
    fetch('/login', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({ ...prevState, ...data, userName: '', password: '' }));
      });
  };

  onInputChange = e => {
    const { id, value } = e.target;

    this.setState(prevState => ({ ...prevState, [id]: value, message:'' }));
  };

  renderList = () => {
    return this.state.arr.map(e => <p>{e.name}</p>);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <div className="container form-container">
      {this.state.message ? <Message message={this.state.message}/>: null}
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={e => this.onInputChange(e)}
                  placeholder="Placeholder"
                  id="userName"
                  type="text"
                  className="validate"
                  value={this.state.userName}
                />
                <label htmlFor="userName">User Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={e => this.onInputChange(e)}
                  id="password"
                  type="password"
                  className="validate"
                  value={this.state.password}
                />
                <label htmlFor="password">Password</label>
              </div>
              <button onClick={e => this.login(e)} className="waves-effect waves-light btn-large">
                Login
              </button>
            </div>
            <p>
              Are you new? <a href="/register">Create an account.</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
