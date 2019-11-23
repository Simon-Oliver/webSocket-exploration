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
      <div>
        <p>{e.item}</p>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <h2>Items:</h2>
        {this.renderList()}
      </div>
    );
  }
}
