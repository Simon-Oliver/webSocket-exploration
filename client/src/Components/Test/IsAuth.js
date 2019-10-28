import React from 'react';

class IsAuth extends React.Component {
  state = {
    isAuth: false
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
    return <div> {this.state.isAuth ? <p>Is Authenticated</p> : <p>Not logged in</p>}</div>;
  }
}

export default IsAuth;
