import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Button } from 'antd';

class RADashboard extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      tenants: props.tenants,
    }
	}

  setup(obj, images) {
    for (var i=0; i < images.length; i++) {
      obj[i] = Utils.extend(obj[i], images[i])
    }
  }

  redirectToNewTenant() {
    window.location = '/tenants/new'
  }

  render() {
    this.setup(this.state.tenants, this.props.tenantImages);
    return (
      <div>
        <Button
          style={{
            width: "20%",
            margin: "1.5% auto",
            left: "80%",
          }}
          key='submit'
          type="primary"
          onClick={this.redirectToNewTenant}>+ New Client
        </Button>
        <ListView resources={this.state.tenants} type="tenant" avatar={true} tenant_modal={false}/>
      </div>
    );
  }

}

export default RADashboard;
