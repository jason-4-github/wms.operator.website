import {
  LIST_RECEIVE_REQUEST,
  LIST_RECEIVE_SUCCESS,
  LIST_RECEIVE_FAILURE,
  LIST_DELETEFORMDATA_REQUEST,
  LIST_DELETEFORMDATA_SUCCESS,
  LIST_DELETEFORMDATA_FAILURE,
  LIST_DELETEITEMS_REQUEST,
  LIST_DELETEITEMS_SUCCESS,
  LIST_DELETEITEMS_FAILURE,
} from '../constants/actionTypes';

const initialState = {
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case LIST_RECEIVE_REQUEST:
    case LIST_RECEIVE_SUCCESS:
    case LIST_RECEIVE_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_DELETEFORMDATA_REQUEST:
    case LIST_DELETEFORMDATA_SUCCESS:
    case LIST_DELETEFORMDATA_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_DELETEITEMS_REQUEST:
    case LIST_DELETEITEMS_SUCCESS:
    case LIST_DELETEITEMS_FAILURE:
      return {
        ...state,
        ...action,
      };
    default:
      return {
        ...state,
      };
  }
};

export default admin;
