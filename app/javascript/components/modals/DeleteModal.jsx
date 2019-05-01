import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { Modal, Button, Icon } from "antd";

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal
          visible={this.props.visible}
          onOk={this.props.onOk}
          onCancel={this.props.onCancel}
          footer={
            <div>
              <Button onClick={this.props.onCancel}>Cancel</Button>
              <Button key="submit" type="danger" onClick={this.props.onOk}>
                {this.props.operation}
              </Button>
            </div>
          }
        >
          <p>Are you sure you want to {this.props.message}?</p>
        </Modal>
      </div>
    );
  }
}

DeleteModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  operation: PropTypes.string,
  message: PropTypes.message
};

export default DeleteModal;
