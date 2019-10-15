import React, { Component } from 'react';
import './ItemSelection.css';
import Items from './Items';
import OrderItems from './OrderItems';

export default class ItemSelection extends Component {
  state = {
    items: [
      { id: 1, item: 'Beef', price: '15', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 2, item: 'Duck', price: '12', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 3, item: 'Lamb', price: '23', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 4, item: 'Apple', price: '17', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 5, item: 'King Fish', price: '45', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 6, item: 'Thuna', price: '63', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 7, item: 'Cheek', price: '33', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 8, item: 'Pork', price: '26', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 9, item: 'Corn', price: '11', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 10, item: 'Quail', price: '43', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 11, item: 'Caviar', price: '52', options: ['Rare', 'Medium Rare', 'Well Done'] },
      { id: 12, item: 'Salad', price: '8', options: ['Rare', 'Medium Rare', 'Well Done'] }
    ],
    order: [
      { qnt: 4, id: 12, item: 'Salad', price: '8', options: ['Rare', 'Medium Rare', 'Well Done'] }
    ]
  };

  handleItemClick = e => {
    const newItem = this.state.items.filter(item => item.id === Number(e.target.id))[0];
    const itemInOrder = this.state.order.filter(item => item.id === Number(e.target.id)).length
      ? true
      : false;

    if (itemInOrder) {
      const order = this.state.order;
      const indexOfUpdate = this.state.order.findIndex(item => item.id === Number(e.target.id));
      order[indexOfUpdate].qnt += 1;
      this.setState({ order: [...order] });
    } else {
      newItem.qnt = 1;
      this.setState(prevState => ({ order: [...prevState.order, newItem] }));
    }
  };

  render() {
    return (
      <div className="select-order-container-grid">
        <div className="select-order-left">
          <div className="order-container">
            <Items order={this.state.order}></Items>
          </div>
        </div>
        <div className="select-order-right">
          <OrderItems
            handleItemClick={this.handleItemClick}
            OrderItems={this.state.items}
          ></OrderItems>
        </div>
      </div>
    );
  }
}
