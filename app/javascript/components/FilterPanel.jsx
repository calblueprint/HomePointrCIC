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
      property_type: "",
      housing_type: "",
      date_available: "",
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick = (event) => {
  //   console.log(event.target);
  // }
  render() {
    const { RangePicker } = DatePicker;
    const CheckboxGroup = Checkbox.Group;
    const menu = (
      <div>
      <div>
        Location
        <Radio.Group defaultValue="a" buttonStyle="solid">
          {this.props.location_options.map(location => {
            return <Radio.Button value={location}>{location}</Radio.Button>
          })}
        </Radio.Group>
      </div>
      <div>
        Property Type
        <CheckboxGroup options={this.props.property_options} />
      </div>
      <div>
        Housing Type
        <CheckboxGroup options={this.props.housing_options} />
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
      Rent Min<InputNumber min={1} max={10000000} defaultValue={0} /> Max<InputNumber min={1} max={10000000} defaultValue={3} />
      </div>
      <div>
      Date Available
      <RangePicker />
      </div>
    <Button type="primary">Apply</Button>
    </div>
    );

    return (
    <div>
      <Dropdown overlay={menu} trigger='click'>
        <a className="ant-dropdown-link" href="#">
          Filters <Icon type="down" />
        </a>
      </Dropdown>
    </div>
    );
  }
}

// FilterPanel.propTypes = {
//   mode: PropTypes.string,
//   type: PropTypes.string,
//   prevValues: PropTypes.array,
//   fieldNames: PropTypes.array,
//   fieldTypes: PropTypes.array,
//   niceFieldNames: PropTypes.array
// };

export default FilterPanel;
