import React from "react";
import PropTypes from "prop-types";
import { Select, Input, Button, Slider, Switch, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import ListView from './ListView.jsx';
import APIRoutes from 'helpers/api_routes';
import Utils from 'helpers/utils';
import UploadButton from './UploadButton';
import ActiveStorageProvider from "react-activestorage-provider";
import SplitViewContainer from "./SplitViewContainer.jsx";

class ApplicationsPairing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProperties: [], //array of strings
      selectedTenant: null,
      description: null
    };
    this.onChangeProperty = this.onChangeProperty.bind(this);
    this.onChangeTenant = this.onChangeTenant.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
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

  onChangeTenant(e, id) {
    if (e.target.checked) {
      this.state.selectedTenant = id;
    } else {
      this.state.selectedTenant = null;
    }
  }

  handleMatch() {
    var request = null;
    var prop;
    for (prop in this.state.selectedProperties) {
      let body = {"description": this.state.description, "status": 1, "property_id": this.state.selectedProperties[prop], "info_id": this.state.selectedTenant};
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
        window.location = '/applications/';
      }).catch((data) => {
        console.error(data);
      });
    }
  }

  renderTextarea() {
    const { TextArea } = Input;
    return (
      <div>
        <label>Add a note to about the tenant.</label>
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

  render() {
    const leftComponent = (
      <ListView resources={this.props.tenants} type="tenant" checkbox={true} CheckboxChange={this.onChangeTenant}/>
    );
    const rightComponent = (
      <ListView resources={this.props.properties} type="property" checkbox={true} CheckboxChange={this.onChangeProperty}/>
    );

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

// ApplicationsPairing.propTypes = {
  
// };

export default ApplicationsPairing;