import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button} from 'antd';
import 'antd/dist/antd.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleEdit() {
    //switch to the ProfileForm Edit
    window.location = '/'+ this.props.type + '/' + this.props.id + '/edit'
  }

  // handleLogout() {
  //   e.preventDefault();
  //   let that = this
  //   let email = this.props.currentUser
  //   axios.delete('/users/sign_out', {
  //   })
  //     .then(function(response){
  //       that.props.changePage("login")
  //     })
  //     .catch(function(error){
  //       console.log(error)
  //     })
  // }
  
  // handleLogout() {
  //   let id = this.props.id;
  //   let type = this.props.type;
  //   var request = null;
  //   if (this.props.type === "referral_agencies") {
  //     request = APIRoutes.referral_agencies.delete(id)
  //   } else {
  //     request = APIRoutes.landlords.delete(id)
  //   }
  //   fetch(request, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
  //     }
  //   }).then((response) => {
  //     window.location = '/' + type + '/';
  //   })
  // }

  handleLogout() {
    window.location = "/users/sign_out"
  }

  renderEmail() {
    return (
      <React.Fragment key='profile'>
        <p> {this.props.email} </p>
      </React.Fragment>
    )
  }

  renderAvatar() {
    return (
      <React.Fragment key='avatar'>
        <Avatar size={64} icon="user" />
      </React.Fragment>
    )
  }

  render() {
    return (
      <div style={{
        background: "#ECECEC",
        height: "10%",
        float: "top"
      }}>
        {[this.renderEmail(),
          this.renderAvatar(),
          <Button key='edit'
                  type="default"
                  onClick={this.handleEdit}
                  style={{float: "right"}}>Edit Account</Button>,
          <Button key='logout'
                  type="default"
                  onClick={this.handleLogout}
                  style={{float: "right"}}>Logout</Button>]}
        </div>
    )
  }
}

NavBar.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  email: PropTypes.string,

};

export default NavBar;