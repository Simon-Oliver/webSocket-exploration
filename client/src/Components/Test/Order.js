import React from 'react';
import Itemselection from '../Order/ItemSelection';
import { connect } from 'react-redux';

class Order extends React.Component {
  state = {
    isAuth: false,
    redirect: '',
    name: '',
    orderID: '',
    orderFrom: '',
    tableNum: '',
    notes: '',
    orderIn: '',
    orderOut: ''
  };

  onInputChange = e => {
    const { id, value } = e.target;

    this.setState(prevState => ({ ...prevState, [id]: value }));
  };

  render() {
    return (
      <div>
        <div>
          <Itemselection client={this.props.client}></Itemselection>
        </div>
      </div>
    );
  }
}

export default Order;
