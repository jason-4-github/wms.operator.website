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
} from 'antd';

import { tableFakeDataCol, tableFakeDataVal } from './../constants/tableFakeData';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Header, Content } = Layout;

const columns = tableFakeDataCol();
const data = tableFakeDataVal();

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
  constructor(props) {
    super(props);
    this.state = {
      companyId: null,
    };
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
