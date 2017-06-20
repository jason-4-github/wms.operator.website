import React from 'react';
import {
  Row,
  Col,
  Card,
  Radio,
  Input,
  Table,
  Layout,
  Button,
} from 'antd';

const { Header, Content, Footer } = Layout;
const RadioGroup = Radio.Group;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '5',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '6',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '7',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '8',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];
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
      value: 1,
      options: 1,
    };
    this.onChange = this.onChange.bind(this);
    this.onOptionsChange = this.onOptionsChange.bind(this);
  }
  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  onOptionsChange(e) {
    this.setState({
      options: e.target.value,
    });
  }
  render() {
    return (
      <div id="check-container">
        <Layout className="layout">
          <Header className="header" />
          <Content id="content">
            <Row>
              <Col span={24}>
                <Card>
                  <Row>
                    <Col span={3}>
                      <Col span={24} className="col">
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                          <Radio value={1}>Show All</Radio>
                          <Radio value={2}>Show Not Finished</Radio>
                        </RadioGroup>
                      </Col>
                      <Col span={24} className="col">
                        <Button className="button">Refresh</Button>
                      </Col>
                      <Col span={24} className="col">
                        <Button className="button">Finish</Button>
                      </Col>
                    </Col>
                    <Col span={21}>
                      <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        size="middle"
                        bordered
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <Col span={7}>
                      <Col span={12}>
                        <font size="3">PARTS_NO</font><br />
                        <Input className="input" />
                      </Col>
                      <Col span={12}>
                        <font size="3">QTY</font><br />
                        <Input className="input" />
                      </Col>
                    </Col>
                    <Col span={2} className="radio-col">
                      <RadioGroup onChange={this.onOptionsChange} value={this.state.options}>
                        <Radio value={1}>Use</Radio><br />
                        <Radio value={2}>Not Use</Radio><br />
                      </RadioGroup>
                    </Col>
                    <Col span={12}>
                      <Col span={6}>
                        <font size="3">VENDOR</font><br />
                        <Input className="input" />
                      </Col>
                      <Col span={6}>
                        <font size="3">LOT_NO</font><br />
                        <Input className="input" />
                      </Col>
                      <Col span={12}>
                        <font size="3">DATA_CODE</font><br />
                        <Input className="datacode" />
                      </Col>
                    </Col>
                    <Col span={3} className="col">
                      <Col span={24}>
                        <Button className="button">Update</Button>
                        <Button className="button">Insert</Button>
                      </Col>
                      <Col span={24}>
                        <Button className="button">Delete</Button>
                        <Button className="button">Finish</Button>
                      </Col>
                    </Col>
                  </Row>
                  <Row className="row">
                    <Col span={16}>
                      <Col span={8}>
                        <Input addonBefore="REF_ISSUE_NO:" disabled />
                      </Col>
                      <Col span={8}>
                        <Input addonBefore="REF_ISSUE_SEQ_NO:" disabled />
                      </Col>
                    </Col>
                  </Row>
                  <Row className="row">
                    <Table
                      rowSelection={rowSelection}
                      columns={columns}
                      dataSource={data}
                      pagination={false}
                      size="middle"
                      bordered
                    />
                  </Row>
                  <Row className="rowtop">
                    <Button type="primary" size="large" className="button">start</Button>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Content>
          <Footer className="footer" />
        </Layout>
      </div>
    );
  }
}

export default CheckFormContainer;
