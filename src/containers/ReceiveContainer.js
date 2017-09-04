import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Col,
  Row,
  Tag,
  Tabs,
  Card,
  Form,
  Icon,
  Modal,
  Table,
  Radio,
  Input,
  Button,
  Layout,
  message,
  InputNumber,
  AutoComplete,
  LocaleProvider,
} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import {
  doListReceive,
  doListScanData,
  doListRackName,
  doListRackInfos,
  doListPartsNumber,
} from '../actions';
/* eslint-disable import/extensions */
import columnJson from './../constants/tableColumnName.json';
import radioOptions from './../constants/radioOptions.json';
/* eslint-enable import/extensions */
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Header, Content } = Layout;
const FormItem = Form.Item;

class ReceiveContainer extends React.Component {
  static showTable(text, fixHeight, columnType, data, rowSelection, loading) {
    return (
      <Table
        bordered
        size="small"
        pagination={false}
        scroll={{ y: fixHeight }}
        rowSelection={rowSelection}
        title={() => { return text; }}
        columns={columnJson[`${columnType}`]}
        dataSource={data}
        loading={loading}
      />
    );
  }
  static showRadioGroup(options) {
    const optionArrs = [];
    _.map(options, (data, k) => {
      optionArrs.push(<RadioButton
        value={data.replace(/[^0-9]/ig, '')}
        key={k}
      >
        {data}
      </RadioButton>);
    });
    return (
      <div>
        { optionArrs }
      </div>
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
      scanRack: '',
      scanItem: '',
      faceOptions: '',
      dateCodeOptions: '',
      qtyOptions: '',
      scanFaceOptions: '',
      rackName: '',
      partsNumber: '',
      companyId: null,
      invoiveNumber: '',
      sacnInputStyle: 'generalInput',
    };
    this.onSelect = this.onSelect.bind(this);
    this.handleScan = this.handleScan.bind(this);
  }
  componentWillMount() {
    ReceiveContainer.showModal();
  }
  componentDidMount() {
    /* eslint-disable no-shadow */
    const { doListRackName } = this.props;
    /* eslint-enable no-shadow */
    doListRackName();
  }
  onSelect(value) {
    this.setState({
      rackName: value,
    });
  }
  handleScan(e) {
    const {
      scanRack,
      qtyOptions,
      dateCodeOptions,
    } = this.state;
    /* eslint-disable no-shadow */
    const { doListReceive, doListScanData } = this.props;
    /* eslint-enable no-shadow */
    if (e.target.value.match('RACK') !== null ||
        e.target.value.match('rack') !== null) {
      this.setState({
        sacnInputStyle: 'scanInput',
        scanRack: e.target.value,
      });
    } else {
      doListScanData({
        rackNumber: scanRack,
        barCode: e.target.value,
        qtyDigit: qtyOptions,
        dateCodeDigit: dateCodeOptions,
      });
      doListReceive({
        invoiceNumber: this.state.invoiveNumber,
      });
    }
  }
  render() {
    const {
      loading,
      loadingReceive,
      loadingPartsNumber,
      listReceiveData,
      listPartsNumberData,
      listRackNameData,
      listRackInfos,
      listScanData,
      listScanItemName } = this.props;
      /* eslint-disable no-shadow */
    const {
      doListPartsNumber,
      doListRackInfos,
      doListReceive } = this.props;
      /* eslint-enable no-shadow */
    const rowSelection = {
      type: 'radio',
      onChange: (selectedRowKeys, selectedRows) => {
        if (selectedRows[0].rackName !== undefined) {
          this.setState({
            partsNumber: selectedRows[0].partsNumber,
            rackName: selectedRows[0].rackName,
            faceOptions: selectedRows[0].rackSide,
          });
        } else {
          doListPartsNumber({
            dataOfPartsNumber: selectedRows[0].partsNumber,
            form: 'receiveDetails',
          });
        }
      },
    };
    return (
      <div id="receive-container">
        <LocaleProvider locale={enUS}>
          <Layout className="layout">
            <Header id="header">
              <div id="headerTitle">Material Receive Station</div>
            </Header>
            <Content id="content">
              <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="solution" />Receive Form</span>} key="1">
                  <Row style={{ padding: '5px' }}>
                    <Col span={4} />
                    <Col span={8}>
                      <Search style={{ width: '80%' }} placeholder="Please Enter The ENV.NO" onChange={(e) => { this.setState({ invoiveNumber: e.target.value }); }} />
                      <Button
                        type="primary" onClick={() => {
                          doListReceive({
                            invoiceNumber: this.state.invoiveNumber,
                          });
                        }}
                      >
                        G.INV
                      </Button>
                    </Col>
                    <Col span={4}>
                      <Col span={12} className="receiveInfo">Receive No: </Col>
                      <Col span={12}>
                        <Input
                          value={listReceiveData ? listReceiveData[0].receiveNumber : ''} disabled
                        />
                      </Col>
                    </Col>
                    <Col span={4}>
                      <Col span={12} className="receiveInfo">M.A.: </Col>
                      <Col span={12}>
                        <Input
                          value={listReceiveData ? listReceiveData[0].madeArea : ''} disabled
                        />
                      </Col>
                    </Col>
                    <Col span={4} />
                  </Row>
                  <Col span={24}>
                    <Card bodyStyle={{ padding: '10px' }}>
                      <Row>
                        <Col span={16} id="detailTable">
                          { ReceiveContainer.showTable('Receive Detail', 140, 'receiveDetail', listReceiveData, rowSelection, loadingReceive) }
                        </Col>
                        <Col span={8}>
                          { ReceiveContainer.showTable('Data of This Part NO', 140, 'receiveOfPartNO', listPartsNumberData, rowSelection, loadingPartsNumber) }
                        </Col>
                      </Row>
                      <Row>
                        <Col span={6}>
                          <Card title="Task Status" bodyStyle={{ padding: '10px', textAlign: 'center' }}>
                            <Tabs size="small">
                              <TabPane tab="Part NO." key="1" >
                                <Input size="large" placeholder="Part NO." value={this.state.partsNumber} />
                              </TabPane>
                              <TabPane tab="Rack NO." key="2" >
                                <AutoComplete
                                  style={{ width: 200 }}
                                  dataSource={listRackNameData || ['rack001', 'rack002', 'rack003', 'rack004', 'rack005']}
                                  placeholder="Rack No"
                                  onSelect={this.onSelect}
                                />
                                <div id="faceRadio">
                                  <RadioGroup
                                    onChange={(e) => {
                                      this.setState({
                                        faceOptions: (e.target.value - 1),
                                      });
                                    }}
                                    defaultValue={this.state.face}
                                  >
                                    { ReceiveContainer.showRadioGroup(radioOptions.faceOptions) }
                                  </RadioGroup>
                                </div>
                              </TabPane>
                              <TabPane tab="Empty Block" key="3" >
                                <InputNumber min={0} max={10} defaultValue={3} />
                                <div id="faceRadio">
                                  <RadioGroup
                                    onChange={(e) => {
                                      this.setState({
                                        faceOptions: (e.target.value - 1),
                                      });
                                    }}
                                    defaultValue={this.state.face}
                                  >
                                    { ReceiveContainer.showRadioGroup(radioOptions.faceOptions) }
                                  </RadioGroup>
                                </div>
                              </TabPane>
                            </Tabs>
                            <div id="startButton">
                              <Button
                                type="primary"
                                size="large"
                                onClick={() => {
                                  doListRackInfos({
                                    rackName: this.state.rackName,
                                    face: this.state.faceOptions,
                                  });
                                }}
                              >Start</Button>
                            </div>
                          </Card>
                        </Col>
                        <Col span={10} id="bottomMidTable">
                          {listScanData ? ReceiveContainer.showTable('Data of This Rack', 165, 'receiveOfRack', listScanData, null, loading) : ReceiveContainer.showTable('Data of This Rack', 165, 'receiveOfRack', listRackInfos, null, loading)}
                        </Col>
                        <Col span={8}>
                          <Card title="Scan" bodyStyle={{ padding: '10px' }}>
                            <Col span={6} className="scanRadio">Date Code: </Col>
                            <Col span={18} className="scanRadio">
                              <RadioGroup
                                onChange={(e) => {
                                  this.setState({
                                    dateCodeOptions: e.target.value,
                                  });
                                }}
                              >
                                { ReceiveContainer.showRadioGroup(radioOptions.dateCode) }
                              </RadioGroup>
                            </Col>
                            <Col span={6} className="scanRadio">QTY: </Col>
                            <Col span={18} className="scanRadio">
                              <RadioGroup
                                onChange={(e) => {
                                  this.setState({
                                    qtyOptions: e.target.value,
                                  });
                                }}
                              >
                                { ReceiveContainer.showRadioGroup(radioOptions.qty) }
                              </RadioGroup>
                            </Col>
                            <Col span={6} className="scanRadio">Face: </Col>
                            <Col span={18} className="scanRadio">
                              <RadioGroup
                                onChange={(e) => {
                                  this.setState({
                                    scanFaceOptions: e.target.value,
                                  });
                                }}
                              >
                                { ReceiveContainer.showRadioGroup(radioOptions.faceOptions) }
                              </RadioGroup>
                            </Col>
                            <Col span={6} className="scanRadio">Scan</Col>
                            <Col span={18}>
                              <Input id={this.state.sacnInputStyle} onChange={this.handleScan} />
                            </Col>
                            <Col span={6} className="scanRadio">Rack:</Col>
                            <Col span={18} className="scanRadio"><Tag className="scanTag">{this.state.scanRack}</Tag>
                            </Col>
                            <Col span={6} className="scanRadio">Item:</Col>
                            <Col span={18} className="scanRadio"><Tag className="scanTag">{listScanItemName}</Tag></Col>
                          </Card>
                        </Col>
                      </Row>
                      <Row id="finishRow">
                        <Button id="finishButton" size="large" type="primary">Finish</Button>
                      </Row>
                    </Card>
                  </Col>
                </TabPane>
                <TabPane tab={<span><Icon type="delete" />Delete Form</span>} key="2" />
              </Tabs>
            </Content>
          </Layout>
        </LocaleProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};
ReceiveContainer.propTypes = {
  doListReceive: PropTypes.func,
  doListRackName: PropTypes.func,
  doListScanData: PropTypes.func,
  doListRackInfos: PropTypes.func,
  doListPartsNumber: PropTypes.func,
  loading: PropTypes.bool,
  loadingReceive: PropTypes.bool,
  loadingPartsNumber: PropTypes.bool,
  listScanData: PropTypes.array,
  listScanItemName: PropTypes.string,
  listRackInfos: PropTypes.array,
  listRackNameData: PropTypes.array,
  listReceiveData: PropTypes.array,
  listPartsNumberData: PropTypes.array,
};
export default connect(
  mapStateToProps,
  {
    doListReceive,
    doListRackName,
    doListScanData,
    doListRackInfos,
    doListPartsNumber,
  },
)(ReceiveContainer);
