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
          <h1> <Icon type="home" /> Basic </h1>
          <Row>
            <Col span={12}>Email</Col>
            <Col span={12}>Phone</Col>
          </Row>
          <Row>
            <Col span={12}>{this.props.tenant.email}</Col>
            <Col span={12}>{this.props.tenant.phone}</Col>
          </Row>
          <Row>
            <Col span={12}>Location</Col>
            <Col span={12}>Family Size</Col>
          </Row>
          <Row>
            <Col span={12}>--</Col>
            <Col span={12}>--</Col>
          </Row>
          <Row>
            <Col span={12}>Household Income</Col>
            <Col span={12}>Receving Benefits?</Col>
          </Row>
          <Row>
            <Col span={12}>--</Col>
            <Col span={12}>--</Col>
          </Row>
          <Row>
            <Col span={24}>Current Living Arrangements</Col>
          </Row>
          <Row>
            <Col span={24}>--</Col>
          </Row>
        </div>
        <div className="section">
          <h1> <Icon type="home" /> Housing Preferences </h1>
          <Row>
            <Col span={8}>Property</Col>
            <Col span={8}>Housing</Col>
            <Col span={8}>Start Date (Date needed?)</Col>
          </Row>
          <Row>
            <Col span={8}>{this.props.tenant.property_type}</Col>
            <Col span={8}>{this.props.tenant.housing_type}</Col>
            <Col span={8}>${this.props.tenant.date_needed}</Col>
          </Row>
          <Row>
            <Col span={8}>Rent Min</Col>
            <Col span={8}>Rent Max</Col>
            <Col span={8}>Number of Bedrooms</Col>
          </Row>
          <Row>
            <Col span={8}>{this.props.tenant.rent_min}</Col>
            <Col span={8}>{this.props.tenant.rent_max}</Col>
            <Col span={8}>{this.props.tenant.num_bedrooms}</Col>
          </Row>
        </div>
        <div className="section">
          <h1> <Icon type="align-center" /> Description </h1>
          <p> {this.props.tenant.description} </p>
        </div>
        <div className="section">
          <h1> <Icon type="paper-clip" /> Client Form </h1>
          <p> <Col span={12}>add forms...</Col> </p>
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
