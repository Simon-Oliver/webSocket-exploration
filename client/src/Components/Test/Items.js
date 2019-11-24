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
      <li key={e.item} class="collection-item flex-container">
        <span className="title bold">{e.item}</span>
        <span className="price">${e.price}</span>
        <span className="options">
        Options: {e.options.map(option => (
          <span className='option'>{option}</span>
        )) }
        </span>

        <span class="new badge red" data-badge-caption="Delete"></span>
        <span class="new badge orange" data-badge-caption="Edit"></span>
      </li>
    ));
  }

  render() {
    return (
      <div className="container">
        <h4>Menu Items:</h4>
        <ul class="collection">{this.renderList()}</ul>
      </div>
    );
  }
}
