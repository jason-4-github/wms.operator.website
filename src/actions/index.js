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

export const doListReturnMO = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_RECEIVE_REQUEST,
      loadingMO: true,
    });
    fetch(`${serverConfig.url}utility/moNumber/q/?moNumber=${passProps.invoiceNumber}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i, k) => {
        const newObj = {};
        newObj.key = k;
        newObj.moNumber = i.moNumber;
        newObj.madeArea = i.madeArea;
        newObj.issueNumber = i.issueNumber;
        newObj.issueSequenceNumber = i.issueSequenceNumber;
        newObj.partsNumber = i.partsNumber;
        newObj.customerPartsNumber = i.customerPartsNumber;
        newObj.vendor = i.vendor;
        newObj.lotNumber = i.lotNumber;
        newObj.dateCode = i.dateCode;
        newObj.quantity = i.quantity;
        newObj.issueQuantity = i.issueQuantity;
        newObj.finishTime = i.finishTime;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_RECEIVE_SUCCESS,
        listMOData: newData,
        loadingMO: false,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RECEIVE_FAILURE,
        listMOData: [],
        loadingMO: false,
      });
    });
  };
};

export const doListPartsNumber = (passProps) => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_PARTNUMBER_REQUEST,
      listPartsNumberData: [],
      loadingPartsNumber: true,
    });
    fetch(`${serverConfig.url}utility/dataOfPartsNo/q/?dataOfPartsNumber=${passProps.dataOfPartsNumber}&form=${passProps.form}`)
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
        type: types.LIST_PARTNUMBER_SUCCESS,
        listPartsNumberData: newData,
        loadingPartsNumber: false,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_PARTNUMBER_FAILURE,
        listPartsNumberData: [],
        loadingPartsNumber: false,
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
      loadingScan: true,
    });
    fetch(`${serverConfig.url}return/scan/q/?rackNumber=${passProps.rackNumber}&barCode=${passProps.barCode}&qtyDigit=${passProps.qtyDigit}&dateCodeDigit=${passProps.dateCodeDigit}`)
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
        loadingScan: false,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_SCANDATA_FAILURE,
        listScanData: [],
        loadingScan: false,
      });
    });
  };
};
