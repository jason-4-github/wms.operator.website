import {
  LIST_ISSUE_REQUEST,
  LIST_ISSUE_SUCCESS,
  LIST_ISSUE_FAILURE,
  LIST_ISSUE_DETAIL_REQUEST,
  LIST_ISSUE_DETAIL_SUCCESS,
  LIST_ISSUE_DETAIL_FAILURE,
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
    default:
      return {
        ...state,
      };
  }
};

export default admin;
