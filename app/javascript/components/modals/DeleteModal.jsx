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
                Delete
              </Button>
            </div>
          }
        >
          <p>Are you sure you want to delete {this.props.title}?</p>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;
