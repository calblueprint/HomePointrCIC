import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Carousel, Avatar, Layout, Row, Col, Upload, Icon } from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'
import '../../../assets/stylesheets/modal.css';
import ActiveStorageProvider from "react-activestorage-provider";
import Utils from 'helpers/utils';

class SubmissionModal extends React.Component {
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
    console.log(e)
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
                <div key={index}><h3><center>{this.props.property.location}<img src={image.url} margin-top="10%" height="320" width="400"/></center></h3></div>
              )
            })}
          </Carousel>
        </div>
      )
    }
  }

  render() {
    return (
      <div key="SubmissionModal">
        <Button type="primary" onClick={this.showModal}>
          View Info
        </Button>
        <Modal
          title={this.renderPhotos()}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          width="1008px"
          footer={<Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>}
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
                <h1> <Icon type="paper-clip" className="icon"/> Additional Paperwork </h1>
                <div className="subsection">
                  <Row gutter={32}>
                    <Col span={12}>{this.props.property.form ? <a href={this.props.property.form} target="_blank">Housing Form</a> : 'None'}</Col>
                  </Row>
                </div>
              </div>
              <ActiveStorageProvider
                endpoint={{
                  path: '/api/applications/' ,
                  model: "Application",
                  attribute: 'form',
                  method: "POST",
                }}
                multiple={true}
                headers={{
                  'Content-Type': 'application/json'
                }}
                render={Utils.activeStorageUploadRenderer}
              />
            </div>
          </div>

        </Modal>
      </div>
    );
  }
}

SubmissionModal.propTypes = {
  location: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.array,
};

export default SubmissionModal;
