import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Tag, Row, Col, Icon} from 'antd';
import 'antd/dist/antd.css';
import Utils from 'helpers/utils';

class RATenantView extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    //switch to the ProfileForm Edit
    //what is this?
    //window.location = '/tenants/' + this.props.id + '/edit'
  }

  renderName() {
    return (
      <div key='name'>
        <h1> {this.props.tenant.name} </h1>
      </div>
    )
  }

  renderAvatar() {
    if (this.props.avatar == null) {
      return (
        <React.Fragment key='avatar'>
          <Avatar size={280} icon="user"/>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment key='avatar'>
          <Avatar size={280} className="avatar" src={this.props.avatar}/>
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

  renderDetails() {
    return(
      <div className="details">
        <div className="section">
          <h1> <Icon type="home" className="icon"/> Basic </h1>
          <div className="subsection">
            <Row>
              <Col span={12} className="title2">Email</Col>
              <Col span={12} className="title2">Phone</Col>
            </Row>
            <Row>
              <Col span={12} className="text1">{this.props.tenant.email}</Col>
              <Col span={12} className="text1">{this.props.tenant.phone}</Col>
            </Row>
            <Row>
              <Col span={12} className="title2">Location</Col>
              <Col span={12} className="title2">Family Size</Col>
            </Row>
            <Row>
              <Col span={12} className="text1">--</Col>
              <Col span={12} className="text1">--</Col>
            </Row>
            <Row>
              <Col span={12} className="title2">Household Income</Col>
              <Col span={12} className="title2">Receving Benefits?</Col>
            </Row>
            <Row>
              <Col span={12} className="text1">--</Col>
              <Col span={12} className="text1">--</Col>
            </Row>
            <Row>
              <Col span={24} className="title2">Current Living Arrangements</Col>
            </Row>
            <Row>
              <Col span={24} className="text1">--</Col>
            </Row>
          </div>
        </div>
        <div className="section">
          <h1> <Icon type="home" className="icon"/> Housing Preferences </h1>
          <div className="subsection">
            <Row>
              <Col span={8} className="title2">Start Date</Col>
              <Col span={8} className="title2">Property</Col>
              <Col span={8} className="title2">Housing</Col>
            </Row>
            <Row>
              <Col span={8} className="text1">${this.props.tenant.date_needed}</Col>
              <Col span={8} className="text1">{this.props.tenant.property_type}</Col>
              <Col span={8} className="text1">{this.props.tenant.housing_type}</Col>
            </Row>
            <Row>
              <Col span={8} className="title2">Rent Min</Col>
              <Col span={8} className="title2">Rent Max</Col>
              <Col span={8} className="title2">Number of Bedrooms</Col>
            </Row>
            <Row>
              <Col span={8} className="text1">{this.props.tenant.rent_min}</Col>
              <Col span={8} className="text1">{this.props.tenant.rent_max}</Col>
              <Col span={8} className="text1">{this.props.tenant.num_bedrooms}</Col>
            </Row>
          </div>
        </div>
        <div className="section">
          <h1> <Icon type="align-center" className="icon"/> Description </h1>
          <div className="subsection">
            <p> {this.props.tenant.description} </p>
          </div>
        </div>
        <div className="section">
          <h1> <Icon type="paper-clip" className="icon"/> Client Form </h1>
          <div className="subsection">
            <p> add forms... </p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.mode === "ra_matching") {
      return [this.renderName(), this.renderAvatar(), Utils.renderStatus(this.props.status)]
    // } else if (this.props.mode === "ll_applicant") {
    //   return [this.renderNameDescription(), this.renderAvatar(), this.renderStatus(), this.renderTags(),
    //     <Button type="danger">Reject</Button>,
    //     <Button type="default">Interview</Button>,
    //     <Button type="primary" disabled>Accept</Button>]
    // } else if (this.props.mode === "ll_resident") {
    //   return [this.renderNameDescription(), this.renderAvatar(), this.renderStatus(), this.renderTags(),
    //     <Button type="danger">Remove Tenant</Button>]
    } else if (this.props.mode === "ra_edit") {
      return [this.renderAvatar(), <Row>
                <Col span={12} className="title1">{this.props.tenant.name}</Col>
                <Col span={12}> <Button key='button' type="default" onClick={this.handleEdit} className="editButton">Edit</Button> </Col>
              </Row>, Utils.renderStatus(this.props.status), this.renderDetails()]
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
