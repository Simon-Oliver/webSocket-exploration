import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// get state from local storage or return undefined
// const persistedState = localStorage.getItem('reduxState')
//   ? JSON.parse(localStorage.getItem('reduxState'))
//   : undefined;

// const store = createStore(rootReducer, persistedState, storeEnhancers(applyMiddleware(thunk)));
const store = createStore(rootReducer, storeEnhancers());

// set localstorage every time state is changed
// store.subscribe(() => {
//   localStorage.setItem('reduxState', JSON.stringify(store.getState()));
// });

export default store;
