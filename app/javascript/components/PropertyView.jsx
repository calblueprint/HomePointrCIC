import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Tag} from 'antd';
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
          <Avatar size={256} shape="square" icon="user"/>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment key='photo'>
          <Avatar size={256} src={this.props.images[0].url}/>
        </React.Fragment>
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

  render() {
    return [this.renderNameDescription(), this.renderPhotos(), this.renderTags(),
      <Button key='button' type="default" onClick={this.handleEdit} >Edit Property</Button>]
  }
}

PropertyView.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  mode: PropTypes.string,
  description: PropTypes.string,
  tagValues: PropTypes.array,
};

export default PropertyView;