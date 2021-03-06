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
      ordered: []
    }
  }

  redirectToNewTenant() {
    window.location = '/tenants/new'
  }

  reorder() {
    let accepted = [];
    let noApps = [];
    let other = [];
    for (let i = 0; i < this.state.tenants.length; i++) {
      if(this.state.tenants[i].status === 0) {  //accepted
        accepted.push(this.state.tenants[i])
      } else if (this.state.tenants[i].status === 4) { //noapps
        noApps.push(this.state.tenants[i])
      } else {
        other.push(this.state.tenants[i])
      }
    }
    this.state.ordered = noApps.concat(other.concat(accepted))
  }

  renderTenants() {
    if (this.state.tenants.length !== 0) {
      return(
        <div>
          <ListView
            resources={this.state.ordered}
            type="tenant"
            avatar={true}
            tenant_modal={false}
            displayTag={true}
            renderModal={false}
            viewpoint="RA"
          />
        </div>
      )
    } else {
      return(
        <div>
          <img src={'/assets/noClients.png'} className="empty-dashboard-img"/>
          <div className="empty-dashboard-text">
            <div className="empty-dashboard-header">
              <h2>No clients yet</h2>
            </div>
            <div className="empty-dashboard-description">
              <h3>Click on 'Add new client' to get started.</h3>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    Utils.setup(this.state.tenants, this.props.tenantImages);
    Utils.setup(this.state.tenants, this.props.tenantStatuses);
    this.reorder();
    return (
      <div className="dashboard-container">
        <div>
          <h2 className='dashboard-h2'>Client Dashboard</h2>
          {this.renderTenants()}
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
