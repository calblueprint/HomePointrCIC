import React from "react";
import PropTypes from "prop-types";
import { Select, Input, Button, Slider, Icon, Switch, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import ListView from './ListView.jsx';
import Utils from 'helpers/utils';
import UploadButton from './individual/UploadButton';
import ActiveStorageProvider from "react-activestorage-provider";
import SplitViewContainer from "./individual/SplitViewContainer.jsx";
import PropertyListWrapper from "./individual/PropertyListWrapper.jsx";
import ApplicationSubmissionWrapper from "./individual/ApplicationSubmissionWrapper.jsx";
import RATenantView from "./RATenantView.jsx";

class ApplicationsPairing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProperties: [], //array of strings
      description: null,
      properties: props.properties,
      selectedEnd: 0,
      status: "propertyList"
    };
    this.onChangeProperty = this.onChangeProperty.bind(this);
    this.renderApplicationSubmissionWrapper = this.renderApplicationSubmissionWrapper.bind(this);
    this.renderPropertyListWrapper = this.renderPropertyListWrapper.bind(this);
    this.renderTenantView = this.renderTenantView.bind(this);
  }

  onChangePropertyGood(e, property) {
    if (e.target.checked) {
      this.state.selectedProperties.push(property);
    } else {
      var index = this.state.selectedProperties.indexOf(property);
      if (index > -1) {
        this.state.selectedProperties.splice(index, 1);
      }
    }
  }

  onChangeProperty(e, property) {
    if (e.target.checked) {
      //add to beginning
      var index = this.state.properties.indexOf(property);
      this.state.properties.splice(index, 1);
      this.state.properties.unshift(property);
      this.state.selectedEnd+=1;
    } else {
      //add to end
      var index = this.state.properties.indexOf(property);
      this.state.properties.splice(index, 1);
      this.state.properties.push(property);
    }
  }

  renderTextarea() {
    const { TextArea } = Input;
    return (
      <div>
        <label>Add a note to about the client.</label>
        <TextArea rows ={4} onChange={(e) => this.state.description = e.target.value} autosize={true}/>
      </div>
    )
  }

  renderUpload(index) {
    return (
      <div key={index}>
        <ActiveStorageProvider
          endpoint={{
            path: '/api/applications',
            model: 'Application',
            attribute: 'form',
            method: 'POST',
          }}
          headers={{
            'Content-Type': 'application/json'
          }}
          render={Utils.activeStorageUploadRenderer}
        />
      </div>
    )
  }

  makeTagValues(tenant) {
    return ["Min Rent: " + tenant.rent_min, "Max Rent: " + tenant.rent_max, "Housing Type " + tenant.housing_type, "Property Type " + tenant.property_type, "Size: " + tenant.number_of_bedrooms, "Location: " + tenant.location, "Date Needed: " + tenant.date_needed]
  }

  renderApplicationSubmissionWrapper() {
		this.setState({status:"applicationSubmission"})
	}

  renderPropertyListWrapper() {
		this.setState({status:"propertyList"})
	}

  renderTenantView() {
    debugger;
    window.location = "/tenants/" + this.props.tenant.id;
  }

  render() {
    Utils.setup([this.props.tenant], this.props.tenantImage);
    Utils.setup([this.props.tenant], this.props.tenantPriority);
    Utils.setup(this.state.properties, this.props.propertyImages);
    Utils.setup(this.state.properties, this.props.propertyForms);
    let leftComponent = (
      <RATenantView tenant={this.props.tenant} mode="ra_edit" status={this.props.tenant.priority}/>
    );    //Filtered properties
    let rightComponent = null;
    if (this.state.status == "propertyList") {
      rightComponent = (
        <h1>Potential Homes</h1>,
        [<PropertyListWrapper {...this.props} propertyCompletion={true} CheckboxChange={this.onChangeProperty} selectedTenant={this.props.tenant}/>,
        <Button key="start_applications" onClick={this.renderApplicationSubmissionWrapper}>Start Applications</Button>]
      );
    }
    else if (this.state.status == "applicationSubmission") {
      rightComponent = (
        <h1>Upload and Submit</h1>,
        [<ApplicationSubmissionWrapper {...this.props} selectedProperties={this.state.selectedProperties}/>,
        <Button key="edit_selections" onClick={this.renderPropertyListWrapper}>Edit Selections</Button>,
        <Button key="edit_selections" onClick={this.renderTenantView}>Finish Application Process</Button>]
      );
    }

    return (
      <div>
        <SplitViewContainer
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        />
        {this.renderTextarea()}
        {this.renderUpload()}
        <Button key='save' type="primary" onClick={this.handleMatch}>
          Submit
        </Button>
      </div>
    );
  }
}

ApplicationsPairing.propTypes = {
  tenant: PropTypes.object,
  tenantImage: PropTypes.array,
  tenantPriority: PropTypes.array,
  properties: PropTypes.array,
  housing_options: PropTypes.array,
  property_options: PropTypes.array,
  location_options: PropTypes.array
};

export default ApplicationsPairing;
