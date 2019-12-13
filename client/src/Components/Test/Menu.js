import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class NavMenu extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item
          as={Link}
          to="/items"
          name="items"
          active={activeItem === 'items'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="friends"
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
