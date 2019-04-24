import React from "react";
import PropTypes from "prop-types";
import { Upload, message, Form, Icon, Select, Input, Button, Slider, Switch, DatePicker, Row, Col } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import Utils from 'helpers/utils';
import ActiveStorageProvider from "react-activestorage-provider";
import '../../assets/stylesheets/application.css';


class EditAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      renderInfoPassword: 0,
      user: this.props.user,
      email: this.props.email,
      new_password: this.props.current_password,
      confirm_password: null,
      disabled: false //to prevent multiple form submissions
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  /* takes in two arrays (our array of field names and our array of values)
   * and combines the corresponding field and value as a key value pair to be
   * returned as a dictionary that will be sent in our JSON requests.
   */
  convertToDict() {
    const user = this.state.user;
    const keys = ["name", "address", "email", "phone", "password"];
    const values = [user.name, user.address, this.state.email, user.phone, this.state.new_password];
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }

  //updates our values
  handleChange = (e) => {
    this.state.user[e.target.name] = e.target.value;
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  //api destroy
  handleDestroy() {
    
    let id = this.props.user.id;
    let type = this.props.type;
    var request = null;
    if (this.props.type === "landlord") {
      request = APIRoutes.landlords.delete(id)
    } else {
      request = APIRoutes.referral_agencies.delete(id)
    }
    fetch(request, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((response) => {
      window.location = '/';
    })
  }

  //api edit
  handleEdit() {
    event.preventDefault();
    let id = this.state.user.id;
    let type = this.props.type;
    var body = this.convertToDict()
    var request = null;

    if (this.props.type === "landlord") {
      body = JSON.stringify({landlord: body})
      request = APIRoutes.landlords.update(id)
    } else if (this.props.type === "referral_agency") {
      body = JSON.stringify({referral_agency: body})
      request = APIRoutes.referral_agencies.update(id)
    }
    fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {
      window.location = '/';
    }).catch((data) => {
      console.error(data);
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== this.state.new_password) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value) {
      form.validateFields(['confirm_password'], { force: true });
    }
    callback();
  }

  handlePasswordChange = (e) => {
    if (e.target.value != "") {
      this.setState({ new_password: e.target.value })
    }
  }

  renderInfo = (which_info, e) => {
    if (which_info == "password") {
      this.setState((state) => {
        return {renderInfoPassword: 1 - state.renderInfoPassword}
      });
    }
  }

  // Renders information dialogue on hover
  infoDialogueHelper = (which_info, info_text) => {
    if (which_info == "password" && this.state.renderInfoPassword) {
      return(
        <div className="info-dialogue"><p className="info-dialogue-text">{info_text}</p></div>
      );
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.state;
    return (
      <div className="form-container">
        <h1 className="form-header">Edit Account</h1>
        <Form layout="vertical" hideRequiredMark={true}>
          {/* FIRST ROW */}
          <Row gutter={60}>
            {/* ITEM 1 */}
            <Col span={12}>
              <Form.Item label="Full name">
                {getFieldDecorator('name', {
                  initialValue: user.name,
                  rules: [{
                    required: true, message: 'Please input your name!',
                  }],
                })(
                  <Input  type="string" name="name" onChange={this.handleChange}/>
                )}
              </Form.Item>
            </Col>
            {/* ITEM 2 */}
            <Col span={12}>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  initialValue: this.state.email,
                  rules: [{
                    required: true, message: 'Please input your email!',
                  }, {
                    type: 'email', message: 'The input is not a valid email!'
                  }],
                })(
                  <Input type="string" name="email" onChange={this.handleEmailChange}/>
                )}
              </Form.Item>
            </Col>
          </Row>

          {/* ROW 2*/}
          <Row gutter={60}>
            {/* ITEM 1 */}
            <Col span={12}>
              <Form.Item label="New password">
                <div onMouseEnter={(e) => this.renderInfo("password", e)} onMouseLeave={(e) => this.renderInfo("password", e)}><Icon type="question-circle" theme="twoTone" className="info-icon"/></div>
                {this.infoDialogueHelper("password", "Your new password should be minimum 8 characters.")}
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="password" name="encrypted_password" onChange={this.handlePasswordChange}/>
                )}
              </Form.Item>
            </Col>
            {/* ITEM 2 */}
            <Col span={12}>
              <Form.Item label="Confirm password">
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: 'Please confirm your password!',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input type="password" name="confirm_password" onChange={this.handleChange}/>
                )}
              </Form.Item>
            </Col>
          </Row>

          {/* ROW 3 */}
          <Row gutter={60}>
            {/* ITEM 1 */}
            <Col span={12}>
              <Form.Item label="Phone number">
                {getFieldDecorator('phone', {
                  initialValue: user.phone,
                  rules: [{
                    required: true, message: 'Please input your phone number!',
                  }],
                })(
                  <Input type="string" name="phone" onChange={this.handleChange}/>
                )}
              </Form.Item>
            </Col>
            {/* ITEM 2 */}
            <Col span={12}>
              <Form.Item label="Address">
                {getFieldDecorator('address', {
                  initialValue: user.address,
                  rules: [{
                    required: true, message: 'Please input your address!',
                  }],
                })(
                  <Input type="string" name="email" onChange={this.handleChange}/>
                )}
              </Form.Item>
            </Col>
          </Row>

          <div className="divider"/>

          {/* ROW 4 */}
          <Row gutter={60}>
            {/* ITEM 1 */}
            <Col span={12}>
              <h2>Delete account</h2>
            </Col>
            {/* ITEM 2 */}
            <Col span={12}>
              <Button type="danger" onClick={this.handleDestroy} className="delete-account-btn">Delete account</Button>
            </Col>
          </Row>

          {/* BUTTONS ROW */}
          <Row gutter={60} className="buttons-container">
            {/* ITEM 1 */}
            <Col span={12}/>
            {/* ITEM 2 */}
            <Col span={12} style={{ textAlign: 'right' }}>
              {/* BUTTON CONTAINER ROW */}
              <Row gutter={30}>
                {/* BUTTON 1 */}
                <Col span={12} style={{ textAlign: 'right'}}>
                  <Button className="button" onClick={this.handlePageSwitch} className="button" href={"/"}>Cancel</Button>
                </Col>
                {/* BUTTON 2 */}
                <Col span={12} style={{ textAlign: 'right'}}>
                  <Button type="primary" className="button" onClick={this.handleEdit}>Save</Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </Form>
      </div>
    );
  }
}



export default Form.create()(EditAccount);
