import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Message from '../Banner/Message';
import { Button, Form, Container, Grid, Segment, Header } from 'semantic-ui-react';

export default class Login extends Component {
  state = {
    userName: '',
    password: '',
    isLoggedIn: false,
    redirect: '',
    message: ''
  };

  // componentDidMount() {
  //   client.onopen = () => {
  //     console.log('WebSocket Client Connected');
  //   };
  //   client.onmessage = message => {
  //     const data = JSON.parse(message.data).data;
  //     this.setState({ arr: data });
  //     console.log(data);
  //   };
  // }

  componentDidMount() {
    if (this.props.location.message) {
      this.setState({ message: this.props.location.message });
    }
  }

  login = e => {
    e.preventDefault();
    const data = JSON.stringify({ ...this.state });
    fetch('/login', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({ ...prevState, ...data, userName: '', password: '' }));
      });
  };

  onInputChange = e => {
    const { id, value } = e.target;

    this.setState(prevState => ({ ...prevState, [id]: value, message: '' }));
  };

  renderList = () => {
    return this.state.arr.map(e => <p>{e.name}</p>);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <Container>
        <Grid centered columns={3}>
          <Grid.Column>
            <Segment>
              {this.state.message ? <Message message={this.state.message} /> : null}
              <Form>
                <Form.Field>
                  <label>User Name</label>
                  <input
                    placeholder="User Name"
                    onChange={e => this.onInputChange(e)}
                    id="userName"
                    type="text"
                    value={this.state.userName}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    placeholder="Password"
                    onChange={e => this.onInputChange(e)}
                    id="password"
                    type="password"
                    value={this.state.password}
                  />
                </Form.Field>
                <Container textAlign="center" basic>
                  <Button positive onClick={e => this.login(e)} type="submit">
                    Login
                  </Button>
                  <p>
                    Are you new? <a href="/register">Create an account.</a>
                  </p>
                </Container>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
