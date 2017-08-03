import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Table, Button, Popconfirm } from 'antd';

import EditableCell from './EditableCell';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'QTY',
      dataIndex: 'quanlity',
      key: 'quanlity',
      render: (text, record, index) => { return (this.renderColumns(this.state.data, index, 'qty', text)); },
    }, {
      title: 'ISSUE_QTY',
      dataIndex: 'issueQuanlity',
      key: 'issueQuanlity',
      render: (text, record, index) => { return (this.renderColumns(this.state.data, index, 'issue_qty', text)); },
    }, {
      title: 'MO_NO',
      dataIndex: 'moNumber',
      key: 'moNumber',
    }, {
      title: 'ISSUE_NO',
      dataIndex: 'issueNumber',
      key: 'issueNumber',
    }, {
      title: 'ISSUE_SEQ_NO',
      dataIndex: 'issueSequenceNumber',
      key: 'issueSequenceNumber',
    }, {
      title: 'PARTS_NO',
      dataIndex: 'partsNumber',
      key: 'partsNumber',
    }, {
      title: 'CUST_PARTS_NO',
      dataIndex: 'customerPartsNumber',
      key: 'customerPartsNumber',
    }, {
      title: 'VENDOR',
      dataIndex: 'vendor',
      key: 'vendor',
    }, {
      title: 'LOT_NO',
      dataIndex: 'lotNumber',
      key: 'lotNumber',
    }, {
      title: 'DATE_CODE',
      dataIndex: 'dateCode',
      key: 'dateCode',
    }, {
      title: 'NOT_VENDOR',
      dataIndex: 'notVendor',
      key: 'notVendor',
    }, {
      title: 'NOT_LOT_NO',
      dataIndex: 'notLotNumber',
      key: 'notLotNumber',
    }, {
      title: 'NOT_DATE_CODE',
      dataIndex: 'notDateCode',
      key: 'notDateCode',
    }, {
      title: 'REMARK',
      dataIndex: 'remark',
      key: 'remark',
    }, {
      title: 'SHORT_QTY',
      dataIndex: 'shortQuanlity',
      key: 'shortQuanlity',
    }, {
      title: 'REF_ISSUE_NO',
      dataIndex: 'referenceIssueNumber',
      key: 'referenceIssueNumber',
    }, {
      title: 'REF_ISSUE_SEQ_NO',
      dataIndex: 'referenceIssueSequenceNumber',
      key: 'referenceIssueSequenceNumber',
    }, {
      title: 'CAN_DELETE',
      dataIndex: 'canDelete',
      key: 'canDelete',
    }, {
      title: 'TR_CD',
      dataIndex: 'tr_cd',
      key: 'tr_cd',
    }, {
      title: 'FINISH_TIME',
      dataIndex: 'finishTime',
      key: 'finishTime',
    }];
    this.state = {
      data: this.props.subData,
      delDataKey: '',
    };
  }
  onDelete(index) {
    const { data } = this.state;
    _.map(index, (i) => {
      data.splice(i, 1);
      this.setState({ data });
    });
  }
  handleChange(key, index, value) {
    console.log(key, index, value);
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  handleAdd() {
    const { data } = this.state;
    const newData = {
      key: data.length,
      mo_no: {
        value: ' ',
        width: 100,
      },
      issus_no: {
        value: ' ',
        width: 100,
      },
      issus_seq_no: {
        value: ' ',
        width: 100,
      },
      parts_no: {
        value: ' ',
        width: 100,
      },
      cust_parts_no: {
        value: ' ',
        width: 100,
      },
      qty: {
        value: ' ',
        width: 100,
      },
      issue_qty: {
        value: ' ',
        width: 100,
      },
      vender: {
        value: ' ',
        width: 100,
      },
      lot_no: {
        value: ' ',
        width: 100,
      },
      date_code: {
        value: ' ',
        width: 100,
      },
    };
    this.setState({
      data: [...data, newData],
    });
  }
  renderColumns(data, index, key, text) {
    return (<EditableCell
      value={text}
      onChange={(value) => { this.handleChange(key, index, value); }}
    />);
  }
  render() {
    const { data, delDataKey } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          delDataKey: selectedRowKeys,
        });
        return (console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows));
      },
    };
    const columns = this.columns;
    return (
      <div>
        <Button type="primary" onClick={() => { this.handleAdd(); }}>Insert DaiYong</Button>
        <Popconfirm title="Sure to delete?" onConfirm={() => { this.onDelete(delDataKey); }}>
          <Button type="primary" href="#">Delete DaiYong</Button>
        </Popconfirm>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowSelection={rowSelection}
          scroll={{ x: '260%' }}
          pagination={false}
        />
      </div>
    );
  }
}

EditableTable.propTypes = {
  subData: PropTypes.array,
};
export default EditableTable;
