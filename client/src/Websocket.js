import React from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.11:8000');

class Websocket extends React.Component{
    componentDidMount() {
        client.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
          console.log(message);
        };
      }


      handleBtnClick = (e) => {
          e.preventDefault()
          const data = e.target[0].value
          client.send(JSON.stringify({test:data}))
      }

    render(){
        return(
            <div>
            <h2>Test</h2>
            <form onSubmit={(e)=> this.handleBtnClick(e)}>
            <textarea></textarea>
            <button>Send Event</button>
            </form>
            </div>
        )
    }
}

export default Websocket;