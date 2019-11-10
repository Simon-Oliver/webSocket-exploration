import React from 'react';
import './App.css';
import Login from './Test/Login';
import IsAuth from './Test/IsAuth';
import Register from './Test/Register';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth" component={IsAuth}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
