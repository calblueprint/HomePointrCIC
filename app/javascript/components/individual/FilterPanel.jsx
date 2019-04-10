import React from "react";
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Menu, Dropdown as AntDrop, Icon, Radio, InputNumber, Button, Checkbox, DatePicker, Modal, Row, Col, Slider } from 'antd';
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import '../../../assets/stylesheets/FilterPanel.css';

const Dropdown = ({ overlay, ...props }) => (
  <AntDrop {...props} overlay={<Menu>{overlay}</Menu>} />
)

class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      capacity: 0,
      rent_min: 0,
      rent_max: 5000,
      number_of_bedrooms: 0,
      property_type: [],
      housing_type: [],
      date_available: moment().format("YYYY-MM-DD"),
      isDateOpen: false,
      isGuestsOpen: false,
      isLocationOpen: false,
      isPropertyTypeOpen: false,
      isHousingTypeOpen: false,
      isRentOpen: false,
      actual: {
        location: props.location_options,
        capacity: 0,
        rent_min: 0,
        rent_max: 5000,
        number_of_bedrooms: 0,
        property_type: props.property_options,
        housing_type: props.housing_options,
        date_available: null,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.passState = this.passState.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.sliderChanges = this.sliderChanges.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this.getInitialValues = this.getInitialValues.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount = () => {
    this.getInitialValues();
  }

  handleClick = (event, filter_name) => {
    this.setState({[filter_name]: event.target.value});
  }

  handleCheckbox = (checkedValues, filter_name) => {
    this.setState({[filter_name]: checkedValues});
  }

  handleDatePicker = (date, dateString) => {
    this.setState({date_available: date});
  }

  handleInputNumber = (value, filter_name) => {
    this.setState({[filter_name]: value});
  }

  passState = (filter_name) => {
    var temp = this.state.actual;
    temp[filter_name] = this.state[filter_name];
    if (filter_name == 'capacity') {
      temp['number_of_bedrooms'] = this.state.number_of_bedrooms;
    } else if (filter_name == 'rent_min') {
      temp['rent_max'] = this.state.rent_max;
    }
    this.setState({
      actual: temp,
    });
    this.props.applyFilter(this.state.actual);
    this.closeAll();
  }

  handleClear = (filter_name) => {
    if (filter_name == 'location' || filter_name == 'property_type' || filter_name == 'housing_type') {
      this.setState({
        [filter_name]: []
      });
    } else if (filter_name == 'rent_min') {
      this.setState({
        rent_max: 5000,
        rent_min: 0,
      });
    } else if (filter_name == 'capacity') {
      this.setState({
        capacity: 0, 
        number_of_bedrooms: 0,
      });
    } else {
      this.setState({
        [filter_name]: 0
      });
    }
  }

  closeAll = () => {
    this.setState({
      isDateOpen: false,
      isGuestsOpen: false,
      isLocationOpen: false,
      isPropertyTypeOpen: false,
      isHousingTypeOpen: false,
      isRentOpen: false,
    });
  }

  toggleOpen = (filter_name) => {
    this.closeAll();
    this.setState({[filter_name]: true});
  }

  sliderChanges([value1, value2]) {
    this.setState({ 
      rent_min: value1,
      rent_max: value2,
    });
  }

  getInitialValues = () => {
    if (this.props.tenants[0]) {
      let tenant = this.props.tenants[0];
      this.setState({
        location: [tenant.location],
        capacity: tenant.family_size,
        rent_min: tenant.rent_min,
        rent_max: tenant.rent_max,
        number_of_bedrooms: tenant.number_of_bedrooms,
        property_type: [tenant.property_type],
        housing_type: [tenant.housing_type],
        date_available: moment(tenant.date_needed),
      });
    };
  }

  render() {
    const CheckboxGroup = Checkbox.Group;
    const marks = {
      0: "$0",
      2500: "$2500",
      5000: "$5000"
    };

    const dateFilter = (
      <div>
        <div className="options">
          <DatePicker
            onChange={(date, dateString) => this.handleDatePicker(date, dateString)}
            value={moment(this.state.date_available)}
          />
        </div>
        <div className="buttons-panel">
          <a href="#">
            <div onClick={(e) => this.handleClear("date_available")}>
              Clear
            </div>
          </a>
          <a href="#">
            <div onClick={(e) => this.passState("date_available")}>
              Apply
            </div>
          </a>
        </div>
      </div>
    );

    const guestsFilter = (
      <div>
        <div className="options">
          Bedrooms
          <div className="guests">
            <InputNumber
              min={0}
              value={this.state.number_of_bedrooms}
              onChange={(e) => this.handleCheckbox(e, "number_of_bedrooms")}
            />
          </div>
          Capacity
          <div className="guests">
            <InputNumber
              min={0}
              value={this.state.capacity}
              onChange={(e) => this.handleCheckbox(e, "capacity")}
            />
          </div>
        </div>
        <div className="buttons-panel">
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.handleClear("capacity")}
          >
            Clear
          </Button>
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.passState("capacity")}
          >
            Apply
          </Button>
        </div>
      </div>
    );

    const locationFilter = (
      <div>
        <div className="options">
          <CheckboxGroup
            options={this.props.location_options}
            value={this.state.location}
            onChange={(e) => this.handleCheckbox(e, "location")}
          />
        </div>
        <div className="buttons-panel">
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.handleClear("location")}
          >
            Clear
          </Button>
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.passState("location")}
          >
            Apply
          </Button>
        </div>
      </div>
    );

    const propertyTypeFilter = (
      <div>
        <div className="options">
          <CheckboxGroup
            options={this.props.property_options}
            value={this.state.property_type}
            onChange={(e) => this.handleCheckbox(e, "property_type")}
          />
        </div>
        <div className="buttons-panel">
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.handleClear("property_type")}
          >
            Clear
          </Button>
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.passState("property_type")}
          >
            Apply
          </Button>
        </div>
      </div>
    );

    const housingTypeFilter = (
      <div>
        <div className="options">
          <CheckboxGroup
            options={this.props.housing_options}
            value={this.state.housing_type}
            onChange={(e) => this.handleCheckbox(e, "housing_type")}
          />
        </div>
        <div className="buttons-panel">
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.handleClear("housing_type")}
          >
            Clear
          </Button>
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.passState("housing_type")}
          >
            Apply
          </Button>
        </div>
      </div>
    );

    const rentFilter = (
      <div>
        <div className="options">
          <Row gutter={10}>
            <Col span={6}>
              <InputNumber
                min={0}
                max={5000}
                style={{ width: 80 }}
                value={this.state.rent_min}
                onChange={(e) => this.handleCheckbox(e, "rent_min")}
              />
            </Col>
            <Col span={12}>
              <Slider
                range marks={marks}
                min={0}
                max={5000}
                style={{ width: 200, paddingLeft: 10 }}
                defaultValue={typeof this.state.rent_min === 'number' && typeof this.state.rent_max === 'number' ? [this.state.rent_min, this.state.rent_max] : [0, 5000]}
                onChange={this.sliderChanges}/>
            </Col>
            <Col span={6}>
              <InputNumber
                min={0}
                max={5000}
                style={{ width: 80 }}
                value={this.state.rent_max}
                onChange={(e) => this.handleCheckbox(e, "rent_max")}
              />
            </Col>
          </Row>
        </div>
        <div className="buttons-panel">
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.handleClear("rent_min")}
          >
            Clear
          </Button>
          <Button
            type="default"
            style={{ border: 'none' }}
            onClick={(e) => this.passState("rent_min")}
          >
            Apply
          </Button>
        </div>
      </div>
    );

    return (
      <div className="filters-bar">
        <Dropdown overlay={dateFilter} visible={this.state.isDateOpen} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <div onClick={(e) => this.toggleOpen("isDateOpen")}>
              Date needed
            </div>
          </a>
        </Dropdown>
        <Dropdown overlay={guestsFilter} visible={this.state.isGuestsOpen} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <div onClick={(e) => this.toggleOpen("isGuestsOpen")}>
              Guests
            </div>
          </a>
        </Dropdown>
        <Dropdown overlay={locationFilter} visible={this.state.isLocationOpen} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <div onClick={(e) => this.toggleOpen("isLocationOpen")}>
              Location
            </div>
          </a>
        </Dropdown>
        <Dropdown overlay={propertyTypeFilter} visible={this.state.isPropertyTypeOpen} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <div onClick={(e) => this.toggleOpen("isPropertyTypeOpen")}>
              Property type
            </div>
          </a>
        </Dropdown>
        <Dropdown overlay={housingTypeFilter} visible={this.state.isHousingTypeOpen} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <div onClick={(e) => this.toggleOpen("isHousingTypeOpen")}>
              Housing type
            </div>
          </a>
        </Dropdown>
        <Dropdown overlay={rentFilter} visible={this.state.isRentOpen} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <div onClick={(e) => this.toggleOpen("isRentOpen")}>
              Rent
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
  tenants: PropTypes.object
};

export default FilterPanel;
