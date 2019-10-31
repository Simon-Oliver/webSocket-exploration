import React from 'react';
import './App.css';
import Login from './Test/Login';
import IsAuth from './Test/IsAuth';
import Home from './Home';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <IsAuth></IsAuth>
      </Switch>
    </div>
  );
}

export default App;
