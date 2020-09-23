import produce from 'immer';

export const DEFAULT_STORE = {
  orders: [],
  cart: [],
};

export const ACTION_TYPES = {
  addStore: 'addStore',
  updateCart: 'updateCart',
};

export default function storeAdd(state = DEFAULT_STORE, action) {
  switch (action.type) {
    case ACTION_TYPES.addStore: {
      const newState = produce(state, (draftState) => {
        const keysToUpdate = Object.keys(action.payload);
        keysToUpdate.forEach((key) => {
          draftState[key] = action.payload[key]; //eslint-disable-line
        });
      });
      return newState;
    }

    default:
      return state;
  }
}
