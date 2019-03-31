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
import RATenantView from "./RATenantView.jsx";
import MapContainer from './individual/MapContainer';

class ApplicationsPairing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProperties: [], //array of strings
      selectedTenant: null,
      description: null,
      tenants: props.tenants,
      properties: props.properties,
      individualView: false,
      show_map: false,
      leftComponent: null,
      rightComponent: null,
    };
    this.onChangeProperty = this.onChangeProperty.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
    this.setTenant = this.setTenant.bind(this);
    this.clearTenant = this.clearTenant.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
  }

  toggleMap() {
    this.setState({show_map: !this.state.show_map})
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
      let body = {"description": this.state.description, "status": 1, "property_id": this.state.selectedProperties[prop], "tenant_id": this.state.selectedTenant.id};
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

  setup(obj, images) {
    for (var i=0; i < images.length; i++) {
      obj[i] = Utils.extend(obj[i], images[i])
    }
  }

  setTenant(e, resource) {
    this.setState({individualView: true});
    this.setState({selectedTenant: resource});
    window.scrollTo(0, 0);
  }

  clearTenant() {
    this.setState({individualView: false});
    this.setState({selectedTenant: null});
  }

  makeTagValues(tenant) {
    return ["Min Rent: " + tenant.rent_min, "Max Rent: " + tenant.rent_max, "Housing Type " + tenant.housing_type, "Property Type " + tenant.property_type, "Size: " + tenant.num_bedrooms, "Location: " + tenant.location, "Date Needed: " + tenant.date_needed]
  }

  render() {
    this.setup(this.state.tenants, this.props.tenantImages);
    this.setup(this.state.tenants, this.props.tenantPriorities);
    this.setup(this.state.properties, this.props.propertyImages);
    let leftComponent = null;
    if (this.state.show_map) {
      console.log('show map');
      leftComponent = <MapContainer/>
    } else {
      if (this.state.individualView) {
        //Individual tenant has been selected
        leftComponent = ([
          <Button type="primary" onClick={this.clearTenant}><Icon type="left" /> View All Clients</Button>,
          <RATenantView id={this.state.selectedTenant.id} name={this.state.selectedTenant.name} mode="ra_matching" description={this.state.selectedTenant.description} avatar={this.state.selectedTenant.url} tagValues={this.makeTagValues(this.state.selectedTenant)} status={this.state.selectedTenant.priority}/>
        ]);
      } else {
        //All tenants shown here
        leftComponent = (
          <ListView resources={this.state.tenants} tenant_modal={true} avatar={true} selectTenantFunc={this.setTenant} tenantSelect={true} type="tenant"/>
        );
      }
    }
    //Filtered properties
    let rightComponent = (
      <PropertyListWrapper {...this.props} toggleMap={this.toggleMap} CheckboxChange={this.onChangeProperty}/>
    );
    if (this.state.individualView) {
      rightComponent = (
        <PropertyListWrapper {...this.props} toggleMap={this.toggleMap} CheckboxChange={this.onChangeProperty} selectedTenant={this.state.selectedTenant}/>
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
  tenants: PropTypes.array,
  tenantImages: PropTypes.array,
  tenantPriorities: PropTypes.array,
  properties: PropTypes.array,
  housing_options: PropTypes.array,
  property_options: PropTypes.array,
  location_options: PropTypes.array 
};

export default ApplicationsPairing;