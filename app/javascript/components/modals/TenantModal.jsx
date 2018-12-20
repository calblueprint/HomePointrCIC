import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import ApplicationStatusButtons from './../ApplicationStatusButtons'

class TenantModal extends React.Component {
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

  handleButtons() {
    if (this.props.housed != null) {
      if (this.props.housed) {
        return(<ApplicationStatusButtons property_id={this.props.property_id} application_id={this.props.app.id} status={this.props.app.status}/>)
      } else {
        return(<ApplicationStatusButtons property_id={this.props.property_id} application_id={this.props.app.id} status={this.props.app.status}/>)
      }
    } else {
      return(null)
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          View Info
        </Button>
        <Modal
          title={this.props.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Email: {this.props.email}</p>
          <p>Phone: {this.props.phone}</p>
          <p>Description: {this.props.description}</p>
          {this.handleButtons()}
        </Modal>
      </div>
    );
  }
}

export default TenantModal;
          