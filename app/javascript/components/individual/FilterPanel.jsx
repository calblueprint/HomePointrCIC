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
      location: [],
      capacity: 0,
      rent_min: 0,
      rent_max: 9999,
      number_of_bedrooms: 0,
      property_type: [],
      housing_type: [],
      date_available: moment().format("YYYY-MM-DD"),
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
    this.handleState()
  }

  handleState() {
    if (this.props.selectedTenant) {
      this.setState({
        location: [this.props.selectedTenant.location],
        rent_min: this.props.selectedTenant.rent_min,
        rent_max: this.props.selectedTenant.rent_max,
        number_of_bedrooms: this.props.selectedTenant.number_of_bedrooms,
        property_type: [this.props.selectedTenant.property_type],
        housing_type: [this.props.selectedTenant.housing_type],
        date_available: moment(this.props.selectedTenant.date_needed),
      })
    }
  }

  render() {
    const CheckboxGroup = Checkbox.Group;
    let menu = (
      <div
        style={{
          background: "white",
          marginLeft: "10%",
          marginRight: "10%",
          padding: "10px",
          borderStyle: "solid",
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
        <InputNumber min={0} defaultValue={this.state.size} onChange={(e) => this.handleCheckbox(e, "number_of_bedrooms")} />
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
          defaultValue={moment(this.state.date_available)}
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
      <Button
        type="danger"
        onClick={this.toggleOpen}
      >
        <div
          style={{
            paddingBottom: "15px",
          }}
        >
          Cancel
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

FilterPanel.propTypes = {
  location_options: PropTypes.array,
  property_options: PropTypes.array,
  housing_options: PropTypes.array,
  selectedTenant: PropTypes.object
};

export default FilterPanel;
