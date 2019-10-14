import React, { Component } from 'react';
import './OrderItems.css';

export default class OrderItems extends Component {
  renderList = arr => {
    return arr.map(item => (
      <div key={item.id} className="order-item-container">
        <div id={item.id} onClick={e => this.props.handleItemClick(e)} className="item-card">
          {item.item}
        </div>
      </div>
    ));
  };

  render() {
    return <div className="order-grid">{this.renderList(this.props.OrderItems)}</div>;
  }
}
