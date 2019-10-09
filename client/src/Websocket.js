import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.11:8000');

class Websocket extends React.Component {
  state = {
    messages: ['Test1', 'Test2']
  };

  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = message => {
      console.log(message.data);
      const data = JSON.parse(message.data);
      console.log(data);
      this.setState(prevState => ({ messages: [...prevState.messages, data.data] }));
    };
  }

  handleBtnClick = e => {
    e.preventDefault();
    const data = e.target[0].value;
    client.send(JSON.stringify({ data: data }));
  };

  renderList = () => {
    const renderList = this.state.messages.map(e => <li key={e}>{e}</li>);
    return renderList;
  };

  render() {
    return (
      <div>
        <h2>Test</h2>
        <form onSubmit={e => this.handleBtnClick(e)}>
          <textarea></textarea>
          <button>Send Event</button>
        </form>
        <ul>{this.renderList()}</ul>
      </div>
    );
  }
}

export default Websocket;
