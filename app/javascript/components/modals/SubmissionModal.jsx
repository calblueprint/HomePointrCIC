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
    this.handlePost();
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  // renderPhotos() {
  //   if (this.props.property.images == null) {
  //     return (
  //       <React.Fragment key='photo'>
  //         <Avatar size={244} shape="rectangle" icon="home"/>
  //       </React.Fragment>
  //     )
  //   } else {
  //     return (
  //       <div key="carousel" style={{backgroundColor: "#545454"}}>
  //         <Carousel autoplay>
  //           {this.props.property.images.map((image, index) => {
  //             return (
  //               <div key={index}><h3><center>{this.props.property.location}<img className="modal-avatar" src={image.url} margin-top="10%" height="244" width="244"/></center></h3></div>
  //             )
  //           })}
  //         </Carousel>
  //       </div>
  //     )
  //   }
  // }

  renderPhotos() {
    if (this.props.property.images == null) {
      return (
        <React.Fragment key='photo'>
          <Avatar size={244} shape="rectangle" icon="home"/>
        </React.Fragment>
      )
    } else {
      return (
        <img className="modal-avatar" height="224" width="224" src={this.props.property.images[0]["url"]} />
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

  //<Button key="submit" type="primary" onClick={this.handleOk}>Submit</Button>

  render() {
    return (
      <div key="SubmissionModal">
        {this.renderButton()}
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          width="1008px"
          footer={null}
        >
          <div className="tenant-modal">
            <div className="modal-content">
              <div className="basic-info">
                {this.renderPhotos()}
                <div className="modal-subsection">
                  <h3>Location</h3>
                  {this.props.property.location}
                </div>
                <div className="modal-subsection">
                  <h3>Housing Type</h3>
                  {this.props.property.housing_type}
                </div>
                <div className="modal-subsection">
                  <h3>Property Type</h3>
                  {this.props.property.property_type}
                </div>
                <div className="modal-subsection">
                  <h3>Capacity</h3>
                  {this.props.property.capacity}
                </div>
              </div>
              <div className="detailed-info">
                <h1>Eventual Name</h1>
                <div className="tenant-form-container">
                  <h3>Download Tenant Form</h3>
                </div>
                <div className="upload-form-container">
                  <h3>Upload Tenant Form</h3>
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
            </div>
            <div className="app-buttons">
              <div className="submit-button">
                <Button key="submit" type="primary" onClick={this.handleOk}>Submit Application</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  // render() {
  //   return (
  //     <div key="SubmissionModal">
  //       {this.renderButton()}
  //       <Modal
  //         title={this.renderPhotos()}
  //         visible={this.state.visible}
  //         onCancel={this.handleCancel}
  //         onOk={this.handleOk}
  //         width="1008px"
  //         footer={<Button key="submit" type="primary" onClick={this.handleOk}>
  //             Submit
  //           </Button>}
  //       >
  //       {/*
  //       look at the renderPhotos thing!
  //       <img className="image" style={{backgroundImage: `url(${this.props.property.images[0].url})`}}> </img>
  //       */}
  //         <div className="flex-container">
  //           <div className="flex-item">
  //             <div className="section">
  //               <h1> <Icon type="home" className="icon"/> Basic </h1>
  //               <div className="subsection">
  //               <Row gutter={32}>
  //                 <Col span={12} className="title1">Housing Type</Col>
  //                 <Col span={12} className="title1">Property Type</Col>
  //               </Row>
  //               <Row gutter={32}>
  //                 <Col span={12} className="text1">{this.props.property.housing_type}</Col>
  //                 <Col span={12} className="text1">{this.props.property.property_type}</Col>
  //               </Row>
  //               <Row gutter={32}>
  //                 <Col span={12} className="title1">Date Available</Col>
  //                 <Col span={12} className="title1">Location</Col>
  //               </Row>
  //               <Row gutter={32}>
  //                 <Col span={12} className="text1">{this.props.property.date_available}</Col>
  //                 <Col span={12} className="text1">{this.props.property.location}</Col>
  //               </Row>
  //               </div>
  //             </div>
  //             <div className="section">
  //               <h1> <Icon type="paper-clip" className="icon"/> Additional Paperwork </h1>
  //               <div className="subsection">
  //                 <Row gutter={32}>
  //                   <Col span={12}>{this.props.property.form ? <a href={this.props.property.form} target="_blank">Housing Form</a> : 'None'}</Col>
  //                 </Row>
  //               </div>
  //             </div>
  //             <ActiveStorageProvider
  //               endpoint={{
  //                 path: '/api/applications/' ,
  //                 model: "Application",
  //                 attribute: 'form',
  //                 method: "POST",
  //               }}
  //               multiple={true}
  //               headers={{
  //                 'Content-Type': 'application/json'
  //               }}
  //               render={Utils.activeStorageUploadRenderer}
  //             />
  //             <h1> Additional Tenant Information </h1>
  //             {this.renderTextarea()}
  //           </div>
  //         </div>
  //
  //       </Modal>
  //     </div>
  //   );
  // }
}
SubmissionModal.propTypes = {
  location: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.array,
};

export default SubmissionModal;
