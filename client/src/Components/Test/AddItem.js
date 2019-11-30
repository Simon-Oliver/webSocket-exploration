import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AddItem extends Component {
  state = {
    item: '',
    price: '',
    options: [],
    newOption: '',
    redirect: '',
    isEdit: false,
    modalIsOpen: false
  };

  //id: 1, item: 'Beef', price: '15', options: ['Rare', 'Medium Rare', 'Well Done']

  componentDidMount() {
    if (this.props.isEdit) {
      this.setState({ ...this.props.item, modalIsOpen: true, isEdit: true });
    }
    console.log(this.state);
  }

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
    const newOptions = options.filter(e => e !== option);
    this.setState(prev => ({ ...prev, options: [...newOptions] }));
  };

  handleAdd = option => {
    const { options } = this.state;
    const isInList = options.includes(option);
    if (option.length && !isInList) {
      this.setState(prev => ({ ...prev, options: [...prev.options, option], newOption: '' }));
    }
  };

  handleOnSave = e => {
    e.preventDefault();
    const { _id, item, price, options } = this.state;
    const data = JSON.stringify({ item, price, options, _id });

    const method = this.state.isEdit ? 'PUT' : 'POST';

    console.log(method);
    console.log(this.state);

    fetch('/items', {
      method,
      body: data,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (this.state.modalIsOpen) {
          console.log('Toggle fired');
          this.setState({ redirect: data.redirect });
          this.props.toggle();
          this.props.updateState();
        }
        this.setState({ redirect: data.redirect });
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
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
              <label className={this.state.modalIsOpen ? 'active' : ''} htmlFor="item">
                Item Name
              </label>
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
              <label className={this.state.modalIsOpen ? 'active' : ''} htmlFor="price">
                Price
              </label>
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
              <label className={this.state.modalIsOpen ? 'active' : ''} htmlFor="newOption">
                Option:
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <div
                className="waves-effect waves-light btn-small"
                onClick={() => this.handleAdd(this.state.newOption)}
              >
                Add Option
              </div>
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
          <div className="row">
            <div className="input-field col s12 center-align">
              <button
                className="waves-effect waves-light btn-large"
                onClick={e => this.handleOnSave(e)}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.user.userName,
    userID: state.user.userID
  };
};

export default connect(mapStateToProps)(AddItem);
