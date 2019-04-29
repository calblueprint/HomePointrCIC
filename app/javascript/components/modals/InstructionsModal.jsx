import React from "react";
import { Icon, Modal, Button } from 'antd';

class InstructionsModal extends React.Component {
  constructor(props) {
      super(props)
      this.state = { visible: false }
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

  renderInstructions() {
    if (this.props.status == "propertyList") {
      return(
        <div className="instructions">
          <h2 className="step"> Step 1: Select Properties </h2>
            <div className="description"> Use the filter panel and checkboxes to select properties best suited for your client. </div>
        </div>
      )
    } else {
      return(
        <div className="instructions">
          <h2 className="step"> Step 2: Submit Applications </h2>
            <div className="description"> Click on the button next to each property to add client information and download, fill out, and upload forms. </div>
        </div>
      )
    }

  }

  render() {
    return (
      <div>
        <Button onClick={this.showModal}>
          <Icon type="question"/>
        </Button>
        <Modal
          title="Directions"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        {this.renderInstructions()}
        </Modal>
      </div>
    );
  }
}

export default InstructionsModal;
