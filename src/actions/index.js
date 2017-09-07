import _ from 'lodash';
import 'whatwg-fetch';

import * as types from '../constants/actionTypes';
/* eslint-disable import/extensions */
import columnJson from './../constants/tableColumnName.json';
/* eslint-enable import/extensions */
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
      loadingReceive: true,
    });
    fetch(`${serverConfig.url}receive/invoiceNumber/q/?invoiceNumber=${passProps.invoiceNumber}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i, k) => {
        console.log(columnJson.delReceiveColumns.title);
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
        loadingReceive: false,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RECEIVE_FAILURE,
        listReceiveData: [],
        loadingReceive: false,
      });
    });
  };
};

export const doListDeleteFormItems = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_DELETEFORMDATA_REQUEST,
      listDeleteData: [],
      loadingDeleteData: true,
    });
    fetch(`${serverConfig.url}utility/deleteFormRefresh/q/?choice=${passProps.choice}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i, k) => {
        const newObj = {};
        newObj.id = i.id;
        newObj.key = k;
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
        type: types.LIST_DELETEFORMDATA_SUCCESS,
        listDeleteData: newData,
        loadingDeleteData: false,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_DELETEFORMDATA_FAILURE,
        listDeleteData: [],
        loadingDeleteData: false,
      });
    });
  };
};
export const doListDeleteItems = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_DELETEITEMS_REQUEST,
    });
    fetch(`${serverConfig.url}utility/deleteFormDelete/q/?deleteId=${passProps.deleteId}&choice=${passProps.choice}`)
    .then(checkStatus)
    .then(parseJSON)
    .then(() => {
      dispatch({
        type: types.LIST_DELETEITEMS_SUCCESS,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_DELETEITEMS_FAILURE,
      });
    });
  };
};
