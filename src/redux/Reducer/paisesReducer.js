import {GET_PAISES} from '../types/typesPaises'

const initialState = {
paises: [],

};

const paisesReducer = (state = initialState, action) => {
switch (action.type) {
case GET_PAISES:
  return {
    ...state,
    paises:action.payload
  };

default:
  return {
    ...state,
  };
}
};

export default paisesReducer;