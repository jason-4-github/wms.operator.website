import React from 'react';
import {
  Row,
  Col,
  Form,
  Icon,
  Input,
  Modal,
  message,
} from 'antd';
import { browserHistory } from 'react-router';

const FormItem = Form.Item;

class IssueMenuContainer extends React.Component {
  static showModal() {
    const loginModal = {
      title: '',
      style: { top: 200 },
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
    };
    Modal.info(loginModal);
  }
  constructor(props) {
    super(props);
    this.state = {
      companyId: null,
    };
  }
  componentWillMount() {
    IssueMenuContainer.showModal();
  }
  render() {
    return (
      <div id="issueMenu-container">
        <Row>
          <Col span={4} />
          <Col span={8} id="leftIcon">
            <div className="upperSpace" />
            <div>
              <Icon
                type="check-square-o"
                className="issueMenuIcon"
                onClick={() => {
                  return (browserHistory.replace('issueCheck'));
                }}
              />
              <br />
              <h2>Check Form</h2>
            </div>
          </Col>
          <Col span={8} id="rightIcon">
            <div className="upperSpace" />
            <div>
              <Icon
                type="edit"
                className="issueMenuIcon"
                onClick={() => {
                  return (browserHistory.replace('issueRevise'));
                }}
              />
              <br />
              <h2>Revise Form</h2>
            </div>
          </Col>
          <Col span={4} />
        </Row>
      </div>
    );
  }
}

export default IssueMenuContainer;
