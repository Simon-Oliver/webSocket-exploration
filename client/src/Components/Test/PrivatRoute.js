import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
  state = {
    loaded: false,
    isAuth: false,
    message: ''
  };

  componentDidMount() {
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
            <Component {...props} />
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
