import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://127.0.0.1:8000');

export default class Test extends Component {
  state = {
    id: '',
    name: '',
    arr: []
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
    fetch('/home')
      .then(res => res.text())
      .then(data => console.log(data));
  }

  sendMessage = () => {
    const data = JSON.stringify({ data: { ...this.state } });
    client.send(data);
    this.setState({ name: '' });
  };

  onInputChange = e => {
    const { id, value } = e.target;

    this.setState(prevState => ({ ...prevState, [id]: value }));
  };

  renderList = () => {
    return this.state.arr.map(e => <p>{e.name}</p>);
  };

  render() {
    return (
      <div className="row">
        <div className="input-field col s2">
          <input
            onChange={e => this.onInputChange(e)}
            value={this.state.id}
            id="id"
            type="text"
            className="validate"
          />
          <label className="active" htmlFor="id">
            ID
          </label>
        </div>
        <div className="input-field col s6">
          <input
            onChange={e => this.onInputChange(e)}
            value={this.state.name}
            id="name"
            type="text"
            className="validate"
          />
          <label className="active" htmlFor="first_name2">
            First Name
          </label>
        </div>
        <button onClick={this.sendMessage} className="btn waves-effect waves-light">
          Click Me
        </button>
        {this.renderList()}
      </div>
    );
  }
}
