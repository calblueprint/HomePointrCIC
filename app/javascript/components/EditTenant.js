import PropTypes from "prop-types";
import React from "react";

/**
* @prop buyer: buyer associated with profile
*/
class EditTenant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="edit-tenant-page">
        <h1>Edit Tenant</h1>
      </div>
    );
  }
}

export default EditTenant;
