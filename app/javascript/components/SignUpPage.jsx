import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Utils from 'helpers/utils';
import { Form, Icon, Input, Button, Checkbox, Select, Col, Row } from 'antd';
import APIRoutes from 'helpers/api_routes';
//import ErrorMessage from './individual/ErrorMessage.jsx';
import '../../assets/stylesheets/entrypages.css';
var logo = require('../../assets/images/logo.png');

class SignUpPage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     inputs: {
       type: undefined,
       name: '',
       email: '',
       password: '',
       password_confirmation: '',
       phone: '',
       address: ''
     },
     errorMessage: '',
     hasError: false,
     page: 0
   }
 }

 handleChange = (event) => {
   const name = event.target.name;
   const value = event.target.value;
   const inputs = this.state.inputs;
   inputs[name] = value;
   this.setState({
     inputs: inputs
   });
 }

 handleSelectChange = (value) => {
   const inputs = this.state.inputs;
   inputs["type"] = value;
   this.setState({
     inputs: inputs
   });
 }

 renderErrorMsg = () => {
   if (this.state.hasError) {
     return (
       <div className="errormsg"><p>{this.state.errorMessage}</p></div>
     );
   }
 }

 handleSubmit = (event) => {
   event.preventDefault();
   this.props.form.validateFields(
     (err) => {
       if (!err) {
         const sign_up_route = '/users';
         const state = this.state.inputs;
         let payload = {
           type: state.type,
           name: state.name,
           email: state.email,
           password: state.password,
           phone: state.phone,
           address: state.address
         }

         if (state.password !== state.password_confirmation) {
           this.setState({
             hasError: true,
             errorMessage: 'Passwords must match'});
           this.renderErrorMsg();
         } else {
           payload = JSON.stringify({ user: payload });
           fetch(sign_up_route, {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
               "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
             },
             body: payload,
             credentials: 'same-origin',
           }).catch((response) => {
             this.setState({
               hasError: true,
               errorMessage: 'Missing or inadequate input'});
           }).then((response) => {
             window.location = '/';
           });
         }
       }
     },
   );
  }

  redirectToLogin = () => {
    window.location = '/users/sign_in'
  }

  handlePageSwitch = (type) => {
    if (type == "next") {
      this.props.form.validateFields(
        (err) => {
          if (!err) {
            this.setState({ page: 1 - this.state.page });
          }
        },
      );
    } else if (type == "previous") {
      this.setState({ page: 1 - this.state.page });
    }
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== this.state.inputs.password) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  renderNextPage = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="big-frame">
        <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark={true}>

          {/* HOMEPOINTR LOGO */}
          <div className="logo"/>

          {/* FIRST ROW */}
          <Row gutter={60}>
            {/* ITEM 1 */}
            <Col span={12}>
              <Form.Item label="Full name">
                {getFieldDecorator('name', {
                  rules: [{
                    required: true, message: 'Please input your full name!',
                  }]
                })(
                  <Input
                  type="string"
                  name="name"
                  value={this.state.inputs.name}
                  onChange={this.handleChange}
                  />
                )}
              </Form.Item>
            </Col>
            {/* ITEM 2 */}
            <Col span={12}>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  rules: [{
                    required: true, message: 'Please input your email!',
                  }, {
                    type: 'email', message: 'The input is not a valid email!'
                  }],
                })(
                  <Input
                  type="string"
                  name="email"
                  value={this.state.inputs.email}
                  onChange={this.handleChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          {/* ROW 2 */}
          <Row gutter={60}>
            {/* ITEM 1 */}
            <Col span={12}>
              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input
                  type="password"
                  name="password"
                  value={this.state.inputs.password}
                  onChange={this.handleChange}
                  />
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
                  <Input
                  type="password"
                  name="password_confirmation"
                  value={this.state.inputs.password_confirmation}
                  onChange={this.handleChange}
                  />
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
                  rules: [{
                    required: true, message: 'Please input your phone number!',
                  }],
                })(
                  <Input
                  type="string"
                  name="phone"
                  value={this.state.inputs.phone}
                  onChange={this.handleChange}
                  />
                )}
              </Form.Item>
            </Col>
            {/* ITEM 2 */}
            <Col span={12}>
              <Form.Item label="Address">
                {getFieldDecorator('address', {
                  rules: [{
                    required: true, message: 'Please input your address!',
                  }],
                })(
                  <Input
                  type="string"
                  name="address"
                  value={this.state.inputs.address}
                  onChange={this.handleChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          { this.renderErrorMsg() }
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
                  <Button className="button" onClick={() => this.handlePageSwitch("previous")} className="button">
                    Previous
                  </Button>
                </Col>
                {/* BUTTON 2 */}
                <Col span={12} style={{ textAlign: 'right'}}>
                  <Button type="primary" htmlType="submit" className="button">
                  Register
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </Form>
      </div>
      );
  }

  renderInitialPage = () => {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="small-frame">
        <Form layout="vertical" hideRequiredMark={true}>

          {/* HOMEPOINTR LOGO */}
          <div className="logo"/>

          {/* ROW 1 */}
          <Row>
          {/* ITEM 1 */}
            <Col span={24}>
              <Form.Item label="I am a...">
                {getFieldDecorator('type', {
                  initialValue: this.state.inputs.type,
                  rules: [{
                    required: true, message: 'Please choose a response!',
                  }],
                })(
                  <Select
                    placeholder="Select one"
                    value={this.state.inputs.type}
                    onChange={this.handleSelectChange}
                  >
                    <Select.Option value="Landlord">Landlord</Select.Option>
                    <Select.Option value="ReferralAgency">Referral agency</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          { this.renderErrorMsg() }

          {/* BUTTONS ROW */}
          <Row gutter={32} className="buttons-container">
            {/* BUTTON 1 */}
            <Col span={12}>
              <Button className="button" onClick={this.redirectToLogin} className="button">
                Cancel
              </Button>
            </Col>
            {/* BUTTON 2 */}
            <Col span={12}>
              <Button type="primary" className="button" onClick={() => this.handlePageSwitch("next")}>
                Next
              </Button>
            </Col>
          </Row>

        </Form>
      </div>
    );
 }

 render() {
   if (this.state.page == 0) {
     return (
       <div>
         { this.renderInitialPage() }
       </div>
     );
   } else {
     return (
       <div>
         { this.renderNextPage() }
       </div>
     );
   }
 }
}

export default Form.create()(SignUpPage);
