import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Button } from 'antd';
import '../../assets/stylesheets/dashboard.css';

class RADashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenants: props.tenants,
    }
  }

  redirectToNewTenant() {
    window.location = '/tenants/new'
  }

  render() {
    Utils.setup(this.state.tenants, this.props.tenantImages);
    Utils.setup(this.state.tenants, this.props.tenantStatuses);
    return (
      <div className="dashboard-container">
        <div>
          <h2 className='dashboard-h2'>Client Dashboard</h2>
          <ListView
            resources={this.state.tenants}
            type="tenant"
            avatar={true}
            tenant_modal={false}
            displayTag={true}
            renderModal={false}
            viewpoint="RA"
          />
        </div>
        <div>
          <Button
            className='add-new-button'
            key='submit'
            type="primary"
            onClick={this.redirectToNewTenant}>+ Add new client
          </Button>
        </div>
      </div>
    );
  }

}

export default RADashboard;
