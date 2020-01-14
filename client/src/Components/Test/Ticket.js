import React from 'react';
import { Card } from 'semantic-ui-react';
// import { w3cwebsocket as W3CWebSocket } from 'websocket';
// const client = new W3CWebSocket('ws://192.168.1.3:8080');

export default class Ticket extends React.Component {
  state = {
    userName: '',
    userID: '',
    order: []
  };

  componentDidMount() {
    this.props.client.onmessage = message => {
      const json = JSON.parse(message.data);
      this.addOrder(json.data);
      console.log(JSON.parse(message.data));
    };

    fetch('/order', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ order: data.items });
      });
  }

  // componentWillUnmount() {
  //   this.props.client.close();
  // }

  addOrder(order) {
    console.log(order);
    this.setState({ order });
  }

  renderList(array) {
    console.log(this.state.order);
    return array.map(e => (
      <Card key={e._id}>
        <Card.Content>
          <Card.Header content={`Table: ${e.tableNum}`} />
          <Card.Meta content={`Order by: ${e.name}`} />
          <Card.Description>
            <div>
              {e.orderItems.map(e => (
                <div key={e._id}>{`${e.qnt}x ${e.item}`}</div>
              ))}
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    ));
  }

  render() {
    return (
      <Card.Group>
        {this.state.order ? <ul>{this.renderList(this.state.order)}</ul> : null}
      </Card.Group>
    );
  }
}
