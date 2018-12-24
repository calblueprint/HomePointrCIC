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
      size: props.tenant.num_bedrooms,
      property_type: [props.tenant.property_type],
      housing_type: [props.tenant.housing_type],
      date_available: props.tenant.date_needed,
      isOpen: false,
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
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <div
          style={{
            borderBottom: "1px solid",
            borderColor: "#E5E5E5",
            paddingBottom: "15px",
          }}
        >
          <div
            style={{
              paddingBottom: "10px",
              fontWeight: "bold",
            }}
          >
            Location
          </div>
          <CheckboxGroup 
            options={this.props.location_options} 
            defaultValue={this.state.location}
            onChange={(e) => this.handleCheckbox(e, "location")} 
          />
        </div>
        <div
          style={{
            borderBottom: "1px solid",
            borderColor: "#E5E5E5",
            paddingBottom: "15px",
          }}
        >
          <div
            style={{
              paddingBottom: "10px",
              paddingTop: "10px",
              fontWeight: "bold",
            }}
          >
          Property Type
          </div>
          <CheckboxGroup 
            options={this.props.property_options} 
            defaultValue={this.state.property_type}
            onChange={(e) => this.handleCheckbox(e, "property_type")} 
          />
        </div>
        <div
          style={{
            borderBottom: "1px solid",
            borderColor: "#E5E5E5",
            paddingBottom: "15px",
          }}
        >
          <div
            style={{
              paddingBottom: "10px",
              paddingTop: "10px",
              fontWeight: "bold",
            }}
          >
          Housing Type
          </div>
          <CheckboxGroup 
            options={this.props.housing_options} 
            defaultValue={this.state.housing_type}
            onChange={(e) => this.handleCheckbox(e, "housing_type")} 
          />
        </div>
        <div
          style={{
            borderBottom: "1px solid",
            borderColor: "#E5E5E5",
            paddingBottom: "15px",
          }}
        >
          <div
            style={{
              paddingBottom: "10px",
              paddingTop: "10px",
              fontWeight: "bold",
            }}
          >
        Capacity
        </div>
        <InputNumber min={0} defaultValue={0} onChange={(e) => this.handleCheckbox(e, "capacity")} />
        </div>
        <div
          style={{
            borderBottom: "1px solid",
            borderColor: "#E5E5E5",
            paddingBottom: "15px",
          }}
        >
          <div
            style={{
              paddingBottom: "10px",
              paddingTop: "10px",
              fontWeight: "bold",
            }}
          >
        Number of Bedrooms
        </div>
        <InputNumber min={0} defaultValue={this.state.size} onChange={(e) => this.handleCheckbox(e, "size")} />
        </div>
        <div
          style={{
            borderBottom: "1px solid",
            borderColor: "#E5E5E5",
            paddingBottom: "15px",
          }}
        >
          <div
            style={{
              paddingBottom: "10px",
              paddingTop: "10px",
              fontWeight: "bold",
            }}
          >
        Rent 
        </div>
        Min<InputNumber min={0} defaultValue={this.state.rent_min} onChange={(e) => this.handleCheckbox(e, "rent_min")} /> 
        Max<InputNumber min={0} defaultValue={this.state.rent_max} onChange={(e) => this.handleCheckbox(e, "rent_max")} />
        </div>
        <div
          style={{
            paddingBottom: "15px",
          }}
        >
          <div
            style={{
              paddingBottom: "10px",
              paddingTop: "10px",
              fontWeight: "bold",
            }}
          >
        Date Available
        </div>
        <DatePicker 
          onChange={(date, dateString) => this.handleDatePicker(date, dateString)} 
          defaultValue={moment(this.props.tenant.date_needed)}
        />
        </div>
      <Button 
        type="primary" 
        onClick={this.passState}
      >
        <div         
          style={{
            paddingBottom: "15px",
          }}
        >
          Apply
        </div>
      </Button>
    </div>
    );

    return (
    <div>
      <Dropdown overlay={menu} visible={this.state.isOpen} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          <div        
            style={{
            background: "white",
            marginLeft: "10%",
            marginRight: "10%",
            }}
            onClick={this.toggleOpen}
          >
            Filters <Icon type="down" />
          </div>
        </a>
      </Dropdown>
    </div>
    );
  }
}

FilterPanel.defaultProps = {
  tenant: {location: "other_location", rent_min: 0, rent_max: 9999, num_bedrooms: 10, property_type: "other_property_type", housing_type: "other_housing_type", date_available: moment().format("YYYY-MM-DD")}
};

export default FilterPanel;
