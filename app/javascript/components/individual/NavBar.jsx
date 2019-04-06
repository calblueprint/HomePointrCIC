import React from "react";
import PropTypes from "prop-types";
import { Avatar, Button } from "antd";
import APIRoutes from "helpers/api_routes";
import "antd/dist/antd.css";
import logo from 'images/logo.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleEdit() {
    //switch to the ProfileForm Edit
    window.location = "/" + this.props.type + "/" + this.props.id + "/edit";
  }

  handleLogout() {
    let request = APIRoutes.users.delete();
    fetch(request, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then(response => {
      window.location = "/users/sign_in";
    });
  }

  renderEmail() {
    return (
      <React.Fragment key="profile">
        <p> {this.props.email} </p>
      </React.Fragment>
    );
  }

  renderAvatar() {
    return (
      <React.Fragment key="avatar">
        <Avatar size={36} icon="user" onClick={this.renderDialog}/>
      </React.Fragment>
    );
  }

  toggleDialog() {
    console.log("hello");
    if (document.querySelector("#navbar-dialog").style.display != "block") {
      document.querySelector("#navbar-dialog").style.display = "block";
    } else {
      document.querySelector("#navbar-dialog").style.display = "none";
    }
  }

  returnHome() {
    window.location = "/";
  }

  render() {
    return (
      // <div
      //   style={{
      //     background: "#FFFFFF",
      //     height: "64px",
      //     borderBottom: "1px solid #C4C4C4"
      //   }}
      // >
      //   {[
      //     this.renderEmail(),
      //     this.renderAvatar(),
      //     <Button
      //       key="edit"
      //       type="default"
      //       onClick={this.handleEdit}
      //       style={{ float: "right" }}
      //     >
      //       Edit Account
      //     </Button>,
      //     <Button
      //       key="logout"
      //       type="default"
      //       onClick={this.handleLogout}
      //       style={{ float: "right" }}
      //     >
      //       Logout
      //     </Button>
      //   ]}
      // </div>
      <div>
        <div className="navbar">
          <img className="home-button-logo" onClick={this.returnHome} src={logo}/>
          <div className="navbar-avatar" onClick={this.toggleDialog}>{this.renderAvatar()}</div>
        </div>
        <div id="navbar-dialog">
          <Button key="edit" type="default" onClick={this.handleEdit} className="navbar-dialog-button">Edit account</Button>
          <Button key="logout" type="danger" onClick={this.handleLogout} className="navbar-dialog-button">Logout</Button>
        </div>
      </div>

    );
  }
}

NavBar.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  email: PropTypes.string
};

export default NavBar;
