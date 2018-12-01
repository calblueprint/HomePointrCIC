import React from "react";
import PropTypes from "prop-types";
import FilterPanel from "./FilterPanel.jsx";
import ListView from "./ListView.jsx";
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
				filters["location"].indexOf(p.location) > -1 &&
				filters["capacity"] <= p.capacity && 
				filters["rent_min"] <= p.rent && 
				filters["rent_max"] >= p.rent && 
				filters["size"] <= p.size && 
				filters["property_type"].indexOf(p.property_type) > -1 && 
				filters["housing_type"].indexOf(p.housing_type) > -1 &&
				(dateToMoment.isAfter(p.date_available) ||
				dateToMoment.isSame(p.date_available))
			);
		})
		this.setState({properties: updatedProperties})
	}
	
	render() {
		return (
			<div>
				<FilterPanel {...this.props} applyFilter={this.handleFilter} />
				<ListView resources={this.state.properties} type='property' />
			</div>
		);
	}
}

export default PropertyListWrapper;
