import React from "react";
import PropTypes from "prop-types";
import { Select, Input, Button, Slider, Icon, Switch, DatePicker, message } from 'antd';
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
import InstructionsModal from "./modals/InstructionsModal.jsx";
import MapContainer from './individual/MapContainer';

class ApplicationsPairing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProperties: [], //array of strings
      description: null,
      properties: props.properties,
      filtered_properties: props.properties,
      show_map: false,
      leftComponent: null,
      rightComponent: null,
      selectedEnd: 0,
      status: "propertyList"
    };

    Utils.setup([this.props.tenant], this.props.tenantImage);
    Utils.setup([this.props.tenant], this.props.tenantPriority);
    Utils.setup(this.state.properties, this.props.propertyImages);
    Utils.setup(this.state.properties, this.props.propertyForms);

    for (var i = 0; i < this.state.properties.length; i ++) {
      this.state.properties[i]["tenantCount"] = this.props.tenantCounts[i]
      this.state.properties[i]["potentialTenantCount"] = this.props.potentialTenantCounts[i]
    }

    this.onChangeProperty = this.onChangeProperty.bind(this);
    this.clearTenant = this.clearTenant.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
    this.setFilteredProperties = this.setFilteredProperties.bind(this);
    this.renderApplicationSubmissionWrapper = this.renderApplicationSubmissionWrapper.bind(this);
    this.renderPropertyListWrapper = this.renderPropertyListWrapper.bind(this);
    this.finishApplicationProcess = this.finishApplicationProcess.bind(this);
    this.onSubmitProperty = this.onSubmitProperty.bind(this);

  }

  onSubmitProperty(e, property) {
      //remove the property from the list of properties so we don't render it when editing applications
      let index = this.state.properties.indexOf(property)
      if (index != -1) {
        this.state.properties.splice(index, 1);
      }
      this.state.selectedEnd -= 1;
  }

  toggleMap() {
    this.setState({show_map: !this.state.show_map})
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
      this.state.selectedEnd-=1;
    }
  }

  makeTagValues(tenant) {
    return ["Min Rent: " + tenant.rent_min, "Max Rent: " + tenant.rent_max, "Housing Type " + tenant.housing_type, "Property Type " + tenant.property_type, "Size: " + tenant.number_of_bedrooms, "Location: " + tenant.location, "Date Needed: " + tenant.date_needed]
  }

  renderApplicationSubmissionWrapper() {
    if (this.state.selectedEnd > 0) { //there are selected applications
        this.setState({status:"applicationSubmission"})
    } else {
      message.error('Please select properties!');
    }

	}

  setFilteredProperties(lst) {
    this.setState({filtered_properties: lst});
  }

  clearTenant() {
    this.setState({individualView: false});
    this.setState({selectedTenant: null});
  }

  renderPropertyListWrapper() {
		this.setState({status:"propertyList"})
	}

  finishApplicationProcess() {
    if (this.state.selectedEnd > 0) {
      message.error('Please submit all applications!');
    } else {
      //render tenant view
      window.location = "/tenants/" + this.props.tenant.id;
    }
  }

  render() {
    let leftComponent = null;
    if (this.state.show_map) {
      leftComponent = <MapContainer filtered_properties={this.state.filtered_properties}/>
    } else {
      leftComponent = (
        <RATenantView
          tenant={this.props.tenant}
          mode="ra_edit"
          avatar={this.props.tenant.avatar}
          status={this.props.tenant.priority}
        />
      );
    }

    //Filtered properties
    let rightComponent = null;
    if (this.state.status == "propertyList") {
      rightComponent = (
        <div>
          <div>
            <Button
              type="primary"
              className="property-list-wrapper-start-app-btn"
              key="start_applications"
              onClick={this.renderApplicationSubmissionWrapper}>
              Start Applications
            </Button>
          </div>
          <div>
           <InstructionsModal status={this.state.status}/>
          </div>
          <div>
           <PropertyListWrapper
              {...this.props}
              setFilteredProperties={this.setFilteredProperties}
              toggleMap={this.toggleMap}
              selectedEnd={this.state.selectedEnd}
              propertyCompletion={true}
              CheckboxChange={this.onChangeProperty}
              selectedTenant={this.props.tenant}
            />
          </div>
        </div>
      );
    }
    else if (this.state.status == "applicationSubmission") {
      rightComponent = (
        <div>
          <h1>Upload and Submit</h1>
          <div>
            <Button
              key="edit_selections"
              onClick={this.renderPropertyListWrapper}>
              Edit Selections
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              key="finish_applications"
              onClick={this.finishApplicationProcess}>
              Finish Application Process
            </Button>
          </div>
          <div>
            <InstructionsModal status={this.state.status}/>
          </div>
          <div>
            <ApplicationSubmissionWrapper
              {...this.props}
              onSubmitProperty={this.onSubmitProperty}
              selectedProperties={this.state.properties.slice(0, this.state.selectedEnd)}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <SplitViewContainer
          leftComponent={leftComponent}
          rightComponent={rightComponent}
        />
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
