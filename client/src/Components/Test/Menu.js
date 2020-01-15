import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavMenu extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleLogout = () => {
    fetch('/logout', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      this.props.dispatch({ type: 'SET_USER', payload: { isAuth: false } });
    });
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
          name="order"
          active={activeItem === 'order'}
          as={Link}
          to="/order"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="ticket"
          active={activeItem === 'ticket'}
          as={Link}
          to="/ticket"
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/login"
            name="logout"
            active={activeItem === 'logout'}
            onClick={this.handleLogout}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.isAuth,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(NavMenu);
