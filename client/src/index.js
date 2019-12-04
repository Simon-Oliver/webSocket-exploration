import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
// import 'materialize-css/dist/css/materialize.min.css';
import 'semantic-ui-css/semantic.min.css';

import { Provider } from 'react-redux';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
