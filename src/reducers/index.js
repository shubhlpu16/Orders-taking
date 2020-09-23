import { combineReducers } from 'redux';
import storeAdd from './reducer1';

export default combineReducers({
  ordersStore: storeAdd,
});
