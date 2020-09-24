import axios from 'axios';
import { ACTION_TYPES } from '../reducers/reducer1';

const addStore = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.addStore,
    payload: data,
  });
};

export const fetchCatalogue = () => async (dispatch) => {
  await axios
    .get('https://shubh-orders-app.herokuapp.com/catalogue')
    .then((response) => {
      dispatch(
        addStore({
          orders: response.data,
        }),
      );
    })
    .catch((err) => {
      console.error(err);
    });
};

export const addCart = (params) => (dispatch) => {
  const { store, order } = params;
  const { cart } = store.getState().ordersStore;
  const cartItems = [...cart];
  const itemId = cartItems.find((e) => e._id === order._id)  //eslint-disable-line
  const items= cartItems.filter((e) => e._id !== order._id); //eslint-disable-line
  const newOrder = { ...itemId, ...order };
  if (itemId) {
    newOrder.quantity += 1;
    newOrder.totalPrice = newOrder.price * newOrder.quantity;
  } else {
    newOrder.quantity = 1;
    newOrder.totalPrice = newOrder.price;
  }
  dispatch(addStore({ cart: [...items, newOrder] }));
};

export const updateCart = (params) => (dispatch) => {
  const { store, product, operator } = params;
  const { cart } = store.getState().ordersStore;
  const cartItems = [...cart];
  const index = cartItems.indexOf(product);
  const newOrder = { ...product };
  if (operator === 'dec') {
    newOrder.quantity -= 1;
  } else {
    newOrder.quantity += 1;
  }
  newOrder.totalPrice = newOrder.price * newOrder.quantity;
  cartItems[index] = newOrder;
  const updatedCart = cartItems.filter((item) => item.quantity !== 0);
  dispatch(addStore({ cart: updatedCart }));
};

export const addUser = (params) => (dispatch) => {
  dispatch(addStore({ user: { ...params } }));
};

export const placeOrder = (params) => async (dispatch) => {
  const { store } = params;
  const { user, cart } = store.getState().ordersStore;
  let totalAmount = 0;
  let totalQuantity = 0;
  cart.forEach((e) => {
    totalAmount += e.totalPrice;
    totalQuantity += e.quantity;
  });
  const formData = {
    userName: `${user.firstName} ${user.lastName}`,
    productCount: cart.length,
    city: user.city.toLowerCase(),
    totalAmount,
    totalQuantity,
  };
  let orderID = '';
  await axios
    .post('https://shubh-orders-app.herokuapp.com/orders', { ...formData })
    .then((response) => {
      orderID = response.data._id; //eslint-disable-line
    })
    .catch((e) => {
      console.error(e);
    });

  dispatch(addStore({ cart: [] }));
  return orderID;
};

export default addStore;
