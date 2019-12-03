import React, { Component } from 'react';
import { toggleState } from '../../helper';
import './Items.css';
import EditItem from './EditItem';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Items extends Component {
  state = {
    items: [],
    modalIsOpen: false,
    selectedItem: {}
  };

  componentDidMount() {
    fetch('/items')
      .then(res => res.json())
      .then(data => this.setState({ items: data.items }));
  }

  updateState = () => {
    fetch('/items')
      .then(res => res.json())
      .then(data => this.setState({ items: data.items }));
  };

  handleDelete(e) {
    console.log(e.target.id);
    const data = JSON.stringify({ id: e.target.id });
    fetch('/items', {
      method: 'DELETE',
      body: data,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => this.updateState());
  }

  toggle = e => {
    if (!e) {
      this.setState(toggleState('modalIsOpen'));
    } else {
      const selected = this.state.items.filter(item => item._id === e.target.parentElement.id)[0];
      console.log(selected);
      this.setState({ selectedItem: selected }, () => {
        this.setState(toggleState('modalIsOpen'));
      });
    }
  };

  renderList() {
    const { items } = this.state;
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
          id={e._id}
          className="new badge red item-button"
          data-badge-caption="Delete"
          onClick={e => this.handleDelete(e)}
        ></span>
        <span
          className="new badge orange item-button"
          data-badge-caption="Edit"
          onClick={this.toggle}
        ></span>
      </li>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.state.modalIsOpen ? (
          <EditItem
            item={this.state.selectedItem}
            modalIsOpen={this.state.modalIsOpen}
            toggle={this.toggle}
            updateState={this.updateState}
          ></EditItem>
        ) : null}
        <h4>Menu Items:</h4>
        <ul className="collection">{this.renderList()}</ul>
        <Link to="/items/add">
          <Button primary>Add Item</Button>
        </Link>
      </div>
    );
  }
}
