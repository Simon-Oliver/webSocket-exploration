import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button, Label, Icon, Segment, List, Header } from 'semantic-ui-react';
//import { connect } from 'react-redux';

class ItemForm extends Component {
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
      <Segment>
        <Container>
          <Icon floated="left" link name="x" onClick={e => this.handleDeleteOption(e)} />
          {e}
        </Container>
      </Segment>
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
      <Container>
        <Segment>
          <Form>
            <Form.Group>
              <Form.Field width={12} required>
                <label>Item Name</label>
                <input
                  id="item"
                  onChange={e => this.onInputChange(e)}
                  value={this.state.item}
                  type="text"
                  placeholder="Item Name"
                />
              </Form.Field>
              <Form.Field width={4} required>
                <label>Price</label>
                <input
                  onChange={e => this.onInputChange(e)}
                  id="price"
                  type="number"
                  step="0.01"
                  className="validate"
                  value={this.state.price}
                  placeholder="Price"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={16}>
                <label>Option:</label>
                <input
                  onChange={e => this.onInputChange(e)}
                  id="newOption"
                  type="text"
                  value={this.state.newOption}
                />
              </Form.Field>
              <Form.Button
                width={2}
                floated="right"
                label="&nbsp;"
                onClick={() => this.handleAdd(this.state.newOption)}
              >
                Add Item
              </Form.Button>
            </Form.Group>
            {this.state.options.length ? (
              <Segment basic>
                <Segment.Group>{this.renderList(this.state.options)}</Segment.Group>
              </Segment>
            ) : null}
            <Button positive onClick={e => this.handleOnSave(e)}>
              Save
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     userName: state.user.userName,
//     userID: state.user.userID
//   };
// };

// export default connect(mapStateToProps)(AddItem);
export default ItemForm;
