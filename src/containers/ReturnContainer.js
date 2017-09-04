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
  doListReturnMO,
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
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Header, Content } = Layout;
const FormItem = Form.Item;

class ReturnContainer extends React.Component {
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
    ReturnContainer.showModal();
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
    const { doListReturnMO, doListScanData } = this.props;
    /* eslint-enable no-shadow */
    if (e.target.value.match('RACK') !== null ||
        e.target.value.match('rack') !== null) {
      this.setState({
        sacnInputStyle: 'scanInput',
        scanRack: e.target.value,
      });
    } else {
      doListReturnMO({
        invoiceNumber: this.state.invoiveNumber,
      });
      doListScanData({
        rackNumber: scanRack,
        barCode: e.target.value,
        qtyDigit: qtyOptions,
        dateCodeDigit: dateCodeOptions,
      });
    }
  }
  render() {
    const {
      loadingMO,
      loadingScan,
      loadingPartsNumber,
      listMOData,
      listPartsNumberData,
      listRackNameData,
      listRackInfos,
      listScanData,
      listScanItemName } = this.props;
      /* eslint-disable no-shadow */
    const {
      doListPartsNumber,
      doListRackInfos,
      doListReturnMO } = this.props;
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
            form: 'issueDetails',
          });
        }
      },
    };
    return (
      <div id="return-container">
        <LocaleProvider locale={enUS}>
          <Layout className="layout">
            <Header id="header">
              <div id="headerTitle">Material Return Station</div>
            </Header>
            <Content id="content">
              <Row style={{ padding: '5px' }}>
                <Col span={16}>
                  <Col span={2} className="returnInfo">
                    MO NO.
                  </Col>
                  <Col span={18}>
                    <Input prefix={<Icon type="search" />} style={{ width: '95%' }} placeholder="Please Enter The MO.NO" onChange={(e) => { this.setState({ invoiveNumber: e.target.value }); }} />
                  </Col>
                  <Col span={2}>
                    <Button
                      type="primary" onClick={() => {
                        doListReturnMO({
                          invoiceNumber: this.state.invoiveNumber,
                        });
                      }}
                    >
                      Return
                    </Button>
                  </Col>
                  <Col span={2}>
                    <Button type="primary">Revise BarCode</Button>
                  </Col>
                </Col>
                <Col span={8}>
                  <Col span={4} />
                  <Col span={2} className="returnInfo">M.A.: </Col>
                  <Col span={16}>
                    <Input
                      value={listMOData ? listMOData[0].madeArea : ''} disabled
                    />
                  </Col>
                  <Col span={2} />
                </Col>
              </Row>
              <Col span={24}>
                <Card bodyStyle={{ padding: '10px' }}>
                  <Row>
                    <Col span={16} id="detailTable">
                      { ReturnContainer.showTable('MO Detail', 140, 'returnDataOfMO', listMOData, rowSelection, loadingMO) }
                    </Col>
                    <Col span={8}>
                      { ReturnContainer.showTable('Data of This Part NO', 140, 'returnDataOfPartNO', listPartsNumberData, rowSelection, loadingPartsNumber) }
                    </Col>
                  </Row>
                  <Row id="hrRow"><hr /></Row>
                  <Row style={{ padding: '5px' }}>
                    <Col span={16}>
                      <Col span={2} className="returnInfo">
                        TR CD.
                      </Col>
                      <Col span={4}>
                        <Input />
                      </Col>
                      <Col span={2} className="returnInfo">
                        From Dept.
                      </Col>
                      <Col span={4}>
                        <Input />
                      </Col>
                      <Col span={2} className="returnInfo">
                        To Dept.
                      </Col>
                      <Col span={4}>
                        <Input />
                      </Col>
                    </Col>
                    <Col span={8}>
                      <Col span={4} />
                      <Col span={2} className="returnInfo">UID1: </Col>
                      <Col span={16}>
                        <Input />
                      </Col>
                      <Col span={2} />
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
                                { ReturnContainer.showRadioGroup(radioOptions.faceOptions) }
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
                                { ReturnContainer.showRadioGroup(radioOptions.faceOptions) }
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
                      {listScanData ? ReturnContainer.showTable('Data of This Rack', 165, 'returnDataOfRack', listScanData, null, loadingScan) : ReturnContainer.showTable('Data of This Rack', 165, 'returnDataOfRack', listRackInfos, null, loadingScan)}
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
                            { ReturnContainer.showRadioGroup(radioOptions.dateCode) }
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
                            { ReturnContainer.showRadioGroup(radioOptions.qty) }
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
                            { ReturnContainer.showRadioGroup(radioOptions.faceOptions) }
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
ReturnContainer.propTypes = {
  doListReturnMO: PropTypes.func,
  doListRackName: PropTypes.func,
  doListScanData: PropTypes.func,
  doListRackInfos: PropTypes.func,
  doListPartsNumber: PropTypes.func,
  loadingMO: PropTypes.bool,
  loadingScan: PropTypes.bool,
  loadingPartsNumber: PropTypes.bool,
  listScanData: PropTypes.array,
  listScanItemName: PropTypes.string,
  listRackInfos: PropTypes.array,
  listRackNameData: PropTypes.array,
  listMOData: PropTypes.array,
  listPartsNumberData: PropTypes.array,
};
export default connect(
  mapStateToProps,
  {
    doListReturnMO,
    doListRackName,
    doListScanData,
    doListRackInfos,
    doListPartsNumber,
  },
)(ReturnContainer);
