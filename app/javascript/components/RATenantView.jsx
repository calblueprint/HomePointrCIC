import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Tag, Row, Col, Icon} from 'antd';
import 'antd/dist/antd.css';
import Utils from 'helpers/utils';
import '../../assets/stylesheets/application.css';

class RATenantView extends React.Component {
  constructor(props) {
    super(props);
    this.editRedirect = this.editRedirect.bind(this);
  }

  editRedirect() {
    window.location = '/tenants/' + this.props.tenant.id.toString() + '/edit'
  }

  renderName() {
    return (
      <div className="split-screen-left-title" key='name'>
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
          <Avatar size={280} className="profile-picture" src={this.props.avatar}/>
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
          <h2 className="section-header"> <Icon type="home" className="icon"/> Basic </h2>
          <div className="subsection">
            <Row>
              <Col span={12}><h3>Email</h3></Col>
              <Col span={12}><h3>Phone</h3></Col>
            </Row>
            <Row>
              <Col span={12} className="content-text">{this.props.tenant.email}</Col>
              <Col span={12} className="content-text">{this.props.tenant.phone}</Col>
            </Row>
            <Row>
              <Col span={12}><h3>Location</h3></Col>
              <Col span={12}><h3>Family Size</h3></Col>
            </Row>
            <Row>
              <Col span={12} className="content-text"><p>{this.props.tenant.location}</p></Col>
              <Col span={12} className="content-text"><p>{this.props.tenant.family_size}</p></Col>
            </Row>
            <Row>
              <Col span={12}><h3>Household Income</h3></Col>
              <Col span={12}><h3>Receving Benefits?</h3></Col>
            </Row>
            <Row>
              <Col span={12} className="content-text"><p>${this.props.tenant.income}</p></Col>
              <Col span={12} className="content-text"><p>{this.props.tenant.benefits ? 'Yes' : 'No'}</p></Col>
            </Row>
            <Row>
              <Col span={24}><h3>Current Living Arrangements</h3></Col>
            </Row>
            <Row>
              <Col span={24} className="content-text"><p>{this.props.tenant.living_arrangements}</p></Col>
            </Row>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="home" className="icon"/> Housing Preferences </h2>
          <div className="subsection">
            <Row>
              <Col span={8}><h3>Start Date</h3></Col>
              <Col span={8}><h3>Property</h3></Col>
              <Col span={8}><h3>Housing</h3></Col>
            </Row>
            <Row>
              <Col span={8} className="content-text"><p>{this.props.tenant.date_needed}</p></Col>
              <Col span={8} className="content-text"><p>{this.props.tenant.property_type}</p></Col>
              <Col span={8} className="content-text"><p>{this.props.tenant.housing_type}</p></Col>
            </Row>
            <Row>
              <Col span={8}><h3>Rent Min</h3></Col>
              <Col span={8}><h3>Rent Max</h3></Col>
              <Col span={8}><h3>Number of Bedrooms</h3></Col>
            </Row>
            <Row>
              <Col span={8} className="content-text"><p>${this.props.tenant.rent_min}</p></Col>
              <Col span={8} className="content-text"><p>${this.props.tenant.rent_max}</p></Col>
              <Col span={8} className="content-text"><p>{this.props.tenant.number_of_bedrooms}</p></Col>
            </Row>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="align-center" className="icon"/> Description </h2>
          <div className="subsection">
            <p className="content-text"> {this.props.tenant.description} </p>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="paper-clip" className="icon"/> Client Form </h2>
          <div className="subsection">
            <p> add forms... </p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="split-screen-left">
        {this.renderAvatar()}
        <div className="split-screen-left-text">
          <Row>
            <Col span={16}><h1>{this.props.tenant.name}</h1></Col>
            <Col span={8} className='chips'>
              <Button key='button' type='default' onClick={this.editRedirect} className='edit-button'>Edit</Button>
            </Col>
          </Row>
          {this.renderDetails()}
        </div>
      </div>
    );
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
