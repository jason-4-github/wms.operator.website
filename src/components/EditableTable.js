import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

import EditableCell from './EditableCell';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'QTY',
      dataIndex: 'qty',
      key: '1',
      render: (text) => {
        const { editable } = this.state;
        return (
          <div className="editable-cell">
            {
              editable ?
                <div className="editable-cell-input-wrapper">
                  <Input
                    value={text}
                    onPressEnter={this.check}
                  />
                  <Icon
                    type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check}
                  />
                </div>
                :
                  <div className="editable-cell-text-wrapper">
                    {text || ' '}
                  </div>
              }
          </div>
        );
      },
      onCellClick: () => {
        this.setState({
          editable: true,
        });
      },
    }, {
      title: 'ISSUE_QTY',
      dataIndex: 'issue_qty',
      key: '2',
      render: (text) => {
        const { editable } = this.state;
        return (
          <div className="editable-cell">
            {
              editable ?
                <div className="editable-cell-input-wrapper">
                  <Input
                    value={text}
                    onPressEnter={this.check}
                  />
                  <Icon
                    type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check}
                  />
                </div>
                :
                  <div className="editable-cell-text-wrapper">
                    {text || ' '}
                  </div>
              }
          </div>
        );
      },
      onCellClick: () => {
        this.setState({
          editable: true,
        });
      },
    }, {
      title: 'MO_NO',
      dataIndex: 'mo_no',
      key: '3',
    }, {
      title: 'ISSUE_NO',
      dataIndex: 'issus_no',
      key: '4',
    }, {
      title: 'ISSUE_SEQ_NO',
      dataIndex: 'issus_seq_no',
      key: '5',
    }, {
      title: 'PARTS_NO',
      dataIndex: 'parts_no',
      key: '6',
    }, {
      title: 'CUST_PARTS_NO',
      dataIndex: 'cust_parts_no',
      key: '7',
    }, {
      title: 'VENDER',
      dataIndex: 'vender',
      key: '8',
      render: (text) => {
        const { editable } = this.state;
        return (
          <div className="editable-cell">
            {
              editable ?
                <div className="editable-cell-input-wrapper">
                  <Input
                    value={text}
                    onPressEnter={this.check}
                  />
                  <Icon
                    type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check}
                  />
                </div>
                :
                  <div className="editable-cell-text-wrapper">
                    {text || ' '}
                  </div>
              }
          </div>
        );
      },
      onCellClick: () => {
        this.setState({
          editable: true,
        });
      },
    }, {
      title: 'LOT_NO',
      dataIndex: 'lot_no',
      key: '9',
      render: (text) => {
        const { editable } = this.state;
        return (
          <div className="editable-cell">
            {
              editable ?
                <div className="editable-cell-input-wrapper">
                  <Input
                    value={text}
                    onPressEnter={this.check}
                  />
                  <Icon
                    type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check}
                  />
                </div>
                :
                  <div className="editable-cell-text-wrapper">
                    {text || ' '}
                  </div>
              }
          </div>
        );
      },
      onCellClick: () => {
        this.setState({
          editable: true,
        });
      },
    }, {
      title: 'DATE_CODE',
      dataIndex: 'date_code',
      key: '10',
      render: (text) => {
        const { editable } = this.state;
        return (
          <div className="editable-cell">
            {
              editable ?
                <div className="editable-cell-input-wrapper">
                  <Input
                    value={text}
                    onPressEnter={this.check}
                  />
                  <Icon
                    type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check}
                  />
                </div>
                :
                  <div className="editable-cell-text-wrapper">
                    {text || ' '}
                  </div>
              }
          </div>
        );
      },
      onCellClick: () => {
        this.setState({
          editable: true,
        });
      },
    }, {
      title: 'NOT_VENDOR',
      dataIndex: 'not_vendor',
      key: '11',
    }, {
      title: 'NOT_LOT_NO',
      dataIndex: 'not_lot_no',
      key: '12',
    }, {
      title: 'NOT_DATE_CODE',
      dataIndex: 'not_date_code',
      key: '13',
    }, {
      title: 'REMARK',
      dataIndex: 'remark',
      key: '14',
    }, {
      title: 'SHORT_QTY',
      dataIndex: 'shart_qty',
      key: '15',
    }, {
      title: 'REF_ISSUE_NO',
      dataIndex: 'ref_issue_no',
      key: '16',
    }, {
      title: 'REF_ISSUE_SEQ_NO',
      dataIndex: 'ref_issue_seq_no',
      key: '17',
    }, {
      title: 'CAN_DELETE',
      dataIndex: 'can_delete',
      key: '18',
    }, {
      title: 'TR_CD',
      dataIndex: 'tr_cd',
      key: '19',
    }, {
      title: 'FINISH_TIME',
      dataIndex: 'finish_time',
      key: '20',
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
  check() {
    this.setState({
      editable: false,
    });
  }
  handleChange(key, index, text) {
    console.log(text);
    const { data } = this.state;
    data[index][key] = text;
    this.setState({ data });
  }
  handleAdd() {
    const { data } = this.state;
    const newData = {
      key: data.length,
      mo_no: {
        editable: true,
        value: ' ',
        width: 100,
      },
      issus_no: {
        editable: true,
        value: ' ',
        width: 100,
      },
      issus_seq_no: {
        editable: true,
        value: ' ',
        width: 100,
      },
      parts_no: {
        editable: true,
        value: ' ',
        width: 100,
      },
      cust_parts_no: {
        editable: true,
        value: ' ',
        width: 100,
      },
      qty: {
        editable: true,
        value: ' ',
        width: 100,
      },
      issue_qty: {
        editable: true,
        value: ' ',
        width: 100,
      },
      vender: {
        editable: true,
        value: ' ',
        width: 100,
      },
      lot_no: {
        editable: true,
        value: ' ',
        width: 100,
      },
      date_code: {
        editable: true,
        value: ' ',
        width: 100,
      },
    };
    this.setState({
      data: [...data, newData],
    });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={(value) => { this.handleChange(key, index, value); }}
      status={status}
    />);
  }
  render() {
    const { data, delDataKey } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
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
          dataSource={dataSource}
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
