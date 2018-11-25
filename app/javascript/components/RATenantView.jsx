import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Tag} from 'antd';
import 'antd/dist/antd.css';

class RATenantView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      applications: props.applications
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  handleChange = (e) => {
    this.state.applications = e.target.applications
    this.setState({applications: this.state.applications})
  }

  handleDestroy() {
    let id = this.props.id;
    let request = APIRoutes.tenants.delete(id)
    fetch(request, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((response) => {
      window.location = '/' + type + '/';
    })
  }

  handleEdit() {
    //switch to the ProfileForm Edit
    return null
  }

  renderNameDescription() {
    return (
      <div>
        <h1> {this.props.name} </h1>
        <p> {this.props.description} </p>
      </div>
    )
  }

  renderAvatar() {
    return (
      <React.Fragment>
        <Avatar size={64} icon="user" />
      </React.Fragment>
    )
  }
  //     0 - matched with a house
  //     1 - interviewing with a house
  //     2 - applied
  //     3 - rejected
  //     4 - not applied yet
  rednerStatus() {
    if (this.state.status === 0) {
      return (
        <React.Fragment>
          <h2 style={{color:"green"}}>housed</h2>
        </React.Fragment>
      )
    } else if (this.state.status === 1) {
      return (
        <React.Fragment>
          <h2 style={{color:"yellow"}}>interviewing with house</h2>
        </React.Fragment>
      )
    } else if (this.state.status === 2) {
      return (
        <React.Fragment>
          <h2 style={{color:"orange"}}>applied</h2>
        </React.Fragment>
      )
    } else if (this.state.status === 3) {
      return (
        <React.Fragment>
          <h2 style={{color:"red"}}>rejected</h2>
        </React.Fragment>
      )
    } else if (this.state.status === 4) {
      return (
        <React.Fragment>
          <h2 style={{color:"red"}}>not applied</h2>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  renderTags() {
    return (
      <div>
        {this.props.tagValues.map(tag => <Tag>{tag}</Tag>)}
      </div>
    )
  }
  render() {
    if (this.props.mode === "ra_matching") {
      return [this.renderNameDescription(), this.renderAvatar(), this.rednerStatus(), this.renderTags()]
    // } else if (this.props.mode === "ll_applicant") {
    //   return [this.renderNameDescription(), this.renderAvatar(), this.rednerStatus(), this.renderTags(),
    //     <Button type="danger">Reject</Button>,
    //     <Button type="default">Interview</Button>,
    //     <Button type="primary" disabled>Accept</Button>]
    // } else if (this.props.mode === "ll_resident") {
    //   return [this.renderNameDescription(), this.renderAvatar(), this.rednerStatus(), this.renderTags(),
    //     <Button type="danger">Remove Tenant</Button>]
    } else if (this.props.mode === "ra_edit") {
      return [this.renderNameDescription(), this.renderAvatar(), this.rednerStatus(), this.renderTags(),
        <Button type="default" onClick={this.handleEdit} >Edit Tenant </Button>,
        <Button type="danger" onClick={this.handleDestroy} >Delete Tenant</Button>]
    } else {
      return null
    }
  }
}

RATenantView.propTypes = {
  name: PropTypes.string,
  mode: PropTypes.string,
  description: PropTypes.string,
  tagValues: PropTypes.array,
  applications: PropTypes.array,
  status: PropTypes.number
};

export default RATenantView;