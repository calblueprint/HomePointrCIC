import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Icon } from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'

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

  renderAttachment() {
    if (this.props.app) {
      return(<p>Attachment: <a href={this.props.app.url}><Icon type="paper-clip" />Attachment</a></p>)
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
          {this.renderAttachment()}
          {this.handleButtons()}
        </Modal>
      </div>
    );
  }
}

TenantModal.propTypes = {
  email: PropTypes.string,
  phone: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  app: PropTypes.object,
  property_id: PropTypes.number,
  housed: PropTypes.bool
};

TenantModal.defaultProps = {
  app: null,
};

export default TenantModal;
          