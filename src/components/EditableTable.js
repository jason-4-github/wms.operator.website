import _ from 'lodash';
import moment from 'moment';
import React, { PropTypes } from 'react';
import { Table, Button, Popconfirm, Radio, Input } from 'antd';

import EditableCell from './EditableCell';
/* eslint-disable import/extensions */
import columnJson from './../constants/tableColumnName.json';
import dataJson from './../constants/tableFakeData.json';
/* eslint-enable import/extensions */

const RadioGroup = Radio.Group;

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.subData,
      newdata: [],
      selectedKey: '',
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
  onFinishDetail(index) {
    const { data } = this.state;
    _.map(index, (i) => {
      data[i - 1].finishTime = moment().subtract(0, 'days').format('YYYY-MM-DD, hh:mm:ss');
    });
    this.setState({ data });
  }
  onUseChange(e) {
    console.log(e.target.value);
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
        newObj.width = i.width;
        newObj.render = (text, record, index) => {
          return (this.renderColumns(index, i.dataIndex, text));
        };
      } else {
        newObj.title = i.title;
        newObj.dataIndex = i.dataIndex;
        newObj.key = i.key;
        newObj.width = i.width;
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
    const { data, selectedKey } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedKey: selectedRowKeys,
        });
      },
    };
    return (
      <div>
        <Button type="primary" onClick={() => { this.handleAdd(); }}>Insert DaiYong</Button>
        &nbsp;
        <Popconfirm title="Sure to delete?" onConfirm={() => { this.onDelete(selectedKey); }}>
          <Button type="primary" href="#">Delete DaiYong</Button>
        </Popconfirm>
        &nbsp;
        <Button type="primary" onClick={() => { this.onFinishDetail(selectedKey); }}>Finish</Button>
        &nbsp;
        <RadioGroup onChange={this.onUseChange}>
          <Radio value={1}>use</Radio>
          <Radio value={2}>Not use</Radio>
        </RadioGroup>
        &nbsp;
        <Input addonBefore="Vendor" />
        &nbsp;
        <Input addonBefore="Lot N.O." />
        &nbsp;
        <Input addonBefore="Date Code" />
        &nbsp;
        <Table
          bordered
          dataSource={data}
          columns={this.getColumns()}
          rowSelection={rowSelection}
          scroll={{ x: '200%', y: '240' }}
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
