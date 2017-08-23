import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Table, Button, Popconfirm } from 'antd';

import EditableCell from './EditableCell';
/* eslint-disable import/extensions */
import columnJson from './../constants/tableColumnName.json';
import dataJson from './../constants/tableFakeData.json';
/* eslint-enable import/extensions */

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.subData,
      newdata: [],
      delDataKey: '',
    };
  }
  onDelete(index) {
    const { data, newdata } = this.state;
    _.map(index, (i) => {
      delete data[i - 1];
      delete newdata[i - 1];
    });
    this.setState({ data, newdata });
  }
  getColumns() {
  // this.deleteItem
    const newData = [];
    _.map(columnJson.issueCheckSubject, (i) => {
      const newObj = {};
      if (i.dataIndex === 'quanlity'
      || i.dataIndex === 'issueQuanlity') {
        newObj.title = i.title;
        newObj.dataIndex = i.dataIndex;
        newObj.key = i.key;
        newObj.render = (text, record, index) => {
          return (this.renderColumns(index, i.dataIndex, text));
        };
      } else {
        newObj.title = i.title;
        newObj.dataIndex = i.dataIndex;
        newObj.key = i.key;
      }
      newData.push(newObj);
    });
    return newData;
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key] = value;
    this.setState({ data });
  }
  handleAdd() {
    const { data, newdata } = this.state;
    _.map(dataJson.issueCheckNewData, (i) => {
      const newObj = {};
      newObj.key = data.length + 1;
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
      data.push(newObj);
      newdata.push(newObj);
    });
    this.setState({
      data,
      newdata,
    });
  }
  renderColumns(index, key, text) {
    return (<EditableCell
      value={text}
      onChange={(value) => { this.handleChange(key, index, value); }}
    />);
  }
  render() {
    const { data, delDataKey } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          delDataKey: selectedRowKeys,
        });
      },
    };
    return (
      <div>
        <Button type="primary" onClick={() => { this.handleAdd(); }}>Insert DaiYong</Button>
        <Popconfirm title="Sure to delete?" onConfirm={() => { this.onDelete(delDataKey); }}>
          <Button type="primary" href="#">Delete DaiYong</Button>
        </Popconfirm>
        <Table
          bordered
          dataSource={data}
          columns={this.getColumns()}
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
