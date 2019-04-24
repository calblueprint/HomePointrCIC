
import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Carousel, Avatar, Layout, Row, Col, Upload, Icon, Input } from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'
import '../../../assets/stylesheets/modal.css';
import ActiveStorageProvider from "react-activestorage-provider";
import Utils from 'helpers/utils';
import APIRoutes from 'helpers/api_routes';

class SubmissionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      description: "",
      disabled:false
    }
    this.handlePost = this.handlePost.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.props.onSubmitProperty(e, this.props.property)
    this.handlePost();
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
                <div key={index}><h3><center>{Utils.titleize(this.props.property.location)}<img src={image.url} margin-top="10%" height="320" width="400"/></center></h3></div>
              )
            })}
          </Carousel>
        </div>
      )
    }
  }

  renderTextarea() {
    const { TextArea } = Input;
    return (
      <div>
        <label>Add a note to about the client.</label>
        <TextArea rows ={4} onChange={(e) => this.state.description = e.target.value} autosize={true}/>
      </div>
    )
  }

  handlePost() {
    let body = {"description": this.state.description, "status": 1, "property_id": this.props.property.id, "tenant_id": this.props.tenant.id};
    body = JSON.stringify({application: body})
    let request = APIRoutes.applications.create
    fetch(request, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {
      this.setState({
        visible: false,
        disabled: true,
      });
    }).catch((data) => {
      console.error(data);
    });
  }

  renderButton() {
      if (this.state.disabled) {
          return <Button className="complete-app-btn" type="primary" onClick={this.showModal} disabled>
            Complete Application
          </Button>
      } else {
        return(<Button className="complete-app-btn" type="primary" onClick={this.showModal}>
          Complete Application
        </Button>)
      }
  }

  render() {
    return (
      <div key="SubmissionModal">
        {this.renderButton()}
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
                <h1 className= "modal_name"> {this.props.property.address.split(",")[0]} </h1>
                <h1> <Icon type="home" className="icon"/> Basic </h1>
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
              <h1> Additional Tenant Information </h1>
              {this.renderTextarea()}
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
