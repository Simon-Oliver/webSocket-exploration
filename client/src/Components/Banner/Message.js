import React from 'react';
import './Banner.css';

class Message extends React.Component {
  render() {
    return (
      <div className="error">
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default Message;
