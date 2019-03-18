import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Utils from 'helpers/utils';
import { Form, Icon, Input, Button, Checkbox, Select, Col, Row } from 'antd';
import APIRoutes from 'helpers/api_routes';
import '../../assets/stylesheets/entrypages.css';
var logo = require('../../assets/images/logo.png');

class SignUpPage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     inputs: {
       type: '',
       name: '',
       email: '',
       password: '',
       password_confirmation: '',
       phone: '',
       address: '',
       errorMessage: '',
       hasError: false,
     },
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
   console.log(this.state);
 }

 renderErrorMsg = () => {
   if (this.state.hasError) {
     return (
       <div><p>{ this.state.errorMessage }</p></div>
     );
   }
 }

 handleSubmit = (event) => {
   event.preventDefault();
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
     alert("Passwords must match");
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

  redirectToLogin = () => {
    window.location = '/users/sign_in'
  }

  handlePageSwitch = () => {
    if (this.state.page == 0 && !this.state.inputs.type) {
        alert("Error");
    } else {
        this.setState({ page: 1 - this.state.page });
    }
  }

  renderNextPage = () => {
    return (
      <div className="big-frame">
        <Form onSubmit={this.handleSubmit} layout="vertical">

          {/* HOMEPOINTR LOGO */}
          <div className="logo"/>

          {/* FIRST ROW */}
          <Row gutter={60}>
            {/* ITEM 1 */}
            <Col span={12}>
              <Form.Item label="Full name">
                <Input
                type="string"
                name="name"
                onChange={this.handleChange}
                />
              </Form.Item>
            </Col>
            {/* ITEM 2 */}
            <Col span={12}>
              <Form.Item label="Email">
                <Input
                type="string"
                name="email"
                onChange={this.handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* ROW 2 */}
          <Row gutter={60}>
            {/* ITEM 1 */}
            <Col span={12}>
              <Form.Item label="Password">
                <Input
                type="password"
                name="password"
                onChange={this.handleChange}
                />
              </Form.Item>
            </Col>
            {/* ITEM 2 */}
            <Col span={12}>
              <Form.Item label="Confirm password">
                <Input
                type="password"
                name="password_confirmation"
                onChange={this.handleChange}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* ROW 3 */}
          <Row gutter={60}>
            {/* ITEM 1 */}
            <Col span={12}>
              <Form.Item label="Phone number">
                <Input
                type="string"
                name="phone"
                onChange={this.handleChange}
                />
            </Form.Item>
            </Col>
            {/* ITEM 2 */}
            <Col span={12}>
              <Form.Item label="Address">
                <Input
                type="string"
                name="address"
                onChange={this.handleChange}
                />
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
                  <Button className="button" onClick={this.handlePageSwitch} className="button">
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

  /* RENDER SELECT DROPDOWN WITH VALUE IF TYPE IS NOT NULL*/
  renderValueSelect = () => {
    return (
      <Select
        value={(this.state.inputs.type)}
        onChange={this.handleSelectChange}
      >
        <Select.Option value="Landlord">Landlord</Select.Option>
        <Select.Option value="ReferralAgency">Referral agency</Select.Option>
      </Select>
    );
  }

  /* RENDER SELECT DROPDOWN WITH PLACEHOLDER IF TYPE IS NULL*/
  renderPlaceholderSelect = () => {
    return (
      <Select
        placeholder="Select one"
        onChange={this.handleSelectChange}
      >
        <Select.Option value="Landlord">Landlord</Select.Option>
        <Select.Option value="ReferralAgency">Referral agency</Select.Option>
      </Select>
    );
  }

  renderInitialPage = () => {
    return (
      <div className="small-frame">
        <Form layout="vertical">

          {/* HOMEPOINTR LOGO */}
          <div className="logo"/>

          {/* ROW 1 */}
          <Row>
          {/* ITEM 1 */}
            <Col span={24}>

              <Form.Item label="I am a...">
                { (this.state.inputs.type) ? this.renderValueSelect() : this.renderPlaceholderSelect() }
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
              <Button type="primary" className="button" onClick={this.handlePageSwitch}>
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

export default SignUpPage;
