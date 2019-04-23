import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Icon } from 'antd';

class DeleteWarning extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   visible: this.props.visible,
    // }
  }

  render() {
    return (
      <div>
        <Modal
          title={this.props.title}
          visible={this.props.visible}
          onOk={this.props.onOk}
          onCancel={this.props.onCancel}
          footer={<Button key="submit" type="danger" onClick={this.props.onOk}>
              Delete
            </Button>}
        >
          <p>Are you sure you want to delete?</p>
        </Modal>
      </div>
    );
  }
}

export default DeleteWarning;
