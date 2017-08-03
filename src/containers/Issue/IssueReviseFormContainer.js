import React from 'react';
import {
  Row,
  Col,
  Table,
  Button,
  Input,
} from 'antd';
import { browserHistory } from 'react-router';

/* eslint-disable import/extensions */
import columnJson from './../../constants/tableColumnName.json';
import dataJson from './../../constants/tableFakeData.json';
/* eslint-enable import/extensions */

class IssueReviseFormContainer extends React.Component {
  static showTable(text, fixHeight) {
    // control to hide the title row as text = ''
    return (text === ''
      ? <Table
        columns={columnJson.rivise}
        dataSource={dataJson.riviseData}
        size="small"
        scroll={{ y: fixHeight }}
        pagination={false}
      />
      : <Table
        columns={columnJson.rivise}
        dataSource={dataJson.riviseData}
        size="small"
        scroll={{ y: fixHeight }}
        title={() => { return text; }}
        pagination={false}
      />
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
          { IssueReviseFormContainer.showTable('', 140) }
        </Col>
        <Col span={24}>
          <Button
            id="finishButton"
            size="large"
            type="primary"
            onClick={() => {
              return (browserHistory.replace('issue'));
            }}
          >
            Start
          </Button>
        </Col>
      </Row>
    );
  }
}

export default IssueReviseFormContainer;
