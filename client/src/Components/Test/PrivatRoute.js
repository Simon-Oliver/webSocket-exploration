import React from 'react';
import { Route, Redirect } from 'react-router-dom';

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

export default PrivateRoute;
