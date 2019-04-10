import React from "react";
import PropTypes from "prop-types";
import { Select, Input, Button, Slider, Icon, Switch, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import ListView from './ListView.jsx';
import APIRoutes from 'helpers/api_routes';
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
      tenant: props.tenant,
      properties: props.properties,
      status: "propertyList"
    };
    this.onChangeProperty = this.onChangeProperty.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
    this.renderApplicationSubmissionWrapper = this.renderApplicationSubmissionWrapper.bind(this);
  }

  onChangeProperty(e, id) {
    if (e.target.checked) {
      this.state.selectedProperties.push(id);
    } else {
      var index = this.state.selectedProperties.indexOf(id);
      if (index > -1) {
        this.state.selectedProperties.splice(index, 1);
      }
    }
  }

  handleMatch() {
    var request = null;
    var prop;
    for (prop in this.state.selectedProperties) {
      let body = {"description": this.state.description, "status": 1, "property_id": this.state.selectedProperties[prop], "tenant_id": this.props.tenant.id};
      body = JSON.stringify({application: body})
      request = APIRoutes.applications.create
      fetch(request, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
        },
        body: body,
        credentials: 'same-origin',
      }).then((data) => {
        window.location = '/';
      }).catch((data) => {
        console.error(data);
      });
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
        [<ApplicationSubmissionWrapper {...this.props}/>,
        <Button key="edit_selections">Edit Selections</Button>,
        <Button key="edit_selections">Finish Application Process</Button>]
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
