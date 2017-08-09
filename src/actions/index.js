import _ from 'lodash';
import 'whatwg-fetch';

import * as types from '../constants/actionTypes';

const serverConfig = {
  url: 'http://192.168.1.125:4002/apis/operator/',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export const doListReceive = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_RECEIVE_REQUEST,
      listReceiveData: [],
    });
    fetch(`${serverConfig.url}invoiceNumber/q/?invoiceNumber=13253A0685`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.receiveNumber = i.receiveNumber;
        newObj.madeArea = i.madeArea;
        newObj.receiveSequenceNumber = i.receiveSequenceNumber;
        newObj.purchaseNumber = i.purchaseNumber;
        newObj.partsNumber = i.partsNumber;
        newObj.customerPartsNumber = i.customerPartsNumber;
        newObj.quantity = i.quantity;
        newObj.accurateQuantity = i.accurateQuantity;
        newObj.balanceQuantity = i.balanceQuantity;
        newObj.finishTime = i.finishTime;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_RECEIVE_SUCCESS,
        listReceiveData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RECEIVE_FAILURE,
        listReceiveData: [],
      });
    });
  };
};

export const doListReceiveDetails = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_RECEIVEDETAILS_REQUEST,
      listReceiveDetailsData: [],
    });
    fetch(`${serverConfig.url}dataOfPartsNo/q/?dataOfPartsNumber=SD04472JT15&form=receiveDetails`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.partsNumber = i.partsNumber;
        newObj.rackName = i.rackName;
        newObj.rackNumber = i.rackNumber;
        newObj.itemCount = i.itemCount;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_RECEIVEDETAILS_SUCCESS,
        listReceiveDetailsData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RECEIVEDETAILS_FAILURE,
        listReceiveDetailsData: [],
      });
    });
  };
};

export const doListIssueDetail = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_ISSUE_DETAIL_REQUEST,
      listIssueDetailData: [],
    });
    fetch(`${serverConfig.url}dataOfPartsNo/q/?dataOfPartsNumber=partsno004&form=issueDetails`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.partsNumber = i.partsNumber;
        newObj.rackName = i.rackName;
        newObj.rackNumber = i.rackName;
        newObj.itemCount = i.itemCount;
        newObj.inTime = i.inTime;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_ISSUE_DETAIL_SUCCESS,
        listIssueDetailData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_ISSUE_DETAIL_FAILURE,
        listIssueDetailData: [],
      });
    });
  };
};
export const doListMo = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_MO_REQUEST,
      listIssueDetailData: [],
    });
    fetch(`${serverConfig.url}moNumberShowNotFinish/q/?showNotFinish=1`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.moNumber = i.moNumber;
        newObj.issueNumber = i.issueNumber;
        newObj.madeArea = i.madeArea;
        newObj.startTime = i.startTime;
        newObj.wmsOkTime = i.wmsOkTime;
        newObj.lineNumber = i.lineNumber;
        newObj.finishTime = i.finishTime;
        newObj.TR_CD = i.TR_CD;
        newObj.DEPT_CD = i.DEPT_CD;
        newObj.issueDetailNumber = i.issueDetailNumber;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_MO_SUCCESS,
        listIssueDetailData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_MO_FAILURE,
        listIssueDetailData: [],
      });
    });
  };
};

export const doListMoDetail = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_MO_DETAIL_REQUEST,
      listIssueDetailData: [],
    });
    fetch(`${serverConfig.url}moNumber/q/?moNumber=mo003`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.moNumber = i.moNumber;
        newObj.issueNumber = i.issueNumber;
        newObj.madeArea = i.madeArea;
        newObj.startTime = i.startTime;
        newObj.wmsOkTime = i.wmsOkTime;
        newObj.lineNumber = i.lineNumber;
        newObj.finishTime = i.finishTime;
        newObj.TR_CD = i.TR_CD;
        newObj.DEPT_CD = i.DEPT_CD;
        newObj.issueDetailNumber = i.issueDetailNumber;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_MO_DETAIL_SUCCESS,
        listIssueDetailData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_MO_DETAIL_FAILURE,
        listIssueDetailData: [],
      });
    });
  };
};

