import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  fetch('/auth', {
    method: 'POST',
    credentials: 'same-origin'
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .then()
    .catch(err => console.log('something went wrong', err));
  return (
    <Route
      {...rest}
      render={props => {
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRoute;
