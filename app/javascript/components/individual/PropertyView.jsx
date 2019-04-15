import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Carousel, Tag, Row, Col, Icon} from 'antd';
import 'antd/dist/antd.css';

class PropertyView extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    //switch to the ProfileForm Edit
    window.location = '/properties/' + this.props.property.id.toString() + '/edit'
  }

  renderBooleans(includes_true) {
    var includes = "";
    var discludes = "";
    if (this.props.property.furniture) {
      includes += "Furniture, ";
    } else {
      discludes += "Furniture, ";
    }
    if (this.props.property.utilities_included) {
      includes += "Utilities, ";
    } else {
      discludes += "Utilities, ";
    }
    if (this.props.property.accessible_shower) {
      includes += "Accessible Shower, ";
    } else {
      discludes += "Accessible Shower, ";
    }
    if (this.props.property.car_parking) {
      includes += "Car Parking, ";
    } else {
      discludes += "Car Parking, ";
    }
    if (includes.length >= 2) {
      includes = includes.slice(0, includes.length-2);
    }
    if (discludes.length >= 2) {
      discludes = discludes.slice(0, discludes.length-2);
    }
    if(includes_true) {
      return(<div> {includes} </div>);
    }
    else {
      return(<div> {discludes} </div>);
    }
  }

  renderNameEdit() {
    return (
      <Row>
        <Col span="12"> {this.props.property.address}</Col>
        <Col span="12"> {this.renderEditButton()}</Col>
      </Row>
    )
  }

  renderDetails() {
    return(

      <div className = "details">
        <h1> <Icon type="home" /> Basic </h1>
          <Row>
            <Col span={12}>Housing Type</Col>
            <Col span={12}>Property Type</Col>
          </Row>
          <Row>
            <Col span={12}>{this.props.property.housing_type}</Col>
            <Col span={12}>{this.props.property.property_type}</Col>
          </Row>
          <Row>
            <Col span={12}>Date Available</Col>
            <Col span={12}>Location</Col>
          </Row>
          <Row>
            <Col span={12}>{this.props.property.date_available}</Col>
            <Col span={12}>{this.props.property.location}</Col>
          </Row>
        <h1> <Icon type="align-center" /> Summary </h1>
          <Row>
            <Col span={12}>{this.props.property.description}</Col>
          </Row>
        <h1> <Icon type="paper-clip" /> Additional Paperwork </h1>
          <Row>
            <Col span={12}>add forms...</Col>
          </Row>
          <h1> <Icon type="home" /> Living Details </h1>
                <Row>
                  <Col span={8}>Capacity</Col>
                  <Col span={8}>Openings</Col>
                  <Col span={8}>Rent</Col>
                </Row>
                <Row>
                  <Col span={8}>{this.props.property.capacity}</Col>
                  <Col span={8}>{this.props.property.openings}</Col>
                  <Col span={8}>${this.props.property.rent}</Col>
                </Row>
                <Row>
                  <Col span={8}>Bedrooms</Col>
                  <Col span={8}>Bathrooms</Col>
                  <Col span={8}>Floor Number</Col>
                </Row>
                <Row>
                  <Col span={8}>{this.props.property.number_of_bedrooms}</Col>
                  <Col span={8}>{this.props.property.number_of_bathrooms}</Col>
                  <Col span={8}>{this.props.property.floor_number}</Col>
                </Row>
                <Row>
                <h1> <Icon type="check-circle" /> Includes </h1>
                    {this.renderBooleans(true)}
                <h1> <Icon type="close-circle" /> Does Not Include </h1>
                    {this.renderBooleans(false)}
                  </Row>
      </div>
    )
  }

  renderPhotos() {
    if (this.props.property.images == null) {
      return (
        <React.Fragment key='photo'>
          <Avatar size={256} shape="square" icon="home"/>
        </React.Fragment>
      )
    } else {
      return (
        <div key="carousel" style={{backgroundColor: "#545454"}}>
          <Carousel autoplay>
            {this.props.property.images.map((image, index) => {
              return (
                <div>
                  <h3><center><img src={image.url} margin-top="10%" height="320" width="400" key={index}/></center></h3>
                </div>
              )
            })}
          </Carousel>
        </div>
      )
    }
  }

  renderTags() {
    return (
      <div key='tags'>
        {this.props.property.tagValues.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
      </div>
    )
  }

  renderEditButton() {
    if (this.props.canceledit === false) {
      return (
        <div key='editbutton'>
          {<Button key='button' type="default" onClick={this.handleEdit} >Edit Property</Button>}
        </div>
      )
    }
  }

  render() {
    return(
      <div>
        {this.renderPhotos()}
        {this.renderNameEdit()}
        {this.renderDetails()}
      </div>
    )
  }
}

PropertyView.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  tagValues: PropTypes.array,
  images: PropTypes.array,
  canceledit: PropTypes.bool,
};

PropertyView.defaultProps = {
  canceledit: true,
};

export default PropertyView;
