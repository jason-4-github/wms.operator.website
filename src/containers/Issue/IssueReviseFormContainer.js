import React from 'react';
import {
  Row,
  Col,
  Table,
  Button,
  Input,
  LocaleProvider,
} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { browserHistory } from 'react-router';

/* eslint-disable import/extensions */
import columnJson from './../../constants/tableColumnName.json';
/* eslint-enable import/extensions */

class IssueReviseFormContainer extends React.Component {
  static showTable(text, fixHeight) {
    // control to hide the title row as text = ''
    return (
      <Table
        columns={columnJson.revise}
        dataSource={''}
        size="small"
        scroll={{ y: fixHeight }}
        title={() => { return text; }}
        pagination={false}
        bordered
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
      <div id="issue-container">
        <LocaleProvider locale={enUS}>
          <Row>
            <Col span={24}>
              <Row style={{ padding: '5px' }}>
                <Col span={16}>
                  <Col span={2} />
                  <Col span={4}>
                    <Input addonBefore="N.O." />
                  </Col>
                  <Col span={4}>
                    <Input addonBefore="Vendor" />
                  </Col>
                  <Col span={4}>
                    <Input addonBefore="Lot N.O." />
                  </Col>
                  <Col span={4}>
                    <Input addonBefore="Date Code" />
                  </Col>
                </Col>
                <Col span={8}>
                  <Col span={24}>
                    <Button size="large" type="primary">Refresh</Button>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  { IssueReviseFormContainer.showTable('', 300) }
                </Col>
              </Row>
              <Row id="finishRow">
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
              </Row>
            </Col>
          </Row>
        </LocaleProvider>
      </div>
    );
  }
}

export default IssueReviseFormContainer;
