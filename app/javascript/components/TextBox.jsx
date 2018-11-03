import React from "react"
import PropTypes from "prop-types"
import PropertyForm from "./PropertyForm";
class TextBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      name: props.property.description,
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }



  render() {
    return (<div>
      <label>{this.props.label}</label>
      <input
        type="text"
        name="property[capacity]"
        value={this.props.value}
        onChange={}
      /> </div>)
  }
}

TextBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};