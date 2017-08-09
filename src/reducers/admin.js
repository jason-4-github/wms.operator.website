import {
  LIST_ISSUE_REQUEST,
  LIST_ISSUE_SUCCESS,
  LIST_ISSUE_FAILURE,
  LIST_ISSUE_DETAIL_REQUEST,
  LIST_ISSUE_DETAIL_SUCCESS,
  LIST_ISSUE_DETAIL_FAILURE,
  LIST_RECEIVEDETAILS_REQUEST,
  LIST_RECEIVEDETAILS_SUCCESS,
  LIST_RECEIVEDETAILS_FAILURE,
  LIST_MO_REQUEST,
  LIST_MO_SUCCESS,
  LIST_MO_FAILURE,
  LIST_MO_DETAIL_REQUEST,
  LIST_MO_DETAIL_SUCCESS,
  LIST_MO_DETAIL_FAILURE,
} from '../constants/actionTypes';

const initialState = {
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ISSUE_REQUEST:
    case LIST_ISSUE_SUCCESS:
    case LIST_ISSUE_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_ISSUE_DETAIL_REQUEST:
    case LIST_ISSUE_DETAIL_SUCCESS:
    case LIST_ISSUE_DETAIL_FAILURE:
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
    case LIST_MO_REQUEST:
    case LIST_MO_SUCCESS:
    case LIST_MO_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_MO_DETAIL_REQUEST:
    case LIST_MO_DETAIL_SUCCESS:
    case LIST_MO_DETAIL_FAILURE:
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
