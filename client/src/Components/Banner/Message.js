import React from 'react';
import './Banner.css';
import { Message } from 'semantic-ui-react';

class MessageBanner extends React.Component {
  render() {
    return (
      <Message warning>
        <Message.Header>{this.props.message}</Message.Header>
      </Message>
    );
  }
}

export default MessageBanner;
