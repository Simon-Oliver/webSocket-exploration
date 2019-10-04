import React from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.102:8000');

class Websocket extends React.Component{
    componentDidMount() {
        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
          console.log(message);
        };
      }
    render(){
        return(
            <div>
            <h2>Test</h2>
            </div>
        )
    }
}

export default Websocket;