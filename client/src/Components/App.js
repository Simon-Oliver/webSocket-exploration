import React from 'react';
import './App.css';
import Login from './Test/Login';
import IsAuth from './Test/IsAuth';
import Register from './Test/Register';
import AddItem from './Test/AddItem';

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './Test/PrivatRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth" component={IsAuth}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <PrivateRoute path="/items" component={AddItem}></PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
