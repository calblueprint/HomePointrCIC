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
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    //switch to the ProfileForm Edit
    window.location = '/tenants/' + this.props.id + '/edit'
  }

  renderNameDescription() {
    return (
      <div key='name_description'>
        <h1> {this.props.name} </h1>
        <p> {this.props.description} </p>
      </div>
    )
  }

  renderAvatar() {
    if (this.props.avatar == null) {
      return (
        <React.Fragment key='avatar'>
          <Avatar size={64} icon="user"/>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment key='avatar'>
          <Avatar size={64} src={this.props.avatar[0].url}/>
        </React.Fragment>
      )
    }
  }
//     0 - matched with a house
//     1 - interviewing with a house
//     2 - applied
//     3 - rejected
//     4 - not applied yet
  renderStatus() {
    if (this.state.status === 0) {
      return (
        <React.Fragment key='status'>
          <h2 style={{color:"green"}}>housed</h2>
        </React.Fragment>
      )
    } else if (this.state.status === 1) {
      return (
        <React.Fragment key='status'>
          <h2 style={{color:"yellow"}}>interviewing with house</h2>
        </React.Fragment>
      )
    } else if (this.state.status === 2) {
      return (
        <React.Fragment key='status'>
          <h2 style={{color:"orange"}}>applied</h2>
        </React.Fragment>
      )
    } else if (this.state.status === 3) {
      return (
        <React.Fragment key='status'>
          <h2 style={{color:"red"}}>rejected</h2>
        </React.Fragment>
      )
    } else if (this.state.status === 4) {
      return (
        <React.Fragment key='status'>
          <h2 style={{color:"red"}}>not applied</h2>
        </React.Fragment>
      )
    } else {
      return null
    }
  }

  renderTags() {
    return (
      <div key='tags'>
        {this.props.tagValues.slice(0, -1).map(tag => <Tag key={tag}>{tag}</Tag>)}
      </div>
    )
  }

  render() {
    if (this.props.mode === "ra_matching") {
      return [this.renderNameDescription(), this.renderAvatar(), this.renderStatus(), this.renderTags()]
    // } else if (this.props.mode === "ll_applicant") {
    //   return [this.renderNameDescription(), this.renderAvatar(), this.renderStatus(), this.renderTags(),
    //     <Button type="danger">Reject</Button>,
    //     <Button type="default">Interview</Button>,
    //     <Button type="primary" disabled>Accept</Button>]
    // } else if (this.props.mode === "ll_resident") {
    //   return [this.renderNameDescription(), this.renderAvatar(), this.renderStatus(), this.renderTags(),
    //     <Button type="danger">Remove Tenant</Button>]
    } else if (this.props.mode === "ra_edit") {
      return [this.renderNameDescription(), this.renderAvatar(), this.renderStatus(), this.renderTags(),
        <Button key='button' type="default" onClick={this.handleEdit} >Edit Tenant </Button>]
    } else {
      return null
    }
  }
}

RATenantView.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  mode: PropTypes.string,
  description: PropTypes.string,
  tagValues: PropTypes.array,
  status: PropTypes.number,
  applications: PropTypes.array
};

export default RATenantView;