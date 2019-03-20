import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Carousel, Avatar, Layout, Row, Col, Icon} from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'
import '../../../assets/stylesheets/modal.css';

class PropertyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  renderPhotos() {
    if (this.props.property.images == null) {
      return (
        <React.Fragment key='photo'>
          <Avatar size={256} shape="rectangle" icon="home"/>
        </React.Fragment>
      )
    } else {
      return (
        <div key="carousel" style={{backgroundColor: "#545454"}}>
          <Carousel autoplay>
            {this.props.property.images.map((image, index) => {
              return (
                <div key={index}><h3><center><img src={image.url} margin-top="10%" height="320" width="400"/></center></h3></div>
              )
            })}
          </Carousel>
        </div>
      )
    }
  }

  renderBooleans(includes_true) {
    var includes = "";
    var discludes = "";
    if (this.props.property.furniture) {
      includes += "Furniture, ";
    } else {
      discludes += "Furniture, ";
    }
    if (this.props.property.utilities_included) {
      includes += "Utilities, ";
    } else {
      discludes += "Utilities, ";
    }
    if (this.props.property.accessible_shower) {
      includes += "Accessible Shower, ";
    } else {
      discludes += "Accessible Shower, ";
    }
    if (this.props.property.car_parking) {
      includes += "Car Parking, ";
    } else {
      discludes += "Car Parking, ";
    }
    if (includes.length >= 2) {
      includes = includes.slice(0, includes.length-2);
    }
    if (discludes.length >= 2) {
      discludes = discludes.slice(0, discludes.length-2);
    }
    if(includes_true) {
      return(<div> {includes} </div>);
    }
    else {
      return(<div> {discludes} </div>);
    }
  }

  render() {
    return (
      <div key="PropertyModal">
        <Button type="primary" onClick={this.showModal}>
          View Info
        </Button>
        <Modal
          title={this.props.property.location}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1008px"
          footer={null}
        >
        {/*
        look at the renderPhotos thing!
        <img className="image" style={{backgroundImage: `url(${this.props.property.images[0].url})`}}> </img>
        */}
          <div className="flex-container">
            <div className="flex-item">
              <div className="section">
                <h1> <Icon type="home" className="icon"/> Basic </h1>
                <div className="subsection">
                <Row gutter={32}>
                  <Col span={12} className="title1">Housing Type</Col>
                  <Col span={12} className="title1">Property Type</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={12} className="text1">{this.props.property.housing_type}</Col>
                  <Col span={12} className="text1">{this.props.property.property_type}</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={12} className="title1">Date Available</Col>
                  <Col span={12} className="title1">Location</Col>
                </Row>
                <Row gutter={32}>
                  <Col span={12} className="text1">{this.props.property.date_available}</Col>
                  <Col span={12} className="text1">{this.props.property.location}</Col>
                </Row>
                </div>
              </div>
              <div className="section">
                <h1> <Icon type="align-center" className="icon"/> Summary </h1>
                <div className="subsection">
                  <Row gutter={32}>
                    <Col span={12}>{this.props.description}</Col>
                  </Row>
                </div>
              </div>
              <div className="section">
                <h1> <Icon type="paper-clip" className="icon"/> Additional Paperwork </h1>
                <div className="subsection">
                  <Row gutter={32}>
                    <Col span={12}>add forms...</Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="flex-item">
              <div className="section">
                <h1> <Icon type="home" className="icon"/> Living Details </h1>
                <div className="subsection">
                  <Row gutter={32}>
                    <Col span={8} className="title1">Capacity</Col>
                    <Col span={8} className="title1">Openings</Col>
                    <Col span={8} className="title1">Rent</Col>
                  </Row>
                  <Row gutter={32}>
                    <Col span={8} className="text1">{this.props.property.capacity}</Col>
                    <Col span={8} className="text1">{this.props.property.openings}</Col>
                    <Col span={8} className="text1">${this.props.property.rent}</Col>
                  </Row>
                  <Row gutter={32}>
                    <Col span={8} className="title1">Bedrooms</Col>
                    <Col span={8} className="title1">Bathrooms</Col>
                    <Col span={8} className="title1">Floor Number</Col>
                  </Row>
                  <Row gutter={32}>
                    <Col span={8} className="text1">{this.props.property.num_bedrooms}</Col>
                    <Col span={8} className="text1">{this.props.property.number_of_bathrooms}</Col>
                    <Col span={8} className="text1">{this.props.property.floor_number}</Col>
                  </Row>
                </div>
              </div>
              <div className="section">
                <Row gutter={32}>
                  <h1> <Icon type="check-circle" className="icon"/> Includes </h1>
                      {this.renderBooleans(true)}
                </Row>
                <Row gutter={32}>
                  <h1> <Icon type="close-circle" className="icon"/> Does Not Include </h1>
                      {this.renderBooleans(false)}
                </Row>
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
