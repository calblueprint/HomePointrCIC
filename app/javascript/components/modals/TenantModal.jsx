import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Icon, Card, Avatar} from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'

class TenantModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
    }
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

  renderAvatar(images){
    if (typeof(images) === "string") {
        return (<Avatar size={200} shape="square" src={images} />);
    } else {
      return (<Avatar size={200} shape="square" src={images[0].url} />)
    }
  }

  render() {
    return (
      <div>
        <Modal
          title={this.props.name}
          visible={this.props.visible}
          onOk={this.props.onOk}
          onCancel={this.props.onCancel}
        >
          <p>Description: {this.props.tenant.description}</p>
          <p>Email: {this.props.tenant.email}</p>
          <p>Phone: {this.props.tenant.phone}</p>
          <p>Description: {this.props.tenant.description}</p>
          <p>Housing Type: {this.props.tenant.housing_type}</p>
          <p>Date Needed: {this.props.tenant.date_needed}</p>

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
