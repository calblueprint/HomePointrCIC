import React from "react";
import PropTypes from "prop-types";
import {Avatar, Button, Tag} from 'antd';
import 'antd/dist/antd.css';

class RAView extends React.Component {
  constructor(props) {
    super(props);
  }

  renderName() {
    return (
      <div key='name_description'>
        <h1> {this.props.name} </h1>
      </div>
    )
  }

  renderAvatar() {
    return (
      <React.Fragment key='avatar'>
        <Avatar size={64} icon="user" />
      </React.Fragment>
    )
  }

  renderTags() {
    return (
      <div key='tags'>
        {this.props.tagValues.map(tag => <Tag key={tag}>{tag}</Tag>)}
      </div>
    )
  }
  render() {
    return [this.renderName(), this.renderAvatar(), this.renderTags()]
  }
}

RAView.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  tagValues: PropTypes.array,
};

export default RAView;