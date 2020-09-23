import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from '../localStorage';
import rootReducer from '../reducers';

// for localStorage createStore with loadState in localStorage
const store = createStore(rootReducer, loadState(), applyMiddleware(thunk));
// When store updates save the state in localStorage
store.subscribe(() => {
  saveState({
    ordersStore: store.getState().ordersStore,
  });
}, console.log(store.getState())); //eslint-disable-line

export default store;
