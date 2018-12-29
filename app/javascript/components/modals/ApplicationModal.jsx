import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Icon } from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'

class ApplicationModal extends React.Component {
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

  renderAttachment() {
    if (this.props.application.form) {
      return(<p>Attachment: <a href={this.props.application.form}><Icon type="paper-clip" />Attachment</a></p>)
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          View App
        </Button>
        <Modal
          title={this.props.application.status}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Description: {this.props.application.description}</p>
          {this.renderAttachment()}
        </Modal>
      </div>
    );
  }
}

ApplicationModal.propTypes = {
  application: PropTypes.object
};

export default ApplicationModal;
          