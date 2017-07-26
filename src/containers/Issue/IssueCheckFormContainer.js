import _ from 'lodash';
import React from 'react';
import {
  Row,
  Col,
  Radio,
  Table,
  Button,
  Select,
} from 'antd';
import { browserHistory } from 'react-router';

import { issueCheckMainTableCol, issueCheckMainTableVal, subTableFakeDataVal } from './../../constants/issueTestData';
import EditableTable from './../../components/EditableTable';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const columns = issueCheckMainTableCol();
const data = issueCheckMainTableVal();
const subData = subTableFakeDataVal();
const fixHeight = window.innerHeight * 0.7;

class CheckFormContainer extends React.Component {
  static showTable(mainData) {
    const expandedRowRender = () => {
      return (
        <div style={{ background: '#ECECEC', height: fixHeight }}>
          <EditableTable subData={subData} />
        </div>
      );
    };
    return (
      <Table
        columns={columns}
        dataSource={mainData}
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
      mainData: data,
    };
  }
  handleSearch(value) {
    const filteredIndexes = [];
    const { mainData } = this.state;
    const size = mainData.length;
    for (let index = 0; index < size; index += 1) {
      if (_.isMatch(mainData[index].mo_no.toString(), value)) {
        filteredIndexes.push(mainData[index]);
      }
    }
    this.setState({
      mainData: value ? filteredIndexes : mainData,
    });
  }
  render() {
    const { mainData } = this.state;
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
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a mo_no"
                  optionFilterProp="children"
                  onChange={this.handleSearch}
                >
                  <Option value="606247806">606247806</Option>
                  <Option value="606248603">606248603</Option>
                  <Option value="606248604">606248604</Option>
                </Select>
              </Col>
              <Col span={8} />
              <Col span={8} />
            </Row>
            <Row>
              { CheckFormContainer.showTable(mainData) }
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
