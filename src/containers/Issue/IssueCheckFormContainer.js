import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Row,
  Col,
  Radio,
  Table,
  Button,
  LocaleProvider,
} from 'antd';
import { browserHistory } from 'react-router';
import enUS from 'antd/lib/locale-provider/en_US';

/* eslint-disable import/extensions */
import columnJson from './../../constants/tableColumnName.json';
import dataJson from './../../constants/tableFakeData.json';
/* eslint-enable import/extensions */
import EditableTable from './../../components/EditableTable';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const fixHeight = window.innerHeight * 0.7;

class CheckFormContainer extends React.Component {
  static showTable(mainData, rowSelection) {
    const expandedRowRender = (record) => {
      return (
        <div style={{ background: '#ECECEC', height: fixHeight }}>
          <EditableTable subData={record.issueCheckSubTableVal} />
        </div>
      );
    };
    return (
      <Table
        columns={columnJson.issueCheckMainColumn}
        dataSource={mainData}
        size="small"
        expandedRowRender={expandedRowRender}
        rowSelection={rowSelection}
        pagination={false}
        bordered
      />
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      companyId: null,
      showDataRadio: 'all',
      useOptionRadio: 'use',
      selectedKey: '',
      mainData: dataJson.issueCheckMainTableVal,
    };
  }
  onFinish(index) {
    const { mainData } = this.state;
    _.map(index, (i) => {
      mainData[i - 1].finishTime = moment().subtract(0, 'days').format('YYYY-MM-DD, hh:mm:ss');
    });
    this.setState({ mainData });
  }
  render() {
    const { mainData, selectedKey } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedKey: selectedRowKeys,
        });
      },
    };
    return (
      <div id="issue-container">
        <LocaleProvider locale={enUS}>
          <Row>
            <Col span={24}>
              <Row>
                <Col span={8}>
                  <RadioGroup defaultValue="all" size="large">
                    <RadioButton value="all">Show All</RadioButton>
                    <RadioButton value="finish yet">Show Not Finished</RadioButton>
                  </RadioGroup>
                  <Button type="primary" onClick={() => { this.onFinish(selectedKey); }}>Finish</Button>
                </Col>
                <Col span={8} />
                <Col span={8} />
              </Row>
              <Row>
                { CheckFormContainer.showTable(mainData, rowSelection) }
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

export default CheckFormContainer;
