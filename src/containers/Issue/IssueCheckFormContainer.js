import React from 'react';
import {
  Row,
  Col,
  Radio,
  Input,
  Table,
  Button,
} from 'antd';

import { tableFakeDataCol, tableFakeDataVal } from './../../constants/tableFakeData';

const RadioGroup = Radio.Group;

const columns = tableFakeDataCol();
const data = tableFakeDataVal();

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};
class CheckFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyId: null,
      showDataRadio: 'all',
      useOptionRadio: 'use',
    };
    this.onShowDatafunc = this.onShowDatafunc.bind(this);
    this.onUseOptionsfunc = this.onUseOptionsfunc.bind(this);
  }
  onShowDatafunc(e) {
    this.setState({
      showDataRadio: e.target.value,
    });
  }
  onUseOptionsfunc(e) {
    this.setState({
      useOptionRadio: e.target.value,
    });
  }
  render() {
    return (
      <div id="check-container">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={3}>
                <Col span={24} className="checkform-col showDataRadio">
                  <RadioGroup
                    onChange={this.onShowDatafunc}
                    value={this.state.showDataRadio}
                  >
                    <Radio value="all">Show All</Radio>
                    <Radio value="finish yet">Show Not Finished</Radio>
                  </RadioGroup>
                </Col>
                <Col span={24} className="checkform-col">
                  <Button className="checkform-querybutton">Refresh</Button>
                </Col>
                <Col span={24} className="checkform-col">
                  <Button className="checkform-querybutton">Finish</Button>
                </Col>
              </Col>
              <Col span={21}>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  scroll={{ y: 133.75 }}
                  size="small"
                />
              </Col>
            </Row>
            <Row className="checkform-row">
              <Col span={6}>
                <Col span={12} className="describeTitle">
                  <font size="2">PARTS_NO</font><br />
                  <Input className="checkform-input" />
                </Col>
                <Col span={12} className="describeTitle">
                  <font size="2">QTY</font><br />
                  <Input className="checkform-input" />
                </Col>
              </Col>
              <Col span={3} className="checkform-options-col">
                <RadioGroup
                  onChange={this.onUseOptionsfunc}
                  value={this.state.useOptionRadio}
                >
                  <Radio value="use">Use</Radio><br />
                  <Radio value="not use">Not Use</Radio><br />
                </RadioGroup>
              </Col>
              <Col span={11}>
                <Col span={6} className="describeTitle">
                  <font size="2">VENDOR</font><br />
                  <Input className="checkform-input" />
                </Col>
                <Col span={6} className="describeTitle">
                  <font size="2">LOT_NO</font><br />
                  <Input className="checkform-input" />
                </Col>
                <Col span={12} className="describeTitle">
                  <font size="2">DATA_CODE</font><br />
                  <Input className="checkform-input" />
                </Col>
              </Col>
              <Col span={4} className="checkform-col" id="buttonGroup">
                <Col span={12}>
                  <Button className="checkform-querybutton">Update</Button>
                </Col>
                <Col span={12}>
                  <Button className="checkform-querybutton">Insert</Button>
                </Col>
                <Col span={12}>
                  <Button className="checkform-querybutton">Delete</Button>
                </Col>
                <Col span={12}>
                  <Button className="checkform-querybutton">Finish</Button>
                </Col>
              </Col>
            </Row>
            <Row>
              <Col span={24} id="checkform-readonlyarea">
                <Col span={10}>
                  <Col span={8} className="disableDescribeTitle">
                    <font size="2">REF_ISSUE_NO: </font>
                  </Col>
                  <Col span={16}>
                    <Input className="checkform-input" disabled />
                  </Col>
                </Col>
                <Col span={10}>
                  <Col span={8} className="disableDescribeTitle">
                    <font size="2">REF_ISSUE_SEQ_NO: </font>
                  </Col>
                  <Col span={16}>
                    <Input className="checkform-input" disabled />
                  </Col>
                </Col>
                <Col span={4} />
              </Col>
            </Row>
            <Row className="checkform-row">
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={false}
                scroll={{ y: 133.75 }}
                size="small"
              />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CheckFormContainer;
