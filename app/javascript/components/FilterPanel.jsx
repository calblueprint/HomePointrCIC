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
      location: "",
      capacity: 0,
      rent_min: 0,
      rent_max: 0,
      size: 0,
      property_type: [],
      housing_type: [],
      date_available: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
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

  render() {
    const CheckboxGroup = Checkbox.Group;
    const menu = (
      <div>
      <div>
        Location
        <Radio.Group defaultValue="a" buttonStyle="solid">
          {this.props.location_options.map(location => {
            return <Radio.Button value={location} onClick={(e) => this.handleClick(e, "location")}>{location}</Radio.Button>
          })}
        </Radio.Group>
      </div>
      <div>
        Property Type
        <CheckboxGroup options={this.props.property_options} onChange={(e) => this.handleCheckbox(e, "property_type")}/>
      </div>
      <div>
        Housing Type
        <CheckboxGroup options={this.props.housing_options} onChange={(e) => this.handleCheckbox(e, "housing_type")} />
      </div>
      <div>
      Capacity
    <InputNumber min={1} max={10000000} defaultValue={0} />
      </div>
      <div>
      Size
    <InputNumber min={1} max={10000000} defaultValue={0} />
      </div>
      <div>
      Rent Min<InputNumber min={1} max={10000000} defaultValue={this.props.tenant.rent_min} /> 
      Max<InputNumber min={1} max={10000000} defaultValue={this.props.tenant.rent_min} />
      </div>
      <div>
      Date Available
      <DatePicker onChange={(date, dateString) => this.handleDatePicker(date, dateString)} />
      </div>
    <Button type="primary">Apply</Button>
    </div>
    );

    return (
    <div>
      <Dropdown overlay={menu} visible={true} trigger='click'>
        <a className="ant-dropdown-link" href="#">
          Filters <Icon type="down" />
        </a>
      </Dropdown>
    </div>
    );
  }
}

export default FilterPanel;
