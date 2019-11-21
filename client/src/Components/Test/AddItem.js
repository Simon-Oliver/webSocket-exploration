import React, { Component } from 'react';

export default class AddItem extends Component {
  state = {
    item: '',
    price: '',
    options: ['Rare', 'Medium'],
    newOption: ''
  };

  //id: 1, item: 'Beef', price: '15', options: ['Rare', 'Medium Rare', 'Well Done']

  toggleModal = e => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen
    }));
  };

  onInputChange = e => {
    const key = e.target.id;
    const data = e.target.value;
    this.setState(prevState => ({ ...prevState, [key]: data }));
  };

  renderList = array => {
    return array.map(e => (
      <div class="collection-item">
        <span class="new badge red" data-badge-caption="" onClick={e => this.handleDeleteOption(e)}>
          Delete
        </span>
        {e}
      </div>
    ));
  };

  handleDeleteOption = e => {
    const { options } = this.state;
    const option = e.target.nextSibling.data;
    const newOptions = options.filter(e => e != option);
    this.setState(prev => ({ ...prev, options: [...newOptions] }));
  };

  handleAdd = option => {
    const { options } = this.state;
    const isInList = options.includes(option);
    if (option.length && !isInList) {
      this.setState(prev => ({ ...prev, options: [...prev.options, option], newOption: '' }));
    }
  };

  render() {
    return (
      <div className="container">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={e => this.onInputChange(e)}
                id="item"
                type="text"
                className="validate"
                value={this.state.item}
              />
              <label htmlFor="item">Item Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={e => this.onInputChange(e)}
                id="price"
                type="number"
                step="0.01"
                className="validate"
                value={this.state.price}
              />
              <label htmlFor="price">Price</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={e => this.onInputChange(e)}
                id="newOption"
                type="text"
                className="validate"
                value={this.state.newOption}
              />
              <label htmlFor="options">Option:</label>
            </div>
            <div className="input-field">
              <a
                className="waves-effect waves-light btn-small"
                onClick={() => this.handleAdd(this.state.newOption)}
              >
                Add Option
              </a>
            </div>
          </div>

          {this.state.options.length ? (
            <div>
              <label htmlFor="options">Options:</label>
              <div class="collection" id="options">
                {this.renderList(this.state.options)}
              </div>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}
