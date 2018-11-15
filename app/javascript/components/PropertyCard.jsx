import React from "react";
import PropTypes from "prop-types";

 const View = (props) => {
	return (
    props.resources.map((property) => {
      return (
        <div />
      )
    })
    
	);
}

View.propTypes = {
  resources: PropTypes.array,
};
export default View;