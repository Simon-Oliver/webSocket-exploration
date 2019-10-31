import React from 'react';
import { Redirect } from 'react-router-dom';

class IsAuth extends React.Component {
  state = {
    isAuth: false,
    redirect: ''
  };

  componentDidMount() {
    fetch('/auth', {
      method: 'POST',
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(data => this.setState(prevState => ({ ...prevState, ...data })));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return <div> {this.state.isAuth ? <p>Is Authenticated</p> : <p>Not logged in</p>}</div>;
  }
}

export default IsAuth;
