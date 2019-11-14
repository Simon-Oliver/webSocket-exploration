import React from 'react';
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
        client.send(JSON.stringify(this.state));
        this.props.dispatch({ type: 'SET_USER', payload: { ...this.state } });
      })
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
      <div className="IsAuth">
        {this.state.isAuth ? (
          <div>
            <h3>Is auth</h3>
            <p>Hi {this.state.userName}</p>
            <div className="container form-container">
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
                    <button
                      onClick={e => this.sendMessage(e)}
                      className="waves-effect waves-light btn-large"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
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
