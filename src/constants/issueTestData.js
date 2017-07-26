export const issueCheckMainTableCol = () => {
  return [{
    title: 'MO_NO',
    dataIndex: 'mo_no',
    key: 'mo_no',
    width: '12%',
  }, {
    title: 'ISSUE_NO',
    dataIndex: 'issus_no',
    key: 'issus_no',
    width: '12%',
  }, {
    title: 'START_TIME',
    dataIndex: 'start_time',
    key: 'start_time',
    width: '12%',
  }, {
    title: 'WMS_OK_TIME',
    dataIndex: 'wms_ok_time',
    key: 'wms_ok_time',
    width: '12%',
  }, {
    title: 'LINE_NO',
    dataIndex: 'line_no',
    key: 'line_no',
    width: '12%',
  }, {
    title: 'FINISH_TIME',
    dataIndex: 'finish_time',
    key: 'finish_time',
    width: '12%',
  }, {
    title: 'TR_CD',
    dataIndex: 'tr_cd',
    key: 'tr_cd',
    width: '12%',
  }, {
    title: 'DEPT_CD',
    dataIndex: 'dept_cd',
    key: 'dept_cd',
    width: '12%',
  }];
};

export const issueCheckMainTableVal = () => {
  return [{
    key: '1',
    mo_no: 606247806,
    issus_no: '607A1425',
    made_area: 'L1',
    start_time: '20160708162558',
    wms_ok_time: '2016-07-08 16:31:45',
    line_no: 'H4',
    finish_time: '',
    tr_cd: '',
  }, {
    key: '2',
    mo_no: 606248603,
    issus_no: '607A0834',
    made_area: 'L1',
    start_time: '20160708162558',
    wms_ok_time: '2016-07-08 16:31:45',
    line_no: 'H4',
    finish_time: '',
    tr_cd: '',
  }, {
    key: '3',
    mo_no: 606248604,
    issus_no: '607A0835',
    made_area: 'L1',
    start_time: '20160708162558',
    wms_ok_time: '2016-07-08 16:31:45',
    line_no: 'H4',
    finish_time: '',
    tr_cd: '',
  }];
};

export const subTableFakeDataVal = () => {
  return [{
    key: '0',
    mo_no: {
      value: 'Edward King 0',
    },
    issus_no: {
      value: '32',
    },
    issus_seq_no: {
      value: 'London, Park Lane no. 0',
    },
    parts_no: {
      value: '32',
    },
    cust_parts_no: {
      value: '32',
    },
    qty: {
      value: '32',
    },
    issue_qty: {
      value: '32',
    },
    vender: {
      value: ' ',
    },
    lot_no: {
      value: ' ',
    },
    date_code: {
      value: ' ',
    },
  }];
};
