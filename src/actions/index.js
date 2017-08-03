import _ from 'lodash';
import 'whatwg-fetch';

import * as types from '../constants/actionTypes';

const serverConfig = {
  url: 'http://192.168.1.125:4001/apis/operator/',
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

export const doListIssue = () => {
  return (dispatch) => {
    dispatch({
      type: types.LIST_ISSUE_REQUEST,
      listIssueData: [],
    });
    fetch(`${serverConfig.url}invoiceNumber/q/?invoiceNumber=invoicenumber001`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.moNumber = i.RackName;
        newObj.issueNumber = i.ItemName;
        newObj.madeArea_id = i.ItemExternalID;
        newObj.startTime = i.ItemCount;
        newObj.wmsOkTime = i.Vendor;
        newObj.lineNumber = i.DateCode;
        newObj.finishTime = `${i.RackName};
        ${i.RackSide}-${i.RackLayer}-${i.RackBlock}`;
        newObj.tr_cd = i.tr_cd;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_ISSUE_SUCCESS,
        listIssueData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_ISSUE_FAILURE,
        listIssueData: [],
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
    fetch(`${serverConfig.url}dataOfPartsNo/q/?dataOfPartsNumber=partsno004`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.moNumber_id = i.moNumber_id;
        newObj.issueNumber = i.issueNumber;
        newObj.issueSequenceNumber = i.issueSequenceNumber;
        newObj.partsNumber = i.partsNumber;
        newObj.customerPartsNumber = i.customerPartsNumber;
        newObj.vendor = i.vendor;
        newObj.lotNumber = i.lotNumber;
        newObj.dateCode = i.dateCode;
        newObj.quanlity = i.quanlity;
        newObj.issueQuanlity = i.issueQuanlity;
        newObj.finishTime = i.finishTime;
        newObj.notVendor = i.notVendor;
        newObj.notLotNumber = i.notLotNumber;
        newObj.notDateCode = i.notDateCode;
        newObj.remark = i.remark;
        newObj.shortQuanlity = i.shortQuanlity;
        newObj.referenceIssueNumber = i.referenceIssueNumber;
        newObj.referenceIssueSequenceNumber = i.referenceIssueSequenceNumber;
        newObj.canDelete = i.canDelete;
        newObj.tr_cd = i.tr_cd;
        newObj.isDeleted = i.isDeleted;
        newObj.createdAt = i.createdAt;
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
