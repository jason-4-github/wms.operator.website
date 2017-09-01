import _ from 'lodash';
import 'whatwg-fetch';

import * as types from '../constants/actionTypes';

const serverConfig = {
  url: 'http://192.168.1.134:4001/apis/operator/',
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

export const doListReceive = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_RECEIVE_REQUEST,
      loading: true,
    });
    fetch(`${serverConfig.url}receive/invoiceNumber/q/?invoiceNumber=${passProps.invoiceNumber}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i, k) => {
        const newObj = {};
        newObj.key = k;
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
        loading: false,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RECEIVE_FAILURE,
        listReceiveData: [],
        loading: false,
      });
    });
  };
};

export const doListReceiveDetails = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_RECEIVEDETAILS_REQUEST,
      listReceiveDetailsData: [],
      loading: true,
    });
    fetch(`${serverConfig.url}utility/dataOfPartsNo/q/?dataOfPartsNumber=${passProps.dataOfPartsNumber}&form=receiveDetails`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i, k) => {
        const newObj = {};
        newObj.key = k;
        newObj.partsNumber = i.partsNumber;
        newObj.rackName = i.rackName;
        newObj.rackNumber = i.rackNumber;
        newObj.rackSide = (i.rackSide.replace('F', '') - 1);
        newObj.itemCount = i.itemCount;
        newObj.inTime = i.inTime;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_RECEIVEDETAILS_SUCCESS,
        listReceiveDetailsData: newData,
        loading: false,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RECEIVEDETAILS_FAILURE,
        listReceiveDetailsData: [],
        loading: false,
      });
    });
  };
};

export const doListRackInfos = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_RACKINFOS_REQUEST,
      listRackInfos: [],
      loading: true,
    });
    fetch(`${serverConfig.url}utility/newTask/q/?rackName=${passProps.rackName}&face=${passProps.face}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i, k) => {
        const newObj = {};
        newObj.key = k;
        newObj.itemName = i.itemName;
        newObj.rackName = i.rackName;
        newObj.rackNumber = i.rackNumber;
        newObj.itemCount = i.itemCount;
        newObj.inTime = i.inTime;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_RACKINFOS_SUCCESS,
        listRackInfos: newData,
        loading: false,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RACKINFOS_FAILURE,
        listRackInfos: [],
        loading: false,
      });
    });
  };
};
export const doListDeleteReceiveItems = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_DELETE_RECEIVE_ITEM_REQUEST,
      listDeleteReceiveItemsData: [],
      loading: true,
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
        listDeleteReceiveItemsData: newData,
        loading: false,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_DELETE_RECEIVE_ITEM_FAILURE,
        listDeleteReceiveItemsData: [],
        loading: false,
      });
    });
  };
};
export const doListRackName = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_RACKNAME_REQUEST,
      listRackNameData: [],
    });
    fetch(`${serverConfig.url}utility/returnAllRackName`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        newData.push(i.rackName);
      });
      dispatch({
        type: types.LIST_RACKNAME_SUCCESS,
        listRackNameData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RACKNAME_FAILURE,
        listRackNameData: [],
      });
    });
  };
};

export const doListScanData = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_SCANDATA_REQUEST,
      listScanData: [],
      loading: false,
    });
    fetch(`${serverConfig.url}receive/scan/q/?rackNumber=${passProps.rackNumber}&barCode=${passProps.barCode}&qtyDigit=${passProps.qtyDigit}&dateCodeDigit=${passProps.dateCodeDigit}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i, k) => {
        const newObj = {};
        newObj.key = k;
        newObj.itemName = i.itemName;
        newObj.rackName = i.rackName;
        newObj.rackNumber = i.rackNumber;
        newObj.itemCount = i.itemCount;
        newObj.inTime = i.inTime;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_SCANDATA_SUCCESS,
        listScanData: newData,
        listScanItemName: data[data.length - 1].scanItemName,
        loading: true,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_SCANDATA_FAILURE,
        listScanData: [],
        loading: false,
      });
    });
  };
};
