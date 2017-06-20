import React from 'react';
import _ from 'lodash';
import {
  Row,
  Col,
  Card,
  Table,
  Tabs,
  InputNumber,
  Radio,
  Button,
  Input,
  Layout,
  Modal,
  Form,
  Icon,
  message,
} from 'antd';

import { tableFakeDataCol, tableFakeDataVal } from './../constants/tableFakeData';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Header, Content } = Layout;
const FormItem = Form.Item;

const columns = tableFakeDataCol();
const data = tableFakeDataVal();

class ReceiveContainer extends React.Component {
  static showTable(text, fixHeight) {
    return (
      <Table
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
    Modal.info({
      title: '',
      content: (
        <div>
          <b><h3>Please Enter Your Company ID</h3></b>
          <Form layout="inline">
            <FormItem>
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Company ID"
                style={{ paddingTop: '5px', width: '250px' }}
              />
            </FormItem>
          </Form>
        </div>
      ),
      onOk() {
        message.success('Login Success!!');
      },
      okText: 'Login',
      iconType: 'lock',
      width: 500,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      companyId: null,
    };
  }
  componentWillMount() {
    ReceiveContainer.showModal();
  }
  render() {
    return (
      <div id="receive-container">
        <Layout className="layout">
          <Header id="header">
            <div id="headerTitle">Material Receive Station</div>
          </Header>
          <Content id="content">
            <Row style={{ paddingTop: '20px' }}>
              <Col span={4} />
              <Col style={{ marginBottom: 16 }} span={16}>
                <Row>
                  <Col span={12}>
                    <Search placeholder="Please Enter The ENV.NO" />
                  </Col>
                  <Col span={6}>
                    <Col span={12} className="receiveInfo">Receive No: </Col>
                    <Col span={12}><Input defaultValue="0571" disabled /></Col>
                  </Col>
                  <Col span={6}>
                    <Col span={12} className="receiveInfo">M.A.: </Col>
                    <Col span={12}><Input defaultValue="26888888" disabled /></Col>
                  </Col>
                </Row>
              </Col>
              <Col span={4} />
            </Row>
            <Col span={24}>
              <Card bodyStyle={{ padding: '10px' }}>
                <Row>
                  <Col span={16} id="detailTable">
                    { ReceiveContainer.showTable('Receive Detail', 140) }
                  </Col>
                  <Col span={8}>
                    { ReceiveContainer.showTable('Data of This Part NO.', 140) }
                  </Col>
                </Row>
                <Row id="hrRow"><hr /></Row>
                <Row>
                  <Col span={6}>
                    <Card title="Task Status" bodyStyle={{ padding: '10px', textAlign: 'center' }}>
                      <Tabs size="small">
                        <TabPane tab="Part NO." key="1">
                          <Input size="large" placeholder="Part NO." />
                        </TabPane>
                        <TabPane tab="Rack NO." key="2">
                          <Input size="large" placeholder="Rack NO." />
                        </TabPane>
                        <TabPane tab="Empty Block" key="3">
                          <InputNumber min={0} max={10} defaultValue={3} />
                        </TabPane>
                      </Tabs>
                      <div id="faceRadio">
                        { ReceiveContainer.showRadioGroup(['Face1', 'Face2', 'Face3', 'Face4']) }
                      </div>
                      <div id="startButton">
                        <Button type="primary" size="large">Start</Button>
                      </div>
                    </Card>
                  </Col>
                  <Col span={10} id="bottomMidTable">
                    { ReceiveContainer.showTable('Data of This Rack', 165) }
                  </Col>
                  <Col span={8}>
                    <Card title="Scan" bodyStyle={{ padding: '10px' }}>
                      <Col span={6} className="scanRadio">Date Code: </Col>
                      <Col span={18} className="scanRadio">
                        { ReceiveContainer.showRadioGroup(['3 digit', '4 digit', '8 digit']) }
                      </Col>
                      <Col span={6} className="scanRadio">QTY: </Col>
                      <Col span={18} className="scanRadio">
                        { ReceiveContainer.showRadioGroup(['5 digit', '6 digit']) }
                      </Col>
                      <Col span={6} className="scanRadio">Face: </Col>
                      <Col span={18} className="scanRadio">
                        { ReceiveContainer.showRadioGroup(['Face1', 'Face2', 'Face3', 'Face4']) }
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

export default ReceiveContainer;
