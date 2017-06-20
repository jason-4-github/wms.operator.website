import React from 'react';
import {
  Row,
  Col,
  Table,
  Button,
  Input,
} from 'antd';

import { tableFakeDataCol, tableFakeDataVal } from './../../constants/tableFakeData';

const columns = tableFakeDataCol();
const data = tableFakeDataVal();

class IssueReviseFormContainer extends React.Component {
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
      </Row>
    );
  }
}

export default IssueReviseFormContainer;
