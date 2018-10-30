import PropTypes from "prop-types";
import React from "react";

/**
* @prop buyer: buyer associated with profile
*/
class CreateProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="create-property-page">
        <h1>Create Property</h1>
      </div>
    );
  }
}

export default CreateProperty;