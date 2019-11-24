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
      <li key={e.item} class="collection-item">
        <span class="title">{e.item}</span>
        <p>${e.price}</p>
        <a href="#!" class="secondary-content">
          edit
        </a>
      </li>
    ));
  }

  render() {
    return (
      <div className="container">
        <h2>Items:</h2>
        <ul class="collection">{this.renderList()}</ul>;
      </div>
    );
  }
}
