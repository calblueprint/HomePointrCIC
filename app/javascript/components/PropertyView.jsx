import React from "react";
import PropTypes from "prop-types";


const PropertyView = props => {
	return (
    props.fieldNames.map((name, index) => {
      <li>
      	<label>{name}</label>
      	{props.fieldValues[index]}
      </li>
    })
	);
}

PropertyView.propTypes = {
  fieldNames: PropTypes.array,
  fieldValues: PropTypes.array
};

export default PropertyView;
