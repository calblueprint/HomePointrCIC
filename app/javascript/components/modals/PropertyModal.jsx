import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Avatar, Layout, Row, Col, Icon} from 'antd';
import Utils from 'helpers/utils';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'
import '../../../assets/stylesheets/propertymodal.css';
import Carousel from '../individual/Carousel';

class PropertyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      includes_boolean: false,
      discludes_boolean: false
    }
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

  renderPhotos() {
    if (this.props.property.images == null) {
      return (
        <div style={{ paddingLeft: '36%', paddingTop: '2%' }}>
          <React.Fragment key='photo'>
            <Avatar size={256} shape="rectangle" icon="home"/>
          </React.Fragment>
        </div>
      )
    } else {
      return (
        <div key="carousel">
          <Carousel images={this.props.property.images} location="modal"/>
        </div>
      )
    }
  }

  render() {
    return (
      <div key="PropertyModal">
        <Modal
          title={this.renderPhotos()}
          visible={this.props.visible}
          onOk={this.props.onOk}
          onCancel={this.props.onCancel}
          width="1008px"
          marginTop="-50px"
          footer={null}
        >
        <div className="property-modal">
          <div className="flex-container">
            <div className="flex-item">
              <div className="modal-section" style={{ paddingTop: '5%' }}>
                <h1 className= "modal_name"> {this.props.property.address.split(",")[0]} </h1>
                <h2 className="modal-section-title"> <Icon type="home" className="icon"/> Basic </h2>
                <div className="subsection">
                <Row gutter={32}>
                  <Col span={12} className="title1">Housing Type</Col>
                  <Col span={12} className="title1">Property Type</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={12} className="text1">{Utils.titleize(this.props.property.housing_type)}</Col>
                  <Col span={12} className="text1">{Utils.titleize(this.props.property.property_type)}</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={12} className="title1">Date Available</Col>
                  <Col span={12} className="title1">Location</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={12} className="text1">{this.props.property.date_available}</Col>
                  <Col span={12} className="text1">{Utils.titleize(this.props.property.location)}</Col>
                </Row>
                </div>
              </div>
              <div className="modal-section">
                <h2 className="modal-section-title"> <Icon type="align-center" className="icon"/> Summary </h2>
                <div className="subsection">
                  <Row gutter={32}>
                    <Col span={24}><p className="property-description-container">{this.props.property.description}</p></Col>
                  </Row>
                </div>
              </div>
              <div className="modal-section">
                <h2 className="modal-section-title"> <Icon type="paper-clip" className="icon"/> Additional Paperwork </h2>
                <div className="subsection">
                  <Row gutter={32}>
                    <Col span={12}>{this.props.property.form ? <a href={this.props.property.form} target="_blank">{this.props.property.form_name}</a> : 'None'}</Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="flex-item">
              <div className="modal-section">
                <h2 className="modal-section-title"> <Icon type="home" className="icon"/> Living Details </h2>
                <div className="subsection">
                  <Row gutter={32}>
                    <Col span={8} className="title1">Capacity</Col>
                    <Col span={8} className="title1">Openings</Col>
                    <Col span={8} className="title1">Rent</Col>
                  </Row>
                  <Row gutter={32}>
                    <Col span={8} className="text1">
                      {(this.props.property.capacity == 1) ?
                        this.props.property.capacity + " Client"
                        : this.props.property.capacity + " Clients"}
                    </Col>
                    <Col span={8} className="text1">
                      {(this.props.property.number_of_openings == 1) ?
                        this.props.property.number_of_openings + " Client"
                        : this.props.property.number_of_openings + " Clients"}
                    </Col>
                    <Col span={8} className="text1">${this.props.property.rent}</Col>
                  </Row>
                  <Row gutter={32}>
                    <Col span={8} className="title1">Bedrooms</Col>
                    <Col span={8} className="title1">Bathrooms</Col>
                    <Col span={8} className="title1">Floor Number</Col>
                  </Row>
                  <Row gutter={32}>
                    <Col span={8} className="text1">{this.props.property.number_of_bedrooms}</Col>
                    <Col span={8} className="text1">{this.props.property.number_of_bathrooms}</Col>
                    <Col span={8} className="text1">{this.props.property.floor_number}</Col>
                  </Row>
                </div>
              </div>
              <div className="modal-section">
                <h2 className="modal-section-title"> <Icon type="check-circle" className="icon"/> Includes </h2>
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
                <h2 className="modal-section-title"> <Icon type="close-circle" className="icon"/> Does Not Include </h2>
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

            </div>
          </div>
         </div>
        </Modal>
      </div>
    );
  }
}

PropertyModal.propTypes = {
  location: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.array,
};

export default PropertyModal;
