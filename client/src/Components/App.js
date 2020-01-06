import React from 'react';
import './App.css';
import Login from './Test/Login';
import Order from './Test/Order';
import Register from './Test/Register';
import ItemForm from './Test/ItemForm';
import Items from './Test/Items';
import NavMenu from './Test/Menu';
import SemanticTest from './Test/SemanticTest';
import Ticket from './Test/Ticket';

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PrivateRoute from './Test/PrivatRoute';

function App() {
  return (
    <Container className="App">
      <BrowserRouter>
        <NavMenu></NavMenu>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/test" component={SemanticTest}></Route>
          <PrivateRoute exact path="/order" component={Order}></PrivateRoute>
          <PrivateRoute path="/items/add" component={ItemForm}></PrivateRoute>
          <PrivateRoute path="/items" component={Items}></PrivateRoute>
          <PrivateRoute path="/ticket" component={Ticket}></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
