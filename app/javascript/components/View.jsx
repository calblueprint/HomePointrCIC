import React from "react";
import PropTypes from "prop-types";

 const View = (props) => {
	return (
    props.resources.map((property) => {
      return (
      <Card title={resource.location} bordered={false}>{resource.description}</Card>
      )
    })
    
	);
}

View.propTypes = {
  resources: PropTypes.array,
};
export default View;