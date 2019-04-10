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
    console.log(htmldiv);
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
        <Col span={19}><h1>{this.props.property.address}</h1></Col>
        <Col span={5} className='chips'>
          {/*{Utils.renderStatus(this.props.status, true)}*/}
          <Button key='button' type='default' onClick={this.handleEdit} className='edit-button'>Edit</Button>
        </Col>
      </Row>
    );
  }

  renderDetails() {
    return(

      <div className = "details">
        <div className="section">
          <h2 className="section-header"> <Icon type="home" className="icon"/> Basic </h2>
          <div className="subsection">
            <Row>
              <Col span={12}><h3>Housing Type</h3></Col>
              <Col span={12}><h3>Property Type</h3></Col>
            </Row>
            <Row>
              <Col span={12} className="content-text"><p>{this.props.property.housing_type}</p></Col>
              <Col span={12} className="content-text"><p>{this.props.property.property_type}</p></Col>
            </Row>
            <Row>
              <Col span={12}><h3>Date Available</h3></Col>
              <Col span={12}><h3>Location</h3></Col>
            </Row>
            <Row>
              <Col span={12} className="content-text"><p>{this.props.property.date_available}</p></Col>
              <Col span={12} className="content-text"><p>{this.props.property.location}</p></Col>
            </Row>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="home" className="icon"/> Living Details </h2>
          <div className="subsection">
            <Row>
              <Col span={8}><h3>Capacity</h3></Col>
              <Col span={8}><h3>Openings</h3></Col>
              <Col span={8}><h3>Rent</h3></Col>
            </Row>
            <Row>
              <Col span={8} className="content-text"><p>{this.props.property.capacity}</p></Col>
              <Col span={8} className="content-text"><p>{this.props.property.openings}</p></Col>
              <Col span={8} className="content-text"><p>${this.props.property.rent}</p></Col>
            </Row>
            <Row>
              <Col span={8}><h3>Bedrooms</h3></Col>
              <Col span={8}><h3>Bathrooms</h3></Col>
              <Col span={8}><h3>Floor Number</h3></Col>
            </Row>
            <Row>
              <Col span={8} className="content-text"><p>{this.props.property.number_of_bedrooms}</p></Col>
              <Col span={8} className="content-text"><p>{this.props.property.number_of_bathrooms}</p></Col>
              <Col span={8} className="content-text"><p>{this.props.property.floor_number}</p></Col>
            </Row>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="align-center" className="icon"/> Summary </h2>
          <div className="subsection">
            <p className="content-text">{this.props.property.description}</p>
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="check-circle" className="icon"/> Includes </h2>
          <div className="subsection">
            {this.renderBooleans(true)}
          </div>
        </div>
        <div className="section">
        <h2 className="section-header"> <Icon type="close-circle" className="icon"/> Does Not Include </h2>
          <div className="subsection">
            {this.renderBooleans(false)}
          </div>
        </div>
        <div className="section">
          <h2 className="section-header"> <Icon type="paper-clip" className="icon"/> Additional Paperwork </h2>
          <div className="subsection">
            <Row>
              <Col span={12}>add forms...</Col>
            </Row>
          </div>
        </div>
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
        <div key="carousel" style={{backgroundColor: "#D9D9D9"}}>
          <Carousel autoplay>
            {this.props.property.images.map((image, index) => {
              return (
                <div key={index}><h3><center><img src={image.url} margin-top="10%" width="100%"/></center></h3></div>
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
        {this.props.property.tagValues.map(tag => <Tag key={tag}>{tag}</Tag>)}
      </div>
    )
  }

  render() {
    return (
      <div className="split-screen-left">
        {this.renderPhotos()}
        <div className="split-screen-left-text">
          {this.renderNameEdit()}
          {this.renderDetails()}
        </div>
      </div>
    );
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
