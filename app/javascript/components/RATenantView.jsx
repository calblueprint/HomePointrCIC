import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Tag} from 'antd';
import 'antd/dist/antd.css';
import Utils from 'helpers/utils';

class RATenantView extends React.Component {
  constructor(props) {
    super(props);
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
          <Avatar size={64} src={this.props.avatar}/>
        </React.Fragment>
      )
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
      return [this.renderNameDescription(), this.renderAvatar(), Utils.renderStatus(this.props.status), this.renderTags()]
    // } else if (this.props.mode === "ll_applicant") {
    //   return [this.renderNameDescription(), this.renderAvatar(), this.renderStatus(), this.renderTags(),
    //     <Button type="danger">Reject</Button>,
    //     <Button type="default">Interview</Button>,
    //     <Button type="primary" disabled>Accept</Button>]
    // } else if (this.props.mode === "ll_resident") {
    //   return [this.renderNameDescription(), this.renderAvatar(), this.renderStatus(), this.renderTags(),
    //     <Button type="danger">Remove Tenant</Button>]
    } else if (this.props.mode === "ra_edit") {
      return [this.renderNameDescription(), this.renderAvatar(), Utils.renderStatus(this.props.status), this.renderTags(),
        <Button key='button' type="default" onClick={this.handleEdit} >Edit Client</Button>]
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
  avatar: PropTypes.string,
};

export default RATenantView;