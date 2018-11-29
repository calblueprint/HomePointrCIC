import React from "react";
import PropTypes from "prop-types";
const PropertyView = props => {
  return props.fieldNames.map((name, index) => {
    return (
      <div>
        <label>{name}</label>
        {props.fieldValues[index]}
      </div>
    );
  });
};
PropertyView.propTypes = {
  fieldNames: PropTypes.array,
  fieldValues: PropTypes.array
};
export default PropertyView;
