import React from "react";
import PropTypes from "prop-types";
import { Select, Input, Button, Slider, Switch, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import ListView from './ListView.jsx';
import APIRoutes from 'helpers/api_routes';

class ApplicationsPairing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedProperties: [], //array of strings
      selectedTenant: null
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, id) {
    if (e.target.checked) {
      this.state.selectedProperties.push(id);
    } else {
      var index = this.state.selectedProperties.indexOf(id);
      if (index > -1) {
        this.state.selectedProperties.splice(index, 1);
      }
    }
    
  }

  render() {
    return (
      <div>
        <ListView resources={this.props.tenants} type={"tenant"} CheckboxChange={this.onChange}/>
        <ListView resources={this.props.properties} type={"property"} CheckboxChange={this.onChange}/>
      </div>
    );
  }
}

// ApplicationsPairing.propTypes = {
  
// };

export default ApplicationsPairing;