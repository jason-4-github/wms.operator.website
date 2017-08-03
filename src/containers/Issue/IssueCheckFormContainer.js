import React from 'react';
import {
  Row,
  Col,
  Radio,
  Table,
  Button,
} from 'antd';
import { browserHistory } from 'react-router';

/* eslint-disable import/extensions */
import columnJson from './../../constants/tableColumnName.json';
import dataJson from './../../constants/tableFakeData.json';
/* eslint-enable import/extensions */
import EditableTable from './../../components/EditableTable';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const fixHeight = window.innerHeight * 0.7;

class CheckFormContainer extends React.Component {
  static showTable() {
    const expandedRowRender = () => {
      return (
        <div style={{ background: '#ECECEC', height: fixHeight }}>
          <EditableTable subData={dataJson.issueCheckSubTableVal} />
        </div>
      );
    };
    return (
      <Table
        columns={columnJson.issueCheckMainColumn}
        dataSource={dataJson.issueCheckMainTableVal}
        size="small"
        scroll={{ y: fixHeight }}
        expandedRowRender={expandedRowRender}
        pagination={false}
      />
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      companyId: null,
      showDataRadio: 'all',
      useOptionRadio: 'use',
    };
  }
  render() {
    return (
      <div id="issue-container">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={8}>
                <RadioGroup defaultValue="all" size="large">
                  <RadioButton value="all">Show All</RadioButton>
                  <RadioButton value="finish yet">Show Not Finished</RadioButton>
                </RadioGroup>
              </Col>
              <Col span={8} />
              <Col span={8} />
            </Row>
            <Row>
              { CheckFormContainer.showTable() }
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
      </div>
    );
  }
}

export default CheckFormContainer;
