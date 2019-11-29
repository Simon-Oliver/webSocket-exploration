import React, { Component } from 'react';
import './Items.css';

export default class Items extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    fetch('/items')
      .then(res => res.json())
      .then(data => this.setState({ items: data.items }));
  }

  updateState() {
    fetch('/items')
      .then(res => res.json())
      .then(data => this.setState({ items: data.items }));
  }

  handleDelete(e) {
    console.log(e.target.parentElement.id);
    const data = JSON.stringify({ id: e.target.parentElement.id });
    fetch('/items', {
      method: 'DELETE',
      body: data,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => this.updateState());
  }

  renderList() {
    const { items } = this.state;
    console.log(items);
    return items.map(e => (
      <li id={e._id} key={e.item} className="collection-item flex-container">
        <span className="title bold">{e.item}</span>
        <span className="price">${e.price}</span>
        <span className="options">
          Options:
          {e.options.map(option => (
            <span key={option} className="option">
              {option}
            </span>
          ))}
        </span>

        <span
          className="new badge red item-button"
          data-badge-caption="Delete"
          onClick={e => this.handleDelete(e)}
        ></span>
        <span className="new badge orange item-button" data-badge-caption="Edit"></span>
      </li>
    ));
  }

  render() {
    return (
      <div className="container">
        <h4>Menu Items:</h4>
        <ul className="collection">{this.renderList()}</ul>
      </div>
    );
  }
}
