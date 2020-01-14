import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
const client = new W3CWebSocket('ws://192.168.1.3:8080');

class PrivateRoute extends React.Component {
  state = {
    loaded: false,
    isAuth: false,
    message: ''
  };

  componentDidMount() {
    client.onopen = socket => {
      console.log('WebSocket Client Connected', socket);
    };

    fetch('/auth', {
      method: 'POST',
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(data => this.setState(prevState => ({ ...prevState, ...data, loaded: true })))
      .then(() => {
        this.props.dispatch({ type: 'SET_USER', payload: { ...this.state } });
      })
      .catch(err => console.log('something went wrong', err));
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, isAuth, message } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props => {
          return isAuth ? (
            <Component {...props} client={client} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                message
              }}
            />
          );
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(PrivateRoute);
