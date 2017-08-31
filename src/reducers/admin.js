import {
  LIST_RECEIVE_REQUEST,
  LIST_RECEIVE_SUCCESS,
  LIST_RECEIVE_FAILURE,
  LIST_RECEIVEDETAILS_REQUEST,
  LIST_RECEIVEDETAILS_SUCCESS,
  LIST_RECEIVEDETAILS_FAILURE,
  LIST_RACKINFOS_REQUEST,
  LIST_RACKINFOS_SUCCESS,
  LIST_RACKINFOS_FAILURE,
  LIST_RACKNAME_REQUEST,
  LIST_RACKNAME_SUCCESS,
  LIST_RACKNAME_FAILURE,
  LIST_SCANDATA_REQUEST,
  LIST_SCANDATA_SUCCESS,
  LIST_SCANDATA_FAILURE,
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
    case LIST_RECEIVEDETAILS_REQUEST:
    case LIST_RECEIVEDETAILS_SUCCESS:
    case LIST_RECEIVEDETAILS_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_RACKINFOS_REQUEST:
    case LIST_RACKINFOS_SUCCESS:
    case LIST_RACKINFOS_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_RACKNAME_REQUEST:
    case LIST_RACKNAME_SUCCESS:
    case LIST_RACKNAME_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_SCANDATA_REQUEST:
    case LIST_SCANDATA_SUCCESS:
    case LIST_SCANDATA_FAILURE:
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
