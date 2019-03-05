import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Utils from 'helpers/utils';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../../assets/stylesheets/loginpage.css';
var logo = require('../../assets/images/logo.png');

class LogInPage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: '',
     remember_me: 0,
     errorMessage: '',
     hasError: false
   }
 }

 handleChange = (event) => {
   const name = event.target.name;
   const value = event.target.value;
   if (name === "email") {
     this.setState({ email: value });
   } else {
     this.setState({ password: value });
   }
 }

 handleRememberMe = (event) => {
   this.setState({ remember_me: !this.state.remember_me });
 }

 handleSubmit = (event) => {
   event.preventDefault();
   const login_route = '/users/sign_in';
   let payload = {
     email: this.state.email,
     password: this.state.password,
     remember_me: this.state.remember_me
   }
   payload = JSON.stringify({ user: payload });
   console.log(payload)
   debugger
   fetch(login_route, {
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
       errorMessage: 'Wrong email or password'});
   }).then((response) => {
     window.location = '/';
   });
  }

 renderErrorMsg = () => {
   if (this.state.hasError) {
     return (
       <div><p>{ this.state.errorMessage }</p></div>
     );
   }
 }

 render() {
   return (
     <div className="frame">
       <Form onSubmit={this.handleSubmit}>
         <img src={logo} className="logo"></img>
         <Form.Item>
             <Input
               type="string"
               name="email"
               prefix={ <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } /> }
               placeholder="Email"
               onChange={this.handleChange}
             />
         </Form.Item>
         <Form.Item>
             <Input
               type="password"
               name="password"
               prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
               placeholder="Password"
               onChange={this.handleChange}
             />
         </Form.Item>
         { this.renderErrorMsg() }
         <Form.Item>
             <Checkbox onChange={this.handleRememberMe}>Remember me</Checkbox>
           <a className="login-form-forgot" href="">Forgot password</a>
           <Button type="primary" htmlType="submit" className="login-form-button">
             Log in
           </Button>
           Or <a href="">register now!</a>
         </Form.Item>
       </Form>
     </div>
   );
 }

}

export default LogInPage;
