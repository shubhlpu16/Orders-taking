import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// for localStorage createStore with loadState in localStorage
// const store = createStore(rootReducer,loadState(),applyMiddleware(thunk));
// When store updates save the state in localStorage
// store.subscribe(() => {
//   saveState({
//     storeData: store.getState().storeData,
//   });
// });
const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store); //eslint-disable-line
});

export default store;
