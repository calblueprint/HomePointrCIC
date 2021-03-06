import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Tag, Row, Col, Icon} from 'antd';
import Utils from "helpers/utils";
import 'antd/dist/antd.css';
import Carousel from '../individual/Carousel';

class PropertyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      includes_boolean: false,
      discludes_boolean: false
    }
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    //switch to the ProfileForm Edit
    window.location = '/properties/' + this.props.property.id.toString() + '/edit'
  }

  // arguments: string of amenity to be displayed, name of prop for amenity in the backend
  // given the arguments, the function chooses whether or not to display it on the frontend
  getIncludes(amenities_str, amenities_bool) {
    if (amenities_bool) {
      this.state.includes_boolean = true;
      return (
        <Col span={12} className="content-text" id="includes"><p>{amenities_str}</p></Col>
      );
    }
  }

  // arguments: string of amenity to be displayed, name of prop for amenity in the backend
  // given the arguments, the function chooses whether or not to display it on the frontend
  getDiscludes(amenities_str, amenities_bool) {
    if (!amenities_bool) {
      this.state.discludes_boolean = true;
      return (
        <Col span={12} className="content-text" id="discludes"><p>{amenities_str}</p></Col>
      );
    }
  }

  // arguments: true or false boolean depending on whether we're working with including or not including
  // if no amenities are to be displayed, display NONE
  renderNone(display_includes) {
    if (display_includes && !this.state.includes_boolean) {
      return (
        <Col span={12} className="content-text"><p>None</p></Col>
      );
    } else if (!display_includes && !this.state.discludes_boolean) {
      return (
        <Col span={12} className="content-text"><p>None</p></Col>
      );
    }
  }

  renderNameEdit() {
    return (
      <Row>
        <Col span={19}><h1 className="split-screen-left-title">{this.props.property.address.split(",")[0]}</h1></Col>
        <Col span={5} className='chips'>
          {/*{Utils.renderStatus(this.props.status, true)}*/}
          <Button key='button' type='default' onClick={this.handleEdit} className='edit-button'>Edit</Button>
        </Col>
      </Row>
    );
  }

  renderDetails() {
    return(
      <div className = "details">
        <div className="section">
          <h2 className="section-header"> <Icon type="home" className="icon"/> Basic </h2>
          <div className="subsection">
            <Row>
              <Col span={12}><h3>Housing Type</h3></Col>
              <Col span={12}><h3>Property Type</h3></Col>
            </Row>
            <Row>
              <Col span={12} className="content-text"><p>{Utils.titleize(this.props.property.housing_type)}</p></Col>
              <Col span={12} className="content-text"><p>{Utils.titleize(this.props.property.property_type)}</p></Col>
            </Row>
            <Row>
              <Col span={12}><h3>Date Available</h3></Col>
              <Col span={12}><h3>Location</h3></Col>
            </Row>
            <Row>
              <Col span={12} className="content-text"><p>{this.props.property.date_available}</p></Col>
              <Col span={12} className="content-text"><p>{Utils.titleize(this.props.property.location)}</p></Col>
            </Row>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="home" className="icon"/> Living Details </h2>
          <div className="subsection">
            <Row>
              <Col span={8}><h3>Capacity</h3></Col>
              <Col span={8}><h3>Openings</h3></Col>
              <Col span={8}><h3>Rent</h3></Col>
            </Row>
            <Row>
              <Col span={8} className="content-text"><p>{this.props.property.capacity}</p></Col>
              <Col span={8} className="content-text"><p>{this.props.property.capacity - this.props.numTenants}</p></Col>
              <Col span={8} className="content-text"><p>${this.props.property.rent}</p></Col>
            </Row>
            <Row>
              <Col span={8}><h3>Bedrooms</h3></Col>
              <Col span={8}><h3>Bathrooms</h3></Col>
              <Col span={8}><h3>Floor Number</h3></Col>
            </Row>
            <Row>
              <Col span={8} className="content-text"><p>{this.props.property.number_of_bedrooms}</p></Col>
              <Col span={8} className="content-text"><p>{this.props.property.number_of_bathrooms}</p></Col>
              <Col span={8} className="content-text"><p>{this.props.property.floor_number}</p></Col>
            </Row>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="align-center" className="icon"/> Summary </h2>
          <div className="subsection">
            <p className="content-text">{this.props.property.description}</p>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="check-circle" className="icon"/> Includes </h2>
          <div className="subsection">
            <Row>
              {this.getIncludes("Furniture", this.props.property.furniture)}
              {this.getIncludes("Utilities", this.props.property.utilities_included)}
              {this.getIncludes("Accessible shower", this.props.property.accessible_shower)}
              {this.getIncludes("Parking", this.props.property.car_parking)}
              {this.renderNone(true)}
            </Row>
          </div>
        </div>
        <div className="section">
        <h2 className="section-header"> <Icon type="close-circle" className="icon"/> Does Not Include </h2>
          <div className="subsection">
            <Row>
              {this.getDiscludes("Furniture", this.props.property.furniture)}
              {this.getDiscludes("Utilities", this.props.property.utilities_included)}
              {this.getDiscludes("Accessible shower", this.props.property.accessible_shower)}
              {this.getDiscludes("Parking", this.props.property.car_parking)}
              {this.renderNone(false)}
            </Row>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="paper-clip" className="icon"/> Additional Paperwork </h2>
          <div className="subsection">
            <Row>
              <Col span={12}><a href={this.props.property.form} target="_blank">{this.props.property.form_name}</a></Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }

  renderPhotos() {
    if (this.props.property.images.length == 0) {
      return (
        <div style={{ paddingLeft: '23%', paddingTop: '7%', paddingBottom: '5%' }}>
          <React.Fragment key='photo'>
            <Avatar size={256} shape="square" icon="home"/>
          </React.Fragment>
        </div>
      )
    } else {
      return (
        <div key="carousel" style={{backgroundColor: "#D9D9D9"}}>
          <Carousel images={this.props.property.images} location="view"/>
        </div>
      )
    }
  }

  renderTags() {
    return (
      <div key='tags'>
        {this.props.property.tagValues.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
      </div>
    )
  }

  render() {

    return (
      <div className="split-screen-left">
        {this.renderPhotos()}
        <div className="split-screen-left-text">
          {this.renderNameEdit()}
          {this.renderDetails()}
        </div>
      </div>
    );
  }
}

PropertyView.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  tagValues: PropTypes.array,
  images: PropTypes.array,
  canceledit: PropTypes.bool,
};

PropertyView.defaultProps = {
  canceledit: true,
};

export default PropertyView;
