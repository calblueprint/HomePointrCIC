import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Utils from 'helpers/utils';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import APIRoutes from 'helpers/api_routes';

class LogInPage extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: '',
     remember: false,
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

 handleSubmit = () => {
   const login_route = '/users/sign_in';
   let payload = {
     email: this.state.email,
     password: this.state.password,
     // remember_me: this.state.remember_me
   }
   payload = JSON.stringify({ user: payload });
   console.log(payload)
   debugger
   fetch(login_route, {
     method: 'POST',
     headers: {
       // 'Content-Type': 'application/json',
       "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
     },
     body: payload,
     credentials: 'same-origin',
   }).then((response) => {
     window.location = '/';
   }).catch((response) => {
     this.setState({
       hasError: true,
       errorMessage: 'Wrong email or password'});
   });
  }

  render() {
   return (
     <div style={{width:'480px', margin:'auto', padding: '80px'}}>
       <Form onSubmit={this.handleSubmit}>
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
         <Form.Item>
             <Checkbox>Remember me</Checkbox>
           <a style={{float: 'right'}} href="">Forgot password</a>
           <Button type="primary" htmlType="submit" style={{width: '100%'}}>
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
