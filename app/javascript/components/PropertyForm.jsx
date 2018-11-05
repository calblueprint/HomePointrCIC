// import React from "react"
// import PropTypes from "prop-types"
// class PropertyForm extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       capacity: props.property.capacity,
//       description: props.property.description,
//       landlord_id: props.property.landlord_id,
//       rent: props.property.rent,
//       size: props.property.size,
//       property_type: props.property.property_type,
//       housing_type: props.property.housing_type,
//       date_available:  props.property.date_available,
//       location: props.property.location
//     };
//     this.handleTitleChange = this.handleTitleChange.bind(this);
//     this.handleContentChange = this.handleContentChange.bind(this);
//   }
//
//   handleTitleChange(e) {
//     this.setState({ capacity: e.target.value });
//   }
//
//   handleContentChange(e) {
//     this.setState({ description: e.target.value });
//   }
//
//   render() {
//     return (
//       <div>
//         <label>Capacity</label>
//         <input
//           type="text"
//           name="property[capacity]"
//           value={this.state.capacity}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Description</label>
//         <input
//           type="text"
//           name="property[description]"
//           value={this.state.description}
//           onChange={this.handleContentChange}
//         />
//
//         <label>Landlord ID</label>
//         <input
//           type="text"
//           name="property[capacity]"
//           value={this.state.landlord_id}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Rent</label>
//         <input
//           type="text"
//           name="property[description]"
//           value={this.state.rent}
//           onChange={this.handleContentChange}
//         />
//
//         <label>Size</label>
//         <input
//           type="text"
//           name="property[capacity]"
//           value={this.state.size}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Property Type</label>
//         <input
//           type="text"
//           name="property[description]"
//           value={this.state.property_type}
//           onChange={this.handleContentChange}
//         />
//
//         <label>Housing Type</label>
//         <input
//           type="text"
//           name="property[capacity]"
//           value={this.state.housing_type}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Date Available</label>
//         <input
//           type="text"
//           name="property[capacity]"
//           value={this.state.date_available}
//           onChange={this.handleTitleChange}
//         />
//
//         <label>Location</label>
//         <input
//           type="text"
//           name="property[description]"
//           value={this.state.location}
//           onChange={this.handleContentChange}
//         />
//
//         <input type="submit" value="Update Post" />
//       </div>
//     );
//   }
//
//   // renderFields() {
//   //   return this.props.fieldNames.map((field, index) => {
//   //     if (this.props.mode === "edit") {
//   //       return (<div className="TextBox"> ${this.props.prevValues[index]} </div>)
//   //     }
//   //     return (<div className="TextBox"> ${this.props.fieldTypes[index]} </div>)
//   //   });
//   // }
//
//   // render () {
//   //   return (<div className="edit-form-page">
//   //     <h1> ${this.props.mode} ${this.props.type} </h1>
//
//   //   </div>)
//   // }
// }
//
// PropertyForm.propTypes = {
//   mode: PropTypes.string,
//   type: PropTypes.string,
//   prevValues: PropTypes.array,
//   fieldNames: PropTypes.arrayOf(PropTypes.string),
//   fieldTypes: PropTypes.arrayOf(PropTypes.string)
// };
//
// export default PropertyForm;
