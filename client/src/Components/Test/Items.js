import React, { Component } from 'react';

export default class Items extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    fetch('/items')
      .then(res => res.json())
      .then(data => this.setState({ items: data.items }));
  }

  renderList() {
    const { items } = this.state;
    console.log(items);
    return items.map(e => (
      <li key={e.item} className="collection-item flex-container">
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

        <span className="new badge red" data-badge-caption="Delete"></span>
        <span className="new badge orange" data-badge-caption="Edit"></span>
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
