import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
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
/* eslint-enable import/extensions */
import {
  doListDeleteItems,
  doListDeleteFormItems,
} from '../actions';

const fixHeight = window.innerHeight * 0.7;

class DeleteFormContainer extends React.Component {
  static showTable(columnType, listDeleteData, loadingDeleteData, rowSelection) {
    return (
      <Table
        columns={columnJson[`${columnType}`]}
        loading={loadingDeleteData}
        dataSource={listDeleteData}
        rowSelection={rowSelection}
        scroll={{ y: fixHeight }}
        pagination={false}
        size="small"
        bordered
      />
    );
  }
  static showMenu(options) {
    const optionArrs = [];
    _.map(options, (data, k) => {
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
      data: this.props.listDeleteData,
      selectedKeys: '',
    };
  }
  componentDidMount() {
    /* eslint-disable no-shadow */
    const { doListDeleteFormItems } = this.props;
     /* eslint-enable no-shadow */
    doListDeleteFormItems({
      choice: 'receiveItems',
    });
  }
  handleMenuClick(e) {
    this.setState({ value: e.value });
  }
  render() {
    const { loadingDeleteData } = this.props;
    const { data, selectedKeys } = this.state;
    /* eslint-disable no-shadow */
    const { doListDeleteItems } = this.props;
     /* eslint-enable no-shadow */
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        this.setState({
          selectedKeys: data[selectedRowKeys].id,
        });
      },
    };
    return (
      <div>
        <Row>
          <Col span={24} push={2} pull={2}>
            <Input addonBefore="WMS IP:" />
            <Dropdown overlay={DeleteFormContainer.showMenu(['receiveItems', 'IssueItem'])}>
              <Button style={{ marginLeft: 8 }}>
                Button <Icon type="down" />
              </Button>
            </Dropdown>
            <Button type="primary">Refresh</Button>
          </Col>
        </Row>
        <Row>
          <Col span={20} push={2} pull={2}>
            { DeleteFormContainer.showTable('delReceiveColumns', data, loadingDeleteData, rowSelection)}
          </Col>
        </Row>
        <Row>
          <Col span={20} push={2} pull={2}>
            <Button
              type="primary"
              icon="delete"
              style={{ width: '100%' }}
              onClick={() => {
                doListDeleteItems({
                  choice: 'receiveItems',
                  deleteId: selectedKeys,
                });
              }}
            > Delete </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};
DeleteFormContainer.propTypes = {
  doListDeleteItems: PropTypes.func,
  doListDeleteFormItems: PropTypes.func,
  loadingDeleteData: PropTypes.bool,
  listDeleteData: PropTypes.array,
};
export default connect(
  mapStateToProps,
  {
    doListDeleteFormItems,
    doListDeleteItems,
  },
)(DeleteFormContainer);
