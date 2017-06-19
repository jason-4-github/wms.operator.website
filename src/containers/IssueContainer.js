import React from 'react';
import _ from 'lodash';
import {
  Row,
  Col,
  Card,
  Table,
  Radio,
  Button,
  Input,
  Layout,
  Modal,
  message,
} from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Header, Content } = Layout;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
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
  key: '4',
  name: 'Joe Black',
  age: 32,
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
}, {
  key: '22',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '9',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '10',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '11',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '12',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '13',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '14',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '15',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '16',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '17',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '18',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '19',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '20',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '21',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

class IssueContainer extends React.Component {
  static showTable(text, fixHeight) {
    // control to hide the title row as text = ''
    return (text === ''
      ? <Table
        columns={columns}
        dataSource={data}
        size="small"
        scroll={{ y: fixHeight }}
        pagination={false}
      />
      : <Table
        columns={columns}
        dataSource={data}
        size="small"
        scroll={{ y: fixHeight }}
        title={() => { return text; }}
        pagination={false}
      />
    );
  }
  static showRadioGroup(options) {
    const optionArrs = [];
    _.map(options, (d) => {
      optionArrs.push(<RadioButton value={d} key={d}>{d}</RadioButton>);
    });
    return (
      <RadioGroup defaultValue={options[0]}>
        {optionArrs}
      </RadioGroup>
    );
  }
  static showModal() {
    const reviseModal = {
      title: 'Inventory Revise Form',
      content: (
        <Row style={{ textAlign: 'center' }}>
          <Col span={7}>
            <h3>Parts N.O.</h3>
            <Input />
          </Col>
          <Col span={3}>
            <h3>Vendor</h3>
            <Input />
          </Col>
          <Col span={7}>
            <h3>Lot N.O.</h3>
            <Input disabled />
          </Col>
          <Col span={3}>
            <h3>Date Code</h3>
            <Input />
          </Col>
          <Col span={4}>
            <br />
            <Button size="large" type="primary">Refresh</Button>
          </Col>
          <Col span={24}>
            { IssueContainer.showTable('', 140) }
          </Col>
        </Row>
      ),
      onOk() {
        message.success('Data Processing!!');
      },
      okText: 'start',
      iconType: '',
      width: 1000,
    };
    Modal.info(reviseModal);
  }
  constructor(props) {
    super(props);
    this.state = {
      companyId: null,
    };
  }
  componentWillMount() {
    IssueContainer.showModal();
  }
  render() {
    return (
      <div id="issue-container">
        <Layout className="layout">
          <Header id="header">
            <div id="headerTitle">Material Issue Station</div>
          </Header>
          <Content id="content">
            <Row style={{ paddingTop: '20px' }}>
              <Col span={4} />
              <Col style={{ marginBottom: 16 }} span={16}>
                <Row>
                  <Col span={12}>
                    <Col span={12} className="receiveInfo">Task Number: </Col>
                    <Col span={12}><Input defaultValue="0571" disabled /></Col>
                  </Col>
                  <Col span={12}>
                    <Col span={12} className="receiveInfo">Rack Number: </Col>
                    <Col span={12}><Input defaultValue="26888888" disabled /></Col>
                  </Col>
                </Row>
              </Col>
              <Col span={4} />
            </Row>
            <Col span={24}>
              <Card bodyStyle={{ padding: '10px' }}>
                <Row>
                  <Col span={24} id="detailTable">
                    { IssueContainer.showTable('IssueOrder of this Rack', 140) }
                  </Col>
                </Row>
                <Row id="hrRow"><hr /></Row>
                <Row>
                  <Col span={13} id="bottomMidTable">
                    { IssueContainer.showTable('Data of This Rack', 165) }
                  </Col>
                  <Col span={11}>
                    <Card title="Scan" bodyStyle={{ padding: '10px' }}>
                      <Col span={6} className="scanRadio">Date Code: </Col>
                      <Col span={18} className="scanRadio">
                        { IssueContainer.showRadioGroup(['3 digit', '4 digit', '8 digit']) }
                      </Col>
                      <Col span={6} className="scanRadio">QTY: </Col>
                      <Col span={18} className="scanRadio">
                        { IssueContainer.showRadioGroup(['5 digit', '6 digit']) }
                      </Col>
                      <Col span={6} className="scanRadio">Face: </Col>
                      <Col span={18} className="scanRadio">
                        { IssueContainer.showRadioGroup(['Face1', 'Face2', 'Face3', 'Face4']) }
                      </Col>
                      <Col span={6} className="scanRadio">Scan</Col>
                      <Col span={18}>
                        <Input id="scanInput" />
                      </Col>
                      <Col span={24} className="scanRadio">Rack</Col>
                      <Col span={24} className="scanRadio">Item</Col>
                    </Card>
                  </Col>
                </Row>
                <Row id="finishRow">
                  <Button id="finishButton" size="large" type="primary">Finish</Button>
                </Row>
              </Card>
            </Col>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default IssueContainer;
