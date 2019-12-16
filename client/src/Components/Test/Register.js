import React, { Component } from 'react';
// import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Redirect } from 'react-router-dom';
import { Button, Form, Container, Grid, Segment, Message, Icon } from 'semantic-ui-react';

// const client = new W3CWebSocket('ws://192.168.1.114:8080');

export default class Register extends Component {
  state = {
    userName: '',
    password: '',
    isLoggedIn: false,
    redirect: ''
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

  sendMessage = e => {
    e.preventDefault();
    const data = JSON.stringify({ ...this.state });
    // client.send(data);
    fetch('/register', {
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

    this.setState(prevState => ({ ...prevState, [id]: value }));
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
              <Form>
                <Form.Field>
                  <label htmlFor="userName">User Name</label>
                  <input
                    onChange={e => this.onInputChange(e)}
                    placeholder="User Name"
                    id="userName"
                    type="text"
                    className="validate"
                    value={this.state.userName}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={e => this.onInputChange(e)}
                    placeholder="Password"
                    id="password"
                    type="password"
                    className="validate"
                    value={this.state.password}
                  />
                </Form.Field>
                <Container textAlign="center" basic>
                  <Button positive onClick={e => this.sendMessage(e)}>
                    Create
                  </Button>
                  <p>
                    Already have an account? <a href="/login">Login</a>
                  </p>
                </Container>
              </Form>
              <Message attached="bottom" warning>
                <Icon name="help" />
                Already signed up?&nbsp;<a href="/login">Login here</a>&nbsp;instead.
              </Message>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}