export const doListRevise = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_REVISE_REQUEST,
      listIssueDetailData: [],
    });
    fetch(`${serverConfig.url}reviseBarcode/q/?vendor=v001&partsNumber=partsno004&dateCode=1717`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.rackName = i.rackName;
        newObj.rackNumber = i.rackNumber;
        newObj.itemName = i.itemName;
        newObj.customerPartsNumber = i.customerPartsNumber;
        newObj.itemCount = i.itemCount;
        newObj.vendor = i.vendor;
        newObj.lotNumber = i.lotNumber;
        newObj.dateCode = i.dateCode;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_REVISE_SUCCESS,
        listIssueDetailData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_REVISE_FAILURE,
        listIssueDetailData: [],
      });
    });
  };
};

export const doListDeleteIssueItem = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_DELETE_ISSUE_ITEM_REQUEST,
      listIssueDetailData: [],
    });
    fetch(`${serverConfig.url}deleteForm/q/?choice=issueItems`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.id = i.id;
        newObj.moNumber = i.moNumber;
        newObj.issueNumber = i.issueNumber;
        newObj.issueSequenceNumber = i.issueSequenceNumber;
        newObj.partsNumber = i.partsNumber;
        newObj.scanQuanlity = i.scanQuanlity;
        newObj.rackNumber = i.rackNumber;
        newObj.barcodeDetail = i.barcodeDetail;
        newObj.finishTime = i.finishTime;
        newObj.vendorDigitLength = i.vendorDigitLength;
        newObj.referenceIssueNumber = i.referenceIssueNumber;
        newObj.referenceIssueSequenceNumber = i.referenceIssueSequenceNumber;
        newObj.TR_CD = i.TR_CD;
        newObj.fromDepartment = i.fromDepartment;
        newObj.toDepartment = i.toDepartment;
        newObj.quanlity = i.quanlity;
        newObj.employeeNumber = i.employeeNumber;
        newObj.isDeleted = i.isDeleted;
        newObj.createdAt = i.createdAt;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_DELETE_ISSUE_ITEM_SUCCESS,
        listIssueDetailData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_DELETE_ISSUE_ITEM_FAILURE,
        listIssueDetailData: [],
      });
    });
  };
};

export const doListDeleteReceiveItems = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_DELETE_RECEIVE_ITEM_REQUEST,
      listIssueDetailData: [],
    });
    fetch(`${serverConfig.url}deleteForm/q/?choice=receiveItems`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.id = i.id;
        newObj.invoiceNumber = i.invoiceNumber;
        newObj.receiveNumber = i.receiveNumber;
        newObj.receiveSequenceNumber = i.receiveSequenceNumber;
        newObj.purchaseNumber = i.purchaseNumber;
        newObj.partsNumber = i.partsNumber;
        newObj.scanQuantity = i.scanQuantity;
        newObj.rackNumber = i.rackNumber;
        newObj.barcodeDetail = i.barcodeDetail;
        newObj.finishTime = i.finishTime;
        newObj.vendorDigitLength = i.vendorDigitLength;
        newObj.employeeNumber = i.employeeNumber;
        newObj.isDeleted = i.isDeleted;
        newObj.createdAt = i.createdAt;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_DELETE_RECEIVE_ITEM_SUCCESS,
        listIssueDetailData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_DELETE_RECEIVE_ITEM_FAILURE,
        listIssueDetailData: [],
      });
    });
  };
};
export const doListRackName = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_RACKNAME_REQUEST,
      listIssueDetailData: [],
    });
    fetch(`${serverConfig.url}deleteForm/q/?choice=receiveItems`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.LIST_RACKNAME_SUCCESS,
        listIssueDetailData: data,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RACKNAME_FAILURE,
        listIssueDetailData: [],
      });
    });
  };
};
