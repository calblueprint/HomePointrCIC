import React from "react";
import PropTypes from "prop-types";
import FilterPanel from "./FilterPanel.jsx";
import ListView from "./ListView.jsx"

class PropertyListWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			properties: this.props.properties,
			filters: this.props.filters
			type: 'property'
		}
		this.handleFilter = this.handleFilter.bind(this);
	}

	handleFilter(filters) {
		let updatedProperties;
		updatedProperties = this.state.properties.filter(p => {
			return (filters["location"] == p.location && 
				filters["capacity"] <= p.capacity && 
				filters["rent_min"] <= p.rent && 
				filters["rent_max"] >= p.rent && 
				filters["size"] <= p.size && 
				filters["property_type"].includes(p.property_type) && 
				filters["housing_type"].includes(p.housing_type) && 
				(filters["date_available"].isAfter(p.date_available) ||
				filters["date_available"].isSame(p.date_available)))
		})
		this.setState({properties: updatedProperties})
	}
	
	render() {
		<FilterPanel housing_options={this.props.housing_options} property_options={this.props.property_options} location_options={this.props.location_options} tenant={this.props.tenant} handleFilter={this.handleFilter} />
		<ListView props={...this.state} />
	}
}