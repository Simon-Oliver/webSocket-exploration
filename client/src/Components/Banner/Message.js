import React from 'react';
import './Banner.css';
import { Message } from 'semantic-ui-react';

class MessageBanner extends React.Component {
  render() {
    return (
      <Message warning>
        <Message.Header>{this.props.message}</Message.Header>
        <p>Visit our registration page, then try again.</p>
      </Message>
    );
  }
}

export default MessageBanner;
