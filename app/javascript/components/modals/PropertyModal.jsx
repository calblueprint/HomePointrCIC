import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Carousel, Avatar, Layout, Row, Col} from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'

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
          <Avatar size={256} shape="square" icon="home"/>
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

  renderDescription() {
    <div>
      <p>Description: {this.props.property.description}</p>
      <Row gutter={16}>
        <Col span={12}>
          <p>Description: {this.props.property.description}</p>
        </Col>
        <Col span={12}>
          <p>Capacity: {this.props.property.capacity}</p>
        </Col>
      </Row>
    </div>
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
        >
        {this.renderPhotos()}
        <div id="description_wrapper">
          <div id="left">
            <h1> Basic </h1>
              <h2> Housing Type </h2>
                <p> {this.props.property.housing_type} </p>
              <h2> Property Type </h2>
                <p> {this.props.property.property_type} </p>
              <h2> Date Available </h2>
                <p> {this.props.property.date_available} </p>
              <h2> Location </h2>
                <p> {this.props.property.location} </p>
            <h1> Summary </h1>
              <p> {this.props.description} </p>
            <h1> Additional Paperwork </h1>
              <p> add forms... </p>
          </div>
          <div id="right">
            <h1> Living Details </h1>
              <h2> Capacity </h2>
                <p> {this.props.property.capacity} </p>
              <h2> Openings </h2>
                <p> {this.props.property.openings} </p>
              <h2> Rent </h2>
                <p> {this.props.property.rent} </p>
              <h2> Bedrooms </h2>
                <p> {this.props.property.num_bedrooms} </p>
              <h2> Bathrooms </h2>
                //<p> {this.props.property.num_bathrooms} </p>
              <h2> On Floor </h2> //could be multiple available...
                //<p> {this.props.property.floor} </p>
            <h1> Includes </h1>
              //<p> {this.props.description} </p>
            <h1> Does Not Include </h1>
              //<p> add forms... </p>
          </div>
        </div>

        //{this.renderDescription()}
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
