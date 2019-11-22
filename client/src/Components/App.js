import React from 'react';
import './App.css';
import Login from './Test/Login';
import Order from './Test/Order';
import Register from './Test/Register';
import AddItem from './Test/AddItem';
import Items from './Test/Items';

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './Test/PrivatRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <PrivateRoute exact path="/order" component={Order}></PrivateRoute>
          <PrivateRoute path="/items/add" component={AddItem}></PrivateRoute>
          <PrivateRoute path="/items" component={Items}></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
