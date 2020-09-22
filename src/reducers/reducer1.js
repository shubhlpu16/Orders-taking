export const DEFAULT_STORE = {
  storeData: [],
};

export const ACTION_TYPES = {
  addStore: 'addStore',
};

export default function storeAdd(state = DEFAULT_STORE, action) {
  switch (action.type) {
    case ACTION_TYPES.addStore: {
      return { storeData: [...state.storeData, ...action.payload] };
    }

    default:
      return state;
  }
}
