import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Carousel, Avatar } from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'

class PropertyModal extends React.Component {
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

  renderPhotos() {
    if (this.props.images == null) {
      return (
        <React.Fragment key='photo'>
          <Avatar size={256} shape="square" icon="home"/>
        </React.Fragment>
      )
    } else {
      return (
        <Carousel autoplay>
          {this.props.images.map((image, index) => {
            return ( 
              <div><h3><center><img src={image.url} margin-top="10%" height="320" width="400"/></center></h3></div>
            )
          })}
        </Carousel>
      )
    }
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          View Info
        </Button>
        <Modal
          title={this.props.location}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        {this.renderPhotos()}
        <p>Description: {this.props.description}</p>
        
        </Modal>
      </div>
    );
  }
}

PropertyModal.propTypes = {
  location: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.array,
};

export default PropertyModal;
          