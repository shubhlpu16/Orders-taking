import { ACTION_TYPES } from 'reducers/reducer1';

const addStore = (data) => (dispatch) => {
  dispatch({
    type: ACTION_TYPES.addStore,
    payload: data,
  });
};

export default addStore;
