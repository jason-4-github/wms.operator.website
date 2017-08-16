import React from 'react';
import _ from 'lodash';
import {
  Row,
  Col,
  Menu,
  Icon,
  Input,
  Table,
  Button,
  Dropdown,
} from 'antd';

/* eslint-disable import/extensions */
import columnJson from './../constants/tableColumnName.json';
import dataJson from './../constants/tableFakeData.json';
/* eslint-enable import/extensions */

const fixHeight = window.innerHeight * 0.7;

class DeleteFormContainer extends React.Component {
  static showTable(columnType, dataType) {
    return (
      <Table
        columns={columnJson[`${columnType}`]}
        dataSource={dataJson[`${dataType}`]}
        size="small"
        scroll={{ y: fixHeight }}
        pagination={false}
      />
    );
  }
  static showMenu(options) {
    const optionArrs = [];
    _.map(options, (data, k) => {
      console.log(k);
      optionArrs.push(<Menu.Item key={k}>{options[k]}</Menu.Item>);
    });
    return (
      <Menu onClick={this.handleMenuClick}>
        {optionArrs}
      </Menu>
    );
  }
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.state = {
      value: null,
    };
  }
  handleMenuClick(e) {
    this.setState({ value: e.value });
  }
  render() {
    return (
      <div>
        <Row style={{ paddingTop: '20px' }}>
          <Col span={6}>
            <Input addonBefore="WMS IP:" />
            <Dropdown overlay={DeleteFormContainer.showMenu(['receiveItems', 'IssueItem'])}>
              <Button style={{ marginLeft: 8 }}>
                Button <Icon type="down" />
              </Button>
            </Dropdown>
            <Button type="primary">Refresh</Button>
          </Col>
          <Col span={10} />
        </Row>
        <Row>
          { DeleteFormContainer.showTable('receiveItems', 'receiveItemsData') }
        </Row>
      </div>
    );
  }
}

export default DeleteFormContainer;
