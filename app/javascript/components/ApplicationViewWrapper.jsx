import React from "react";
import PropTypes from "prop-types";
import TenantView from "./RATenantView.jsx";
import RAView from "./RAView.jsx";
import ApplicationStatusButtons from "./ApplicationStatusButtons.jsx";
import moment from 'moment';
import {Divider} from 'antd';
import 'antd/dist/antd.css';

class ApplicationViewWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.mode === "landlord") {
      return 
      (<div>
        <Divider>Tenant</Divider>

        <RATenantView id={this.props.tenantProps[0]}, 
                      name={this.props.tenantProps[1]} 
                      mode={this.props.tenantProps[2]} 
                      description={this.props.tenantProps[3]} 
                      tagValues={this.props.tenantProps[4]} 
                      status={this.props.tenantProps[5]} />

        <Divider>Referral Agency</Divider>

        <RAView id={this.props.raProps[0]},
                name={this.props.raProps[1]},
                tagValues={this.props.raProps[2]} /> 

        <Divider/>

        <ApplicationStatusButtons application_id={this.props.buttonProps[0]},
                                  status={this.props.buttonProps[1]}/>
      </div>)
    } else if (this.props.mode === "referral_agency") {
      return <RATenantView id={this.props.tenantProps[0]}, 
                      name={this.props.tenantProps[1]} 
                      mode={this.props.tenantProps[2]} 
                      description={this.props.tenantProps[3]} 
                      tagValues={this.props.tenantProps[4]} 
                      status={this.props.tenantProps[5]} />
    } else {
      return null
    }
  }
}

PropertyView.propTypes = {
  id: PropTypes.number
  mode: PropTypes.string,
  tenantProps: PropTypes.array,
  raProps: PropTypes.array,
  buttonProps: PropTypes.array
};

export default ApplicationViewWrapper;

