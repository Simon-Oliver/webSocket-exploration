import React from 'react';
import Itemselection from '../Order/ItemSelection';
import '../Test/IsAuth.css';
import { Redirect } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { connect } from 'react-redux';
const client = new W3CWebSocket('ws://192.168.1.114:8080');

class IsAuth extends React.Component {
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
    fetch('/auth', {
      method: 'POST',
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(data => this.setState(prevState => ({ ...prevState, ...data })))
      .then(() => {
        this.props.dispatch({ type: 'SET_USER', payload: { ...this.state } });
      })
      .catch(err => console.log('something went wrong', err));

    client.onopen = socket => {
      console.log('WebSocket Client Connected', socket.id);
    };
    client.onmessage = message => {
      console.log(message);
    };
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <div className="IsAuth">
        {this.state.isAuth ? (
          <div>
            <h3>Is auth</h3>
            <p>Hi {this.state.userName}</p>
            <Itemselection></Itemselection>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(IsAuth);
