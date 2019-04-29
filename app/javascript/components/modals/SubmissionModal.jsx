
import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Carousel, Avatar, Layout, Row, Col, Upload, Icon, Input } from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'
import '../../../assets/stylesheets/modal.css';
import ActiveStorageProvider from "react-activestorage-provider";
import Utils from 'helpers/utils';
import APIRoutes from 'helpers/api_routes';
import ConfirmModal from './ConfirmModal';
import { DirectUploadProvider } from "react-activestorage-provider";

class SubmissionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      description: "",
      disabled: false,
      displaySubmitModal: 0,
      form: null,
      hasError: false
    }
    this.handlePost = this.handlePost.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.toggleConfirmationModal("Submit");
    this.props.onSubmitProperty(e, this.props.property);
    this.handlePost();
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handlePost() {
    let body = {"description": this.state.description, "status": 1, "property_id": this.props.property.id, "tenant_id": this.props.tenant.id, "form": this.state.form};
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

  toggleConfirmationModal = (operation) => {
    if (operation === "Submit") {
      this.setState((state) => {
        return {displaySubmitModal: 1 - state.displaySubmitModal}
      });
    }
  }

  uploadForms = (signedIds) => {
    this.setState({ form: signedIds[0]} );
  }

  formErrorCheck = () => {
    if (this.props.property.form && !this.state.form) {
      this.setState({ hasError: true });
    } else {
      this.setState({ hasError: false });
      this.toggleConfirmationModal("Submit");
    }
  }

  renderErrorMsg = () => {
    if (this.state.hasError) {
      return(
        <div className="submit-error-message">
          Please upload the completed client form.
        </div>
      );
    }
  }

  renderSubmitModal = (operation) => {
    if (operation === "Submit") {
      return(
        <ConfirmModal
          message={"submit this application"}
          operation={"Submit Application"}
          onOk={this.handleOk}
          onCancel={() => this.toggleConfirmationModal("Submit")}
          visible={this.state.displaySubmitModal}
        />
      )
    }
  }

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
    if (this.props.property.form) {
      return (
        <div className="tenant-description">
          <h3 className="h3-margins">Add a note to about the client (optional)</h3>
          <TextArea
            rows ={4}
            onChange={(e) => this.state.description = e.target.value}
            autosize={false}
            className="tenant-description-box"
          />
        </div>
      );
    } else {
      return (
        <div className="tenant-description-no-form">
          <h3 className="h3-margins">Add a note to about the client (optional)</h3>
          <TextArea
            rows ={4}
            onChange={(e) => this.state.description = e.target.value}
            autosize={false}
            className="tenant-description-box"
          />
        </div>
      );
    }
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

  renderFormSubmission() {
    if (this.props.property.form) {
      return(
        <div>
          <div className="modal-subsection">
            <div className="tenant-form-download-container">
              <h3>Download Client Form</h3>
              <div className="tenant-form-download">
                <div className="tenant-form-link">
                  <a href={this.props.property.form} target="_blank">Client Information Form</a>
                </div>
                <Icon className="tenant-form-icon" type="cloud-download" theme="outlined" />
              </div>
            </div>
          </div>
          <div className="upload-form-container">
            <div className="upload-details">
              <h3>Upload Client Form</h3>
              <div className="upload-button">
                <DirectUploadProvider
                  multiple={false}
                  onSuccess={signedIds => { this.uploadForms(signedIds) }}
                  render={(renderProps) => Utils.activeStorageUploadRenderer({ ...renderProps, type: "form" })}
                />
              </div>
              {this.renderErrorMsg()}
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div>
          <div className="no-forms">
            This property does not have an associated Client Information Form.
            You may proceed to submit your application after filling out the optional client description!
          </div>
        </div>
      );
    }
  }

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
                  {Utils.titleize(this.props.property.location)}
                </div>
                <div className="modal-subsection">
                  <h3>Housing Type</h3>
                  {Utils.titleize(this.props.property.housing_type)}
                </div>
                <div className="modal-subsection">
                  <h3>Property Type</h3>
                  {Utils.titleize(this.props.property.property_type)}
                </div>
                <div className="modal-subsection">
                  <h3>Capacity</h3>
                  {(this.props.property.capacity == 1) ? this.props.property.capacity + " Client" : this.props.property.capacity + " Clients"}
                </div>
              </div>
              <div className="detailed-info">
                <h1>{this.props.property.address.split(",")[0]}</h1>
                {this.renderFormSubmission()}
                {this.renderTextarea()}
                <div className="submit-button-container">
                  <div className="submit-button">
                    <Button
                      key="submit"
                      type="primary"
                      onClick={this.formErrorCheck}>
                      Submit Application
                    </Button>
                    {this.renderSubmitModal("Submit")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }

}
SubmissionModal.propTypes = {
  location: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.array,
};

export default SubmissionModal;
