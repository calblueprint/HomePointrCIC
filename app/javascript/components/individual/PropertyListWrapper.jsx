import React from "react";
import PropTypes from "prop-types";
import FilterPanel from "./FilterPanel.jsx";
import ListView from "./../ListView.jsx";
import { Switch, Icon } from 'antd';
import moment from 'moment';

class PropertyListWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: props.properties,
    }
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filters) {
    let updatedProperties;
    updatedProperties = this.props.properties.filter(p => {
      const dateToMoment = moment(filters["date_available"]);
      return (
        filters["capacity"] <= p.capacity && 
        filters["rent_min"] <= p.rent && 
        filters["rent_max"] >= p.rent && 
        filters["size"] <= p.size && 
        (dateToMoment.isAfter(p.date_available) ||
        dateToMoment.isSame(p.date_available))
      );
    })
    if (filters["location"].length > 0) {
      updatedProperties = updatedProperties.filter(p => {
        return (
          filters["location"].indexOf(p.location) > -1
        );
      })
    }
    if (filters["property_type"].length > 0) {
      updatedProperties = updatedProperties.filter(p => {
        return (
          filters["property_type"].indexOf(p.property_type) > -1
        );
      })
    }
    if (filters["housing_type"].length > 0) {
      updatedProperties = updatedProperties.filter(p => {
        return (
          filters["housing_type"].indexOf(p.housing_type) > -1
        );
      })
    }
    this.setState({properties: updatedProperties})
  }
  
  render() {
    return (
      <div key="PropertyListWrapper"
        style={{
          paddingTop: "5%",
        }}
      >
        <FilterPanel {...this.props} applyFilter={this.handleFilter} />
        Show Map <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} onChange={this.props.toggleMap}/>
        <ListView avatar={true} resources={this.state.properties} property_modal={true} type="property" checkbox={true} CheckboxChange={this.props.CheckboxChange}/>
      </div>
    );
  }
}

PropertyListWrapper.propTypes = {
  properties: PropTypes.array,
  selectedTenant: PropTypes.object,
};

export default PropertyListWrapper;
