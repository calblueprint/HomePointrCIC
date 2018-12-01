import React from "react";
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Menu, Dropdown, Icon, Radio, InputNumber, Button, Checkbox, DatePicker } from 'antd';
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';

class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [props.tenant.location],
      capacity: 0,
      rent_min: props.tenant.rent_min,
      rent_max: props.tenant.rent_max,
      size: 0,
      property_type: [props.tenant.property_type],
      housing_type: [props.tenant.housing_type],
      date_available: props.tenant.date_needed,
      isOpen: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.passState = this.passState.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  handleClick = (event, filter_name) => {
    this.setState({[filter_name]: event.target.value})
  }

  handleCheckbox = (checkedValues, filter_name) => {
    this.setState({[filter_name]: checkedValues})
  }

  handleDatePicker = (date, dateString) => {
    this.setState({date_available: date})
  }

  handleInputNumber = (value, filter_name) => {
    this.setState({[filter_name]: value})
  }

  passState = () => {
    this.toggleOpen()
    this.props.applyFilter(this.state)
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    const CheckboxGroup = Checkbox.Group;
    const menu = (
      <div 
        style={{
          background: "white",
          marginLeft: "5%",
        }}
      >
        <div>
          Location
          <CheckboxGroup 
            options={this.props.location_options} 
            defaultValue={this.state.location}
            onChange={(e) => this.handleCheckbox(e, "location")} 
          />
        </div>
        <div>
          Property Type
          <CheckboxGroup 
            options={this.props.property_options} 
            defaultValue={this.state.property_type}
            onChange={(e) => this.handleCheckbox(e, "property_type")} 
          />
        </div>
        <div>
          Housing Type
          <CheckboxGroup 
            options={this.props.housing_options} 
            defaultValue={this.state.housing_type}
            onChange={(e) => this.handleCheckbox(e, "housing_type")} 
          />
        </div>
        <div>
        Capacity
      <InputNumber min={1} defaultValue={0} onChange={(e) => this.handleCheckbox(e, "capacity")} />
        </div>
        <div>
        Number of Bedrooms
      <InputNumber min={1} defaultValue={0} onChange={(e) => this.handleCheckbox(e, "size")} />
        </div>
        <div>
        Rent Min<InputNumber min={1} defaultValue={this.state.rent_min} onChange={(e) => this.handleCheckbox(e, "rent_min")} /> 
        Max<InputNumber min={1} defaultValue={this.state.rent_max} onChange={(e) => this.handleCheckbox(e, "rent_max")} />
        </div>
        <div>
        Date Available
        <DatePicker 
          onChange={(date, dateString) => this.handleDatePicker(date, dateString)} 
          defaultValue={moment(this.props.tenant.date_needed)}
        />
        </div>
      <Button size="small" type="primary" onClick={this.passState}>Apply</Button>
    </div>
    );

    return (
    <div>
      <Dropdown overlay={menu} visible={this.state.isOpen} trigger='click'>
        <a className="ant-dropdown-link" href="#" onClick={this.toggleOpen}>
          <div        
            style={{
            background: "white",
            marginLeft: "5%",
            }}
          >
            Filters <Icon type="down" />
          </div>
        </a>
      </Dropdown>
    </div>
    );
  }
}

export default FilterPanel;
