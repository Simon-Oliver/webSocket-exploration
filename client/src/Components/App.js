import React from 'react';
import './App.css';
import Login from './Test/Login';
import IsAuth from './Test/IsAuth';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/auth" component={IsAuth}></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;
