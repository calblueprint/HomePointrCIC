import React from "react";
import PropTypes from "prop-types";
import PropertyForm from "./PropertyForm";

class DropdownSelect extends React.Component {
  // getInitialState() {
  //   return {selectValue:'Radish'};
  // }

  // handleChange(e) {
  //   this.setState({selectValue:e.target.value});
  // }

  render() {
    return (
      <div>
      <label>{this.props.text}</label>
        <select 
          // value={this.state.selectValue} 
          // onChange={this.handleChange} 
        >
          <option value="Orange">Orange</option>
          <option value="Radish">Radish</option>
          <option value="Cherry">Cherry</option>
        </select>
      </div>  
    )
  }
}

DropdownSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};

export default DropdownSelect
