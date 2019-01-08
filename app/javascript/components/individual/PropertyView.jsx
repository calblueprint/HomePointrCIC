import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Carousel, Tag} from 'antd';
import 'antd/dist/antd.css';

class PropertyView extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    //switch to the ProfileForm Edit
    window.location = '/properties/' + this.props.id + '/edit'
  }

  renderNameDescription() {
    return (
      <div key='name_description'>
        <h1> {this.props.name} </h1>
        <p> {this.props.description} </p>
      </div>
    )
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
        <div key="carousel" style={{backgroundColor: "#545454"}}>
          <Carousel autoplay>
            {this.props.images.map((image, index) => {
              return ( 
                <div key={index}><h3><center><img src={image.url} margin-top="10%" height="320" width="400"/></center></h3></div>
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
        {this.props.tagValues.map(tag => <Tag key={tag}>{tag}</Tag>)}
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
    return [this.renderNameDescription(), this.renderPhotos(), this.renderTags(), this.renderEditButton()]
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